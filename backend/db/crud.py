from sqlalchemy import text
from sqlalchemy.orm import Session
import psycopg

# ======================================================
# WeatherLink Dataset
# ======================================================
def update_dataset_table(db: Session, csv_text: str) -> True | psycopg.errors.Error:
    conn = db.connection().connection

    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                            CREATE TABLE IF NOT EXISTS weather (
                                id SERIAL,
                                record_date TIMESTAMP UNIQUE,
                                avg_temp REAL,
                                hi_temp REAL,
                                low_temp REAL,
                                out_hum SMALLINT,
                                dew_pt REAL,
                                wind_speed REAL,
                                wind_direction VARCHAR(16),
                                wind_run REAL,
                                hi_speed REAL,
                                hi_dir VARCHAR(16),
                                bar REAL,
                                rain REAL,
                                rain_rate REAL,
                                heat_dd REAL,
                                cool_dd REAL,
                                in_temp REAL,
                                in_hum SMALLINT,
                                in_dew REAL,
                                in_emc REAL,
                                in_air_density REAL,
                                et REAL,
                                wind_samp INTEGER,
                                wind_tx INTEGER,
                                iss_recept REAL,
                                arc_int SMALLINT,  
                                PRIMARY KEY (id)
                            );""")
            cursor.execute("""
                            CREATE TEMP TABLE IF NOT EXISTS weather_stage AS
                            SELECT
                                record_date, avg_temp, hi_temp, low_temp,
                                out_hum, dew_pt, wind_speed, wind_direction, wind_run,
                                hi_speed, hi_dir, bar, rain, rain_rate, heat_dd, cool_dd,
                                in_temp, in_hum, in_dew, in_emc, in_air_density, et, wind_samp,
                                wind_tx, iss_recept, arc_int
                            FROM weather
                            WHERE false;
                            """)
            with cursor.copy("""
                            COPY weather_stage(record_date, avg_temp, hi_temp, low_temp,
                            out_hum, dew_pt, wind_speed, wind_direction, wind_run,
                            hi_speed, hi_dir, bar, rain, rain_rate, heat_dd, cool_dd,
                            in_temp, in_hum, in_dew, in_emc, in_air_density, et, wind_samp,
                            wind_tx, iss_recept, arc_int)
                            FROM STDIN
                            WITH (FORMAT CSV, DELIMITER ';', HEADER)
                            """) as copy:
                copy.write(csv_text)
            cursor.execute("""
                           INSERT INTO weather(
                            record_date, avg_temp, hi_temp, low_temp,
                            out_hum, dew_pt, wind_speed, wind_direction, wind_run,
                            hi_speed, hi_dir, bar, rain, rain_rate, heat_dd, cool_dd,
                            in_temp, in_hum, in_dew, in_emc, in_air_density, et, wind_samp,
                            wind_tx, iss_recept, arc_int
                            )
                            SELECT *
                            FROM weather_stage
                            ON CONFLICT DO NOTHING;
                            """)
        db.commit()
        return True
    except psycopg.errors.Error as e:
        db.rollback()
        return e.__class__.__name__



# =======================================================
# Temperature
# =======================================================
def get_temperature_by_year(db: Session):
    query = text("""
                WITH yearly_total_records AS (
                    SELECT   
                        EXTRACT(YEAR FROM record_date) AS date,	
                        COUNT(*) AS record_amount
                    FROM
                        weather
                    GROUP BY
                        date
                    ORDER BY
                        date ASC
                ),
                yearly_historical_temps AS (
                    SELECT
                        EXTRACT(YEAR FROM record_date) AS date,
                        ROUND(AVG(avg_temp)::NUMERIC,1) AS avg_temp,
                        MAX(hi_temp),
                        MIN(low_temp)
                    FROM
                        weather
                    GROUP BY
                        date
                    ORDER BY
                        date ASC
                )
                SELECT
                    yht.date,
                    yht.avg_temp,
                    yht.max,
                    yht.min
                FROM
                    yearly_total_records ytr
                LEFT JOIN
                    yearly_historical_temps yht ON ytr.date = yht.date
                WHERE ytr.record_amount > 28000
                """)
    return db.execute(query).mappings().all()


def get_temperature_by_year_month(db: Session):
    query = text("""
                SELECT
	                TO_CHAR(record_date, 'YYYY-MM') AS date,
	                ROUND(AVG(avg_temp)::NUMERIC,1) AS avg_temp,
	                MAX(hi_temp),
	                MIN(low_temp)
                FROM
	                weather
                GROUP BY
	                date
                ORDER BY
	                date ASC
                """)
    return db.execute(query).mappings().all()


def get_temperature_by_year_month_day(db: Session):
    query = text("""
                SELECT
                    DATE(record_date) AS date,
                    ROUND(AVG(avg_temp)::NUMERIC,1) AS avg_temp,
                    MAX(hi_temp),
                    MIN(low_temp)
                FROM
                    weather
                GROUP BY
                    date
                ORDER BY
                    date ASC
                """)
    return db.execute(query).mappings().all()


def get_temperature_anniversary_timestamp_comparison(db: Session):
    query = text("""
                WITH latest_record AS (
                    SELECT *
                    FROM weather
                    ORDER BY record_date DESC
                    LIMIT 1
                )
                SELECT
                    EXTRACT(YEAR FROM w.record_date) AS date, w.avg_temp, w.hi_temp, w.low_temp
                FROM
                    weather w
                CROSS JOIN
                    latest_record lr
                WHERE
                    EXTRACT(MONTH FROM w.record_date) = EXTRACT(MONTH FROM lr.record_date)
                    AND EXTRACT(DAY FROM w.record_date) = EXTRACT(DAY FROM lr.record_date)
                    AND EXTRACT(HOUR FROM w.record_date) = EXTRACT(HOUR FROM lr.record_date)
                    AND EXTRACT(MINUTE FROM w.record_date) = EXTRACT(MINUTE FROM lr.record_date)
                ORDER BY
                    w.record_date ASC
                """)
    return db.execute(query).mappings().all()


def get_hottest_record(db: Session):
    query = text("""
                SELECT
                    record_date AS date, MAX(hi_temp) AS max_temp
                FROM
                    weather
                GROUP BY
                    record_date
                ORDER BY
                    MAX(hi_temp) DESC
                LIMIT 1
                """)
    return db.execute(query).mappings().first()


def get_coldest_record(db: Session):
    query = text("""
                SELECT
                    record_date AS date, MIN(low_temp) AS min_temp
                FROM
                    weather
                GROUP BY
                    record_date
                ORDER BY
                    MIN(low_temp) ASC
                LIMIT 1
                """)
    return db.execute(query).mappings().first()


def get_latest_record(db: Session):
    query = text("""
                SELECT
                    record_date AS date, avg_temp, hi_temp, low_temp
                FROM
                    weather
                ORDER BY
                    record_date DESC
                LIMIT 1
                """)
    return db.execute(query).mappings().first()
# =======================================================
# Rainfall
# =======================================================
def get_rainfall_by_year(db: Session):
    query = text("""
                SELECT
                    TO_CHAR(record_date, 'YYYY') AS date,
                    ROUND(SUM(rain)::NUMERIC,2) AS total_rain
                FROM
                    weather
                GROUP BY
                    date
                ORDER BY
                    date ASC
                """)
    return db.execute(query).mappings().all()


def get_rainfall_by_year_month(db: Session):
    query = text("""
                SELECT
                    TO_CHAR(record_date, 'YYYY-MM') AS date,
                    ROUND(SUM(rain)::NUMERIC,2) AS total_rain
                FROM
                    weather
                GROUP BY
                    date
                ORDER BY
                    date ASC
                """)
    return db.execute(query).mappings().all()


def get_rainy_days(db: Session):
    query = text("""
                SELECT
                    record_date::date AS date,
                    ROUND(SUM(rain)::NUMERIC,1) AS total_rainfall
                FROM
                    weather
                GROUP BY
                    date
                HAVING
                    ROUND(SUM(rain)::NUMERIC,1) > 2.5
                ORDER BY
                    date ASC
                """)
    return db.execute(query).mappings().all()


# =======================================================
# Humidity
# =======================================================
def get_humidity_by_year(db: Session):
    query = text("""
                SELECT
                    TO_CHAR(record_date, 'YYYY') AS date,
                    ROUND(AVG(out_hum)::NUMERIC,1) AS avg_humidity
                FROM
                    weather
                GROUP BY
                    date
                ORDER BY
                    date ASC
                """)
    return db.execute(query).mappings().all()


def get_humidity_by_year_month(db: Session):
    query = text("""
                SELECT
                    TO_CHAR(record_date, 'YYYY-MM') AS date,
                    ROUND(AVG(out_hum)::NUMERIC,1) AS avg_humidity
                FROM
                    weather
                GROUP BY
                    date
                ORDER BY
                    date ASC
                """)
    return db.execute(query).mappings().all()


def get_humidity_by_year_month_day(db: Session):
    query = text("""
                SELECT
                    record_date::date AS date,
                    ROUND(AVG(out_hum)::NUMERIC,1) AS avg_humidity
                FROM
                    weather
                GROUP BY
                    date
                ORDER BY
                    date ASC
                """)
    return db.execute(query).mappings().all()


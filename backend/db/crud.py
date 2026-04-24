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
                                record_date TIMESTAMP PRIMARY KEY,
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
                                arc_int SMALLINT
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
                            ON CONFLICT (record_date) DO NOTHING;
                            """)
            inserted_count = cursor.rowcount
        db.commit()
        return {"success": True, "inserted_count": inserted_count}
    except psycopg.errors.Error as e:
        db.rollback()
        return {"success": False, "error": e.__class__.__name__}


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


def get_last_12_hours_temperatures(db: Session):
    query = text("""
                WITH timestamps AS (
                    SELECT
                        record_date - INTERVAL '12 hours' AS begin_12hrs,
                        record_date AS end_12hrs
                    FROM weather
                    ORDER BY record_date DESC
                    LIMIT 1
                ),
                temps_last_12hrs AS (
                    SELECT record_date AS date, avg_temp AS avg, hi_temp AS max, low_temp AS min
                    FROM weather
                    CROSS JOIN timestamps ts
                    WHERE record_date >= ts.begin_12hrs AND record_date <= ts.end_12hrs
                    ORDER BY record_date DESC
                )
                SELECT * FROM temps_last_12hrs ORDER BY date ASC
                """)
    return db.execute(query).mappings().all()


def get_last_24_hours_temperatures(db: Session):
    query = text("""
                WITH timestamps AS (
                    SELECT
                        record_date - INTERVAL '1 day' AS begin_24hrs,
                        record_date AS end_24hrs
                    FROM weather
                    ORDER BY record_date DESC
                    LIMIT 1
                ),
                temps_last_24hrs AS (
                    SELECT record_date AS date, avg_temp AS avg, hi_temp AS max, low_temp AS min
                    FROM weather
                    CROSS JOIN timestamps ts
                    WHERE record_date >= ts.begin_24hrs AND record_date <= ts.end_24hrs
                    ORDER BY record_date DESC
                )
                SELECT * FROM temps_last_24hrs ORDER BY date ASC
                """)
    return db.execute(query).mappings().all()


def get_last_week_temperatures(db: Session):
    query = text("""
                WITH last_week_stats AS (
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
                        date DESC
                    LIMIT 7
                    OFFSET 1
                )
                SELECT *
                FROM last_week_stats
                ORDER BY date ASC
                """)
    return db.execute(query).mappings().all()


def get_last_30_days_temperatures(db: Session):
    query = text("""
                WITH last_30_days_stats AS (
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
                        date DESC
                    LIMIT 30
                    OFFSET 1
                )
                SELECT *
                FROM last_30_days_stats
                ORDER BY date ASC
                """)
    return db.execute(query).mappings().all()


def get_amount_hot_cold_days_last_week(db: Session):
    query = text("""
                WITH last_week_stats AS (
                    SELECT
                        DATE(record_date) AS date,
                        ROUND(AVG(avg_temp)::NUMERIC,1) AS avg_temp,
                        MAX(hi_temp) AS max_temp,
                        MIN(low_temp) AS min_temp
                    FROM
                        weather
                    GROUP BY
                        date
                    ORDER BY
                        date DESC
                    LIMIT 7
                    OFFSET 1
                )
                SELECT
                    COUNT(*) FILTER (WHERE max_temp >= 33) AS hot_days,
                    COUNT(*) FILTER (WHERE max_temp < 12) AS cold_days
                FROM last_week_stats
                """)
    return db.execute(query).mappings().first()


def get_amount_hot_cold_days_last_30_days(db: Session):
    query = text("""
                WITH last_30_days_stats AS (
                    SELECT
                        DATE(record_date) AS date,
                        ROUND(AVG(avg_temp)::NUMERIC,1) AS avg_temp,
                        MAX(hi_temp) AS max_temp,
                        MIN(low_temp) AS min_temp
                    FROM
                        weather
                    GROUP BY
                        date
                    ORDER BY
                        date DESC
                    LIMIT 30
                    OFFSET 1
                )
                SELECT
                    COUNT(*) FILTER (WHERE max_temp >= 33) AS hot_days,
                    COUNT(*) FILTER (WHERE max_temp < 12) AS cold_days
                FROM last_30_days_stats
                """)
    return db.execute(query).mappings().first()


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


def get_latest_max_min(db: Session):
    query = text("""
                WITH current_day AS (
                    SELECT MAX(record_date)::date AS last_day
                    FROM weather
                ),
                this_day_max AS (
                    SELECT
                        w.record_date,
                        MAX(w.hi_temp)
                    FROM
                        weather w
                    CROSS JOIN current_day cd
                    WHERE w.record_date >= cd.last_day AND w.record_date < (cd.last_day + INTERVAL '1 day')
                    GROUP BY w.record_date
                    ORDER BY max DESC, w.record_date ASC
                    LIMIT 1
                ),
                this_day_min AS (
                    SELECT
                        w.record_date,
                        MIN(w.low_temp)
                    FROM
                        weather w
                    CROSS JOIN current_day cd
                    WHERE w.record_date >= cd.last_day AND w.record_date < (cd.last_day + INTERVAL '1 day')
                    GROUP BY w.record_date
                    ORDER BY min ASC, w.record_date ASC
                    LIMIT 1
                )
                SELECT
                    this_day_max.record_date AS date_max,
                    this_day_max.max AS max,
                    this_day_min.record_date AS date_min,
                    this_day_min.min AS min
                FROM
                    this_day_max
                CROSS JOIN this_day_min
            """)
    return db.execute(query).mappings().first()


def get_frosts(db: Session):
    """
    Identifies continuous periods of frost (low_temp < 0) and obtains the start and end dates of those events, the duration and the minimum
    temperature reached during that time frame. Only events that lasted 15 minutes or more are included.
    """
    query = text("""
                WITH frost_markers AS (
                    SELECT 
                        record_date,
                        low_temp,
                        -- Check if current row is frost
                        CASE WHEN low_temp < 0 THEN 1 ELSE 0 END AS is_frost,
                        -- Check if the PREVIOUS row was frost
                        LAG(CASE WHEN low_temp < 0 THEN 1 ELSE 0 END) OVER (ORDER BY record_date) AS prev_is_frost,
                        -- Check the time gap between rows
                        LAG(record_date) OVER (ORDER BY record_date) AS prev_date
                    FROM weather
                ),
                frost_islands AS (
                    SELECT 
                        *,
                        -- Increment group ID if:
                        -- 1. Status changed (frost to no-frost)
                        -- 2. OR the gap between timestamps is > 1 hour
                        SUM(CASE 
                            WHEN is_frost != prev_is_frost THEN 1 
                            WHEN record_date - prev_date > INTERVAL '1 hour' THEN 1
                            ELSE 0 
                        END) OVER (ORDER BY record_date) AS island_id
                    FROM frost_markers
                )
                SELECT 
                    MIN(record_date) AS frost_start,
                    MAX(record_date) AS frost_end,
                    MAX(record_date) - MIN(record_date) AS duration,
                    MIN(low_temp) AS min_temp_reached
                FROM frost_islands
                WHERE is_frost = 1
                GROUP BY island_id
                HAVING MAX(record_date) - MIN(record_date) >= INTERVAL '15 minutes'
                ORDER BY frost_start ASC;
                """)
    return db.execute(query).mappings().all()


def get_latest_frost(db: Session):
    query = text("""
                WITH frost_markers AS (
                    SELECT 
                        record_date,
                        low_temp,
                        -- Check if current row meets frost threshold
                        CASE WHEN low_temp < 0 THEN 1 ELSE 0 END AS is_frost,
                        -- Check if the PREVIOUS row was in a frost
                        LAG(CASE WHEN low_temp < 0 THEN 1 ELSE 0 END) OVER (ORDER BY record_date) AS prev_is_frost,
                        -- Check the time gap between rows
                        LAG(record_date) OVER (ORDER BY record_date) AS prev_date
                    FROM weather
                ),
                frost_islands AS (
                    SELECT 
                        *,
                        -- Increment group ID if:
                        -- 1. Status changed (frost -> no frost or vice versa)
                        -- 2. OR there is a data gap larger than 1 hour
                        SUM(CASE 
                            WHEN is_frost != prev_is_frost THEN 1 
                            WHEN record_date - prev_date > INTERVAL '1 hour' THEN 1
                            ELSE 0 
                        END) OVER (ORDER BY record_date) AS island_id
                    FROM frost_markers
                )
                SELECT 
                    MIN(record_date) AS frost_start,
                    MAX(record_date) AS frost_end,
                    MAX(record_date) - MIN(record_date) AS duration,
                    MIN(low_temp) AS min_temp_reached
                FROM frost_islands
                WHERE is_frost = 1
                GROUP BY island_id
                HAVING MAX(record_date) - MIN(record_date) >= INTERVAL '15 minutes'
                ORDER BY frost_start DESC
                LIMIT 1;
                """)
    return db.execute(query).mappings().first()


def get_longest_frost(db: Session):
    query = text("""
                WITH frost_markers AS (
                    SELECT 
                        record_date,
                        low_temp,
                        -- Check if current row is frost
                        CASE WHEN low_temp < 0 THEN 1 ELSE 0 END AS is_frost,
                        -- Check if the PREVIOUS row was frost
                        LAG(CASE WHEN low_temp < 0 THEN 1 ELSE 0 END) OVER (ORDER BY record_date) AS prev_is_frost,
                        -- Check the time gap between rows
                        LAG(record_date) OVER (ORDER BY record_date) AS prev_date
                    FROM weather
                ),
                frost_islands AS (
                    SELECT 
                        *,
                        -- Increment group ID if:
                        -- 1. Status changed (frost to no-frost)
                        -- 2. OR the gap between timestamps is > 1 hour
                        SUM(CASE 
                            WHEN is_frost != prev_is_frost THEN 1 
                            WHEN record_date - prev_date > INTERVAL '1 hour' THEN 1
                            ELSE 0 
                        END) OVER (ORDER BY record_date) AS island_id
                    FROM frost_markers
                )
                SELECT 
                    MIN(record_date) AS frost_start,
                    MAX(record_date) AS frost_end,
                    MAX(record_date) - MIN(record_date) AS duration,
                    MIN(low_temp) AS min_temp_reached
                FROM frost_islands
                WHERE is_frost = 1
                GROUP BY island_id
                HAVING MAX(record_date) - MIN(record_date) >= INTERVAL '15 minutes'
                ORDER BY duration DESC
                LIMIT 1;
                 """)
    return db.execute(query).mappings().first()


def get_heatwaves(db: Session):
    query = text("""
                WITH heat_markers AS (
                    SELECT 
                        record_date,
                        hi_temp,
                        -- Check if current row meets heatwave threshold
                        CASE WHEN hi_temp >= 33 THEN 1 ELSE 0 END AS is_heatwave,
                        -- Check if the PREVIOUS row was in a heatwave
                        LAG(CASE WHEN hi_temp >= 33 THEN 1 ELSE 0 END) OVER (ORDER BY record_date) AS prev_is_heatwave,
                        -- Check the time gap between rows
                        LAG(record_date) OVER (ORDER BY record_date) AS prev_date
                    FROM weather
                ),
                heat_islands AS (
                    SELECT 
                        *,
                        -- Increment group ID if:
                        -- 1. Status changed (Hot -> Not Hot or vice versa)
                        -- 2. OR there is a data gap larger than 1 hour
                        SUM(CASE 
                            WHEN is_heatwave != prev_is_heatwave THEN 1 
                            WHEN record_date - prev_date > INTERVAL '1 hour' THEN 1
                            ELSE 0 
                        END) OVER (ORDER BY record_date) AS island_id
                    FROM heat_markers
                )
                SELECT 
                    MIN(record_date) AS heatwave_start,
                    MAX(record_date) AS heatwave_end,
                    MAX(record_date) - MIN(record_date) AS duration,
                    MAX(hi_temp) AS max_temp_reached
                FROM heat_islands
                WHERE is_heatwave = 1
                GROUP BY island_id
                HAVING MAX(record_date) - MIN(record_date) >= INTERVAL '15 minutes'
                ORDER BY heatwave_start ASC;
                """)
    return db.execute(query).mappings().all()


def get_latest_heatwave(db: Session):
    query = text("""
                WITH heat_markers AS (
                    SELECT 
                        record_date,
                        hi_temp,
                        -- Check if current row meets heatwave threshold
                        CASE WHEN hi_temp >= 33 THEN 1 ELSE 0 END AS is_heatwave,
                        -- Check if the PREVIOUS row was in a heatwave
                        LAG(CASE WHEN hi_temp >= 33 THEN 1 ELSE 0 END) OVER (ORDER BY record_date) AS prev_is_heatwave,
                        -- Check the time gap between rows
                        LAG(record_date) OVER (ORDER BY record_date) AS prev_date
                    FROM weather
                ),
                heat_islands AS (
                    SELECT 
                        *,
                        -- Increment group ID if:
                        -- 1. Status changed (Hot -> Not Hot or vice versa)
                        -- 2. OR there is a data gap larger than 1 hour
                        SUM(CASE 
                            WHEN is_heatwave != prev_is_heatwave THEN 1 
                            WHEN record_date - prev_date > INTERVAL '1 hour' THEN 1
                            ELSE 0 
                        END) OVER (ORDER BY record_date) AS island_id
                    FROM heat_markers
                )
                SELECT 
                    MIN(record_date) AS heatwave_start,
                    MAX(record_date) AS heatwave_end,
                    MAX(record_date) - MIN(record_date) AS duration,
                    MAX(hi_temp) AS max_temp_reached
                FROM heat_islands
                WHERE is_heatwave = 1
                GROUP BY island_id
                HAVING MAX(record_date) - MIN(record_date) >= INTERVAL '15 minutes'
                ORDER BY heatwave_start DESC
                LIMIT 1;
                """)
    return db.execute(query).mappings().first()


def get_longest_heatwave(db: Session):
    query = text("""
                WITH heat_markers AS (
                    SELECT 
                        record_date,
                        hi_temp,
                        -- Check if current row meets heatwave threshold
                        CASE WHEN hi_temp >= 33 THEN 1 ELSE 0 END AS is_heatwave,
                        -- Check if the PREVIOUS row was in a heatwave
                        LAG(CASE WHEN hi_temp >= 33 THEN 1 ELSE 0 END) OVER (ORDER BY record_date) AS prev_is_heatwave,
                        -- Check the time gap between rows
                        LAG(record_date) OVER (ORDER BY record_date) AS prev_date
                    FROM weather
                ),
                heat_islands AS (
                    SELECT 
                        *,
                        -- Increment group ID if:
                        -- 1. Status changed (Hot -> Not Hot or vice versa)
                        -- 2. OR there is a data gap larger than 1 hour
                        SUM(CASE 
                            WHEN is_heatwave != prev_is_heatwave THEN 1 
                            WHEN record_date - prev_date > INTERVAL '1 hour' THEN 1
                            ELSE 0 
                        END) OVER (ORDER BY record_date) AS island_id
                    FROM heat_markers
                )
                SELECT 
                    MIN(record_date) AS heatwave_start,
                    MAX(record_date) AS heatwave_end,
                    MAX(record_date) - MIN(record_date) AS duration,
                    MAX(hi_temp) AS max_temp_reached
                FROM heat_islands
                WHERE is_heatwave = 1
                GROUP BY island_id
                HAVING MAX(record_date) - MIN(record_date) >= INTERVAL '15 minutes'
                ORDER BY duration DESC
                LIMIT 1;
                """)
    return db.execute(query).mappings().first()


def get_temperature_moving_avg_7_days(db: Session):
    query = text("""
                WITH last_30_days_stats AS (
                    SELECT
                        DATE(record_date) AS date,
                        ROUND(AVG(avg_temp)::NUMERIC,1) AS daily_avg,
                        ROUND(
                            AVG(AVG(avg_temp)) OVER (
                                ORDER BY DATE(record_date)
                                ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
                            )::NUMERIC,1) AS moving_avg
                    FROM
                        weather
                    GROUP BY
                        date
                    ORDER BY
                        date DESC
                    LIMIT 30
                    OFFSET 1
                )
                SELECT *
                FROM last_30_days_stats
                ORDER BY date ASC
                """)
    return db.execute(query).mappings().all()

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
            yearly_historical_hum AS (
                SELECT
                    EXTRACT(YEAR FROM record_date) AS date,
                    ROUND(AVG(out_hum)::NUMERIC,1) AS avg_hum
                FROM
                    weather
                GROUP BY
                    date
                ORDER BY
                    date ASC
            )
            SELECT
                yhh.date,
                yhh.avg_hum
            FROM
                yearly_total_records ytr
            LEFT JOIN
                yearly_historical_hum yhh ON ytr.date = yhh.date
            WHERE ytr.record_amount > 28000
                """)
    return db.execute(query).mappings().all()


def get_humidity_by_year_month(db: Session):
    query = text("""
                SELECT
                    TO_CHAR(record_date, 'YYYY-MM') AS date,
                    ROUND(AVG(out_hum)::NUMERIC,1) AS avg_hum
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
                    DATE(record_date) AS date,
                    ROUND(AVG(out_hum)::NUMERIC,1) AS avg_hum
                FROM
                    weather
                GROUP BY
                    date
                ORDER BY
                    date ASC
                """)
    return db.execute(query).mappings().all()


def get_humidity_last_24_hours(db: Session):
    query = text("""
                WITH latest_record AS (
                    SELECT
                        MAX(record_date) AS today,
                        MAX(record_date) - INTERVAL '1 day' AS yesterday
                    FROM
                        weather
                )
                SELECT
                    record_date AS date,
                    out_hum,
                    dew_pt
                FROM weather
                CROSS JOIN latest_record
                WHERE record_date >= yesterday AND record_date <= today
                ORDER BY record_date ASC
                 """)
    return db.execute(query).mappings().all()


def get_humidity_latest_record(db: Session):
    query = text("""
                SELECT
                    record_date AS date, out_hum AS humidity, dew_pt AS dew_point
                FROM
                    weather
                ORDER BY
                    record_date DESC
                LIMIT 1
                """)
    return db.execute(query).mappings().first()


def get_humidity_latest_max_min(db: Session):
    query = text("""
                WITH current_day AS (
                    SELECT
                        MAX(record_date)::date AS today
                    FROM
                        weather
                ),
                today_max_hum AS (
                    SELECT
                        record_date AS date_max,
                        MAX(out_hum) AS max_hum,
                        dew_pt AS max_dew_point
                    FROM
                        weather
                    CROSS JOIN
                        current_day
                    WHERE
                        DATE(record_date) = today
                    GROUP BY
                        record_date
                    ORDER BY
                        max_hum DESC
                    LIMIT 1
                ),
                today_min_hum AS (
                    SELECT
                        record_date AS date_min,
                        MIN(out_hum) AS min_hum,
                        dew_pt AS min_dew_point
                    FROM
                        weather
                    CROSS JOIN
                        current_day
                    WHERE
                        DATE(record_date) = today
                    GROUP BY
                        record_date
                    ORDER BY
                        min_hum ASC
                    LIMIT 1
                )
                SELECT
                    *
                FROM
                    today_max_hum
                CROSS JOIN
                    today_min_hum
                """)
    return db.execute(query).mappings().first()


# =======================================================
# Wind
# =======================================================

def get_latest_wind_stats(db: Session):
    query = text("""
                SELECT
                    record_date, wind_speed, wind_direction, wind_run, hi_speed, hi_dir
                FROM
                    weather
                ORDER BY
                    record_date DESC
                LIMIT 1
                """)
    return db.execute(query).mappings().first()

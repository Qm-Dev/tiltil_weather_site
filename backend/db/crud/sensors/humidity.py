from sqlalchemy.orm import Session
from sqlalchemy import text

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

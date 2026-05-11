from sqlalchemy.orm import Session
from sqlalchemy import text

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

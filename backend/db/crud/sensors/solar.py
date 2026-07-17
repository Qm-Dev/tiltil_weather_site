from sqlalchemy.orm import Session
from sqlalchemy import text

def get_solar_rad(db: Session, records: int = 1):
    if records <= 0:
        records = 1
    query = text(f"""
                SELECT
                    record_date, solar_rad
                FROM
                    weather
                ORDER BY
                    record_date DESC
                LIMIT {records}
                """)
    return db.execute(query).mappings().all() if records > 1 else db.execute(query).mappings().first()

def get_sunlight(db: Session, date: str, asc: bool = True):
    order_direction = "ASC" if asc else "DESC"
    query = text(f"""
                SELECT
                    record_date, solar_rad, hi_solar_rad
                FROM
                    weather
                WHERE
                    DATE(record_date) = :date AND (solar_rad > 0 OR hi_solar_rad > 0)
                ORDER BY
                    record_date {order_direction}
                """)
    return db.execute(query, {"date": date}).mappings().all()
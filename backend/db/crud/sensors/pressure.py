from sqlalchemy import text
from sqlalchemy.orm import Session

def get_latest_pressure_record(db: Session):
    query = text("""
                SELECT
                    record_date, bar
                FROM
                    weather
                ORDER BY
                    record_date DESC
                LIMIT 1
                """)
    return db.execute(query).mappings().first()
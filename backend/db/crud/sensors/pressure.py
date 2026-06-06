from sqlalchemy import text
from sqlalchemy.orm import Session
from db.models import WeatherRecord

def get_latest_pressure_record(db: Session):
    row = (
        db.query(
            WeatherRecord.record_date,
            WeatherRecord.bar
        )
        .order_by(WeatherRecord.record_date.desc())
        .first()
    )

    if row is None:
        return None
    return {
        "record_date": row.record_date,
        "bar": row.bar
    }
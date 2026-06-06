from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import SessionLocal
from db import crud

router = APIRouter(
    prefix="/humidity",
    tags=["💧 Humidity & Dew Point"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/historic/yearly")
def historical_yearly_average_humidity(db: Session = Depends(get_db)):
    """
    Returns the average humidity grouped by each year (ascending order) from the weather records.
    """
    return crud.get_humidity_by_year(db)

@router.get("/historic/monthly")
def historical_monthly_average_humidity(db: Session = Depends(get_db)):
    """
    Returns the average humidity grouped by each year and month (ascending order) from the weather records.
    """
    return crud.get_humidity_by_year_month(db)

@router.get("/historic/daily")
def historical_daily_average_humidity(db: Session = Depends(get_db)):
    """
    Returns the average humidity grouped by each year, month, and day (ascending order) from the weather records.
    """
    return crud.get_humidity_by_year_month_day(db)

@router.get("/historic/last_24_hours")
def historical_humidity_last_24_hours(db: Session = Depends(get_db)):
    """
    Returns the average humidity for the last 24 hours from the weather records.
    """
    return crud.get_humidity_last_24_hours(db)

@router.get("/latest_record")
def latest_humidity_record(db: Session = Depends(get_db)):
    """
    Returns the latest humidity record from the weather records.
    """
    return crud.get_humidity_latest_record(db)

@router.get("/latest_max_min")
def latest_humidity_max_min(db: Session = Depends(get_db)):
    """
    Returns the latest maximum and minimum humidity records (i.e the most recent day) from the weather records.
    """
    return crud.get_humidity_latest_max_min(db)

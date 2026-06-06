from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import SessionLocal
from db import crud

router = APIRouter(
    prefix="/temperature",
    tags=["🌡️ Temperature"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/historic/yearly")
def historical_yearly_temperatures(db: Session = Depends(get_db)):
    """
    Returns the average, maximum, and minimum temperatures grouped by each year (ascending order) from the weather records.
    """
    return crud.get_temperature_by_year(db)

@router.get("/historic/monthly")
def historical_monthly_temperatures(db: Session = Depends(get_db)):
    """
    Returns the average, maximum, and minimum temperatures grouped by each year and month (ascending order) from the weather records.
    """
    return crud.get_temperature_by_year_month(db)

@router.get("/historic/daily")
def historical_daily_temperatures(db: Session = Depends(get_db)):
    """
    Returns the average, maximum, and minimum temperatures grouped by each year, month, and day (ascending order) from the weather records.
    """
    return crud.get_temperature_by_year_month_day(db)

@router.get("/historic/last_12_hours")
def historical_last_12_hours_temperatures(db: Session = Depends(get_db)):
    """
    Returns the average, maximum, and minimum temperatures registered in the last 12 hours from the weather records.
    """
    return crud.get_last_12_hours_temperatures(db)

@router.get("/historic/last_24_hours")
def historical_last_24_hours_temperatures(db: Session = Depends(get_db)):
    """
    Returns the average, maximum, and minimum temperatures registered in the last 24 hours from the weather records.
    """
    return crud.get_last_24_hours_temperatures(db)

@router.get("/historic/last_week")
def historical_last_week_temperatures(db: Session = Depends(get_db)):
    """
    Returns the average, maximum, and minimum temperatures registered in the last 7 days from the weather records. Excludes the last day registered in the database.
    """
    return crud.get_last_week_temperatures(db)

@router.get("/historic/last_30_days")
def historical_last_30_days_temperatures(db: Session = Depends(get_db)):
    """
    Returns the average, maximum, and minimum temperatures registered in the last 30 days from the weather records. Excludes the last day registered in the database.
    """
    return crud.get_last_30_days_temperatures(db)

@router.get("/historic/anniversary_timestamp_comparison")
def temperature_anniversary_timestamp_comparison(db: Session = Depends(get_db)):
    """
    Returns the temperatures registered at the same timestamp (MM-DD HH:MM:00) across different years, taking the last entry in the database as a reference point.
    """
    return crud.get_temperature_anniversary_timestamp_comparison(db)

@router.get("/historic/hottest_record")
def hottest_temperature_record(db: Session = Depends(get_db)):
    """
    Returns the record with the highest temperature from the weather records.
    """
    return crud.get_hottest_record(db)

@router.get("/historic/coldest_record")
def coldest_temperature_record(db: Session = Depends(get_db)):
    """
    Returns the record with the lowest temperature from the weather records.
    """
    return crud.get_coldest_record(db)

@router.get("/latest_record")
def latest_temperature_record(db: Session = Depends(get_db)):
    """
    Returns the latest temperature record from the weather records.
    """
    return crud.get_latest_record(db)

@router.get("/latest_max_min")
def latest_max_min_temperature(db: Session = Depends(get_db)):
    """
    Returns the latest maximum and minimum temperature records from the day of the latest record.
    """
    return crud.get_latest_max_min(db)

@router.get("/frosts")
def frost_periods(db: Session = Depends(get_db)):
    """
    Returns continuous periods of frost (low_temp <= 0) including the start and end dates, duration, and minimum temperature reached during those periods.
    """
    return crud.get_frosts(db)

@router.get("/frosts/latest")
def latest_frost_period(db: Session = Depends(get_db)):
    """
    Returns the latest continuous period of frost (low_temp <= 0) including the start and end dates, duration, and minimum temperature reached during that period.
    """
    return crud.get_latest_frost(db)

@router.get("/frosts/longest")
def longest_frost_period(db: Session = Depends(get_db)):
    """
    Returns the longest continuous period of frost (low_temp <= 0) including the start and end dates, duration, and minimum temperature reached during that period.
    """
    return crud.get_longest_frost(db)

@router.get("/heatwaves")
def heatwave_periods(db: Session = Depends(get_db)):
    """
    Returns continuous periods of heatwave (hi_temp >= 25) including the start and end dates, duration, and maximum temperature reached during those periods.
    """
    return crud.get_heatwaves(db)

@router.get("/heatwaves/latest")
def latest_heatwave_period(db: Session = Depends(get_db)):
    """
    Returns the latest continuous period of heatwave (hi_temp >= 25) including the start and end dates, duration, and maximum temperature reached during that period.
    """
    return crud.get_latest_heatwave(db)

@router.get("/heatwaves/longest")
def longest_heatwave_period(db: Session = Depends(get_db)):
    """
    Returns the longest continuous period of heatwave (hi_temp >= 25) including the start and end dates, duration, and maximum temperature reached during that period.
    """
    return crud.get_longest_heatwave(db)

@router.get("/hot_cold_days/last_week")
def hot_cold_days_last_week(db: Session = Depends(get_db)):
    """
    Returns the number of hot and cold days in the last 7 days from the weather records.
    """
    return crud.get_amount_hot_cold_days_last_week(db)

@router.get("/hot_cold_days/last_30_days")
def hot_cold_days_last_30_days(db: Session = Depends(get_db)):
    """
    Returns the number of hot and cold days in the last 30 days from the weather records.
    """
    return crud.get_amount_hot_cold_days_last_30_days(db)

@router.get("/moving_average")
def temperature_moving_average(db: Session = Depends(get_db)):
    """
    Returns the simple moving average temperature for the last 30 days from the weather records. Window size of 7 days.
    The moving average is calculated inside the database with the help of Window Functions.
    """
    return crud.get_temperature_moving_avg_7_days(db)
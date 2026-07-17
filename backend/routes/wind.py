from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from db import crud

router = APIRouter(
    prefix="/wind",
    tags=["💨 Wind"]
)

@router.get("/latest_record")
def latest_wind_record(db: Session = Depends(get_db)):
    """
    Returns the latest wind record and their respective information.
    """
    return crud.get_latest_wind_stats(db)

@router.get("/historic/total_daily_wind_run")
def total_daily_wind_run(db: Session = Depends(get_db), asc: bool = False):
    """
    Returns the historical total "amount" of wind that passed through the station per day.

    By default, the endpoint returns the records ordered by date in descending order.
    """
    return crud.get_total_daily_wind_run(db, asc)

@router.get("/historic/windiest_days")
def windiest_days(db: Session = Depends(get_db), days: int = 1):
    """
    Returns the windiest days recorded by the weather station.
    The windiest day is determined by the total 'amount' of wind that passed through the station that day, also known as Wind Run.

    By default, the endpoint returns the windiest day recorded.
    """
    return crud.get_windy_days(db, days)
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import SessionLocal
from db import crud
from datetime import date

router = APIRouter(
    prefix="/solar",
    tags=["☀️ Solar"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/latest")
def latest_solar_records(db: Session = Depends(get_db), record_amount: int = 1):
    """
    Returns the latest `record_amount` solar records reported by the weather station. By default, the endpoint will return the latest record.
    """
    return crud.get_solar_rad(db, record_amount)

@router.get("/sunlight")
def sunlight(db: Session = Depends(get_db), day: date = date.today(), asc: bool = True):
    """
    Returns the records where sunlight was reported (`solar_rad > 0` or `hi_solar_rad > 0`) during the specified day (YYYY-MM-DD).

    By default, it will return the records in ascending order.
    """
    sunlight_records = crud.get_sunlight(db, day, asc)
    if not sunlight_records:
        raise HTTPException(status_code=404, detail="There's no records available for this date.")
    return sunlight_records
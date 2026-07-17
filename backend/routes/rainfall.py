from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from db import crud

router = APIRouter(
    prefix="/rainfall",
    tags=["🌧️ Rainfall"]
)

@router.get("/historic/yearly")
def historical_rainfall_by_year(db: Session = Depends(get_db)):
    """
    Returns the total rainfall grouped by each year (ascending order) from the weather records.
    """
    return crud.get_rainfall_by_year(db)

@router.get("/historic/monthly")
def historical_rainfall_by_year_and_month(db: Session = Depends(get_db)):
    """
    Returns the total rainfall grouped by each year and month (ascending order) from the weather records.
    """
    return crud.get_rainfall_by_year_month(db)

@router.get("/rainy_days")
def rainy_days(db: Session = Depends(get_db)):
    """
    Returns the rainy days (days with total rainfall greater than 2.5mm) from the weather records.
    """
    return crud.get_rainy_days(db)
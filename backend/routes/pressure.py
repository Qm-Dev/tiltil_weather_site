from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from db import crud

router = APIRouter(
    prefix="/pressure",
    tags=["📈 Pressure"]
)

@router.get("/latest_record")
def latest_pressure_record(db: Session = Depends(get_db)):
    """
    Returns the latest pressure record.
    """
    return crud.get_latest_pressure_record(db)
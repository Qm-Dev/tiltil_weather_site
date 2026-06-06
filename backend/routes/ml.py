from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from db.database import SessionLocal
from db import crud

router = APIRouter(
    prefix="/ml",
    tags=["🤖 Machine Learning"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/avg_temp_pred")
def average_temperature_prediction(request: Request, db: Session = Depends(get_db)):
    model = getattr(request.app.state, "temp_predictor", None)
    
    if not model:
        raise HTTPException(status_code=503, detail="Prediction model is not loaded or unavailable.")
    
    features = crud.get_ml_avg_temp_features(db)
    if not features:
        raise HTTPException(status_code=400, detail="Not enough data to predict.")
    
    input_vector = [list(features.values())]
    next_record_date = input_vector[0][0]
    input_vector[0].pop(0)

    prediction = model.predict(input_vector)
    return {
        "next_record_date": next_record_date,
        "avg_temp_prediction": round(float(prediction[0]), 2)
    }
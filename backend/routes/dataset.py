from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session
from db.database import SessionLocal
from scripts.extract import extract_from_csv
from scripts.transform import clean_weather_data
from scripts.load import load_to_postgres
from datetime import datetime
import io

router = APIRouter(
    prefix="/weatherlink_dataset",
    tags=["📄 WeatherLink Dataset"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/db_import_weather_records")
async def import_weather_records(db: Session = Depends(get_db), records_file: UploadFile = File(...)):
    """
    Uploads weather records from the received file into the associated table in the database.
    The uploaded file will then be processed through an ETL pipeline to ensure data quality and consistency before being inserted into the database.
    """

    print(f"[ETL_WEATHER_RECORDS BEGIN | {datetime.now()}] Received file: {records_file.filename} ({records_file.content_type})")
    content = await records_file.read()
    df_raw = extract_from_csv(io.BytesIO(content))
    print(f"[ETL_WEATHER_RECORDS (1/3) | {datetime.now()}] Extracted {len(df_raw)} records from the uploaded file.")

    try:
        df_cleaned = clean_weather_data(df_raw)
        print(f"[ETL_WEATHER_RECORDS (2/3) | {datetime.now()}] Data has been cleaned.")
        result = load_to_postgres(db, df_cleaned)
        print(f"[ETL_WEATHER_RECORDS (3/3) | {datetime.now()}] Data has been loaded into the database.")

        if not result["success"]:
            raise HTTPException(status_code=500, detail=f"Error: {result['error']}")
        print(f"[ETL_WEATHER_RECORDS ENDED | {datetime.now()}] ETL process completed. Inserted {result['inserted_count']} records.")
        return {
            "message": "ETL process completed.",
            "inserted": result["inserted_count"]
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing data. ({str(e)})")
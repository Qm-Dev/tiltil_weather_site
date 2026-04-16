from fastapi import HTTPException, FastAPI, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from db.database import SessionLocal
from sqlalchemy.orm import Session
import db.crud as crud, os

tags_metadata = [
    {
        "name": "📄 WeatherLink Dataset",
        "description": "Operations related to the WeatherLink historical dataset.",
    },
    {
        "name": "🌡️ Temperature",
        "description": "Operations related to temperature data.",
    },
    {
        "name": "🌧️ Rainfall",
        "description": "Operations related to rainfall data.",
    },
    {
        "name": "💧 Humidity & Dew Point",
        "description": "Operations related to humidity and dew point data.",
    },
    {
        "name": "🤖 Machine Learning",
        "description": "Operations related to machine learning predictions.",
    },
    {
        "name": "⚠️ Weather Risk",
        "description": "Operations related to weather risk assessments.",
    }
]

#=======================================================
# FastAPI Application Setup
#=======================================================
app = FastAPI(
    title="🌵 TilTil Weather Data API",
    openapi_tags=tags_metadata
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL")],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"]
)
@app.get("/")
async def root():
    return {"message": "Welcome to the TilTil Weather Data API! Visit /docs for API documentation."}

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# =======================================================
# WeatherLink Dataset Endpoints
# =======================================================
@app.post("/weatherlink_dataset/db_import_weather_records", tags=["📄 WeatherLink Dataset"])
async def import_weather_records(db: Session = Depends(get_db), records_file: UploadFile = File(...)):
    """
    Uploads weather records from the CSV file to the associated table in the database.
    """
    if records_file.content_type != 'text/csv':
        raise HTTPException(status_code=400, detail="Invalid file type.")
    
    content = await records_file.read()

    if not content:
        raise HTTPException(status_code=400, detail="The uploaded file is empty.")
    
    text = content.decode('utf-8')

    if text == os.getenv("EXPECTED_CSV_HEADERS"):
        raise HTTPException(status_code=400, detail="The uploaded file contains only headers and no data.")

    headers = text.splitlines()[0]

    if headers != os.getenv("EXPECTED_CSV_HEADERS"):
        raise HTTPException(status_code=400, detail="Incorrect headers in the CSV file uploaded.")

    table_updated = crud.update_dataset_table(db, text)

    if table_updated["success"] is not True:
        raise HTTPException(status_code=500, detail=f"Failed to upload records into the database ({table_updated['error']}).")
    
    if table_updated["inserted_count"] == 0:
        raise HTTPException(status_code=200, detail="No new records were inserted into the database (all records in the file already exist in the database).")

    return {"message": "Weather records imported successfully into the database.",
            "inserted_count": table_updated["inserted_count"]
    }

# =======================================================
# Temperature Endpoints
# =======================================================
@app.get("/temperature/historic/yearly", tags=["🌡️ Temperature"])
def historical_yearly_temperatures(db: Session = Depends(get_db)):
    """
    Returns the average, maximum, and minimum temperatures grouped by each year (ascending order) from the weather records.
    """
    return crud.get_temperature_by_year(db)

@app.get("/temperature/historic/monthly", tags=["🌡️ Temperature"])
def historical_monthly_temperatures(db: Session = Depends(get_db)):
    """
    Returns the average, maximum, and minimum temperatures grouped by each year and month (ascending order) from the weather records.
    """
    return crud.get_temperature_by_year_month(db)

@app.get("/temperature/historic/daily", tags=["🌡️ Temperature"])
def historical_daily_temperatures(db: Session = Depends(get_db)):
    """
    Returns the average, maximum, and minimum temperatures grouped by each year, month, and day (ascending order) from the weather records.
    """
    return crud.get_temperature_by_year_month_day(db)

@app.get("/temperature/historic/last_12_hours", tags=["🌡️ Temperature"])
def historical_last_12_hours_temperatures(db: Session = Depends(get_db)):
    """
    Returns the average, maximum, and minimum temperatures registered in the last 12 hours from the weather records.
    """
    return crud.get_last_12_hours_temperatures(db)

@app.get("/temperature/historic/last_24_hours", tags=["🌡️ Temperature"])
def historical_last_24_hours_temperatures(db: Session = Depends(get_db)):
    """
    Returns the average, maximum, and minimum temperatures registered in the last 24 hours from the weather records.
    """
    return crud.get_last_24_hours_temperatures(db)

@app.get("/temperature/historic/last_week", tags=["🌡️ Temperature"])
def historical_last_week_temperatures(db: Session = Depends(get_db)):
    """
    Returns the average, maximum, and minimum temperatures registered in the last 7 days from the weather records. Excludes the last day registered in the database.
    """
    return crud.get_last_week_temperatures(db)

@app.get("/temperature/historic/last_30_days", tags=["🌡️ Temperature"])
def historical_last_30_days_temperatures(db: Session = Depends(get_db)):
    """
    Returns the average, maximum, and minimum temperatures registered in the last 30 days from the weather records. Excludes the last day registered in the database.
    """
    return crud.get_last_30_days_temperatures(db)

@app.get("/temperature/historic/anniversary_timestamp_comparison", tags=["🌡️ Temperature"])
def temperature_anniversary_timestamp_comparison(db: Session = Depends(get_db)):
    """
    Returns the temperatures registered at the same timestamp (MM-DD HH:MM:00) across different years, taking the last entry in the database as a reference point.
    """
    return crud.get_temperature_anniversary_timestamp_comparison(db)

@app.get("/temperature/historic/hottest_record", tags=["🌡️ Temperature"])
def hottest_temperature_record(db: Session = Depends(get_db)):
    """
    Returns the record with the highest temperature from the weather records.
    """
    return crud.get_hottest_record(db)

@app.get("/temperature/historic/coldest_record", tags=["🌡️ Temperature"])
def coldest_temperature_record(db: Session = Depends(get_db)):
    """
    Returns the record with the lowest temperature from the weather records.
    """
    return crud.get_coldest_record(db)

@app.get("/temperature/latest_record", tags=["🌡️ Temperature"])
def latest_temperature_record(db: Session = Depends(get_db)):
    """
    Returns the latest temperature record from the weather records.
    """
    return crud.get_latest_record(db)

@app.get("/temperature/latest_max_min", tags=["🌡️ Temperature"])
def latest_max_min_temperature(db: Session = Depends(get_db)):
    """
    Returns the latest maximum and minimum temperature records from the day of the latest record.
    """
    return crud.get_latest_max_min(db)

@app.get("/temperature/frosts", tags=["🌡️ Temperature"])
def frost_periods(db: Session = Depends(get_db)):
    """
    Returns continuous periods of frost (low_temp <= 0) including the start and end dates, duration, and minimum temperature reached during those periods.
    """
    return crud.get_frosts(db)

@app.get("/temperature/frosts/latest", tags=["🌡️ Temperature"])
def latest_frost_period(db: Session = Depends(get_db)):
    """
    Returns the latest continuous period of frost (low_temp <= 0) including the start and end dates, duration, and minimum temperature reached during that period.
    """
    return crud.get_latest_frost(db)

@app.get("/temperature/frosts/longest", tags=["🌡️ Temperature"])
def longest_frost_period(db: Session = Depends(get_db)):
    """
    Returns the longest continuous period of frost (low_temp <= 0) including the start and end dates, duration, and minimum temperature reached during that period.
    """
    return crud.get_longest_frost(db)

@app.get("/temperature/heatwaves", tags=["🌡️ Temperature"])
def heatwave_periods(db: Session = Depends(get_db)):
    """
    Returns continuous periods of heatwave (hi_temp >= 25) including the start and end dates, duration, and maximum temperature reached during those periods.
    """
    return crud.get_heatwaves(db)

@app.get("/temperature/heatwaves/latest", tags=["🌡️ Temperature"])
def latest_heatwave_period(db: Session = Depends(get_db)):
    """
    Returns the latest continuous period of heatwave (hi_temp >= 25) including the start and end dates, duration, and maximum temperature reached during that period.
    """
    return crud.get_latest_heatwave(db)

@app.get("/temperature/heatwaves/longest", tags=["🌡️ Temperature"])
def longest_heatwave_period(db: Session = Depends(get_db)):
    """
    Returns the longest continuous period of heatwave (hi_temp >= 25) including the start and end dates, duration, and maximum temperature reached during that period.
    """
    return crud.get_longest_heatwave(db)

@app.get("/temperature/hot_cold_days/last_week", tags=["🌡️ Temperature"])
def hot_cold_days_last_week(db: Session = Depends(get_db)):
    """
    Returns the number of hot and cold days in the last 7 days from the weather records.
    """
    return crud.get_amount_hot_cold_days_last_week(db)

@app.get("/temperature/hot_cold_days/last_30_days", tags=["🌡️ Temperature"])
def hot_cold_days_last_30_days(db: Session = Depends(get_db)):
    """
    Returns the number of hot and cold days in the last 30 days from the weather records.
    """
    return crud.get_amount_hot_cold_days_last_30_days(db)

@app.get("/temperature/moving_average", tags=["🌡️ Temperature"])
def temperature_moving_average(db: Session = Depends(get_db)):
    """
    Returns the simple moving average temperature for the last 30 days from the weather records. Window size of 7 days.
    The moving average is calculated inside the database with the help of Window Functions.
    """
    return crud.get_temperature_moving_avg_7_days(db)

# =======================================================
# Rainfall Endpoints
# =======================================================
@app.get("/rainfall/historic/yearly", tags=["🌧️ Rainfall"])
def historical_rainfall_by_year(db: Session = Depends(get_db)):
    """
    Returns the total rainfall grouped by each year (ascending order) from the weather records.
    """
    return crud.get_rainfall_by_year(db)

@app.get("/rainfall/historic/monthly", tags=["🌧️ Rainfall"])
def historical_rainfall_by_year_and_month(db: Session = Depends(get_db)):
    """
    Returns the total rainfall grouped by each year and month (ascending order) from the weather records.
    """
    return crud.get_rainfall_by_year_month(db)

@app.get("/rainfall/rainy_days", tags=["🌧️ Rainfall"])
def rainy_days(db: Session = Depends(get_db)):
    """
    Returns the rainy days (days with total rainfall greater than 2.5mm) from the weather records.
    """
    return crud.get_rainy_days(db)


# =======================================================
# Humidity Endpoints
# =======================================================
@app.get("/humidity/historic/yearly", tags=["💧 Humidity & Dew Point"])
def historical_yearly_average_humidity(db: Session = Depends(get_db)):
    """
    Returns the average humidity grouped by each year (ascending order) from the weather records.
    """
    return crud.get_humidity_by_year(db)

@app.get("/humidity/historic/monthly", tags=["💧 Humidity & Dew Point"])
def historical_monthly_average_humidity(db: Session = Depends(get_db)):
    """
    Returns the average humidity grouped by each year and month (ascending order) from the weather records.
    """
    return crud.get_humidity_by_year_month(db)

@app.get("/humidity/historic/daily", tags=["💧 Humidity & Dew Point"])
def historical_daily_average_humidity(db: Session = Depends(get_db)):
    """
    Returns the average humidity grouped by each year, month, and day (ascending order) from the weather records.
    """
    return crud.get_humidity_by_year_month_day(db)

@app.get("/humidity/historic/last_24_hours", tags=["💧 Humidity & Dew Point"])
def historical_humidity_last_24_hours(db: Session = Depends(get_db)):
    """
    Returns the average humidity for the last 24 hours from the weather records.
    """
    return crud.get_humidity_last_24_hours(db)

@app.get("/humidity/latest_record", tags=["💧 Humidity & Dew Point"])
def latest_humidity_record(db: Session = Depends(get_db)):
    """
    Returns the latest humidity record from the weather records.
    """
    return crud.get_humidity_latest_record(db)

@app.get("/humidity/latest_max_min", tags=["💧 Humidity & Dew Point"])
def latest_humidity_max_min(db: Session = Depends(get_db)):
    """
    Returns the latest maximum and minimum humidity records (i.e the most recent day) from the weather records.
    """
    return crud.get_humidity_latest_max_min(db)
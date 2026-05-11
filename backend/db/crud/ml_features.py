from sqlalchemy import text
from sqlalchemy.orm import Session

def get_ml_avg_temp_features(db: Session):
    query = text("""
                SELECT
                    record_date + INTERVAL '15 min' AS next_record_date,
                    avg_temp,
                    out_hum,
                    dew_pt,
                    wind_speed,
                    hi_speed,
                    bar,
                    solar_rad,
                    hi_solar_rad,
                    COS(2*PI()*(EXTRACT(MONTH FROM record_date)-1)/12) AS month_cos,
                    COS(2*PI()*(EXTRACT(DOY FROM record_date)-1)/365.25) AS day_cos,
                    COS(2*PI()*(EXTRACT(HOUR FROM record_date)+EXTRACT(MINUTE FROM record_date)/60)/24) AS time_sin
                FROM
                    weather
                ORDER BY
                    record_date DESC
                LIMIT 1
                """)
    return db.execute(query).mappings().first()
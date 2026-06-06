from sqlalchemy import text
from sqlalchemy.orm import Session

def get_ml_avg_temp_features(db: Session):
    """
    The query will return the latest row in the database with the columns (features) needed to make predictions with the ML models available.

    The first column is part of the label. It is not used by the model.
    """
    query = text("""
                WITH last_hour_stats AS (
                    SELECT
                        record_date AS date,
                        avg_temp,
                        ROUND(
                            AVG(avg_temp) OVER (
                                ORDER BY record_date
                                ROWS BETWEEN 3 PRECEDING AND CURRENT ROW
                            )::NUMERIC,3) AS moving_avg
                    FROM
                        weather
                    GROUP BY
                        date
                    ORDER BY
                        date DESC
                    OFFSET 1
                    LIMIT 1
                )
                SELECT
                    w.record_date + INTERVAL '15 min' AS next_record_date,
                    w.avg_temp,
                    w.out_hum,
                    w.dew_pt,
                    w.wind_speed,
                    w.hi_speed,
                    w.bar,
                    w.solar_rad,
                    w.hi_solar_rad,
                    COS(2*PI()*(EXTRACT(MONTH FROM w.record_date)-1)/12) AS month_cos,
                    COS(2*PI()*(EXTRACT(DOY FROM w.record_date)-1)/365.25) AS day_cos,
                    COS(2*PI()*(EXTRACT(HOUR FROM w.record_date)+EXTRACT(MINUTE FROM record_date)/60)/24) AS time_sin,
                    lhs.moving_avg::float AS previous_moving_avg
                FROM
                    weather w
                CROSS JOIN last_hour_stats lhs 
                ORDER BY
                    record_date DESC
                LIMIT 1
                """)
    return db.execute(query).mappings().first()
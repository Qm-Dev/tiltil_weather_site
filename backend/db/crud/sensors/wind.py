from sqlalchemy import text
from sqlalchemy.orm import Session

def get_latest_wind_stats(db: Session):
    query = text("""
                SELECT
                    record_date, wind_speed, wind_direction, wind_run, hi_speed, hi_dir
                FROM
                    weather
                ORDER BY
                    record_date DESC
                LIMIT 1
                """)
    return db.execute(query).mappings().first()


def get_total_daily_wind_run(db: Session, ascending: bool = True):
    order_direction = "ASC" if ascending else "DESC"
    query = text(f"""SELECT
                        DATE(record_date) AS record_date,
                        ROUND(SUM(wind_run)::NUMERIC,1) AS total_wind_run
                    FROM
                        weather
                    GROUP BY
                        DATE(record_date)
                    ORDER BY
                        DATE(record_date) {order_direction}
                """)
    return db.execute(query).mappings().all()

def get_windy_days(db: Session):
    query = text("""
                SELECT
                    DATE(record_date),
                    ROUND(AVG(wind_speed)::NUMERIC,2) AS avg_regular_speed,
                    MAX(wind_speed) AS max_regular_speed,
                    ROUND(AVG(hi_speed)::NUMERIC,2) AS avg_high_speed,
                    MAX(hi_speed) AS max_high_speed,
                    MAX(wind_direction) AS dom_wind_dir,
                    MAX(hi_dir) AS dom_hi_wind_dir,
                    ROUND(SUM(wind_run)::NUMERIC,1) AS total_wind_run
                FROM weather
                GROUP BY DATE(record_date)
                ORDER BY total_wind_run DESC
                LIMIT 1
                """)
    return db.execute(query).mappings().first()


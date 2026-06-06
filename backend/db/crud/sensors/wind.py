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

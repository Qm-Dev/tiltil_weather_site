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


def get_windy_days(db: Session, days: int = 1):
    """
    1st CTE: Obtains general metrics per day (speeds & wind run).

    2nd & 3rd CTEs: Counts how many times each direction occurs per day.
    """
    query = text(f"""
                WITH daily_stats AS (
                    SELECT
                        DATE(record_date) AS record_date,
                        ROUND(AVG(wind_speed)::NUMERIC, 2) AS avg_regular_speed,
                        MAX(wind_speed) AS max_regular_speed,
                        ROUND(AVG(hi_speed)::NUMERIC, 2) AS avg_high_speed,
                        MAX(hi_speed) AS max_high_speed,
                        ROUND(SUM(wind_run)::NUMERIC, 1) AS total_wind_run
                    FROM weather
                    GROUP BY DATE(record_date)
                ),
                wind_dir_counts AS (
                    SELECT
                        DATE(record_date) AS record_date,
                        wind_direction,
                        ROW_NUMBER() OVER (PARTITION BY DATE(record_date) ORDER BY COUNT(wind_direction) DESC) AS rank_dir
                    FROM weather
                    GROUP BY DATE(record_date), wind_direction
                ),
                hi_dir_counts AS (
                    SELECT
                        DATE(record_date) AS record_date,
                        hi_dir,
                        ROW_NUMBER() OVER (PARTITION BY DATE(record_date) ORDER BY COUNT(hi_dir) DESC) AS rank_hi_dir
                    FROM weather
                    WHERE hi_dir IS NOT NULL
                    GROUP BY DATE(record_date), hi_dir
                )
                SELECT
                    ds.record_date,
                    ds.avg_regular_speed,
                    ds.max_regular_speed,
                    ds.avg_high_speed,
                    ds.max_high_speed,
                    wd.wind_direction AS dom_wind_dir,
                    hd.hi_dir AS dom_hi_wind_dir,
                    ds.total_wind_run
                FROM daily_stats ds
                LEFT JOIN wind_dir_counts wd ON ds.record_date = wd.record_date AND wd.rank_dir = 1
                LEFT JOIN hi_dir_counts hd ON ds.record_date = hd.record_date AND hd.rank_hi_dir = 1
                ORDER BY ds.total_wind_run DESC
                LIMIT {days};
                """)
    return db.execute(query).mappings().all()


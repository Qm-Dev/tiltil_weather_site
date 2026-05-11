from sqlalchemy.orm import Session
import psycopg, os

EXPECTED_CSV_HEADERS = os.getenv("EXPECTED_CSV_HEADERS")
TABLE_CREATE_COLS = os.getenv("TABLE_CREATE_COLS")

def update_dataset_table(db: Session, csv_text: str) -> True | psycopg.errors.Error:
    conn = db.connection().connection
    try:
        with conn.cursor() as cursor:
            cursor.execute(f"""
                            CREATE TABLE IF NOT EXISTS weather ({TABLE_CREATE_COLS});""")
            cursor.execute(f"""
                            CREATE TEMP TABLE IF NOT EXISTS weather_stage AS
                            SELECT {EXPECTED_CSV_HEADERS}
                            FROM weather
                            WHERE false;                            
                            """)
            with cursor.copy(f"""
                            COPY weather_stage({EXPECTED_CSV_HEADERS})
                            FROM STDIN
                            WITH (FORMAT CSV, DELIMITER ',', HEADER, NULL '')
                            """) as copy:
                copy.write(csv_text)
            cursor.execute(f"""
                            INSERT INTO weather({EXPECTED_CSV_HEADERS})
                            SELECT *
                            FROM weather_stage
                            ON CONFLICT (record_date) DO NOTHING;
                            """)
            inserted_count = cursor.rowcount
        db.commit()
        return {"success": True, "inserted_count": inserted_count}
    except psycopg.errors.Error as e:
        db.rollback()
        return {"success": False, "error": e.__class__.__name__}
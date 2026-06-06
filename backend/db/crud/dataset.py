from __future__ import annotations
from sqlalchemy.orm import Session
import psycopg, os
from typing import Any
import time

EXPECTED_CSV_HEADERS = os.getenv("EXPECTED_CSV_HEADERS")
TABLE_CREATE_COLS = os.getenv("TABLE_CREATE_COLS")

def update_dataset_table(db: Session, csv_text: str) -> dict[str, Any]:
    conn = db.connection().connection
    try:
        with conn.cursor() as cursor:
            cursor.execute(f"""CREATE TABLE IF NOT EXISTS weather ({TABLE_CREATE_COLS});""")
            cursor.execute(f"""DROP TABLE IF EXISTS weather_stage; CREATE TEMP TABLE weather_stage AS SELECT * FROM weather WHERE FALSE;""")
            with cursor.copy(f"""COPY weather_stage({EXPECTED_CSV_HEADERS}) FROM STDIN WITH (FORMAT CSV, DELIMITER ',', HEADER, NULL '')""") as copy:
                copy.write(csv_text)
            cursor.execute(f"""INSERT INTO weather({EXPECTED_CSV_HEADERS}) SELECT * FROM weather_stage ON CONFLICT (record_date) DO NOTHING;""")
            inserted_count = cursor.rowcount
        db.commit()
        
        return {"success": True, "inserted_count": inserted_count}
    except psycopg.errors.Error as e:
        db.rollback()
        return {"success": False, "error": e.__class__.__name__}
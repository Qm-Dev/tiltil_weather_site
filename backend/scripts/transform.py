import pandas as pd
import numpy as np
import os

def clean_weather_data(df: pd.DataFrame) -> pd.DataFrame:
    # Datetime
    dt = pd.to_datetime(df["Date"] + " " + df["Time"], format="%d-%m-%y %H:%M")
    df.insert(0, "record_date", dt)
    df.drop(columns=["Date", "Time"], inplace=True)

    # Nulls
    df.replace(["---", "------"], np.nan, inplace=True)

    # Renaming
    original = os.getenv("CSV_ORIGINAL_HEADERS").split(",")
    original = [h for h in original if h not in ["Date", "Time"]]
    expected = os.getenv("EXPECTED_CSV_HEADERS").split(",")
    expected_mapping = [h for h in expected if h != "record_date"]
    mapping_dict = dict(zip(original, expected_mapping))
    
    df.rename(columns=mapping_dict, inplace=True)

    return df   
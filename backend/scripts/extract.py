import pandas as pd
import io, os

def extract_from_csv(file: str):
    headers_str = os.getenv("CSV_ORIGINAL_HEADERS")
    new_headers = headers_str.split(",")
    df = pd.read_csv(file, sep="\t", skiprows=[0,1], names=new_headers, low_memory=False)
    return df
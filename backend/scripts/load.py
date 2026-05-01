from db.crud import update_dataset_table
import pandas as pd
import io

def load_to_postgres(db_session, df: pd.DataFrame):
    output = io.StringIO()
    df.to_csv(output, index=False, header=True)
    csv_text = output.getvalue()

    return update_dataset_table(db_session, csv_text)
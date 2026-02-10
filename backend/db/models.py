from sqlalchemy import Column, Integer, String, DateTime, Float, SmallInteger
from database import Base

class WeatherRecord(Base):
    __tablename__ = "weather"

    id = Column(Integer, primary_key=True, index=True)
    record_date = Column(DateTime)
    avg_temp = Column(Float)
    hi_temp = Column(Float)
    low_temp = Column(Float)
    out_hum = Column(SmallInteger)
    dew_pt = Column(Float)
    wind_speed = Column(Float)
    wind_direction = Column(String)
    wind_run = Column(Float)
    hi_speed = Column(Float)
    hi_dir = Column(String)
    bar = Column(Float)
    rain = Column(Float)
    rain_rate = Column(Float)
    heat_dd = Column(Float)
    cool_dd = Column(Float)
    in_temp = Column(Float)
    in_hum = Column(SmallInteger)
    in_dew = Column(Float)
    in_emc = Column(Float)
    in_air_density = Column(Float)
    et = Column(Float)
    wind_samp = Column(Integer)
    wind_tx = Column(Integer)
    iss_recept = Column(Float)
    arc_int = Column(SmallInteger)
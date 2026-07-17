import os, pickle
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from routes import dataset, temperature, rainfall, humidity, wind, pressure, solar, ml

tags_metadata = [
    {"name": "📄 WeatherLink Dataset", "description": "Operations related to the WeatherLink historical dataset."},
    {"name": "🌡️ Temperature", "description": "Operations related to temperature data."},
    {"name": "🌧️ Rainfall", "description": "Operations related to rainfall data."},
    {"name": "💧 Humidity & Dew Point", "description": "Operations related to humidity and dew point data."},
    {"name": "💨 Wind", "description": "Operations related to wind data."},
    {"name": "📈 Pressure", "description": "Operations related to pressure data."},
    {"name": "☀️ Solar", "description": "Operations related to solar data."},
    {"name": "🤖 Machine Learning", "description": "Operations related to predictions with classic Machine Learning techniques."}
]

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    App's life cycle and resources.
    """
    path = "notebooks/ml_models/lr.pkl"
    try:
        with open(path, "rb") as f:
            app.state.temp_predictor = pickle.load(f)
            print(f"[API] ML model loaded successfully into application state.")
    except FileNotFoundError:
        print(f"[API] Error: Model not found in the provided path ({path}).")
        app.state.temp_predictor = None
        
    yield
    if hasattr(app.state, "temp_predictor"):
        del app.state.temp_predictor
    print(f"[API] ML resources cleared.")

app = FastAPI(
    title="🌵 TilTil Weather Data API",
    openapi_tags=tags_metadata,
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL")],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"]
)

# =======================================================
# Modularized Routers
# =======================================================
app.include_router(dataset.router)
app.include_router(temperature.router)
app.include_router(rainfall.router)
app.include_router(humidity.router)
app.include_router(wind.router)
app.include_router(pressure.router)
app.include_router(solar.router)
app.include_router(ml.router)

@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/docs")
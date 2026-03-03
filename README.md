# 🌥️ Til-Til Weather Forecast Website
This is a weather forecast website based on historical data made available by a private weather station located in the commune of Til-Til, Chacabuco Province, Santiago Metropolitan Region, Chile.

# 📄 Installation

## ⚙ Requirements
* Python 3.14+
* NodeJS 20.19+
* PostgreSQL 18+
> NodeJS 20.12+ may also be used, but we suggest using 20.19+ to prevent potential incompatibilities with Vite.

## 📦 Docker/Podman
**TBD**

## 💻 Local
1. Clone the repository.

2. Create the `.env` files in the `backend` and `frontend` directories. Follow the `.env.example` file contents.

3. Create and activate the virtual environment.

**Windows**
```powershell
python -m venv .venv
.venv/Scripts/Activate 
```
**macOS / Linux**
```bash
python -m venv .venv
source .venv/bin/activate
```

4. Install the required libraries and modules into the virtual environment.
```bash
pip install -r backend/requirements.txt
```

5. Install the dependencies in `frontend`
```bash
cd frontend
npm install
```

6. Run the services.

**Frontend** (`./frontend`)
```bash
npm run dev
```
**Backend** (`./backend`)
```bash
uvicorn api:app
```
> Head over to `/docs` to check the list of available endpoints.
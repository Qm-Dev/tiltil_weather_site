# 🌥️ Til-Til Weather Forecast Website
This is a weather forecast website based on historical data made available by a private weather station located in the commune of Til-Til, Chacabuco Province, Santiago Metropolitan Region, Chile.

# 📄 Installation

## ⚙ Requirements
* Python 3.14+
* NodeJS 20.19+
* PostgreSQL 18+
> NodeJS 20.12+ may also be used, but we suggest using 20.19+ to prevent potential incompatibilities with Vite.

## 📦 Docker (Production build)
1. Clone the repository.

2. Create the `.env.production` files. These environment files must be located at `backend` and `frontend` directories. Follow the `.env.example` file contents.

3. Open a new terminal and run the services with `docker compose up` or `docker compose up -d --build`. Wait for Docker to retrieve the images and build the containers.

4. You may check the status of the containers by executing `docker compose ps` inside the terminal, or with the Docker Desktop app.

> ⚠️ If you want to **stop and delete the current running containers,** use the command `docker compose down` in your terminal. You can also **delete all volumes, including the database** with the `-v` flag.


## 🛠️ Local (Development)
1. Clone the repository.

2. Create the `.env` files in the `backend` and `frontend` directories. Follow the `.env.example` file contents.

3. Create and activate the virtual environment.

🪟 **Windows**
```powershell
python -m venv .venv
.venv/Scripts/Activate 
```
🍎🐧 **macOS / Linux**
```bash
python -m venv .venv
source .venv/bin/activate
```

4. Install the required libraries and modules into the virtual environment.
```bash
pip install -r backend/requirements-dev.txt
```

5. Install the dependencies in `frontend`
```bash
cd frontend
npm install
```

6. Run the services.

🌐 **Frontend** (`./frontend`)
```bash
npm run dev
```
> Head over to `localhost:5173` to check the local deployment server.

🧠 **Backend** (`./backend`)
```bash
uvicorn api:app
```
> Head over to `/docs` to check the list of available endpoints.
# app/api.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database.DataBase import engine
from .database.models import Base
from .routers.Client import router as client_router
from .routers.Commande import router as commande_router
from .routers.GetDataFromDbByIA import router as get_data_router
from .routers.VoiceConvertByIA import router as voice_convert_router
from .routers.AIAssistance import router as ai_assistance_router

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

# Include the routers
app.include_router(client_router)
app.include_router(commande_router)
app.include_router(get_data_router)
app.include_router(voice_convert_router)
app.include_router(ai_assistance_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI app!"}

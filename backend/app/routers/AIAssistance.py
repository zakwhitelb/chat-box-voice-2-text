# backend/app/api.py
from fastapi import APIRouter, File, UploadFile, HTTPException
import os
from ..services.intelligence.AllService import AllService
from ..services.intelligence.AIServer import AIServer

router = APIRouter(prefix="/assistance")

@router.post("/audio", tags=["audio"])
async def convert_file(file: UploadFile = File(...)) -> dict:
    try:
        file_location = f"temp_files/{file.filename}"
        os.makedirs(os.path.dirname(file_location), exist_ok=True)

        # Using async write for UploadFile
        with open(file_location, "wb") as buffer:
            buffer.write(await file.read())

        # Convert the file voice to text and answer the questions in it
        converter = AllService(file_location)
        result = converter.Convert()

        return {"message": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File conversion failed: {str(e)}")

@router.post("/text", tags=["text"])
async def convert_file(message: str = "") -> dict:
    try:
        if not message:
            return {"message": 400}
        converter = AIServer()
        result = converter.Query(message)
        return {"message": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Assistance failed: {str(e)}")

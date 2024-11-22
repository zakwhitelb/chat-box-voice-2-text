# backend/app/api.py
from fastapi import APIRouter, File, UploadFile, HTTPException
import os
from ..services.intelligence.AllService import AllService
from ..services.intelligence.AIServer import AIServer

router = APIRouter(prefix="/text-ai-assistance")


@router.post("/", tags=["text"])
async def convert_file(text: str = "") -> dict:
    try:
        converter = AIServer()
        result = converter.Query(text)
        return {"message": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Assistance failed: {str(e)}")
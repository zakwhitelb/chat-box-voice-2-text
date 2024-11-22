from pydantic import BaseModel
from datetime import date

class CommandeCreate(BaseModel):
    price: int
    userId: int

class CommandeResponse(BaseModel):
    commandeId: int
    price: int
    userId: int
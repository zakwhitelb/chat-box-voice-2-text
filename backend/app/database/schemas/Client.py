# app/database/schemas/Client.py

from pydantic import BaseModel
from datetime import date

class ClientBase(BaseModel):
    userName: str
    password: str
    firstName: str
    lastName: str
    dateOfBirth: date
    primaryEmail: str

class ClientResponse(BaseModel):
    userName: str
    firstName: str
    lastName: str
    primaryEmail: str

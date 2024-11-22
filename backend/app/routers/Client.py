from fastapi import APIRouter, HTTPException, Depends
from typing import Annotated
from sqlalchemy.orm import Session
from sqlalchemy import text as sql_text 
from sqlalchemy.exc import SQLAlchemyError
from ..database.DataBase import SessionLocal
from ..database.models import Client as model
from ..database.schemas import Client as schema

router = APIRouter(
    prefix="/client",
)

# Dependency to get DB session
def get_db():
    db = None
    try:
        db = SessionLocal()
        yield db
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail="Database connection error")
    finally:
        if db is not None:
            db.close()

# Create DB session
db_dependency = Annotated[Session, Depends(get_db)]

@router.post("/", response_model=schema.ClientResponse)
def create_client(client: schema.ClientBase, db: db_dependency):
    db_client = model(
        userName=client.userName, 
        password=client.password,
        firstName=client.firstName,
        lastName=client.lastName,
        dateOfBirth=client.dateOfBirth,
        primaryEmail=client.primaryEmail
    )
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

@router.get("/{client_id}", response_model=schema.ClientResponse)
async def read_client(client_id: int, db: db_dependency):
    result = db.query(model).filter(model.userId == client_id).first()

    if not result:
        raise HTTPException(status_code=404, detail="Client not found")
    return result

@router.get("/all", response_model=list[schema.ClientResponse])
async def get_all_clients(db: db_dependency):
    result = db.execute(sql_text("SELECT * FROM client")).fetchall()

    if not result:
        raise HTTPException(status_code=404, detail="No clients found")

    clients = [
        {
            "id": row[0], 
            "userName": row[1],
            "password": row[2],
            "firstName": row[3],
            "lastName": row[4],
            "dateOfBirth": row[5],
            "primaryEmail": row[6]
        } for row in result
    ]

    return clients

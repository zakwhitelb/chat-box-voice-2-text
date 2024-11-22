from fastapi import APIRouter, HTTPException, Depends
from typing import Annotated
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from ..database.DataBase import SessionLocal
from ..database.models import Commande as model
from ..database.schemas import Commande as schema

router = APIRouter(
    prefix="/commande",
)

# Dependency to get DB session
def get_db():
    db = None
    try:
        db = SessionLocal()
        yield db
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail="Database connection error")
    finally:
        if db is not None:
            db.close()

# Create DB session
db_dependency = Annotated[Session, Depends(get_db)]

@router.post("/")
def create_commande(commande: schema.CommandeCreate, db: db_dependency):
    db_commande = schema.Commande(price=commande.price, userId=commande.userId)
    db.add(db_commande)
    db.commit()
    db.refresh(db_commande)
    return db_commande

# Get a specific commande by ID
@router.get("/{commande_id}", response_model=schema.CommandeResponse)
def read_commande(commande_id: int, db: db_dependency):
    db_commande = db.query(model.Commande).filter(model.Commande.commandeId == commande_id).first()
    
    if not db_commande:
        raise HTTPException(status_code=404, detail="Commande not found")
    
    return db_commande
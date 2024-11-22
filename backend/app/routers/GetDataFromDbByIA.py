from fastapi import APIRouter, HTTPException, Depends
from typing import Annotated
from sqlalchemy.orm import Session
from sqlalchemy import text as sql_text 
from sqlalchemy.exc import SQLAlchemyError
from ..services.intelligence.Text2Text import Text2Text
from ..database.DataBase import SessionLocal

router = APIRouter(
    prefix="/ai-tool",
)

# Dependency to get DB session
def get_db():
    db = None
    try:
        db = SessionLocal()
        yield db
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail="Database connection error : " + e.message)
    finally:
        if db is not None:
            db.close()

# Create DB session
db_dependency = Annotated[Session, Depends(get_db)]

@router.get("/{text}")
async def get_clients_by_dateOfBirth_ai(text: str, db: db_dependency):

    # Store the SQL code in a variable
    sql_code = """
    BEGIN;

    CREATE TABLE IF NOT EXISTS public.client
    (
        "userId" serial NOT NULL,
        "userName" character varying COLLATE pg_catalog."default" NOT NULL,
        password character varying COLLATE pg_catalog."default" NOT NULL,
        "firstName" character varying COLLATE pg_catalog."default" NOT NULL,
        "lastName" character varying COLLATE pg_catalog."default" NOT NULL,
        "dateOfBirth" date,
        "primaryEmail" character varying COLLATE pg_catalog."default" NOT NULL,
        CONSTRAINT client_pkey PRIMARY KEY ("userId")
    );

    CREATE TABLE IF NOT EXISTS public.commande
    (
        "commandeId" serial NOT NULL,
        price integer NOT NULL,
        "userId" integer,
        CONSTRAINT commande_pkey PRIMARY KEY ("commandeId")
    );

    ALTER TABLE IF EXISTS public.commande
        ADD CONSTRAINT "commande_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES public.client ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;

    END;
    """

    # Add this to the test variable
    llamaIa = Text2Text(
        f"Please give me ONLY the SQL query and in one line of code and with no back to the line"
        f"I work with PostgreSQL to {text}."
        f"Put the name of the column between \" but when it's * no"
        f"SQL Code:\n{sql_code}"
    )
    
    sql_request = llamaIa.Convert()

    ai_response_text = sql_request["text"]  # Renaming to avoid conflict

    start_index = ai_response_text.lower().find("select")
    end_index = ai_response_text.rfind(";")

    if start_index != -1 and end_index != -1:
        sql_query = ai_response_text[start_index:end_index + 1].strip()

        result = db.execute(sql_text(sql_query)).fetchall()

        if not result:
            raise HTTPException(status_code=404, detail="No clients found")

        clients = []
        for row in result:
            clients.append({
                "id": row[0], 
                "userName": row[1],
                "password": row[2],
                "firstName": row[3],
                "lastName": row[4],
                "dateOfBirth": row[5],
                "primaryEmail": row[6]
            })

        return {"clients": clients}

    else:
        return "No valid SQL query found."


   
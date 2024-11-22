# models/__init__.py
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# Import all the models here to register them with the Base
from .Client import Client
from .Commande import Commande

from sqlalchemy import Column, Integer, ForeignKey
from . import Base

class Commande(Base):
    __tablename__ = 'commande'

    commandeId = Column(Integer, primary_key=True, index=True)
    price = Column(Integer, index=True, nullable=False) 
    userId = Column(Integer, ForeignKey("client.userId"))
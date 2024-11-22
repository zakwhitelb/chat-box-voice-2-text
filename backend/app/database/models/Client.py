from sqlalchemy import Column, Integer, String, Date
from . import Base

class Client(Base):
    __tablename__ = 'client'

    userId = Column(Integer, primary_key=True, index=True)
    userName = Column(String, index=True, unique=True, nullable=False)
    password = Column(String, index=True, nullable=False)
    firstName = Column(String, index=True, nullable=False)
    lastName = Column(String, index=True, nullable=False)
    dateOfBirth = Column(Date, index=True, nullable=True)
    primaryEmail = Column(String, index=True, unique=True, nullable=False)
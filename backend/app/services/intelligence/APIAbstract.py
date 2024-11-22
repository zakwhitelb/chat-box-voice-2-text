from abc import ABC, abstractmethod

class APIModel(ABC): 

    @abstractmethod
    def Convert(self):
        pass
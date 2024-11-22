# backend/app/services/intelligence/AllService.py
from .Voice2Text import Voice2Text
from .APIAbstract import APIModel
from .AIServer import AIServer

class AllService(APIModel):
    def __init__(self, fileName: str):
        self.fileName = fileName

    def Convert(self):
        if not self.fileName:
            return "Error: No file provided."

        try:
            # Convert voice to text
            voice_to_text = Voice2Text(self.fileName)
            response = voice_to_text.Convert()

            if isinstance(response, dict) and response.get("status"):
                # Use the AI server to further process the text
                text_to_text = AIServer()
                response = text_to_text.Query(response["text"])

                if isinstance(response, dict) and response.get("status"):
                    return response["text"]
                return f"Error converting text to text: {response.get('text', 'Unknown error') if isinstance(response, dict) else response}"
            else:
                return f"Error converting voice to text: {response.get('text', 'Unknown error') if isinstance(response, dict) else response}"
        except Exception as e:
            return f"Exception in AllService.Convert: {str(e)}"

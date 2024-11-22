import json
import requests
import os
import time
from .APIAbstract import APIModel

class Voice2Text(APIModel):
    fileName: str
    API_URL = "https://api-inference.huggingface.co/models/facebook/wav2vec2-base-960h"
    
    def __init__(self, fileName: str):
        self.fileName = fileName
        self.headers = {"Authorization": f"Bearer {self._get_api_key()}"}

    def _get_api_key(self):
        return os.getenv("HUGGINGFACE_API_KEY", "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")

    def Convert(self):
        if not self.fileName:
            return {"status": False, "text": "Error: No file provided."}

        try:
            with open(self.fileName, "rb") as f:
                data = f.read()

            retries = 3
            for attempt in range(retries):
                response = requests.post(self.API_URL, headers=self.headers, data=data)

                if response.status_code == 200:
                    data = json.loads(response.content.decode("utf-8"))
                    return {"status": True, "text": data["text"]}
                elif response.status_code == 429:
                    time.sleep(2 ** attempt)  # Exponential backoff
                else:
                    return {
                        "status": False,
                        "text": f"Error: {response.status_code}, Message: {response.text}"
                    }
            return {"status": False, "text": "Error: Exceeded retry attempts."}
        except Exception as e:
            return {"status": False, "text": f"Exception in Voice2Text.Convert: {str(e)}"}


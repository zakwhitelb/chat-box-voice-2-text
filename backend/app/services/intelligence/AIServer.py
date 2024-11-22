import os
import requests

class AIServer:
    def __init__(self, role="user", temperature=0.7):
        self._url = "https://llama-3-1-70b-instruct.endpoints.kepler.ai.cloud.ovh.net/api/openai_compat/v1/chat/completions"
        self.role = role
        self.temperature = temperature
        self.model = "Meta-Llama-3_1-70B-Instruct"
        self.server_key = os.getenv('AI_SERVER_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzMyNzM4OTQ2LCJpYXQiOjE3MzIxMzQxNDYsInN1YiI6Ijg2ODk2YjBmLWIxNjctNDhkNi05YTJkLWY5MDM4NzMxMzUzYSIsImVtYWlsIjoiYW50b2luZS5zYW91aUBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImdlbmVyaWMxIiwicHJvdmlkZXJzIjpbImdlbmVyaWMxIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsIjoiYW50b2luZS5zYW91aUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly93d3cub3ZoLmNvbS9hdXRoL29hdXRoMi91c2VyIiwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJzdWIiOiJzYTEyOTE0NC1vdmgifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJvYXV0aCIsInRpbWVzdGFtcCI6MTczMDg5OTk1OH1dLCJzZXNzaW9uX2lkIjoiNDkxYjIwMDItNzdjNC00NTliLWE1NjktY2Y0NmRhYTM4NWM2In0.b7unDkv_K7gOVT30elxp7RoYqhJjGiNk_mSPQOXqMdw')

    def Query(self, message):   
        payload = {
            "max_tokens": 512,
            "messages": [
                {
                    "content": message,
                    "name": "User",
                    "role": self.role
                }
            ],
            "model": self.model,
            "temperature": self.temperature
        }

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.server_key}",
        }

        response = requests.post(self._url, json=payload, headers=headers)
        
        if response.status_code == 200:
            response_data = response.json()
            choices = response_data.get("choices", [])
            for choice in choices:
                return {"status": True, "text": choice.get("message", {}).get("content", "No content found.")}
        else:
            return {"status": False, "text": f"Error: {response.status_code}, Message: {response.text}"}

if __name__ == "__main__":
    AI_agent = AIServer()
    print(AI_agent.Query("شحال كاين من جامع فالمغرب"))

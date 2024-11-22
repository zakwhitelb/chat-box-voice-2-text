from huggingface_hub import InferenceClient
from .APIAbstract import APIModel
import os
import time

class Text2Text(APIModel):
    API_URL = "meta-llama/Meta-Llama-3-8B-Instruct"
    
    def __init__(self, text: str):
        self.text = text
        self.client = InferenceClient(token=self._get_api_key())  # Initialize client

    def _get_api_key(self):
        # Use an environment variable for security; fallback if not set
        return os.getenv("HF_API_KEY", "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")

    # Implement the abstract method 'Convert' as required by APIModel
    def Convert(self):
        return self.convert()

    # Your custom method to handle text conversion
    def convert(self):
        if len(self.text) > 0:
            result = ""
            retries = 3

            for attempt in range(retries):
                try:
                    for message in self.client.chat_completion(
                        model=self.API_URL,
                        messages=[{"role": "user", "content": self.text}],
                        max_tokens=500,
                        stream=True,
                    ):
                        if message.choices and message.choices[0].delta.content:
                            result += message.choices[0].delta.content
                    
                    return {
                        "status": True,
                        "text": result
                    }
                except Exception as e:
                    if "429" in str(e) or "521" in str(e):  # Handle rate-limiting errors
                        if "429" in str(e) :
                            time.sleep(60)  # Wait before retrying
                        for message in self.client.chat_completion(
                            model=self.API_URL,
                            messages=[{"role": "user", "content": self.text}],
                            max_tokens=500,
                            stream=True,
                        ):
                            if message.choices and message.choices[0].delta.content:
                                result += message.choices[0].delta.content
                        return {
                            "status": True,
                            "text": result
                        }
                    else:
                        return {
                            "status": False,
                            "text": "Error: " + str(e)
                        }

            return {
                "status": False,
                "text": "Max retries reached. Could not get a valid response."
            }
        else:
            return {
                "status": False,
                "text": "Error: Text is empty."
            }

    @staticmethod
    def test_empty_input():
        text = Text2Text("")
        response = text.Convert()  # Call the abstract 'Convert' method
        print(response)
        assert response["status"] == False and "Text is empty" in response["text"], "Response should handle empty input properly."

    @staticmethod
    def test_question():
        text = Text2Text("What is the capital of France?")
        response = text.Convert()
        print(response)
        assert response["status"] == True and "Paris" in response["text"], "Response should contain 'Paris'."
from llama_index.core import GPTSimpleVectorIndex, Document
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

class LlamaIndexHandler:
    def __init__(self):
        # Initialize the index variable
        self.index = None

    def index_document(self, document_text: str):
        # Create a Document object from the provided text
        document = Document(document_text)
        
        # Build the index using GPTSimpleVectorIndex
        self.index = GPTSimpleVectorIndex([document])
        print("Document has been indexed successfully.")

    def query_index(self, query_text: str) -> str:
        """
        Queries the indexed document and returns the response from the LLM.
        
        :param query_text: The query string to be searched in the indexed document.
        :return: The LLM's response as a string.
        """
        if self.index is None:
            raise ValueError("No document has been indexed yet. Please index a document first.")
        
        # Query the indexed document
        response = self.index.query(query_text)
        
        # Return the response text from the LLM
        return response.response


# Example usage:
if __name__ == "__main__":
    # Create an instance of the LlamaIndexHandler
    llama_handler = LlamaIndexHandler()
    
    # Index a sample document
    sample_document = "LlamaIndex is a tool that helps with indexing and querying documents using LLMs."
    llama_handler.index_document(sample_document)
    
    # Query the indexed document
    query = "What is LlamaIndex?"
    response = llama_handler.query_index(query)
    
    print("Query Response:", response)

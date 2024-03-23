markdown_content = """
# PDF Query Tool Project

## Introduction

The PDF Query Tool is an advanced application designed to facilitate the querying of PDF documents. It utilizes a Flask backend to process PDF files and extract information based on user queries, leveraging the capabilities of OpenAI's models and Pinecone's vector search. The React frontend provides a user-friendly interface for uploading PDF documents and displaying the query results. This documentation outlines everything needed to set up, run, and use the tool.

## Installation

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- Python 3.8 or newer
- Node.js and npm
- Flask
- React
- Axios for making HTTP requests from the frontend
- The Whisper model from OpenAI (for backend processing)
- dotenv for environment variable management
- Flask-CORS to handle cross-origin requests

### Backend Setup

To set up and run the backend:

1. Clone the project repository and navigate to the backend directory.
2. Install the Python dependencies:

    ```bash
    pip install -r requirements.txt
    ```

3. Create a `.env` file in the backend directory and configure your OpenAI API key, Pinecone API key, and Pinecone environment key:

    ```env
    OPENAI_API_KEY=your_openai_api_key
    PINECONE_API_KEY=your_pinecone_api_key
    PINECONE_ENV_KEY=your_pinecone_environment_key
    ```

4. Start the Flask server:

    ```bash
    flask run
    ```

### Frontend Setup

To set up and run the frontend:

1. Navigate to the frontend directory within the project.
2. Install the required npm packages:

    ```bash
    npm install
    ```

3. Start the React development server:

    ```bash
    npm start
    ```

## Usage

With both the frontend and backend servers running, you can use the application as follows:

1. In your web browser, go to the URL provided by the React development server (usually `http://localhost:3000`).
2. Click the "Upload PDF" button and select the PDF file you wish to query.
3. Enter your query in the "Query" text field.
4. Click "Submit" to send your query. The backend will process your PDF file, perform the query, and return the result.
5. The query result will be displayed on the page.

This tool is designed to provide an efficient way to extract information from PDF documents by querying them directly. It is particularly useful for research, data analysis, and anyone who needs to quickly retrieve information from large PDF files.
"""


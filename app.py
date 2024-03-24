from flask import Flask , request , jsonify
import os 
from dotenv import load_dotenv
from flask_cors import CORS
from tempfile import NamedTemporaryFile
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain_openai import ChatOpenAI
from langchain.chains.question_answering import load_qa_chain

load_dotenv()
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')
PINECONE_ENV_KEY = os.getenv('PINECONE_ENV_KEY')



app = Flask(__name__)
CORS(app)

@app.route('/ask_pdf', methods=['POST'])
def ask_pdf():
    for file_name, handle in request.files.items():
        temp = NamedTemporaryFile(suffix='.pdf', delete=False)
        handle.save(temp)
        path = temp.name
        temp.close

    loader = PyPDFLoader(file_path=path)

    data = loader.load()

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    texts = text_splitter.split_documents(data)

    embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)
    index_name = "langchaintest"
    

    docsearch = PineconeVectorStore.from_documents(texts, embeddings, index_name=index_name)
    query = request.form.get('query','')
    docs = docsearch.similarity_search(query)
    llm = ChatOpenAI(temperature=0, openai_api_key=OPENAI_API_KEY)
    chain = load_qa_chain(llm, chain_type="stuff")
    result = chain.run(input_documents = docs , question= query)

    return result

    
    
if __name__ == '__main__':
    app.run(debug=True)
import shutil
import langchain
import requests
import os
import uuid


# archivo1 = "C:\\Users\\anuar\\Desktop\\AsistenteEscolar\\Plagio\\Archivos\\prueba7.pdf"
# archivo2 = "C:\\Users\\anuar\\Desktop\\AsistenteEscolar\\Plagio\\Archivos\\prueba8.pdf"

# def upload_file(archivo1):
#     if not os.path.exists(archivo1):
#         print('El archivo no se encuentra en la ruta especificada.')
#         return

#     file = open(archivo1, 'rb')

#     formData = {
#         'file': file,
#         'index': 'indice1',
#         'name': 'indice1',
#         'description': 'indice1',
#         'owner': 'indice1',
#         'type': 'pdf',
#         'visibility': 'private',
#         'modelVectorization': 'text-embedding-ada-002-1',
#         'renderizarImagenes': 'false',
#         'vectorizarFile': 'false'
#     }

#     try:
#         response = requests.post('https://ia-kong-dev.codingbuddy-4282826dce7d155229a320302e775459-0000.eu-de.containers.appdomain.cloud/api/plugin/any-client', files=formData, headers={'X-API-KEY': 'psvardT7iO02ZXzlqNeyWOK2xfwcOxlh'})
#         print('Archivo subido exitosamente.')
#         return response.json()
#     except requests.exceptions.RequestException as e:
#         print('Error al subir archivo:', e)
#         return None

#upload_file(document)

# loader = PyPDFLoader(archivo1)
# pages = loader.load_and_split()

# print(len(pages[0].page_content))
# print(len(pages))   

# from langchain_community.embeddings import HuggingFaceEmbeddings

# embeddings = HuggingFaceEmbeddings()

#query_result = embeddings.embed_query(pages[8].page_content)

#print(len(query_result))

#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
# from langchain_openai import OpenAIEmbeddings

# embeddings_model = OpenAIEmbeddings(openai_api_key="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")

# embedded_query = embeddings_model.embed_query("What was the name mentioned in the conversation?")
# embedded_query[:5]

# embedded_query = embeddings_model.embed_query(pages[0].page_content)

# print(len(embedded_query))
# print(embedded_query)

# embedded_queries = []

# for page in pages:
#     embedded_query = embeddings_model.embed_query(page.page_content)
#     embedded_queries.extend(embedded_query)


# print(len(embedded_queries))

# resultado_suma1 = sum(embedded_queries)
# print(resultado_suma1)

#--------------------------------------------------------------------------------------------------------------------------------


# loader2 = PyPDFLoader(archivo2)
# pages2 = loader2.load_and_split()

# embedded_queries2 = []

# for page in pages2:
#     embedded_query2 = embeddings_model.embed_query(page.page_content)
#     embedded_queries2.extend(embedded_query2)


# resultado_suma2 = sum(embedded_queries2)
# print(resultado_suma2)

#------------------------RESULTADO------------------------------
def calcular_porcentaje_igualdad(a, b):
    diferencia_absoluta = abs(a - b)
    maximo = max(a, b)
    porcentaje_igualdad = ((1 - (diferencia_absoluta / maximo)) * 100)
    return porcentaje_igualdad

# porcentaje = calcular_porcentaje_igualdad(resultado_suma1, resultado_suma2)
# print(f"El porcentaje de plagio es: {porcentaje:.2f}%")




#----------------------------------------------------------------------------------------------------------------------------------------------

import os
import shutil
from typing import Dict
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.embeddings import CohereEmbeddings

app = FastAPI()

# Configurar CORS
origins = [
    "http://localhost",
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

embeddings_model = CohereEmbeddings(cohere_api_key="apiKey")

def save_uploaded_file(uploaded_file: UploadFile) -> str:
    # Directorio donde se guardarán los archivos subidos
    upload_dir = "uploads"
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)
    
    # Generar la ruta del archivo
    file_path = os.path.join(upload_dir, uploaded_file.filename)
    
    # Obtener la ruta absoluta del archivo
    absolute_file_path = os.path.abspath(file_path)
    
    # Guardar el archivo en el sistema de archivos
    with open(absolute_file_path, "wb") as buffer:
        shutil.copyfileobj(uploaded_file.file, buffer)
    
    return absolute_file_path

@app.post("/plagio")
async def procesar_archivos(archivo1: UploadFile = File(...), archivo2: UploadFile = File(...)) -> Dict[str, str]:
    archivo1_path = save_uploaded_file(archivo1)
    archivo2_path = save_uploaded_file(archivo2)
    print(archivo1_path)
    print(archivo2_path)
    resultado = plagio(archivo1_path, archivo2_path)
    print(resultado)
    return {"resultado_plagio": resultado}

def plagio(archivo1_path, archivo2_path):
    # Verificar si los archivos existen
    if not os.path.isfile(archivo1_path) or not os.path.isfile(archivo2_path):
        return "Uno o ambos archivos no existen."

    loader = PyPDFLoader(archivo1_path)
    pages = loader.load_and_split()

    embedded_queries = []

    for page in pages:
        embedded_query = embeddings_model.embed_query(page.page_content)
        embedded_queries.extend(embedded_query)

    resultado_suma1 = sum(embedded_queries)

    loader2 = PyPDFLoader(archivo2_path)
    pages2 = loader2.load_and_split()

    embedded_queries2 = []

    for page in pages2:
        embedded_query2 = embeddings_model.embed_query(page.page_content)
        embedded_queries2.extend(embedded_query2)

    resultado_suma2 = sum(embedded_queries2)

    diferencia_absoluta = abs(resultado_suma1 - resultado_suma2)
    maximo = max(resultado_suma1, resultado_suma2)
    porcentaje_igualdad = ((1 - (diferencia_absoluta / maximo)) * 100)
    porcentaje = f"El porcentaje de plagio es: {porcentaje_igualdad:.2f}%"

    return porcentaje

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

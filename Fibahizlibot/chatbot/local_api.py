from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from chatbot import chatbot

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Specify allowed domains if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    queryText: str

@app.post("/hello")
async def hello(query: Query):
    query_text = query.queryText
    print("text "+ query_text)
    sonuc = chatbot(query_text)
    print("text "+ sonuc)
    return JSONResponse(content={"message": sonuc})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000)

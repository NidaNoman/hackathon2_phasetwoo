from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Hello from uvicorn_test!"}

@app.get("/test")
async def test_endpoint():
    return {"message": "Test endpoint from uvicorn_test!"}

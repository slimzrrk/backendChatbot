from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from utils import split_and_detect_lang
from openai import OpenAI
import os
import tempfile

app = FastAPI()
openai = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/clarify")
async def clarify_audio(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    response = openai.audio.transcriptions.create(
        file=open(tmp_path, "rb"),
        model="whisper-1",
        response_format="text"
    )

    return {"text": response}

@app.post("/detect-language")
async def detect_language(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    response = openai.audio.transcriptions.create(
        file=open(tmp_path, "rb"),
        model="whisper-1",
        response_format="text"
    )

    raw_text = response
    words = split_and_detect_lang(raw_text)

    return {
        "full_text": raw_text,
        "tokens": words
    }

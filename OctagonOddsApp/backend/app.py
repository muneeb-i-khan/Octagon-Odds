from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import joblib

app = FastAPI()

model_height = joblib.load('./TrainedModels/trained_model_heights.joblib')
model_weight = joblib.load('./TrainedModels/trained_model_weights.joblib')
model_reach = joblib.load('./TrainedModels/trained_model_reach.joblib')

origins = ["*"]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["*"], allow_headers=["*"])

class InputData(BaseModel):
    height: float = None
    weight: float = None
    reach: float = None

@app.post("/predict_win_percentage/")
def predict_win_percentage(input_data: InputData):
    height = input_data.height
    weight = input_data.weight
    reach = input_data.reach

    win_percentages = {}

    if height:
        new_height = np.array([[height]])
        win_percentages['height'] = model_height.predict(new_height)[0].item()

    if weight:
        new_weight = np.array([[weight]])
        win_percentages['weight'] = model_weight.predict(new_weight)[0].item()

    if reach:
        new_reach = np.array([[reach]])
        win_percentages['reach'] = model_reach.predict(new_reach)[0].item()

    return win_percentages

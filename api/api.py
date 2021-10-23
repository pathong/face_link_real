import time
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import cv2
import numpy as np
import json

from besuto.images.augment import imagedata
import pickle


importer = imagedata()
model_path = './model/model1.sav'
model = pickle.load(open(model_path, 'rb'))

def classify(img):

    face = importer.extract_face(img)
    face = np.expand_dims(face, 0)
    face_feature = importer.faces_get_feature(face)
    result = model.predict(face_feature)
    return result


def convert_b64_np (image_string):
    img_data = base64.b64decode(image_string)
    nparr = np.fromstring(img_data, np.uint8)
    img_np = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    return img_np

app = Flask(__name__)
CORS(app)
# class recognier():
    
# model = load_model('resnet50Aug.h5', custom_objects={'auc': auc})

# @app.route('/time')
# def get_current_time():
#     # model.predict()
#     return {'time': time.time()}

@app.route('/get_data', methods=['POST'])
def get_data():
    data = request.get_json()
    res = data['title']
    
    for i in res:
        res = res[1:]
        if i == ",":
            break
    img_np = convert_b64_np(res)
    img_np = np.flip(img_np, axis=-1)
    result_test = classify(img_np)
    return {'success': result_test.tolist()[0]}

# data:image/webp;base64,



# def test_get_data():
#     data = request.get_json()
#     res = data['title']
#     return {'success' :  "test form flask"}


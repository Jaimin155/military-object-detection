from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import time
import torch
from model_manager import ModelManager
import cv2
import numpy as np
from PIL import Image
import io
import base64

app = Flask(__name__)
CORS(app)


UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


model_manager = ModelManager()
model = model_manager.load_model()


CLASSES = ['Artillery', 'Missile', 'Missile Launcher', 'Radar', 'Soldier', 'Tank', 'Vehicle']


detection_stats = {
    'total_detections': 0,
    'total_inference_time': 0,
    'detections_by_class': {},
    'average_confidence': 0,
    'total_images': 0
}

def filter_detections(detections, iou_threshold=0.5, conf_threshold=0.25):
    """Filter detections to remove duplicates of the same object"""
    filtered = []
    # Sort by confidence
    sorted_dets = sorted(detections, key=lambda x: x['confidence'], reverse=True)
    
    while sorted_dets:
        best = sorted_dets.pop(0)
        if best['confidence'] < conf_threshold:
            continue
            
        filtered.append(best)
        

        remaining = []
        best_box = best['bbox']
        for det in sorted_dets:
            if det['class'] == best['class']:

                box = det['bbox']
                x1 = max(best_box[0], box[0])
                y1 = max(best_box[1], box[1])
                x2 = min(best_box[2], box[2])
                y2 = min(best_box[3], box[3])
                
                intersection = max(0, x2 - x1) * max(0, y2 - y1)
                area1 = (best_box[2] - best_box[0]) * (best_box[3] - best_box[1])
                area2 = (box[2] - box[0]) * (box[3] - box[1])
                union = area1 + area2 - intersection
                
                if intersection / union <= iou_threshold:
                    remaining.append(det)
            else:
                remaining.append(det)
        sorted_dets = remaining
    
    return filtered

@app.route('/detect', methods=['POST'])
def detect():
    try:

        if 'image' not in request.files:
            return jsonify({'success': False, 'error': 'No image file provided'})
        
        file = request.files['image']
        

        image_bytes = file.read()
        nparr = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            return jsonify({'success': False, 'error': 'Invalid image file'})
        

        results = model(image)[0]  
        

        detections = []
        for box in results.boxes:
            x1, y1, x2, y2 = box.xyxy[0].tolist()
            confidence = float(box.conf)
            class_id = int(box.cls)
            class_name = CLASSES[class_id] 
            
            detections.append({
                'class': class_name,
                'confidence': confidence,
                'bbox': [x1, y1, x2, y2]
            })
        

        filtered_detections = filter_detections(detections)
            

        for det in filtered_detections:
            x1, y1, x2, y2 = map(int, det['bbox'])
            

            cv2.rectangle(image, 
                        (x1, y1), 
                        (x2, y2), 
                        (0, 255, 0), 2)
            

            label = f"{det['class']}: {det['confidence']:.2f}"
            cv2.putText(image, label, 
                      (x1, y1-10), 
                      cv2.FONT_HERSHEY_SIMPLEX, 
                      0.5, (0, 255, 0), 2)
        
        _, buffer = cv2.imencode('.jpg', image)
        image_base64 = base64.b64encode(buffer).decode('utf-8')
        
        return jsonify({
            'success': True,
            'detections': filtered_detections,
            'image': image_base64
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        })

@app.route('/stats', methods=['GET'])
def get_stats():
    if detection_stats['total_images'] == 0:
        return jsonify({
            'message': 'No detections performed yet'
        })

    avg_inference_time = detection_stats['total_inference_time'] / detection_stats['total_images']
    
    return jsonify({
        'total_detections': detection_stats['total_detections'],
        'average_confidence': round(detection_stats['average_confidence'] * 100, 2),
        'detection_rate': round(detection_stats['total_detections'] / detection_stats['total_images'], 2),
        'average_inference_time': round(avg_inference_time, 3),
        'detections_by_class': detection_stats['detections_by_class'],
        'total_images_processed': detection_stats['total_images']
    })

@app.route('/model-info', methods=['GET'])
def get_model_info():
    metrics = model_manager.validate_model()
    return jsonify({
        'model_path': model_manager.model_path,
        'confidence_threshold': model.conf,
        'iou_threshold': model.iou,
        'device': 'CUDA' if torch.cuda.is_available() else 'CPU',
        'classes': CLASSES,  # Return our predefined classes
        'metrics': metrics
    })

@app.route('/train', methods=['POST'])
def train_model():
    try:
        # Get training parameters from request
        data = request.get_json()
        epochs = data.get('epochs', 50)
        image_size = data.get('image_size', 640)
        batch_size = data.get('batch_size', 8)

        # Train the model
        results = model_manager.train_model(epochs=epochs, image_size=image_size, batch_size=batch_size)
        
        # Reload the model after training
        global model
        model = model_manager.load_model()

        return jsonify({
            'success': True,
            'message': 'Model training completed successfully'
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    print(f"Loading model from: {model_manager.model_path}")
    print(f"Running on device: {'CUDA' if torch.cuda.is_available() else 'CPU'}")
    print(f"Confidence threshold: {model.conf}")
    print(f"IOU threshold: {model.iou}")
    print(f"Classes: {CLASSES}")
    app.run(debug=True, host='0.0.0.0', port=5000) 
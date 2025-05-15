import React, { useState, useMemo } from 'react';
import { CloudArrowUpIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const CONFIDENCE_LEVELS = {
  HIGH: 0.85,
  MEDIUM: 0.70
};

const THREAT_COLORS = {
  high: 'text-red-700 bg-red-50 border border-red-200',
  medium: 'text-yellow-700 bg-yellow-50 border border-yellow-200',
  low: 'text-green-700 bg-green-50 border border-green-200',
  default: 'text-blue-700 bg-blue-50 border border-blue-200'
};

const UploadSection = ({ onFileSelect }) => (
  <div className="border-2 border-dashed border-blue-200 rounded-xl p-6 text-center bg-blue-50 hover:bg-blue-100/50 transition-colors">
    <input
      type="file"
      accept="image/*"
      onChange={onFileSelect}
      className="hidden"
      id="file-upload"
    />
    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
      <CloudArrowUpIcon className="h-12 w-12 text-blue-400" />
      <span className="mt-2 text-sm font-medium text-blue-900">Upload Image for Analysis</span>
      <span className="mt-1 text-xs text-blue-600">Supported formats: PNG, JPG, GIF (max. 10MB)</span>
    </label>
  </div>
);

const LoadingSpinner = () => (
  <div className="text-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
    <p className="mt-4 text-sm font-medium text-blue-900">Analyzing image...</p>
    <p className="mt-2 text-xs text-blue-600">This may take a few seconds</p>
  </div>
);

const DetectionResult = ({ detection }) => (
  <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
    <div className="flex">
      <div className="flex-shrink-0">
        <CheckCircleIcon className={`h-5 w-5 ${detection.confidence > 0.9 ? 'text-green-500' : 'text-yellow-500'}`} />
      </div>
      <div className="ml-3 flex-1">
        <h3 className="text-sm font-medium text-blue-900">{detection.class}</h3>
        <div className="mt-2 text-sm text-blue-800">
          <p className="font-medium">Confidence: {(detection.confidence * 100).toFixed(1)}%</p>
        </div>
      </div>
    </div>
  </div>
);

const HistoryItem = ({ detection, threatColor }) => (
  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100/50 transition-colors border border-blue-100">
    <div>
      <p className="text-sm font-medium text-blue-900">{detection.class}</p>
      <p className="text-xs text-blue-600">{detection.time}</p>
    </div>
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${threatColor}`}>
      {detection.threat}
    </span>
  </div>
);

const Detection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [detectionHistory, setDetectionHistory] = useState([]);

  const getThreatLevel = useMemo(() => (confidence) => {
    if (confidence > CONFIDENCE_LEVELS.HIGH) return 'High';
    if (confidence > CONFIDENCE_LEVELS.MEDIUM) return 'Medium';
    return 'Low';
  }, []);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setDetections([]);
    setResultImage(null);
    setError(null);
    
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/detect', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setDetections(data.detections);
        setResultImage(data.image);
        
        if (data.detections.length > 0) {
          const newDetection = {
            class: data.detections[0].class,
            time: new Date().toLocaleTimeString(),
            threat: getThreatLevel(data.detections[0].confidence)
          };
          setDetectionHistory(prev => [newDetection, ...prev].slice(0, 5));
        }
      } else {
        setError(data.error || 'Detection failed');
      }
    } catch (err) {
      setError('Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-blue-100">
              <div className="border-b border-blue-100 p-6">
                <h2 className="text-2xl font-bold text-blue-900">Military Object Detection</h2>
                <p className="mt-2 text-sm text-blue-600">
                  Upload an image for real-time military object detection and analysis
                </p>
              </div>

              <div className="p-6 space-y-6">
                <UploadSection onFileSelect={handleFileSelect} />

                {preview && (
                  <div className="relative border border-blue-100 rounded-xl overflow-hidden bg-black">
                    <img
                      src={resultImage ? `data:image/jpeg;base64,${resultImage}` : preview}
                      alt="Preview"
                      className="max-w-full h-auto mx-auto"
                      key={selectedFile?.name || 'no-file'}
                    />
                  </div>
                )}

                {loading && <LoadingSpinner />}

                {preview && !loading && (
                  <button
                    onClick={handleSubmit}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Detect Objects
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 divide-y divide-blue-100">
              {detections.length > 0 && (
                <div className="p-6">
                  <h3 className="text-lg font-medium text-blue-900">Detection Results</h3>
                  <div className="mt-4 space-y-6">
                    {detections.map((detection, index) => (
                      <DetectionResult key={index} detection={detection} />
                    ))}

                    <div>
                      <h4 className="text-sm font-medium text-blue-900">Threat Assessment</h4>
                      <div className="mt-2">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ${THREAT_COLORS[getThreatLevel(detections[0].confidence).toLowerCase()]}`}>
                          {getThreatLevel(detections[0].confidence)} Threat Level
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-blue-100 pt-4">
                      <h4 className="text-sm font-medium text-blue-900">Additional Information</h4>
                      <dl className="mt-2 divide-y divide-blue-100">
                        <div className="flex justify-between py-2">
                          <dt className="text-sm text-blue-600">Classification</dt>
                          <dd className="text-sm font-medium text-blue-900">{detections[0].class}</dd>
                        </div>
                        <div className="flex justify-between py-2">
                          <dt className="text-sm text-blue-600">Status</dt>
                          <dd className="text-sm font-medium text-blue-900">Active</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              )}

              {detectionHistory.length > 0 && (
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-blue-900">Detection History</h3>
                    <button
                      onClick={() => setDetectionHistory([])}
                      className="text-xs text-red-600 hover:text-red-800 transition-colors"
                    >
                      Clear History
                    </button>
                  </div>
                  <div className="mt-4 space-y-3">
                    {detectionHistory.map((detection, index) => (
                      <HistoryItem 
                        key={index} 
                        detection={detection} 
                        threatColor={THREAT_COLORS[detection.threat.toLowerCase()]} 
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detection; 
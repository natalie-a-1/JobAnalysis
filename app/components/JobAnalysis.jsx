import { useState } from 'react';
import ClassificationAnalysis from './ClassificationAnalysis';
import ClusteringAnalysis from './ClusteringAnalysis';
import TimeSeriesAnalysis from './TimeSeriesAnalysis';
import OutlierDetectionAnalysis from './OutlierDetectionAnalysis';

export default function JobAnalysis() {
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  const handleAnalysisSelection = (analysisType) => {
    setSelectedAnalysis(analysisType);
  };

  const renderAnalysis = () => {
    switch (selectedAnalysis) {
      case 'classification':
        return <ClassificationAnalysis />;
      case 'clustering':
        return <ClusteringAnalysis />;
      case 'time-series':
        return <TimeSeriesAnalysis />;
      case 'outlier-detection':
        return <OutlierDetectionAnalysis />;
      default:
        return <div>Please select an analysis type to begin.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow p-4 mb-6">
        <h1 className="text-2xl font-bold">Job Analysis</h1>
      </header>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <button
            onClick={() => handleAnalysisSelection('classification')}
            className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-700"
          >
            Classification
          </button>
          <button
            onClick={() => handleAnalysisSelection('clustering')}
            className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-700"
          >
            Clustering
          </button>
          <button
            onClick={() => handleAnalysisSelection('time-series')}
            className="bg-yellow-500 text-white p-4 rounded-lg hover:bg-yellow-700"
          >
            Time-Series Analysis
          </button>
          <button
            onClick={() => handleAnalysisSelection('outlier-detection')}
            className="bg-red-500 text-white p-4 rounded-lg hover:bg-red-700"
          >
            Outlier Detection
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          {renderAnalysis()}
        </div>
      </div>
    </div>
  );
}

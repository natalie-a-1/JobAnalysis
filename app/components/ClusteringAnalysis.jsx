import dynamic from 'next/dynamic';

// Dynamically import Plot with no SSR
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default function ClusteringAnalysis() {
  return (
    <Plot
      data={[
        {
          x: [1, 2, 3, 4, 5],
          y: [10, 11, 12, 13, 14],
          mode: 'markers',
          type: 'scatter',
        },
      ]}
      layout={{ title: 'Clustering Analysis', width: 600, height: 400 }}
    />
  );
}

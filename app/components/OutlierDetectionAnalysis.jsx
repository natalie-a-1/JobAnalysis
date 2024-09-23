import dynamic from 'next/dynamic';

// Dynamically import Plot with no SSR
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default function OutlierDetectionAnalysis() {
  return (
    <Plot
      data={[
        {
          y: [10, 20, 30, 40, 100, 120, 10, 20, 30],
          type: 'box',
        },
      ]}
      layout={{ title: 'Outlier Detection Analysis', width: 600, height: 400 }}
    />
  );
}

import dynamic from 'next/dynamic';

// Dynamically import Plot with no SSR
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default function TimeSeriesAnalysis() {
  return (
    <Plot
      data={[
        {
          x: ['2020', '2021', '2022', '2023'],
          y: [100, 200, 150, 250],
          type: 'scatter',
          mode: 'lines+markers',
        },
      ]}
      layout={{ title: 'Time-Series Analysis', width: 600, height: 400 }}
    />
  );
}

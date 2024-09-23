import dynamic from 'next/dynamic';

// Dynamically import Plot with no SSR
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default function ClassificationAnalysis() {
  return (
    <Plot
      data={[
        {
          x: ['Category A', 'Category B', 'Category C'],
          y: [10, 20, 30],
          type: 'bar',
        },
      ]}
      layout={{ title: 'Classification Analysis', width: 600, height: 400 }}
    />
  );
}

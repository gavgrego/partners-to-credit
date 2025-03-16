import { createFileRoute } from '@tanstack/react-router';
import { Chart } from 'react-google-charts';

export const Route = createFileRoute('/')({
  component: IndexPage,
});

export const data = [
  ['From', 'To', 'Weight'],
  ['A', 'X', 5],
  ['A', 'Y', 7],
  ['A', 'Z', 6],
  ['B', 'X', 2],
  ['B', 'Y', 9],
  ['B', 'Z', 4],
];

function IndexPage() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Chart chartType="Sankey" width="100%" height="100%" data={data} />
    </div>
  );
}

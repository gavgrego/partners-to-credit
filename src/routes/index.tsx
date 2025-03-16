import Chart from '@/components/Chart';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: IndexPage,
});

function IndexPage() {
  return (
    <div className="bg-card rounded-lg shadow-lg border border-border/40 p-6">
      <Chart />
    </div>
  );
}

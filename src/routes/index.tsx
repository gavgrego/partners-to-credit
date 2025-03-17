import Chart from '@/components/Chart';
import CurrentBonuses from '@/components/CurrentBonuses';
import { Card } from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: IndexPage,
});

function IndexPage() {
  return (
    <div className="flex flex-col gap-10">
      <Card className="bg-card rounded-lg shadow-lg border border-border/40 p-6">
        <Chart />
      </Card>
      <CurrentBonuses />
    </div>
  );
}

import { createFileRoute } from '@tanstack/react-router';
import { useTransferPartners } from '@/hooks/useTransferPartners';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import SEO from '@/components/SEO';
import { Spinner } from '@/components/Spinner';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';

export const Route = createFileRoute('/$bank')({
  component: BankPage,
  pendingComponent: () => (
    <div className="animate-pulse text-muted-foreground">
      <Spinner size="lg" />
    </div>
  ),
});

function BankPage() {
  const { bank } = Route.useParams();
  const { data: transferPartners, isLoading } = useTransferPartners();
  const [showOnlyBonuses, setShowOnlyBonuses] = useState(false);

  if (isLoading) {
    return (
      <div className="mx-auto py-8 text-foreground w-full">
        <div className="text-lg text-muted-foreground">
          Loading bank data...
        </div>
      </div>
    );
  }

  const bankData = transferPartners?.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, '-') === bank.toLowerCase()
  );
  const bankLogo = bankData?.source;
  const bankSlug = bankData?.name.toLowerCase().replace(/\s+/g, '-');

  if (!bankData) {
    return <div>Bank not found</div>;
  }

  const filteredPartners = showOnlyBonuses
    ? bankData.partners.filter(
        (partner) =>
          partner.bonus && partner.bonusPercent && partner.bonusPercent > 0
      )
    : bankData.partners;

  return (
    <div className="mx-auto py-8 text-foreground w-full">
      <SEO
        title={`${bankData.name} Transfer Partners`}
        description={`View all ${bankData.name} transfer partners and current transfer bonuses. Compare transfer ratios and find the best value for your points.`}
        canonical={`https://points.credit/${bankSlug}`}
      />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold flex items-center gap-4">
          <img src={bankLogo} alt={bankData.name} className="w-10 h-10" />
          {bankData.name} Transfer Partners
        </h1>
      </div>

      <p className="text-lg mb-8">
        Transfer your {bankData.pointsName} to the following partners:
      </p>

      <div className="flex items-center justify-start space-x-2 mb-6">
        <Switch
          id="show-bonuses"
          checked={showOnlyBonuses}
          onCheckedChange={setShowOnlyBonuses}
        />
        <label
          htmlFor="show-bonuses"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Show only active bonuses
        </label>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Partner</TableHead>
            <TableHead>Transfer Ratio</TableHead>
            <TableHead>Bonus</TableHead>
            <TableHead>Valid Until</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPartners.map((partner) => (
            <TableRow key={partner.name}>
              <TableCell className="font-medium">
                {partner.name} {partner.category === 'Airlines' ? '✈️' : '🏨'}
              </TableCell>
              <TableCell>
                <span className={partner.bonus ? 'line-through' : 'font-bold'}>
                  {partner.transferRatio}
                </span>
              </TableCell>
              <TableCell>
                {partner.bonus && (
                  <span className="text-green-500 font-bold">
                    {partner.bonus}{' '}
                    <span className="text-sm">({partner.bonusPercent}%)</span>
                  </span>
                )}
              </TableCell>
              <TableCell>
                {partner.bonusUntil && (
                  <span className="text-muted-foreground">
                    {partner.bonusUntil}
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

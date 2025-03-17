import { Card } from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router';
import { useTransferPartners } from '@/hooks/useTransferPartners';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import SEO from '@/components/SEO';

export const Route = createFileRoute('/$bank')({
  component: BankPage,
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
        canonical={`https://partnersto.credit/${bankSlug}`}
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

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPartners.map((partner) => (
          <Card key={partner.name} className="p-6 flex flex-col">
            <h3 className="text-lg font-semibold mb-2">{partner.name}</h3>

            <div className="mt-auto">
              <span className="font-medium">
                Transfer Ratio:{' '}
                <span
                  className={
                    partner.bonus ? 'line-through' : 'text-foreground font-bold'
                  }
                >
                  {partner.transferRatio}
                </span>
                {partner.bonus && (
                  <>
                    <div className="text-green-500 font-bold">
                      {partner.bonus} a{' '}
                      <span className="text-lg">{partner.bonusPercent}%</span>{' '}
                      bonus
                    </div>
                    <div className="text-foreground">
                      until {partner.bonusUntil}
                    </div>
                  </>
                )}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

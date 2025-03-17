import { Card } from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router';
import { useTransferPartners } from '@/hooks/useTransferPartners';
import SEO from '@/components/SEO';

export const Route = createFileRoute('/$bank')({
  component: BankPage,
});

function BankPage() {
  const { bank } = Route.useParams();
  const { data: transferPartners, isLoading } = useTransferPartners();

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
  return (
    <div className="mx-auto py-8 text-foreground w-full">
      <SEO
        title={`${bankData.name} Transfer Partners`}
        description={`View all ${bankData.name} transfer partners and current transfer bonuses. Compare transfer ratios and find the best value for your points.`}
        canonical={`https://partnersto.credit/${bankSlug}`}
      />
      <h1 className="text-4xl font-bold mb-6 flex items-center gap-4">
        <img src={bankLogo} alt={bankData.name} className="w-10 h-10" />
        {bankData.name} Transfer Partners
      </h1>
      <p className="text-lg mb-8">
        Transfer your {bankData.pointsName} to the following partners:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bankData.partners.map((partner) => (
          <Card key={partner.name} className="p-6 flex flex-col">
            <h3 className="text-lg font-semibold mb-2">{partner.name}</h3>

            <div className="mt-auto">
              <span className="font-medium">
                Transfer Ratio:{' '}
                <span
                  className={
                    partner.bonus ? 'line-through' : 'text-green-500 font-bold'
                  }
                >
                  {partner.transferRatio}
                </span>
                {partner.bonus && (
                  <span className="text-red-500 ml-2">
                    Current bonus! {partner.bonus} until {partner.bonusUntil}
                  </span>
                )}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

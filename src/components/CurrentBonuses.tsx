import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTransferPartners } from '@/hooks/useTransferPartners';

const CurrentBonuses = () => {
  const { data: transferPartners, isLoading } = useTransferPartners();

  if (isLoading) {
    return (
      <div className="w-full relative space-y-6">
        <h2 className="text-3xl font-bold text-foreground">
          Current or Recent Transfer Bonuses
        </h2>
        <p className="text-muted-foreground">Loading bonuses...</p>
      </div>
    );
  }

  const bonuses =
    transferPartners?.flatMap((program) =>
      program.partners
        .filter((partner) => partner.bonus)
        .map((partner) => ({
          name: partner.name,
          source: program.source,
          bank: program.name,
          originalRatio: partner.transferRatio,
          bonus: partner.bonus,
          validUntil: partner.bonusUntil,
          bonusPercent: partner.bonusPercent,
        }))
    ) ?? [];

  return (
    <div className="w-full relative space-y-6">
      <h2 className="text-3xl font-bold text-foreground">
        Current or Recent Transfer Bonuses
      </h2>

      {bonuses.length === 0 ? (
        <p className="text-muted-foreground">
          No active transfer bonuses at this time.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bonuses.map((bonus) => (
            <Card key={`${bonus.bank}-${bonus.name}`}>
              <CardHeader>
                <CardTitle className="text-lg flex gap-3 items-start">
                  <img src={bonus.source} width={30} />
                  {bonus.bank} → {bonus.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  <span className="line-through">{bonus.originalRatio}</span>{' '}
                  <span className="text-green-500 font-bold">
                    {bonus.bonus}
                    {bonus.bank !== 'BILT' && (
                      <>
                        a <span className="text-lg">{bonus.bonusPercent}%</span>{' '}
                        bonus
                      </>
                    )}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Valid until{' '}
                  <span className="font-black text-foreground">
                    {bonus.validUntil}
                  </span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrentBonuses;

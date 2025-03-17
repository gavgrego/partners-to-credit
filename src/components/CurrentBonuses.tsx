import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { transferPartners } from '@/data/transferPartners';

const CurrentBonuses = () => {
  const bonuses = transferPartners.flatMap((program) =>
    program.partners
      .filter((partner) => partner.bonus)
      .map((partner) => ({
        name: partner.name,
        bank: program.name,
        originalRatio: partner.transferRatio,
        bonus: partner.bonus,
        validUntil: partner.bonusUntil,
      }))
  );

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
            <Card key={`${bonus.name}-${bonus.bank}`}>
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{bonus.name}</CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {bonus.bank}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-lg">
                  {bonus.originalRatio && (
                    <span className="line-through mr-2">
                      {bonus.originalRatio}
                    </span>
                  )}
                  <span className="text-red-500 font-medium">
                    {bonus.originalRatio ? `→ ${bonus.bonus}` : 'Bonus active!'}
                  </span>
                </p>
                {bonus.validUntil && (
                  <p className="text-sm text-muted-foreground">
                    Valid until {bonus.validUntil}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrentBonuses;

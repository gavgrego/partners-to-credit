import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/referrals')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="text-foreground">
      <h1>Credit Card Referrals</h1>

      <h2>Help support the site by using my credit card referral links.</h2>
      <p>
        ❗ Chase, Capital One, and BILT will always be all-time-high offers,
        while American Express sometimes has better offers publicly available.
      </p>

      <h3>American Express</h3>
      <ul className="list">
        <li>
          <a
            target="_blank"
            href="https://americanexpress.com/en-us/referral/business-platinum-charge-card?ref=GAVINgsWwM&XLINK=MYCP"
          >
            Business Platinum
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://americanexpress.com/en-us/referral/businessgold-card?ref=GAVINgj9Jy&XLINK=MYCP"
          >
            Business Gold
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://americanexpress.com/en-us/referral/delta-skymiles-gold?ref=GAVINgw8nQ&XLINK=MYCP"
          >
            Delta Business Gold
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://americanexpress.com/en-us/referral/marriott-bonvoy-business-american-express-card?ref=GAVINgF9kb&XLINK=MYCP"
          >
            Marriott Bonvoy Business
          </a>
        </li>
      </ul>

      <h3>Capital One</h3>

      <ul className="list">
        <li>
          <a target="_blank" href="https://capital.one/3yT6gAp">
            Venture X
          </a>
        </li>
      </ul>

      <h3>Chase</h3>

      <ul className="list">
        <li>
          <a
            target="_blank"
            href="https://www.referyourchasecard.com/19q/2SJ0V2OOEM"
          >
            Sapphire Preferred/Reserve
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://www.referyourchasecard.com/21s/Q8QRDJJF6O"
          >
            Ink Busines Cash/Preferred/Premier/Unlimited
          </a>
        </li>

        <li>
          <a
            target="_blank"
            href="https://www.referyourchasecard.com/18J/RP5BOTFK41"
          >
            Freedom Flex/Unlimited
          </a>
        </li>
      </ul>
      <h3>BILT</h3>

      <ul className="list">
        <li>
          <a target="_blank" href="https://bilt.page/r/V88U-R0ZD">
            BILT Rewards
          </a>
        </li>
      </ul>
    </div>
  );
}

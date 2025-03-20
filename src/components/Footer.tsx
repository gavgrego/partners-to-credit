import { Link } from '@tanstack/react-router';

const Footer = () => {
  return (
    <footer className="text-xs flex justify-center flex-col gap-2 items-center pt-20 pb-8">
      <p className="text-muted-foreground">
        Built by{' '}
        <a target="_blank" href="https://gregorygav.in">
          Gav
        </a>{' '}
        in the{' '}
        <a href="https://gavgavgav.net" target="_blank">
          Bay Area
        </a>
      </p>
      <p className="text-muted-foreground text-xs text-center">
        See incorrect data? Please email{' '}
        <a href="mailto:gavin@thecomponent.studio">gavin@thecomponent.studio</a>
      </p>
      <div className="flex items-center gap-2 mt-4">
        <a href="https://ko-fi.com/Z8Z6C8DK" target="_blank">
          <img
            height="28"
            style={{ border: '0px', height: '28px' }}
            src="https://storage.ko-fi.com/cdn/kofi3.png?v=6"
            alt="Buy Me a Coffee at ko-fi.com"
          />
        </a>

        <Link to="/referrals" className="underline">
          or use my referral links!
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

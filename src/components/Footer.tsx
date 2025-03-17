const Footer = () => {
  return (
    <footer className="text-sm flex justify-center py-6 flex-col gap-2 items-center">
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
      <p className="text-muted-foreground text-xs">
        See incorrect data? Please email{' '}
        <a href="mailto:gavin@thecomponent.studio">gavin@thecomponent.studio</a>
      </p>
      <a href="https://ko-fi.com/Z8Z6C8DK" target="_blank">
        <img
          height="28"
          style={{ border: '0px', height: '28px', marginTop: '12px' }}
          src="https://storage.ko-fi.com/cdn/kofi3.png?v=6"
          alt="Buy Me a Coffee at ko-fi.com"
        />
      </a>
    </footer>
  );
};

export default Footer;

const Footer = () => {
  return (
    <footer className="text-sm flex justify-center py-6 flex-col gap-2 items-center">
      <p className="text-muted-foreground">
        Built by{' '}
        <a target="_blank" href="https://gregorygav.in">
          Gav
        </a>{' '}
        in the Bay Area
      </p>
      <p className="text-muted-foreground text-xs">
        See incorrect data? Please email{' '}
        <a href="mailto:gavin@thecomponent.studio">gavin@thecomponent.studio</a>
      </p>
    </footer>
  );
};

export default Footer;

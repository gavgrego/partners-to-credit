import { ArrowLeftRight } from 'lucide-react';

const Header = () => {
  return (
    <div className="shadow-sm mx-auto px-4 pt-2 sm:px-6 lg:px-8">
      <header className="flex items-center justify-start gap-2 text-foreground">
        <ArrowLeftRight className="animate-[wiggle_1s_ease-in-out_infinite]" />
        <span className="text-lg font-bold">partnersto.credit</span>
      </header>
    </div>
  );
};

export default Header;

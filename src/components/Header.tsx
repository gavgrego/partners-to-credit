import { ArrowLeftRight } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Link } from '@tanstack/react-router';

const Header = () => {
  return (
    <div className="shadow-sm mx-auto px-4 pt-2 sm:px-6 lg:px-8">
      <header className="flex items-center justify-start gap-2 text-foreground">
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeftRight className="animate-[wiggle_1s_ease-in-out_infinite]" />
          <span className="text-2xl font-bold">partnersto.credit</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Banks&nbsp;&nbsp;</NavigationMenuTrigger>
              <NavigationMenuContent className="[&_div]:py-1">
                {/* @ts-ignore */}
                <Link to="/american-express">
                  <div>American Express</div>
                </Link>
                {/* @ts-ignore */}
                <Link to="/chase">
                  <div>Chase</div>
                </Link>
                {/* @ts-ignore */}
                <Link to="/capital-one">
                  <div>Capital One</div>
                </Link>
                {/* @ts-ignore */}
                <Link to="/citi">
                  <div>Citi</div>
                </Link>
                {/* @ts-ignore */}
                <Link to="/bilt">
                  <div>BILT</div>
                </Link>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
    </div>
  );
};

export default Header;

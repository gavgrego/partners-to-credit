import { ArrowLeftRight } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const Header = () => {
  return (
    <div className="shadow-sm mx-auto px-4 pt-2 sm:px-6 lg:px-8">
      <header className="flex items-center justify-start gap-2 text-foreground">
        <a href="/" className="flex items-center gap-2">
          <ArrowLeftRight className="animate-[wiggle_1s_ease-in-out_infinite]" />
          <span className="text-2xl font-bold">partnersto.credit</span>
        </a>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Banks&nbsp;&nbsp;</NavigationMenuTrigger>
              <NavigationMenuContent className="w-full">
                <NavigationMenuLink href="/american-express">
                  American Express
                </NavigationMenuLink>
                <NavigationMenuLink href="/chase">Chase</NavigationMenuLink>
                <NavigationMenuLink href="/citi">Citi</NavigationMenuLink>
                <NavigationMenuLink href="/capital-one">
                  Capital One
                </NavigationMenuLink>
                <NavigationMenuLink href="/bilt">BILT</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
    </div>
  );
};

export default Header;

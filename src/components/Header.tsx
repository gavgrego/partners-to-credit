import { ArrowLeftRight } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Link } from '@tanstack/react-router';
import { Tooltip } from '@radix-ui/react-tooltip';
import { TooltipContent } from '@radix-ui/react-tooltip';
import { TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';

const Header = () => {
  return (
    <div className="shadow-sm mx-auto px-4 pt-4 sm:px-6 lg:px-8">
      <header className="flex items-center flex-col sm:flex-row justify-start gap-2 text-foreground">
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeftRight className="animate-[wiggle_1s_ease-in-out_infinite]" />
          <span className="text-2xl font-bold">points.credit</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                Transfer From&nbsp;&nbsp;
              </NavigationMenuTrigger>
              <NavigationMenuContent className="[&_div]:p-1">
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
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger className="text-2xl">🇺🇸</TooltipTrigger>
            <TooltipContent side="right" sideOffset={16}>
              <p>We currently only support US-based credit cards.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </header>
    </div>
  );
};

export default Header;

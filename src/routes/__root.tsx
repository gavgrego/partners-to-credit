import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => (
    <div className="text-foreground">
      Page not found! <Link to="/">Go home!</Link>
    </div>
  ),
});

function RootComponent() {
  return (
    <div className="dark min-h-screen bg-background">
      <SEO />
      <Header />
      <main className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="dark min-h-screen bg-background">
      <header className="border-b border-border/40">
        <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-foreground text-center">
            Transfer Guide
          </h1>
        </div>
      </header>
      <main className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

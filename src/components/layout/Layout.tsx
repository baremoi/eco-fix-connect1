
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { Suspense } from 'react';

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <main className="flex-1">
        <ErrorBoundary>
          <Suspense fallback={<div className="p-8 text-center">Loading content...</div>}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </div>
  );
};

export default PublicLayout;

import React, { Suspense } from 'react';
import type { ComponentType, ReactElement } from 'react';

interface LoadableOptions {
  loader: () => Promise<{ default: ComponentType<Record<string, unknown>> }>;
  fallback: ReactElement;
}

export const Loadable = ({ loader, fallback }: LoadableOptions) => {
  const LazyComponent = React.lazy(loader);

  return (props: Record<string, unknown>) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}; 
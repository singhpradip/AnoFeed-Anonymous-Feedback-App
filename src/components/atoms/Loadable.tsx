import React, { Suspense } from 'react';
import type { ComponentType, ReactElement } from 'react';

interface PageProps {
  [key: string]: string | number | boolean | object | null | undefined;
}

interface LoadableOptions {
  loader: () => Promise<{ default: ComponentType<PageProps> }>;
  fallback: ReactElement;
}

export const Loadable = ({ loader, fallback }: LoadableOptions) => {
  const LazyComponent = React.lazy(loader);

  return (props: PageProps) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
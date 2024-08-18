import React, { PropsWithChildren } from 'react';
import cc from 'classcat';

interface Props {
  variant?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string; // Accept additional class names
}

export const Typography: React.FC<PropsWithChildren<Props>> = ({
  variant = 'p',
  className,
  children,
}) => {
  const variants = {
    h1: 'text-4xl font-dos text-primary mb-6 text-center',
    h2: 'text-3xl font-dos text-primary mb-4',
    h3: 'text-2xl font-dos text-primary mb-2',
    p: 'text-base font-dos text-primary mb-2',
  };

  const Component = variant;

  return (
    <Component className={cc([variants[variant], className])}>
      {children}
    </Component>
  );
};

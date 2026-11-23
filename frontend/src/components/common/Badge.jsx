import React from 'react';

const bloomLevelMap = {
  1: { label: 'L1: Remember', class: 'badge-remember' },
  2: { label: 'L2: Understand', class: 'badge-understand' },
  3: { label: 'L3: Apply', class: 'badge-apply' },
  4: { label: 'L4: Analyze', class: 'badge-analyze' },
  5: { label: 'L5: Evaluate', class: 'badge-evaluate' },
  6: { label: 'L6: Create', class: 'badge-create' },
  remember: { label: 'Remember', class: 'badge-remember' },
  understand: { label: 'Understand', class: 'badge-understand' },
  apply: { label: 'Apply', class: 'badge-apply' },
  analyze: { label: 'Analyze', class: 'badge-analyze' },
  evaluate: { label: 'Evaluate', class: 'badge-evaluate' },
  create: { label: 'Create', class: 'badge-create' }
};

export const Badge = ({
  children,
  variant = 'default',
  bloomLevel = null,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  if (bloomLevel && bloomLevelMap[bloomLevel]) {
    const info = bloomLevelMap[bloomLevel];
    return (
      <span className={`inline-flex items-center font-medium rounded-lg ${info.class} ${sizeClasses} ${className}`}>
        {children || info.label}
      </span>
    );
  }

  const variants = {
    default: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
    primary: 'bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800',
    success: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
    warning: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
    danger: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800',
    info: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800'
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-lg ${variants[variant] || variants.default} ${sizeClasses} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;

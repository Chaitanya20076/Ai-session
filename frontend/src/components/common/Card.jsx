import React from 'react';

export const Card = ({
  children,
  className = '',
  header,
  subtitle,
  actions,
  footer,
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={`bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-sm transition-all duration-200 
        ${hoverEffect ? 'hover:shadow-md hover:border-primary-500/30 dark:hover:border-primary-500/30' : ''} ${className}`}
      {...props}
    >
      {(header || subtitle || actions) && (
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div>
            {header && <h3 className="font-semibold text-slate-900 dark:text-slate-100">{header}</h3>}
            {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center space-x-2">{actions}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="px-6 py-3.5 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800/80 rounded-b-2xl">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;

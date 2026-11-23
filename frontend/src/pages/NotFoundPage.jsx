import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-3xl bg-primary-50 dark:bg-primary-950 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4 border border-primary-200 dark:border-primary-800">
        <HelpCircle className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">404</h1>
      <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">Page Not Found</h2>
      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-6">
        The requested learning resource or route does not exist or may have been archived.
      </p>
      <Link to="/">
        <Button variant="secondary" size="sm">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Return to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;

import React from 'react';

export const NavBar: React.FC = () => {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-studio-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center text-white font-bold">
              P
            </div>
            <span className="font-semibold text-lg tracking-tight text-slate-900">
              PureProduct <span className="text-brand-500">AI</span>
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">How it works</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Pricing</a>
            <button className="text-sm font-medium text-white bg-slate-900 px-4 py-2 rounded-full hover:bg-slate-800 transition-all shadow-sm hover:shadow-md">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

import React from 'react';

export const ProcessingState: React.FC = () => {
  return (
    <div className="w-full h-80 rounded-3xl bg-white border border-slate-200 flex flex-col items-center justify-center relative overflow-hidden shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent z-10 animate-pulse-slow"></div>
      
      {/* Animated Loader */}
      <div className="relative z-20 flex flex-col items-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-400 to-indigo-500 animate-spin flex items-center justify-center mb-6 shadow-xl shadow-brand-500/20">
          <div className="w-16 h-16 bg-white rounded-xl"></div>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Refining Details</h3>
        <p className="text-slate-500 text-sm">Removing background & clutter...</p>
        
        {/* Progress Bar Simulation */}
        <div className="w-48 h-1.5 bg-slate-100 rounded-full mt-6 overflow-hidden">
          <div className="h-full bg-brand-500 rounded-full w-1/3 animate-[slideUp_2s_infinite_linear] origin-left" style={{ width: '100%', animation: 'shimmer 1.5s infinite linear' }}></div>
        </div>
      </div>
      
      {/* Background Particles (Visual Flair) */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-purple-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 animate-pulse delay-75"></div>
    </div>
  );
};

/* Add this to global css via tailwind config in html if needed, but standard pulse works well enough. 
   Implemented shim in style attribute for simplicity in this context */

import React from 'react';

interface ResultViewProps {
  originalImage: string;
  resultImage: string;
  onDownload: () => void;
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ originalImage, resultImage, onDownload, onReset }) => {
  return (
    <div className="w-full animate-fade-in space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Original</p>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 group">
            <img 
              src={originalImage} 
              alt="Original" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
          </div>
        </div>

        {/* Result */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-brand-500 uppercase tracking-wider pl-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
            Pure White Result
          </p>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-white shadow-xl shadow-brand-900/5 border border-brand-100 group">
            <img 
              src={resultImage} 
              alt="Product Result" 
              className="w-full h-full object-contain p-4 z-10 relative transition-transform duration-500 group-hover:scale-105" 
            />
            {/* Download overlay on hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 backdrop-blur-sm">
                <button 
                    onClick={onDownload}
                    className="bg-white text-slate-900 font-medium py-2 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:scale-105 flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    Download
                </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <button 
          onClick={onReset}
          className="text-slate-500 hover:text-slate-800 text-sm font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          Process another image
        </button>
      </div>
    </div>
  );
};

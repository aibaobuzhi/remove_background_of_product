import React, { useState, useEffect } from 'react';
import { NavBar } from './components/NavBar';
import { Uploader } from './components/Uploader';
import { ProcessingState } from './components/ProcessingState';
import { ResultView } from './components/ResultView';
import { AppStatus, ImageState } from './types';
import { generateProductShot } from './services/geminiService';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [imageState, setImageState] = useState<ImageState>({
    file: null,
    previewUrl: null,
    base64Data: null,
    mimeType: '',
  });
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Helper to read file as base64
  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImageState({
        file,
        previewUrl: URL.createObjectURL(file),
        base64Data: result,
        mimeType: file.type,
      });
      // Auto start processing if the app was idle or in error state
      setStatus(AppStatus.IDLE); 
    };
    reader.readAsDataURL(file);
  };

  const handleProcess = async () => {
    if (!imageState.base64Data || !imageState.mimeType) return;

    setStatus(AppStatus.PROCESSING);
    setErrorMsg(null);

    try {
      const generatedImageBase64 = await generateProductShot(
        imageState.base64Data,
        imageState.mimeType
      );
      setResultUrl(generatedImageBase64);
      setStatus(AppStatus.SUCCESS);
    } catch (err: any) {
      setStatus(AppStatus.ERROR);
      setErrorMsg(err.message || "Failed to process image");
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const link = document.createElement('a');
      link.href = resultUrl;
      link.download = `pure-product-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setStatus(AppStatus.IDLE);
    setImageState({ file: null, previewUrl: null, base64Data: null, mimeType: '' });
    setResultUrl(null);
    setErrorMsg(null);
  };

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (imageState.previewUrl) {
        URL.revokeObjectURL(imageState.previewUrl);
      }
    };
  }, [imageState.previewUrl]);

  return (
    <div className="flex-1 flex flex-col font-sans">
      <NavBar />

      <main className="flex-grow flex flex-col items-center justify-start pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Header Section */}
        <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-500 ${status === AppStatus.SUCCESS ? 'opacity-0 h-0 overflow-hidden mb-0' : 'opacity-100'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-semibold tracking-wide uppercase mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-brand-500"></span>
            Powered by Nano Banana
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Studio quality products,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
              zero studio required.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
            Instantly remove backgrounds and clutter to create pure white, e-commerce ready product shots using advanced computer vision.
          </p>
        </div>

        {/* Main Interaction Area */}
        <div className="w-full max-w-4xl mx-auto">
          
          {/* Error Banner */}
          {status === AppStatus.ERROR && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 flex items-center justify-between animate-fade-in">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>{errorMsg}</span>
              </div>
              <button onClick={handleReset} className="text-sm font-semibold underline hover:text-red-800">Try Again</button>
            </div>
          )}

          {/* Conditional Rendering based on Status */}
          <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 p-6 md:p-8 transition-all duration-500 border border-white">
            
            {status === AppStatus.IDLE && !imageState.previewUrl && (
              <div className="animate-fade-in">
                 <Uploader onFileSelect={processFile} />
                 
                 {/* Sample features */}
                 <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-4">
                        <div className="w-10 h-10 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-3 text-slate-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
                        </div>
                        <h3 className="font-semibold text-slate-900">Upload Photo</h3>
                        <p className="text-sm text-slate-500 mt-1">Any standard format</p>
                    </div>
                    <div className="p-4">
                        <div className="w-10 h-10 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-3 text-slate-400">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                        </div>
                        <h3 className="font-semibold text-slate-900">AI Cleanup</h3>
                        <p className="text-sm text-slate-500 mt-1">Identifies main subject</p>
                    </div>
                    <div className="p-4">
                        <div className="w-10 h-10 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-3 text-slate-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                        </div>
                        <h3 className="font-semibold text-slate-900">Pure White</h3>
                        <p className="text-sm text-slate-500 mt-1">Ready for your store</p>
                    </div>
                 </div>
              </div>
            )}

            {status === AppStatus.IDLE && imageState.previewUrl && (
              <div className="animate-slide-up">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Review Selection</h3>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img src={imageState.previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-4 w-full md:w-1/2">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <h4 className="font-medium text-slate-700 mb-2">Ready to process</h4>
                        <p className="text-sm text-slate-500">
                            Our AI will isolate the product and replace the background with pure white (#FFFFFF).
                        </p>
                    </div>
                    <button 
                      onClick={handleProcess}
                      className="w-full py-4 px-6 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
                    >
                      <span className="group-hover:scale-110 transition-transform">✨</span> Generate Product Shot
                    </button>
                    <button 
                      onClick={handleReset}
                      className="w-full py-3 px-6 bg-white text-slate-500 rounded-xl font-medium border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
                    >
                      Choose different image
                    </button>
                  </div>
                </div>
              </div>
            )}

            {status === AppStatus.PROCESSING && (
              <div className="animate-fade-in">
                <ProcessingState />
              </div>
            )}

            {status === AppStatus.SUCCESS && resultUrl && imageState.previewUrl && (
              <ResultView 
                originalImage={imageState.previewUrl}
                resultImage={resultUrl}
                onDownload={handleDownload}
                onReset={handleReset}
              />
            )}
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-100 bg-white/50">
        <p>&copy; {new Date().getFullYear()} PureProduct AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;

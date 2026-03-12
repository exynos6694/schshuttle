import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary to-blue-600 rounded-b-[3rem] z-0" />
        <div className="relative z-10 flex flex-col h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

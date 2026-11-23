import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftDock from '../components/layout/LeftDock';
import ParticleBackground from '../components/common/ParticleBackground';

export const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-row overflow-x-hidden p-1 sm:p-3 relative theme-canvas-light theme-canvas-dark transition-colors duration-300">
      {/* Visual Ambient Ember Particle Canvas */}
      <ParticleBackground />

      {/* Floating Left Pill Navigation Dock */}
      <LeftDock />

      {/* Main Active Page View */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;

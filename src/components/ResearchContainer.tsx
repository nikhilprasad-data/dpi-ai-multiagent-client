
import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import type { PipelineStatus } from '../types/research';
import '../styles/researchContainer.css';

interface ResearchContainerProps {
  children: ReactNode;
  status: PipelineStatus;
}

const STATUS_LABEL: Record<PipelineStatus, string> = {
  idle: 'Ready',
  loading: 'Researching...',
  success: 'Done',
  error: 'Error',
};

export default function ResearchContainer({ children, status }: ResearchContainerProps) {
  return (
    <div className="research-wrapper">

      <Toaster position="top-center" />

      <div className="research-inner-container">

        <header className="research-header">
          <h1 className="research-title">🌸DPI♾️ Research Agent</h1>
          <div className="research-status">
            <span className={`status-dot status-dot--${status}`}></span>
            <span className="status-text">{STATUS_LABEL[status]}</span>
          </div>
        </header>

        <main className="research-main-area">
          {children}
        </main>

      </div>
    </div>
  );
}
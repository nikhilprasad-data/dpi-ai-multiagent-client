
import React from 'react';

export type ResultVariant = 'search' | 'scraped' | 'report' | 'feedback';

interface ResultCardProps {
  variant: ResultVariant;
  icon: string;
  title: string;
  content: string;
  isMarkdown?: boolean;
}

export default function ResultCard({ variant, icon, title, content, isMarkdown }: ResultCardProps) {
  return (
    <div className={`result-row result-row--${variant}`}>

      <div className={`avatar-container avatar-container--${variant}`}>
        <span className="avatar-text">{icon}</span>
      </div>

      <div className={`result-card result-card--${variant}`}>

        <div className="result-card-header">
          <span className="result-card-title">{title}</span>
        </div>

        <div className={`result-card-content ${isMarkdown ? 'result-card-content--markdown' : ''}`}>
          {content}
        </div>

      </div>

    </div>
  );
}
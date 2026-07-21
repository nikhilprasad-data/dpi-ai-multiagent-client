
import React from 'react';
import '../styles/progressIndicator.css';

export interface PipelineStage {
  key: string;
  label: string;
  icon: string;
  durationMs: number; // approx. hold time, used by Root's timer
}

export const PIPELINE_STAGES: PipelineStage[] = [
  { key: 'planner',  label: 'Planner',            icon: '🧠', durationMs: 1500 },
  { key: 'search',   label: 'Search',             icon: '🔍', durationMs: 3000 },
  { key: 'research', label: 'Research / Analysis', icon: '📚', durationMs: 5000 },
  { key: 'writer',   label: 'Writer',              icon: '✍️', durationMs: 6500 },
  { key: 'critic',   label: 'Critic / Reviewer',   icon: '🔎', durationMs: 4000 },
  { key: 'finalize', label: 'Finalizing',          icon: '✅', durationMs: 1500 },
];

interface ProgressIndicatorProps {
  isLoading: boolean;
  currentStage: number;   // index into PIPELINE_STAGES
  stageProgress: number;  // 0-100, fill amount for the CURRENT stage's bar
}

function stageStatus(index: number, currentStage: number): 'done' | 'active' | 'pending' {
  if (index < currentStage) return 'done';
  if (index === currentStage) return 'active';
  return 'pending';
}

export default function ProgressIndicator({
  isLoading,
  currentStage,
  stageProgress,
}: ProgressIndicatorProps) {
  if (!isLoading) return null;

  return (
    <div className="progress-indicator-wrapper">
      {PIPELINE_STAGES.map((stage, index) => {
        const status = stageStatus(index, currentStage);
        const fill = status === 'done' ? 100 : status === 'active' ? stageProgress : 0;

        return (
          <div key={stage.key} className={`progress-stage-row progress-stage-row--${status}`}>
            <div className="progress-stage-marker">
              {status === 'done' ? '✓' : status === 'active' ? stage.icon : '○'}
            </div>
            <div className="progress-stage-body">
              <span className="progress-stage-label">{stage.label}</span>
              <div className="progress-stage-bar-track">
                <div
                  className="progress-stage-bar-fill"
                  style={{ width: `${fill}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
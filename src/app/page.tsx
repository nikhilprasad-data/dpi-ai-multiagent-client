
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import ResearchContainer from '../components/ResearchContainer';
import TopicForm from '../components/TopicForm';
import ProgressIndicator, { PIPELINE_STAGES } from '../components/ProgressIndicator';
import ChatMessages from '../components/ChatMessages';
import Footer from '../components/Footer';
import { useResearchPipeline } from '../hooks/useResearchPipeline';

export default function Root() {
  const { status, result, error, startResearch } = useResearchPipeline();

  // --- Stage-timer state (owned here, not inside ProgressIndicator) ---
  const [currentStage, setCurrentStage] = useState(0);
  const [stageProgress, setStageProgress] = useState(0);
  const stageStartRef = useRef<number>(0);

useEffect(() => {
  if (status !== 'loading') return;

  const cumulative: number[] = [];
  let sum = 0;
  for (const s of PIPELINE_STAGES) {
    cumulative.push(sum);
    sum += s.durationMs;
  }

  setCurrentStage(0);
  setStageProgress(0);
  const startTime = Date.now();

  const tick = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const last = PIPELINE_STAGES.length - 1;

    let stageIndex = last;
    for (let i = 0; i < PIPELINE_STAGES.length; i++) {
      const stageEnd = cumulative[i] + PIPELINE_STAGES[i].durationMs;
      if (elapsed < stageEnd) {
        stageIndex = i;
        break;
      }
    }

    const stageElapsed = elapsed - cumulative[stageIndex];
    const pct = Math.min(100, (stageElapsed / PIPELINE_STAGES[stageIndex].durationMs) * 100);

    setCurrentStage(stageIndex);
    setStageProgress(pct);
  }, 100);

  return () => clearInterval(tick);
}, [status]);

  // snap the indicator to "done" the moment the real response lands,
  // instead of waiting for the fake timer to visually catch up
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      setCurrentStage(PIPELINE_STAGES.length - 1);
      setStageProgress(100);
    }
  }, [status]);

  const handleSubmit = useCallback((topic: string) => {
    startResearch(topic);
  }, [startResearch]);

  return (
    <ResearchContainer status={status}>

      {status === 'idle' && (
        <div className="idle-state">
          <h2>What would you like researched?</h2>
          <p>Enter a topic below and the agents will get to work.</p>
        </div>
      )}

      {status === 'loading' && (
        <ProgressIndicator
          isLoading={true}
          currentStage={currentStage}
          stageProgress={stageProgress}
        />
      )}

      {status === 'error' && (
        <div className="error-state">
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      )}

      {status === 'success' && result && (
        <ChatMessages result={result} />
      )}

      <TopicForm onSubmit={handleSubmit} isLoading={status === 'loading'} />

      <Footer />

    </ResearchContainer>
  );
}
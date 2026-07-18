
import React from 'react';
import type { TopicResponse } from '../types/research';
import ResultCard from './ResultCard';
import '../styles/chatMessages.css';

interface ChatMessagesProps {
  result: TopicResponse | null;
}

export default function ChatMessages({ result }: ChatMessagesProps) {
  if (!result) return null;

  return (
    <div className="chat-messages-container">
      <div className="messages-wrapper">

        <ResultCard
          variant="search"
          icon="🔍"
          title="Search Results"
          content={result.search_results}
        />

        <ResultCard
          variant="scraped"
          icon="📚"
          title="Scraped Content"
          content={result.scraped_content}
        />

        <ResultCard
          variant="report"
          icon="✍️"
          title="Report"
          content={result.report}
          isMarkdown
        />

        <ResultCard
          variant="feedback"
          icon="🔎"
          title="Critic Feedback"
          content={result.feedback}
        />

      </div>
    </div>
  );
}

import React, { useState, KeyboardEvent } from 'react';
import '../styles/topicForm.css';

interface TopicFormProps {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
}

export default function TopicForm({ onSubmit, isLoading }: TopicFormProps) {

  const [inputText, setInputText] = useState('');

  const handleSubmit = () => {
    if (inputText.trim() !== '' && !isLoading) {
      onSubmit(inputText.trim());
      setInputText('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="topic-form-wrapper">

      <div className="topic-form-container">
        <textarea
          className="topic-textarea"
          placeholder="Enter a topic to research..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          rows={1}
        />

        <button
          className="topic-submit-button"
          onClick={handleSubmit}
          disabled={inputText.trim() === '' || isLoading}
          aria-label="Start research"
        >
          <span className="submit-icon-placeholder">
            {isLoading ? 'Researching...' : 'Research'}
          </span>
        </button>
      </div>

    </div>
  );
}
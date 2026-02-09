import { useState } from "react";
import type { VoiceRecorderProps } from "./VoiceRecorder.types";

export default function VoiceRecorder({
  onStart,
  onStop,
  recording: recordingProp,
  disabled = false,
  color,
  className = "",
  "aria-label": ariaLabel,
}: VoiceRecorderProps) {
  const [recording, setRecording] = useState(false);
  const isRecording = recordingProp ?? recording;

  const handleClick = () => {
    if (disabled) return;
    const next = !isRecording;
    if (recordingProp === undefined) setRecording(next);
    if (next) onStart?.();
    else onStop?.();
  };

  const accentStyle = color ? { "--vk-voicerecorder-accent": color } as React.CSSProperties : undefined;

  return (
    <button
      type="button"
      className={`vk-voicerecorder ${isRecording ? "vk-voicerecorder--recording" : ""} ${disabled ? "vk-voicerecorder--disabled" : ""} ${className}`.trim()}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel ?? (isRecording ? "Stop recording" : "Start recording")}
      style={accentStyle}
    >
      <span className="vk-voicerecorder-mic" aria-hidden>
        {isRecording ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <rect x="6" y="6" width="12" height="12" rx="2" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="22" />
          </svg>
        )}
      </span>
    </button>
  );
}

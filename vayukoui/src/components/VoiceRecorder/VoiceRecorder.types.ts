export interface VoiceRecorderProps {
  onStart?: () => void;
  onStop?: () => void;
  recording?: boolean;
  disabled?: boolean;
  /** Mic / active color */
  color?: string;
  className?: string;
  "aria-label"?: string;
}

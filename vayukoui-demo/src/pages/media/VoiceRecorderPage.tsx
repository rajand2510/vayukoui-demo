import { useState } from "react";
import { VoiceRecorder } from "@vayuko/ui";
import { PageLayout } from "../../components/PageLayout";
import { PropControl } from "../../components/PropControl";
import { ColorPicker } from "../../components/ColorPicker";

export default function VoiceRecorderPage() {
  const [recording, setRecording] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [color, setColor] = useState("#2563eb");

  const code = `const [recording, setRecording] = useState(false);

<VoiceRecorder
  recording={recording}
  onStart={() => setRecording(true)}
  onStop={() => setRecording(false)}
  disabled={${disabled}}
  color=${JSON.stringify(color)}
  aria-label="Voice recorder"
/>`;

  return (
    <PageLayout
      title="VoiceRecorder"
      description="Mic UI for voice recording with onStart/onStop callbacks."
      code={code}
      preview={
        <div className="flex flex-wrap items-center gap-4">
          <VoiceRecorder
            recording={recording}
            onStart={() => setRecording(true)}
            onStop={() => setRecording(false)}
            disabled={disabled}
            color={color}
            aria-label="Voice recorder"
          />
          <p className="text-sm text-slate-500">
            {recording ? "Recording…" : "Idle — click mic to toggle"}
          </p>
        </div>
      }
      props={
        <>
          <PropControl label="Recording (controlled)">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="demo-checkbox"
                checked={recording}
                onChange={(e) => setRecording(e.target.checked)}
              />
              <span className="text-sm">Recording state</span>
            </label>
          </PropControl>
          <PropControl label="Color">
            <ColorPicker value={color} onChange={setColor} aria-label="Voice recorder color" />
          </PropControl>
          <PropControl label="Disabled">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="demo-checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
              />
              <span className="text-sm">Disabled</span>
            </label>
          </PropControl>
        </>
      }
    />
  );
}

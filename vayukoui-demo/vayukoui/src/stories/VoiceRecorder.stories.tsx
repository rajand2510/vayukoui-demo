import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { VoiceRecorder } from "../index";

const meta = {
  title: "Components/VoiceRecorder",
  component: VoiceRecorder,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof VoiceRecorder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "aria-label": "Start recording",
  },
};

export const Recording: Story = {
  args: {
    recording: true,
    "aria-label": "Stop recording",
  },
};

export const WithColor: Story = {
  args: {
    color: "#059669",
    "aria-label": "Start recording",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    "aria-label": "Start recording",
  },
};

export const Controlled: Story = {
  render: function ControlledVoiceRecorder() {
    const [recording, setRecording] = useState(false);
    return (
      <div>
        <VoiceRecorder
          recording={recording}
          onStart={() => setRecording(true)}
          onStop={() => setRecording(false)}
          aria-label={recording ? "Stop recording" : "Start recording"}
        />
        <p style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
          Status: {recording ? "Recording…" : "Idle"}
        </p>
      </div>
    );
  },
};

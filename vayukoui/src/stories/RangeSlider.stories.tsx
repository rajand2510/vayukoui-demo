import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { RangeSlider } from "../index";
import type { RangeValue } from "../index";

const meta = {
  title: "Components/RangeSlider",
  component: RangeSlider,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["small", "medium"] },
  },
} satisfies Meta<typeof RangeSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: { from: 20, to: 80 },
    label: "Range",
    unit: "gm",
  },
};

export const WithMarks: Story = {
  args: {
    min: 0,
    max: 100,
    step: 10,
    defaultValue: { from: 20, to: 80 },
    marks: true,
    label: "Temperature range",
    getAriaValueText: (v) => `${v}°C`,
  },
};

export const CustomMarks: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: { from: 20, to: 37 },
    marks: [
      { value: 0, label: "0°C" },
      { value: 20, label: "20°C" },
      { value: 37, label: "37°C" },
      { value: 100, label: "100°C" },
    ],
    label: "Range",
    getAriaValueText: (v) => `${v}°C`,
  },
};

export const SmallSize: Story = {
  args: {
    min: 0,
    max: 50,
    defaultValue: { from: 10, to: 40 },
    size: "small",
    label: "Small range",
  },
};

export const MinDistance: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: { from: 10, to: 90 },
    minDistance: 20,
    label: "Minimum distance 20",
  },
};

export const DisableSwap: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: { from: 30, to: 70 },
    disableSwap: true,
    label: "Disable swap",
  },
};

export const Disabled: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: { from: 25, to: 75 },
    disabled: true,
    label: "Disabled range",
  },
};

export const Controlled: Story = {
  args: { min: 0, max: 100 },
  render: function ControlledRange() {
    const [value, setValue] = useState<RangeValue>({ from: 20, to: 80 });
    return (
      <div className="w-80">
        <RangeSlider
          min={0}
          max={100}
          value={value}
          onChange={setValue}
          label="Controlled range"
          getAriaValueText={(v) => `${v}`}
        />
        <p className="mt-2 text-sm text-gray-500">
          From: {value.from} – To: {value.to}
        </p>
      </div>
    );
  },
};

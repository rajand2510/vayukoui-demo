import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Slider, RangeSlider } from "../index";

const meta = {
  title: "Components/Slider",
  component: Slider,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["small", "medium"] },
    valueLabelDisplay: { control: "select", options: ["on", "auto", "off"] },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: 50,
    "aria-label": "Default slider",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Volume",
    min: 0,
    max: 100,
    defaultValue: 70,
    valueLabelDisplay: "auto",
    "aria-label": "Volume",
  },
};

export const SmallSize: Story = {
  args: {
    size: "small",
    label: "Small",
    defaultValue: 70,
    valueLabelDisplay: "auto",
    min: 0,
    max: 100,
    "aria-label": "Small slider",
  },
};

export const WithMarks: Story = {
  args: {
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 30,
    marks: true,
    valueLabelDisplay: "auto",
    getAriaValueText: (v) => `${v}°C`,
    "aria-label": "Temperature",
  },
};

export const CustomMarks: Story = {
  args: {
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 20,
    marks: [
      { value: 0, label: "0°C" },
      { value: 20, label: "20°C" },
      { value: 37, label: "37°C" },
      { value: 100, label: "100°C" },
    ],
    valueLabelDisplay: "auto",
    getAriaValueText: (v) => `${v}°C`,
    "aria-label": "Custom marks",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    defaultValue: 30,
    disabled: true,
    min: 0,
    max: 100,
    "aria-label": "Disabled slider",
  },
};

export const Controlled: Story = {
  render: function ControlledSlider() {
    const [value, setValue] = useState(50);
    return (
      <div className="w-64">
        <Slider
          min={0}
          max={100}
          value={value}
          onChange={setValue}
          label="Controlled"
          valueLabelDisplay="on"
          aria-label="Controlled"
        />
        <p className="mt-2 text-sm text-gray-500">Value: {value}</p>
      </div>
    );
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { RadioGroup } from "../index";

const options = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C" },
];

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "pill", "card"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "choice",
    options,
    "aria-label": "Choose option",
  },
};

export const Pill: Story = {
  args: {
    name: "choice-pill",
    options,
    variant: "pill",
    defaultValue: "b",
    "aria-label": "Choose option",
  },
};

export const Card: Story = {
  args: {
    name: "choice-card",
    options,
    variant: "card",
    defaultValue: "a",
    "aria-label": "Choose option",
  },
};

export const WithColor: Story = {
  args: {
    name: "choice-color",
    options,
    variant: "pill",
    defaultValue: "b",
    color: "#059669",
    "aria-label": "Choose option",
  },
};

export const Disabled: Story = {
  args: {
    name: "choice-disabled",
    options,
    defaultValue: "a",
    disabled: true,
    "aria-label": "Choose option",
  },
};

export const Controlled: Story = {
  args: { name: "choice-controlled", options },
  render: function ControlledRadioGroup() {
    const [value, setValue] = useState("a");
    return (
      <div>
        <RadioGroup
          name="choice-controlled"
          options={options}
          value={value}
          onChange={setValue}
          aria-label="Choose option"
        />
        <p style={{ marginTop: 8, fontSize: 12, color: "#666" }}>Selected: {value}</p>
      </div>
    );
  },
};

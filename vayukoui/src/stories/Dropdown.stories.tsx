import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Dropdown } from "../index";
import type { DropdownOption } from "../index";

const simpleOptions: DropdownOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
];

const optionsWithIcons: DropdownOption[] = [
  { value: "edit", label: "Edit", icon: "✏️" },
  { value: "delete", label: "Delete", icon: "🗑️" },
  { value: "share", label: "Share", icon: "📤" },
];

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    searchable: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: simpleOptions,
    placeholder: "Select fruit",
    "aria-label": "Fruit",
  },
};

export const Searchable: Story = {
  args: {
    options: simpleOptions,
    searchable: true,
    placeholder: "Search and select…",
    "aria-label": "Fruit",
  },
};

export const WithIcons: Story = {
  args: {
    options: optionsWithIcons,
    placeholder: "Choose action",
    "aria-label": "Actions",
  },
};

export const WithColor: Story = {
  args: {
    options: simpleOptions,
    placeholder: "Select",
    color: "#059669",
    "aria-label": "Fruit",
  },
};

export const Disabled: Story = {
  args: {
    options: simpleOptions,
    defaultValue: "banana",
    disabled: true,
    "aria-label": "Fruit",
  },
};

export const Controlled: Story = {
  args: { options: simpleOptions },
  render: function ControlledDropdown() {
    const [value, setValue] = useState("banana");
    return (
      <div style={{ minWidth: 200 }}>
        <Dropdown
          options={simpleOptions}
          value={value}
          onChange={setValue}
          placeholder="Select fruit"
          aria-label="Fruit"
        />
        <p style={{ marginTop: 8, fontSize: 12, color: "#666" }}>Selected: {value}</p>
      </div>
    );
  },
};

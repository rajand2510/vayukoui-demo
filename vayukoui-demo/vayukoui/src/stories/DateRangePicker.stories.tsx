import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DateRangePicker } from "../index";
import type { DateRangeValue } from "../index";

const today = new Date();

const meta = {
  title: "Components/DateRangePicker",
  component: DateRangePicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholderFrom: "From",
    placeholderTo: "To",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: {
      from: new Date(today.getFullYear(), today.getMonth(), 10),
      to: new Date(today.getFullYear(), today.getMonth(), 20),
    },
    placeholderFrom: "From",
    placeholderTo: "To",
  },
};

export const FutureOnly: Story = {
  args: {
    minDate: today,
    placeholderFrom: "From",
    placeholderTo: "To",
  },
};

export const WithColor: Story = {
  args: {
    color: "#7c3aed",
    placeholderFrom: "From",
    placeholderTo: "To",
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: {
      from: new Date(today.getFullYear(), today.getMonth(), 1),
      to: new Date(today.getFullYear(), today.getMonth(), 15),
    },
    disabled: true,
  },
};

export const Controlled: Story = {
  args: {},
  render: function ControlledDateRangePicker() {
    const [range, setRange] = useState<DateRangeValue>({ from: null, to: null });
    return (
      <div>
        <DateRangePicker
          value={range}
          onChange={setRange}
          placeholderFrom="From"
          placeholderTo="To"
        />
        <p style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
          From: {range.from ? range.from.toLocaleDateString() : "—"} · To:{" "}
          {range.to ? range.to.toLocaleDateString() : "—"}
        </p>
      </div>
    );
  },
};

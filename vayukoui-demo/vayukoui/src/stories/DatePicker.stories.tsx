import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DatePicker } from "../index";

const today = new Date();
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);
const lastWeek = new Date(today);
lastWeek.setDate(today.getDate() - 7);

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Select date",
    "aria-label": "Date",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: today,
    placeholder: "Select date",
    "aria-label": "Date",
  },
};

export const PastOnly: Story = {
  args: {
    maxDate: today,
    placeholder: "Past dates only",
    "aria-label": "Date",
  },
};

export const FutureOnly: Story = {
  args: {
    minDate: today,
    placeholder: "Future dates only",
    "aria-label": "Date",
  },
};

export const WithRange: Story = {
  args: {
    minDate: lastWeek,
    maxDate: nextWeek,
    placeholder: "Within a week",
    "aria-label": "Date",
  },
};

export const CustomDisable: Story = {
  args: {
    disableDates: (date) => date.getDay() === 0 || date.getDay() === 6,
    placeholder: "Weekdays only",
    "aria-label": "Date",
  },
};

export const WithColor: Story = {
  args: {
    placeholder: "Select date",
    color: "#059669",
    "aria-label": "Date",
  },
};

export const WithTime: Story = {
  args: {
    placeholder: "Select date and time",
    showTime: true,
    "aria-label": "Date and time",
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: today,
    disabled: true,
    "aria-label": "Date",
  },
};

export const Controlled: Story = {
  render: function ControlledDatePicker() {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div>
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder="Select date"
          aria-label="Date"
        />
        <p style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
          Selected: {date ? date.toLocaleDateString() : "—"}
        </p>
      </div>
    );
  },
};

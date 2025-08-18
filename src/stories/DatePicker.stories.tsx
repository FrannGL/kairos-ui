import { useState } from "react";
import { Dayjs } from "dayjs";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { DateRangePicker } from "@/components/DateRangePicker";

const meta: Meta<typeof DateRangePicker> = {
  title: "Components/DateRangePicker",
  component: DateRangePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<[Dayjs | null, Dayjs | null]>([
      null,
      null,
    ]);

    return (
      <div style={{ width: 300 }}>
        <DateRangePicker
          label="Seleccionar rango de fechas"
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState<[Dayjs | null, Dayjs | null]>([
      null,
      null,
    ]);

    return (
      <div style={{ width: 300 }}>
        <DateRangePicker
          label="Rango de fechas"
          value={value}
          onChange={setValue}
          error="Fecha inválida"
          touched
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState<[Dayjs | null, Dayjs | null]>([
      null,
      null,
    ]);

    return (
      <div style={{ width: 300 }}>
        <DateRangePicker
          label="Rango de fechas"
          value={value}
          onChange={setValue}
          disabled
        />
      </div>
    );
  },
};

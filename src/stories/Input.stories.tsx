import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "@/components/Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: 300 }}>
        <Input label="Nombre" value={value} onChange={setValue} />
      </div>
    );
  },
};

export const OnlyNumber: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: 300 }}>
        <Input label="Edad" type="number" value={value} onChange={setValue} />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [touched, setTouched] = useState(true);
    const [error, setError] = useState("Valor inválido");

    const handleChange = (val: string) => {
      setValue(val);

      if (val.trim() !== "") {
        setTouched(false);
        setError("");
      }
    };

    return (
      <div style={{ width: 300 }}>
        <Input
          label="Nombre y Apellido"
          value={value}
          onChange={handleChange}
          touched={touched}
          error={error}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: 300 }}>
        <Input label="Nombre" value={value} onChange={setValue} disabled />
      </div>
    );
  },
};

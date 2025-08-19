import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select, type SelectOption } from "@/components/Select";

const options: SelectOption[] = [
  { value: "mx", label: "México" },
  { value: "ar", label: "Argentina" },
  { value: "us", label: "Estados Unidos" },
];

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string | number>("");
    return (
      <div style={{ width: 300 }}>
        <Select
          label="País"
          value={value}
          options={options}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState<string | number>("");
    const [touched, setTouched] = useState(true);
    const error = touched && !value ? "Debe seleccionar un país" : undefined;

    const handleChange = (val: string | number) => {
      setValue(val);
      setTouched(false);
    };

    return (
      <div style={{ width: 300 }}>
        <Select
          label="País"
          value={value}
          options={options}
          onChange={handleChange}
          error={error}
          touched={touched}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState<string | number>("ar");
    return (
      <div style={{ width: 300 }}>
        <Select
          label="País"
          value={value}
          options={options}
          onChange={setValue}
          disabled
        />
      </div>
    );
  },
};

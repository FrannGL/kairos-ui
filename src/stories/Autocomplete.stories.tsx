// import { userEvent, within } from "@storybook/testing-library";
// import { expect } from "@storybook/jest";
import { useState } from "react";
import { Autocomplete } from "../components/Autocomplete";
import type { Meta, StoryObj } from "@storybook/react-vite";

interface Option {
  id: number;
  label: string;
}

const options: Option[] = [
  { id: 1, label: "Alpha" },
  { id: 2, label: "Beta" },
  { id: 3, label: "Gamma" },
  { id: 4, label: "Delta" },
  { id: 5, label: "Epsilon" },
];

const meta: Meta<typeof Autocomplete> = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Autocomplete>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<Option | null>(null);

    return (
      <div style={{ width: 300 }}>
        <Autocomplete<Option>
          label="Sub-producto"
          value={value}
          onChange={setValue}
          options={options}
          getOptionLabel={(opt) => opt.label}
          getOptionValue={(opt) => opt.id}
        />
      </div>
    );
  },
  // play: async ({ canvasElement }) => {
  //   const canvas = within(canvasElement);

  //   const input = canvas.getByLabelText("Sub-producto");
  //   await userEvent.click(input);

  //   const optionBeta = await canvas.getByText("Beta");
  //   await userEvent.click(optionBeta);

  //   await expect(input).toHaveValue("Beta");
  // },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState<Option | null>(null);

    return (
      <div style={{ width: 300 }}>
        <Autocomplete<Option>
          label="Sub-producto"
          value={value}
          onChange={setValue}
          options={options}
          getOptionLabel={(opt) => opt.label}
          getOptionValue={(opt) => opt.id}
          error="Campo obligatorio"
          touched
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState<Option | null>(null);

    return (
      <div style={{ width: 300 }}>
        <Autocomplete<Option>
          label="Sub-producto"
          value={value}
          onChange={setValue}
          options={options}
          getOptionLabel={(opt) => opt.label}
          getOptionValue={(opt) => opt.id}
          disabled
        />
      </div>
    );
  },
};

import { Select } from "antd";

export const SelectGeneral = ({
  className,
  defaultValue,
  onChange,
  onClick,
  onBlur,
  size,
  placeholder,
  options,
  value,
}: {
  size?: "large" | "small" | "middle";
  className?: string;
  placeholder?: string;
  defaultValue?: string | number | string[];
  onChange?: (value: string | number | string[] | any) => void;
  options?: { label: string; value: string | number }[] | any;
  onClick?: () => void;
  onBlur?: () => void;
  value?: number;
}) => {
  return (
    <Select
      size={size}
      className={className}
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
      onClick={onClick}
      onBlur={onBlur}
      placeholder={placeholder}
      value={value}
    />
  );
};

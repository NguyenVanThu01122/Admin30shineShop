import { Form, Input } from "antd";

function CustomFormItem({ name, label, rules }: any) {
  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Input />
    </Form.Item>
  );
}

export default CustomFormItem;

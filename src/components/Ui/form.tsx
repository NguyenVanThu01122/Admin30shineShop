import { Form, FormInstance } from "antd";
import { FormLayout } from "antd/es/form/Form";
import { ReactNode } from "react";
interface FormGeneralProps {
  children: ReactNode;
  form: FormInstance<any>;
  onFinish: (values: any) => void;
  size?: "large" | "middle" | "small" | undefined;
  layout?: FormLayout | undefined;
  className?: string | undefined;
  name?: string;
  scrollToFirstError?: any;
  labelCol?: any;
  wrapperCol?: any;
}
export const FormGeneral = ({
  children,
  form,
  onFinish,
  size,
  layout,
  className,
  name,
  scrollToFirstError,
  labelCol,
  wrapperCol,
}: FormGeneralProps) => {
  return (
    <Form
      form={form}
      onFinish={onFinish}
      size={size}
      layout={layout}
      name={name}
      scrollToFirstError={scrollToFirstError}
      className={className}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
    >
      {children}
    </Form>
  );
};

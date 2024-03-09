import { Modal } from "antd";
interface CommonModalProps {
  children?: React.ReactNode;
  modalTitle?: string;
  onCancel: () => void;
  onOk?: () => void;
  open?: boolean;
  footer?: React.ReactNode;
  width?: number;
  centered?: boolean;
  style?: React.CSSProperties;
  className?: string;
  title?: string;
}
export const CommonModal = ({
  children,
  title,
  onOk,
  onCancel,
  footer,
  width,
  centered,
  style,
  className,
  open,
}: CommonModalProps) => {
  return (
    <Modal
      width={width}
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      footer={footer}
      style={style}
      className={className}
      centered={centered}
    >
      {children}
    </Modal>
  );
};

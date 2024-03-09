import { Table, TablePaginationConfig } from "antd";

export const TableGeneral = ({
  loading,
  className,
  pagination,
  scroll,
  dataSource,
  columns,
  size,
}: {
  loading: boolean;
  className?: string;
  pagination?: TablePaginationConfig | false;
  scroll?: { x?: number | true | string; y?: number | true | string } | any;
  dataSource?: any[];
  columns?: any[];
  size?: "small" | "large" | "middle";
}) => {
  return (
    <Table
      loading={loading}
      className={className}
      pagination={pagination}
      scroll={scroll}
      dataSource={dataSource}
      columns={columns}
      size={size}
    ></Table>
  );
};

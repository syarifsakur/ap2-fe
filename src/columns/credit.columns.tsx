import { Button, Tooltip, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { MdDelete } from "react-icons/md";
import type { Credit } from "../types/credit";
import dayjs from "dayjs";

export const creditColumns: (pagination: {
  current: number;
  pageSize: number;
  onDelete: (value: string) => void;
  onEdit: (value: string) => void;
}) => ColumnsType<Credit> = ({ current, pageSize, onDelete }) => [
  {
    key: "no",
    title: "NO.",
    render: (_, __, index) => {
      return (current - 1) * pageSize + index + 1;
    },
    align: "center",
  },
  {
    title: "Tanggal",
    dataIndex: "createdAt",
    key: "createdAt",
    align: "center",
    render: (value) => <span>{dayjs(value).format("YYYY-MM-DD")}</span>,
  },
  {
    title: "Nama",
    dataIndex: "name",
    key: "name",
    align: "center",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "center",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "No. HP",
    dataIndex: "no_hp",
    key: "no_hp",
    align: "center",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Alamat",
    dataIndex: "address",
    key: "address",
    align: "center",
    render: (text) => <span>{text}</span>,
  },
    {
    title: "Kategori",
    dataIndex: "category",
    key: "category",
    align: "center",
    render: (text) => <span>{text}</span>,
  },
{
  title: "Unit",
  dataIndex: "unit_id",
  key: "unit_id",
  align: "center",
  render: (_: any, record: any) => (
    <span>{record.unit?.type_name || "-"}</span>
  ),
},

  {
    title: "Down Payment",
    dataIndex: "down_payment",
    key: "down_payment",
    align: "center",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Tenor",
    dataIndex: "tenor_amount",
    key: "tenor_amount",
    align: "center",
    render: (text) => <span>{text}</span>,
  },
  {
    key: "uuid",
    title: "AKSI",
    dataIndex: "uuid",
    align: "center",
    render(value, record) {
      return (
        <div className="space-x-2 text-center">
          <Popconfirm
            title={`Yakin menghapus kredit ${record.name}?`}
            onConfirm={() => onDelete(value)}
            okText="Ya"
            cancelText="Tidak"
          >
            <Tooltip title="Delete" overlayInnerStyle={{ color: "white" }}>
              <Button htmlType="button" type="text" className="cursor-pointer">
                <MdDelete className="text-lg text-red-600" />
              </Button>
            </Tooltip>
          </Popconfirm>
        </div>
      );
    },
  },
];

import { Button, Tooltip, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { MdDelete, MdEdit } from "react-icons/md";
import type { Credit } from "../types/credit";

export const creditColumns: (pagination: {
  current: number;
  pageSize: number;
  onDelete: (value: string) => void;
  onEdit: (value: string) => void;
}) => ColumnsType<Credit> = ({ current, pageSize, onDelete, onEdit }) => [
  {
    key: "no",
    title: "NO.",
    render: (_, __, index) => {
      return (current - 1) * pageSize + index + 1;
    },
    align: "center",
  },
  {
    title: "Nama",
    dataIndex: "name",
    key: "name",
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
    title: "Provinsi",
    dataIndex: "province",
    key: "province",
    align: "center",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Kota",
    dataIndex: "city",
    key: "city",
    align: "center",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Kategori",
    dataIndex: "category_motor",
    key: "category_motor",
    align: "center",
    render: (text) => <span>{text}</span>,
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
          <Tooltip title="Edit" overlayInnerStyle={{ color: 'blue' }}>
            <Button
              htmlType="button"
              type="text"
              className="cursor-pointer text-blue-600 hover:text-blue-800"
              onClick={() => onEdit(value)}
            >
              <MdEdit className="text-lg text-blue-600" />
            </Button>
          </Tooltip>
          <Popconfirm
            title={`Yakin menghapus kredit ${record.name}?`}
            onConfirm={() => onDelete(value)}
            okText="Ya"
            cancelText="Tidak"
          >
            <Tooltip title="Delete" overlayInnerStyle={{ color: 'red' }}>
              <Button
                htmlType="button"
                type="text"
                className="cursor-pointer text-red-600 hover:text-red-800"
              >
                <MdDelete className="text-lg text-red-600" />
              </Button>
            </Tooltip>
          </Popconfirm>
        </div>
      );
    },
  },
];


import { Button, Tooltip, Popconfirm, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import type { Part } from "../types/part";

export const partColumns: (pagination: {
  current: number;
  pageSize: number;
  onDelete: (value: string) => void;
  onEdit: (value: string) => void;
}) => ColumnsType<Part> = ({ current, pageSize, onDelete, onEdit }) => [
  {
    key: "no",
    title: "NO.",
    render: (_, __, index) => {
      return (current - 1) * pageSize + index + 1;
    },
    align: "center",
  },
  {
    title: "No. Part",
    dataIndex: "no_part",
    key: "no_part",
    align: "center",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Nama Part",
    dataIndex: "name_part",
    key: "name_part",
    align: "center",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Ukuran",
    dataIndex: "size",
    key: "size",
    align: "center",
    render: (text) => <span>{text || "-"}</span>,
  },
  {
    title: "Harga",
    dataIndex: "price",
    key: "price",
    align: "center",
    render: (value) => (
      <span>
        Rp {Number(value).toLocaleString("id-ID", { minimumFractionDigits: 0 })}
      </span>
    ),
  },
  {
    title: "Gambar",
    dataIndex: "img",
    key: "img",
    align: "center",
    render: (_, record) =>
      record.path_img ? (
        <Image
          src={record.path_img}
          alt={record.name_part}
          width={60}
          height={60}
          style={{ objectFit: "cover", borderRadius: 8 }}
        />
      ) : (
        <span>-</span>
      ),
  },
  {
    key: "uuid",
    title: "AKSI",
    dataIndex: "uuid",
    align: "center",
    render(value, record) {
      return (
        <div className="flex justify-center space-x-2">
          <Tooltip title="Edit" overlayInnerStyle={{ color: "white" }}>
            <Button
              htmlType="button"
              type="text"
              onClick={() => onEdit(value)}
              className="cursor-pointer"
            >
              <MdEdit className="text-lg text-blue-600" />
            </Button>
          </Tooltip>
          <Popconfirm
            title={`Yakin menghapus part ${record.name_part}?`}
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

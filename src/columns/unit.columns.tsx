import { Button, Tooltip, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import type { Products } from "../types";

export const unitColumns: (pagination: {
  current: number;
  pageSize: number;
  onDelete: (value: string) => void;
  onEdit: (value: string) => void;
  onDetail: (value: string) => void;
}) => ColumnsType<Products> = ({
  current,
  pageSize,
  onDelete,
  onEdit,
  onDetail,
}) => [
  {
    key: "no",
    title: "NO.",
    render: (_, __, index) => {
      return (current - 1) * pageSize + index + 1;
    },
    align: "center",
  },
  {
    title: "Nama Tipe",
    dataIndex: "type_name",
    key: "type_name",
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
    title: "Harga",
    dataIndex: "price",
    key: "price",
    align: "center",
    render: (price) => (
      <span>Rp {parseInt(price).toLocaleString("id-ID")}</span>
    ),
  },
  {
    title: "Gambar",
    dataIndex: "path_img",
    key: "path_img",
    align: "center",
    render: (path_img) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={path_img} alt="Unit Image" className="w-32 h-32" />
      </div>
    ),
  },
  {
    title: "Stok",
    dataIndex: "stok",
    key: "stok",
    align: "center",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Status",
    dataIndex: "ket",
    key: "ket",
    align: "center",
    render: (value) => {
      if (value == "ready") {
        return (
          <div className="bg-green-500 px-2 py-1 rounded-md">
            <h1 className="text-white font-semibold">{value}</h1>
          </div>
        );
      } else if (value == "sold") {
        return (
          <div className="bg-red-500 px-2 py-1 rounded-md">
            <h1 className="text-white font-semibold">{value}</h1>
          </div>
        );
      } else {
        return (
          <div className="bg-yellow-500 px-2 py-1 rounded-md">
            <h1 className="text-white font-semibold">{value}</h1>
          </div>
        );
      }
    },
  },
  {
    key: "uuid",
    title: "AKSI",
    dataIndex: "uuid",
    align: "center",
    render(value, record) {
      return (
        <div className="space-x-2 text-center">
          <Tooltip title="Detail">
            <Button
              htmlType="button"
              type="text"
              className="cursor-pointer text-green-600 hover:text-green-800"
              onClick={() => onDetail(value)}
            >
              <IoMdEye className="text-lg text-green-600" />
            </Button>
          </Tooltip>
          <Tooltip title="Edit">
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
            title={`Yakin menghapus surat ${record.type_name}?`}
            onConfirm={() => onDelete(value)}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button
              htmlType="button"
              type="text"
              className="cursor-pointer text-red-600 hover:text-red-800"
            >
              <MdDelete className="text-lg text-red-600" />
            </Button>
          </Popconfirm>
        </div>
      );
    },
  },
];

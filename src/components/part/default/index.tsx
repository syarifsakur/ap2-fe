import React, { useEffect, useState } from "react";
import { Table, Spin, Button } from "antd";
import { partColumns } from "../../../columns";
import {
  deletePart,
  fetchPartDefault,
  showNotification,
  showNotificationError,
} from "../../../utils";
import type { Part } from "../../../types/part";

const PartDefault: React.FC = () => {
  const [data, setData] = useState<Part[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const loadData = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await fetchPartDefault(page, limit);
      setData(response.data.response);
      setPagination({
        current: response.data.page,
        pageSize: limit,
        total: response.data.total,
      });
    } catch (error) {
      showNotificationError("Gagal mengambil data part!");
      console.error("Error fetch parts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(pagination.current, pagination.pageSize);
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deletePart(id);
      showNotification("Part berhasil dihapus!");
      loadData(pagination.current, pagination.pageSize);
    } catch (error) {
      showNotificationError("Gagal menghapus part!");
      console.error("Error delete part:", error);
    }
  };

  const handleEdit = (uuid: string) => {
    console.log("Edit part:", uuid);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Daftar Part</h1>
      <a href="/admin/part/create" className="flex justify-end mb-4">
        <Button type="primary">Create Part</Button>
      </a>

      {loading ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          rowKey="uuid"
          dataSource={data}
          columns={partColumns({
            current: pagination.current,
            pageSize: pagination.pageSize,
            onDelete: handleDelete,
            onEdit: handleEdit,
          })}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            onChange: (page, pageSize) => loadData(page, pageSize),
          }}
        />
      )}
    </div>
  );
};

export default PartDefault;

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Table, Spin, Button, Input, Grid, Space } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { partColumns } from "../../../columns";
import {
  deletePart,
  fetchPartDefault,
  showNotification,
  showNotificationError,
} from "../../../utils";
import type { Part } from "../../../types/part";
import { Link, useNavigate } from "react-router-dom";

const { useBreakpoint } = Grid;

const PartDefault: React.FC = () => {
  const [data, setData] = useState<Part[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState("");

  const screens = useBreakpoint();
  const isMobile = useMemo(() => !screens.md, [screens]);
  const searchTimer = useRef<number | null>(null);

  const loadData = async (page = 1, limit = 10, search = "") => {
    try {
      setLoading(true);
      const response = await fetchPartDefault(page, limit, search);
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

  const navigate = useNavigate();

  useEffect(() => {
    loadData(pagination.current, pagination.pageSize, searchText);
  }, []);

  useEffect(() => {
    if (searchTimer.current) window.clearTimeout(searchTimer.current);
    searchTimer.current = window.setTimeout(() => {
      loadData(1, pagination.pageSize, searchText);
    }, 500);

    return () => {
      if (searchTimer.current) window.clearTimeout(searchTimer.current);
    };
  }, [searchText]);

  useEffect(() => {
    const nextSize = isMobile ? 5 : 10;
    if (pagination.pageSize !== nextSize) {
      setPagination((p) => ({ ...p, pageSize: nextSize, current: 1 }));
      loadData(1, nextSize, searchText);
    }
  }, [isMobile]);

  const handleDelete = async (id: string) => {
    try {
      await deletePart(id);
      showNotification("Part berhasil dihapus!");
      loadData(pagination.current, pagination.pageSize, searchText);
    } catch (error) {
      showNotificationError("Gagal menghapus part!");
      console.error("Error delete part:", error);
    }
  };

  const handleEdit = (uuid: string) => {
    navigate(`/admin/part/edit/${uuid}`);
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow w-full">
      <Space
        direction={isMobile ? "vertical" : "horizontal"}
        className="w-full mb-4"
        size={isMobile ? "small" : "middle"}
        style={{ justifyContent: "space-between" }}
      >
        <Input
          allowClear
          size={isMobile ? "middle" : "large"}
          prefix={<SearchOutlined />}
          placeholder="Cari berdasarkan nama part"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={isMobile ? "w-full" : ""}
          style={{ width: isMobile ? "100%" : 320 }}
        />

        <Link to="/admin/part/create" className={isMobile ? "w-full" : ""}>
          <Button type="primary" icon={<PlusOutlined />} size={isMobile ? "middle" : "large"} block={isMobile}>
            Create Part
          </Button>
        </Link>
      </Space>

      {loading ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table
            rowKey="uuid"
            dataSource={data}
            columns={partColumns({
              current: pagination.current,
              pageSize: pagination.pageSize,
              onDelete: handleDelete,
              onEdit: handleEdit,
            })}
            size={isMobile ? "small" : "middle"}
            components={{
              header: {
                cell: (props: any) => (
                  <th
                    {...props}
                    style={{
                      backgroundColor: "#cce0ff",
                      textAlign: "center",
                      color: "black",
                      fontSize: isMobile ? 12 : 14,
                      padding: isMobile ? "8px 6px" : "12px 8px",
                    }}
                  />
                ),
              },
            }}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              onChange: (page, pageSize) => loadData(page, pageSize, searchText),
              showSizeChanger: false,
              position: isMobile ? ["bottomCenter"] : ["bottomRight"],
              responsive: true,
            }}
            scroll={{ x: "max-content" }}
          />
        </div>
      )}
    </div>
  );
};

export default PartDefault;

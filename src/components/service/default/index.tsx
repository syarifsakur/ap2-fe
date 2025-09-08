import React, { useEffect, useMemo, useRef, useState } from "react";
import { Table, Spin, Input, Grid, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { serviceColumns } from "../../../columns";
import {
  fetchService,
  deleteService,
  showNotificationError,
  showNotification,
} from "../../../utils";
import type { Service } from "../../../types/service";

const { useBreakpoint } = Grid;

const ServiceDefault: React.FC = () => {
  const [data, setData] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [searchText, setSearchText] = useState("");

  const screens = useBreakpoint();
  const isMobile = useMemo(() => !screens.md, [screens]);
  const searchTimer = useRef<number | null>(null);

  const loadData = async (search = "") => {
    try {
      setLoading(true);
      const response = await fetchService(search);
      setData(response?.data?.response ?? []);
    } catch (error) {
      showNotificationError("Gagal mengambil data service!");
      console.error("Error fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (searchTimer.current) window.clearTimeout(searchTimer.current);
    searchTimer.current = window.setTimeout(() => {
      loadData(searchText);
      setPagination((prev) => ({ ...prev, current: 1 }));
    }, 450);

    return () => {
      if (searchTimer.current) window.clearTimeout(searchTimer.current);
    };
  }, [searchText]);

  useEffect(() => {
    const nextSize = isMobile ? 5 : 10;
    if (pagination.pageSize !== nextSize) {
      setPagination((p) => ({ ...p, pageSize: nextSize, current: 1 }));
    }
  }, [isMobile]);

  const handleDelete = async (id: string) => {
    try {
      await deleteService(id);
      showNotification("Service berhasil dihapus!");
      loadData(searchText);
    } catch (error) {
      showNotificationError("Gagal menghapus service!");
      console.error("Error delete service:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow">
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
          placeholder="Cari berdasarkan nama customer"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={isMobile ? "w-full" : ""}
          style={{ width: isMobile ? "100%" : 320 }}
        />
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
            columns={serviceColumns({
              current: pagination.current,
              pageSize: pagination.pageSize,
              onDelete: handleDelete,
              onEdit: (uuid: string) => {
                console.log("Edit service:", uuid);
              },
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
            scroll={{ x: "max-content" }}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: data.length,
              onChange: (page, pageSize) => setPagination({ current: page, pageSize }),
              showSizeChanger: false,
              position: isMobile ? ["bottomCenter"] : ["bottomRight"],
              responsive: true,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ServiceDefault;

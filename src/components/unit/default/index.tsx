import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Table, Input, Modal, Card, Grid, Space, Drawer } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { unitColumns } from "../../../columns/unit.columns";
import { deleteUnit, fetchUnit } from "../../../utils/apis";
import type { Products } from "../../../types";
import ModalMachine from "../modal/machine";
import ModalFrame from "../modal/frame";
import ModalDimensions from "../modal/dimensions";
import ModalCapacity from "../modal/capacity";
import ModalElectricity from "../modal/electricity";
import { Link, useNavigate } from "react-router-dom";
import { showNotification, showNotificationError } from "../../../utils";

const { useBreakpoint } = Grid;

const tabListNoTitle = [
  { key: "Mesin", label: "Mesin" },
  { key: "Rangka", label: "Rangka" },
  { key: "Dimensi", label: "Dimensi" },
  { key: "Kapasitas", label: "Kapasitas" },
  { key: "Kelistrikan", label: "Kelistrikan" },
];

const DefaultUnit: React.FC = () => {
  const [units, setUnits] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Products | null>(null);
  const [activeTabKey2, setActiveTabKey2] = useState<string>("Mesin");

  const screens = useBreakpoint();
  const isMobile = useMemo(() => !screens.md, [screens]);
  const searchTimer = useRef<number | null>(null);

  const navigate = useNavigate();

  const getUnits = async () => {
    try {
      setIsLoading(true);
      const response = await fetchUnit();
      const list: Products[] = response?.data?.response ?? [];
      setUnits(list);
      setPagination((p) => ({ ...p, total: list.length }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching units:", error);
      showNotificationError("Gagal mengambil data unit!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUnits();
  }, []);

  useEffect(() => {
    if (searchTimer.current) window.clearTimeout(searchTimer.current);
    searchTimer.current = window.setTimeout(() => {
      setPagination((prev) => ({ ...prev, current: 1 }));
    }, 350);
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
      await deleteUnit(id);
      showNotification("Unit berhasil dihapus!");
      setUnits((prev) => prev.filter((unit) => unit.uuid !== id));
      setPagination((p) => ({ ...p, total: Math.max(0, (p.total || 0) - 1) }));
    } catch (error) {
      console.error(error);
      showNotificationError("Gagal menghapus unit!");
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/unit/edit/${id}`);
  };

  const handleDetail = (uuid: string) => {
    const foundUnit = units.find((unit) => unit.uuid === uuid);
    if (foundUnit) {
      setSelectedUnit(foundUnit);
      setActiveTabKey2("Mesin");
      setIsModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUnit(null);
  };

  const filteredUnits = useMemo(
    () =>
      units.filter((unit) =>
        (unit?.type_name || "").toLowerCase().includes(searchText.toLowerCase())
      ),
    [units, searchText]
  );

  const contentListNoTitle: Record<string, React.ReactNode> = {
    Mesin: selectedUnit?.machine ? (
      <ModalMachine machine={selectedUnit.machine} />
    ) : (
      <p>Data mesin tidak tersedia.</p>
    ),
    Rangka: selectedUnit?.frame ? (
      <ModalFrame frame={selectedUnit.frame} />
    ) : (
      <p>Data kerangka tidak tersedia.</p>
    ),
    Dimensi: selectedUnit?.Dimensions ? (
      <ModalDimensions dimensions={selectedUnit.Dimensions} />
    ) : (
      <p>Data dimensi tidak tersedia.</p>
    ),
    Kapasitas: selectedUnit?.Capacity ? (
      <ModalCapacity capacity={selectedUnit.Capacity} />
    ) : (
      <p>Data kapasitas tidak tersedia.</p>
    ),
    Kelistrikan: selectedUnit?.Electricity ? (
      <ModalElectricity electricity={selectedUnit.Electricity} />
    ) : (
      <p>Data kelistrikan tidak tersedia.</p>
    ),
  };

  return (
    <div className="p-4 sm:p-6">
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
          placeholder="Cari berdasarkan nama tipe"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={isMobile ? "w-full" : ""}
          style={{ width: isMobile ? "100%" : 320 }}
        />

        <Link to="/admin/unit/create" className={isMobile ? "w-full" : ""}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size={isMobile ? "middle" : "large"}
            block={isMobile}
          >
            Create Unit
          </Button>
        </Link>
      </Space>

      <div className="overflow-x-auto">
        <Table
          columns={unitColumns({
            current: pagination.current,
            pageSize: pagination.pageSize,
            onDelete: handleDelete,
            onEdit: handleEdit,
            onDetail: handleDetail,
          })}
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
          dataSource={filteredUnits}
          rowKey="uuid"
          loading={isLoading}
          size={isMobile ? "small" : "middle"}
          scroll={{ x: "max-content" }}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total || filteredUnits.length,
            onChange: (page, pageSize) =>
              setPagination({ current: page, pageSize }),
            showSizeChanger: false,
            position: isMobile ? ["bottomCenter"] : ["bottomRight"],
            responsive: true,
          }}
        />
      </div>
      {isMobile ? (
        <Drawer
          title="Detail Unit"
          placement="bottom"
          height="85vh"
          visible={isModalVisible}
          onClose={handleModalClose}
          bodyStyle={{ padding: 12 }}
        >
          {selectedUnit && (
            <Card
              style={{ width: "100%" }}
              tabList={tabListNoTitle}
              activeTabKey={activeTabKey2}
              onTabChange={(k) => setActiveTabKey2(k)}
              bordered={false}
            >
              {contentListNoTitle[activeTabKey2]}
            </Card>
          )}
        </Drawer>
      ) : (
        <Modal
          title="Detail Unit"
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Close
            </Button>,
          ]}
          centered
          destroyOnClose
          bodyStyle={{ paddingTop: 12 }}
        >
          {selectedUnit && (
            <Card
              style={{ width: "100%" }}
              tabList={tabListNoTitle}
              activeTabKey={activeTabKey2}
              onTabChange={(k) => setActiveTabKey2(k)}
            >
              {contentListNoTitle[activeTabKey2]}
            </Card>
          )}
        </Modal>
      )}
    </div>
  );
};

export default DefaultUnit;

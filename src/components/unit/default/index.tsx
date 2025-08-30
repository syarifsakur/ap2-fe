import React, { useEffect, useState } from "react";
import { Button, Table, Input, Modal, Card } from "antd";
import { unitColumns } from "../../../columns/unit.columns";
import { deleteUnit, fetchUnit } from "../../../utils/apis";
import type { Products } from "../../../types";
import ModalMachine from "../modal/machine";
import ModalFrame from "../modal/frame";
import ModalDimensions from "../modal/dimensions";
import ModalCapacity from "../modal/capacity";
import ModalElectricity from "../modal/electricity";
import { useNavigate } from "react-router-dom";
import { showNotification, showNotificationError } from "../../../utils";

const tabListNoTitle = [
  {
    key: "Mesin",
    label: "Mesin",
  },
  {
    key: "Rangka",
    label: "Rangka",
  },
  {
    key: "Dimensi",
    label: "Dimensi",
  },
  {
    key: "Kapasitas",
    label: "Kapasitas",
  },
  {
    key: "Kelistrikan",
    label: "Kelistrikan",
  },
];

const DefaultUnit: React.FC = () => {
  const [units, setUnits] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Products | null>(null);

  const [activeTabKey2, setActiveTabKey2] = useState<string>("Mesin");

  const onTab2Change = (key: string) => {
    setActiveTabKey2(key);
  };
  useEffect(() => {
    const getUnits = async () => {
      try {
        setIsLoading(true);
        const response = await fetchUnit();
        console.log("Data dari API:", response.data.response);
        setUnits(response.data.response);
      } catch (error) {
        console.error("Error fetching units:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getUnits();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteUnit(id);
      showNotification("Unit berhasil dihapus!");
      setUnits((prev) => prev.filter((unit) => unit.uuid !== id));
    } catch (error) {
      console.error(error);
      showNotificationError("Gagal menghapus unit!");
    }
  };

  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/admin/unit/edit/${id}`);
  };

  const handleDetail = (uuid: string) => {
    const foundUnit = units.find((unit) => unit.uuid === uuid);
    if (foundUnit) {
      console.log("Selected Unit:", foundUnit);
      setSelectedUnit(foundUnit);
      setIsModalVisible(true);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setPagination((prev) => ({ ...prev, current: 1 }));
    return;
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUnit(null);
  };

  const filteredUnits = units.filter((unit) =>
    unit.type_name.toLowerCase().includes(searchText.toLowerCase())
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
    <div>
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Cari berdasarkan nama tipe"
          value={searchText}
          onChange={handleSearch}
          style={{ width: "300px" }}
        />
        <a href="/admin/unit/create">
          <Button type="primary">Create Unit</Button>
        </a>
      </div>
      <Table
        columns={unitColumns({
          current: pagination.current,
          pageSize: pagination.pageSize,
          onDelete: handleDelete,
          onEdit: handleEdit,
          onDetail: handleDetail,
        })}
        dataSource={filteredUnits}
        rowKey="uuid"
        loading={isLoading}
        pagination={{
          ...pagination,
          onChange: (page, pageSize) => {
            setPagination({ current: page, pageSize });
          },
        }}
      />
      <Modal
        title="Detail Unit"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {selectedUnit && (
          <Card
            style={{ width: "100%" }}
            tabList={tabListNoTitle}
            activeTabKey={activeTabKey2}
            onTabChange={onTab2Change}
          >
            {contentListNoTitle[activeTabKey2]}
          </Card>
        )}
      </Modal>
    </div>
  );
};

export default DefaultUnit;

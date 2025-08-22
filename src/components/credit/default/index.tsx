import React, { useEffect, useState } from "react";
import { Table, DatePicker } from "antd";
import dayjs from "dayjs";
import { creditColumns } from "../../../columns/credit.columns";
import { deleteCredit, fetchCredit } from "../../../utils/apis";
import type { Credit } from "../../../types/credit";
import { showNotification, showNotificationError } from "../../../utils";

const DefaultCredit: React.FC = () => {
  const [credits, setCredits] = useState<Credit[]>([]);
  const [filteredCredits, setFilteredCredits] = useState<Credit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const getCredits = async () => {
      try {
        setIsLoading(true);
        const response = await fetchCredit();
        setCredits(response.data.response);
        setFilteredCredits(response.data.response);
      } catch (error) {
        console.error("Error fetching credits:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getCredits();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteCredit(id);
      showNotification("Berhasil Menghapus Data !");
      setCredits((prev) => prev.filter((credit) => credit.uuid !== id));
      setFilteredCredits((prev) => prev.filter((credit) => credit.uuid !== id));
    } catch (error) {
      console.error(error);
      showNotificationError("Gagal menghapus Credit!");
    }
  };

  const handleEdit = (uuid: string) => {
    console.log("Mengedit kredit dengan UUID:", uuid);
  };

  const handleDateFilter = (date: any, dateString: string) => {
    setSelectedDate(dateString || null);

    if (!dateString) {
      setFilteredCredits(credits); // reset filter
      return;
    }

    const filtered = credits.filter(
      (item) => dayjs(item.createdAt).format("YYYY-MM-DD") === dateString
    );
    setFilteredCredits(filtered);
  };

  return (
    <div>
      <div className="flex items-center mb-4 gap-3">
        <h2 className="text-lg font-semibold">Data Kredit</h2>
        <DatePicker
          onChange={handleDateFilter}
          format="YYYY-MM-DD"
          placeholder="Pilih Tanggal"
        />
      </div>

      <Table
        columns={creditColumns({
          current: pagination.current,
          pageSize: pagination.pageSize,
          onDelete: handleDelete,
          onEdit: handleEdit,
        })}
        dataSource={filteredCredits}
        rowKey="uuid"
        loading={isLoading}
        pagination={{
          ...pagination,
          onChange: (page, pageSize) => {
            setPagination({ current: page, pageSize });
          },
        }}
      />
    </div>
  );
};

export default DefaultCredit;

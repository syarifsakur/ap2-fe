import React, { useEffect, useState } from "react";
import { Table, DatePicker, Button } from "antd";
import dayjs from "dayjs";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

import { creditColumns } from "../../../columns/credit.columns";
import { deleteCredit, fetchCredit } from "../../../utils/apis";
import type { Credit } from "../../../types/credit";
import { showNotification, showNotificationError } from "../../../utils";

const { RangePicker } = DatePicker;

const DefaultCredit: React.FC = () => {
  const [credits, setCredits] = useState<Credit[]>([]);
  const [filteredCredits, setFilteredCredits] = useState<Credit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([
    null,
    null,
  ]);

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

  const handleRangeFilter = (dates: any, dateStrings: [string, string]) => {
    setDateRange(dateStrings);

    if (!dateStrings[0] || !dateStrings[1]) {
      setFilteredCredits(credits);
      return;
    }

    const [start, end] = dateStrings;
    const filtered = credits.filter((item) => {
      const createdAt = dayjs(item.createdAt).format("YYYY-MM-DD");
      return createdAt >= start && createdAt <= end;
    });
    setFilteredCredits(filtered);
  };

  // ✅ Download Excel
  const handleDownloadExcel = () => {
    if (filteredCredits.length === 0) {
      showNotificationError("Tidak ada data untuk diexport!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      filteredCredits.map((item, index) => ({
        No: index + 1,
        Nama: item.name,
        Email: item.email,
        Phone: item.no_hp,
        Kota: item.city,
        Kategori: item.category_motor || "-",
        Tenor: item.tenor_amount,
        DP: item.down_payment,
        "Tanggal Dibuat": dayjs(item.createdAt).format("YYYY-MM-DD"),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Kredit");
    XLSX.writeFile(workbook, "data_kredit.xlsx");
  };

  // ✅ Download PDF
  const handleDownloadPDF = () => {
    if (filteredCredits.length === 0) {
      showNotificationError("Tidak ada data untuk diexport!");
      return;
    }

    const doc = new jsPDF();
    doc.text("Data Kredit", 14, 15);

    (doc as any).autoTable({
      head: [
        ["No", "Nama", "Email", "Phone", "Kota", "Motor", "Kategori", "Tenor", "DP", "Tanggal Dibuat"],
      ],
      body: filteredCredits.map((item, index) => [
        index + 1,
        item.name,
        item.email,
        item.phone,
        item.city,
        item.unit?.type_name || "-",
        item.unit?.category || "-",
        item.tenor_amount,
        item.down_payment,
        dayjs(item.createdAt).format("YYYY-MM-DD"),
      ]),
      startY: 20,
    });

    doc.save("data_kredit.pdf");
  };

  return (
    <div>
      <div className="flex items-center mb-4 gap-3">
        <h2 className="text-lg font-semibold">Data Kredit</h2>
        <RangePicker
          format="YYYY-MM-DD"
          onChange={handleRangeFilter}
          placeholder={["Tanggal Awal", "Tanggal Akhir"]}
          ranges={{
            "Hari Ini": [dayjs(), dayjs()],
            "Minggu Ini": [dayjs().startOf("week"), dayjs().endOf("week")],
            "Bulan Ini": [dayjs().startOf("month"), dayjs().endOf("month")],
            "Tahun Ini": [dayjs().startOf("year"), dayjs().endOf("year")],
          }}
        />

        {/* Tombol Download */}
        <Button onClick={handleDownloadExcel} className="bg-green-500 text-white">
          Download Excel
        </Button>
        <Button onClick={handleDownloadPDF} className="bg-blue-500 text-white">
          Download PDF
        </Button>
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

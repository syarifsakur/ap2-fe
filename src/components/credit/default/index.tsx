import React, { useEffect, useMemo, useRef, useState } from "react";
import { Table, DatePicker, Button, Grid, Space } from "antd";
import dayjs from "dayjs";
import * as XLSX from "xlsx";
import { creditColumns } from "../../../columns/credit.columns";
import { deleteCredit, fetchCredit } from "../../../utils/apis";
import type { Credit } from "../../../types/credit";
import { showNotification, showNotificationError } from "../../../utils";

const { RangePicker } = DatePicker;
const { useBreakpoint } = Grid;

const DefaultCredit: React.FC = () => {
  const [credits, setCredits] = useState<Credit[]>([]);
  const [filteredCredits, setFilteredCredits] = useState<Credit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([null, null]);

  const screens = useBreakpoint();
  const isMobile = useMemo(() => !screens.md, [screens]);
  const searchTimer = useRef<number | null>(null);

  useEffect(() => {
    const getCredits = async () => {
      try {
        setIsLoading(true);
        const response = await fetchCredit();
        const list: Credit[] = response?.data?.response ?? [];
        setCredits(list);
        setFilteredCredits(list);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching credits:", error);
        showNotificationError("Gagal mengambil data kredit!");
      } finally {
        setIsLoading(false);
      }
    };

    getCredits();
  }, []);

  // Page size adaptif
  useEffect(() => {
    const nextSize = isMobile ? 5 : 10;
    if (pagination.pageSize !== nextSize) {
      setPagination((p) => ({ ...p, pageSize: nextSize, current: 1 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const handleDelete = async (id: string) => {
    try {
      await deleteCredit(id);
      showNotification("Berhasil Menghapus Data !");
      setCredits((prev) => prev.filter((credit) => credit.uuid !== id));
      setFilteredCredits((prev) => prev.filter((credit) => credit.uuid !== id));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      showNotificationError("Gagal menghapus Credit!");
    }
  };

  const handleEdit = (uuid: string) => {
    // Integrasikan dengan navigasi sesuai kebutuhan
    // navigate(`/admin/credit/edit/${uuid}`)
    // eslint-disable-next-line no-console
    console.log("Mengedit kredit dengan UUID:", uuid);
  };

  const handleRangeFilter = (_dates: any, dateStrings: [string, string]) => {
    setDateRange(dateStrings);

    // Debounce ringan agar tidak filter berkali-kali saat user drag kalender
    if (searchTimer.current) window.clearTimeout(searchTimer.current);

    searchTimer.current = window.setTimeout(() => {
      if (!dateStrings[0] || !dateStrings[1]) {
        setFilteredCredits(credits);
        setPagination((prev) => ({ ...prev, current: 1 }));
        return;
      }

      const [start, end] = dateStrings;
      const filtered = credits.filter((item) => {
        const createdAt = dayjs(item.createdAt).format("YYYY-MM-DD");
        return createdAt >= start && createdAt <= end;
      });

      setFilteredCredits(filtered);
      setPagination((prev) => ({ ...prev, current: 1 }));
    }, 200);
  };

  const handleDownloadExcel = () => {
    if (filteredCredits.length === 0) {
      showNotificationError("Tidak ada data untuk diexport!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      filteredCredits.map((item) => ({
        Nama: item.name,
        Email: item.email,
        Phone: item.no_hp,
        Kota: item.city,
        Kategori: item.category || "-",
        Tenor: item.tenor_amount,
        DP: item.down_payment,
        "Tanggal Dibuat": dayjs(item.createdAt).format("YYYY-MM-DD"),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Kredit");

    // Nama file dinamis sesuai filter tanggal
    const [start, end] = dateRange;
    const suffix = start && end ? `_${start}_sd_${end}` : "";
    XLSX.writeFile(workbook, `data_kredit${suffix}.xlsx`);
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow">
      <Space
        direction={isMobile ? "vertical" : "horizontal"}
        className="w-full mb-4"
        size={isMobile ? "small" : "middle"}
        style={{ justifyContent: "space-between" }}
      >
        <RangePicker
          allowClear
          size={isMobile ? "small" : "middle"}
          format="YYYY-MM-DD"
          onChange={handleRangeFilter}
          placeholder={["Tanggal Awal", "Tanggal Akhir"]}
          className={isMobile ? "w-full" : ""}
          style={{ width: isMobile ? "100%" : 360 }}
          placement={isMobile ? "bottomRight" : "bottomLeft"}
          getPopupContainer={(trigger) => (trigger?.parentElement as HTMLElement) || document.body}
          panelRender={(panel) => (
            <div style={{ transform: isMobile ? "scale(0.9)" : undefined, transformOrigin: "top right" }}>{panel}</div>
          )}
          ranges={{
            "Hari Ini": [dayjs(), dayjs()],
            "Minggu Ini": [dayjs().startOf("week"), dayjs().endOf("week")],
            "Bulan Ini": [dayjs().startOf("month"), dayjs().endOf("month")],
            "Tahun Ini": [dayjs().startOf("year"), dayjs().endOf("year")],
          }}
        />

        <Button
          onClick={handleDownloadExcel}
          type="primary"
          size={isMobile ? "middle" : "large"}
          block={isMobile}
          style={{ backgroundColor: "green", borderColor: "green" }}
        >
          Download Excel
        </Button>
      </Space>

      <div className="overflow-x-auto">
        <Table
          columns={creditColumns({
            current: pagination.current,
            pageSize: pagination.pageSize,
            onDelete: handleDelete,
            onEdit: handleEdit,
          })}
          dataSource={filteredCredits.map((item, index) => ({
            ...item,
            no: (pagination.current - 1) * pagination.pageSize + (index + 1),
          }))}
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
          rowKey="uuid"
          loading={isLoading}
          size={isMobile ? "small" : "middle"}
          scroll={{ x: "max-content" }}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: filteredCredits.length,
            onChange: (page, pageSize) => setPagination({ current: page, pageSize }),
            showSizeChanger: false,
            position: isMobile ? ["bottomCenter"] : ["bottomRight"],
            responsive: true,
          }}
        />
      </div>
    </div>
  );
};

export default DefaultCredit;

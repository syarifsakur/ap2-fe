import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { creditColumns } from "../../../columns/credit.columns";
import { fetchCredit } from "../../../utils/apis";
import type { Credit } from "../../../types/credit";

const DefaultCredit: React.FC = () => {
  const [credits, setCredits] = useState<Credit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  useEffect(() => {
    const getCredits = async () => {
      try {
        setIsLoading(true);
        const response = await fetchCredit();
        setCredits(response.data.response);
      } catch (error) {
        console.error("Error fetching credits:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getCredits();
  }, []);

  const handleDelete = (uuid: string) => {
    console.log("Menghapus kredit dengan UUID:", uuid);
  };

  const handleEdit = (uuid: string) => {
    console.log("Mengedit kredit dengan UUID:", uuid);
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1></h1>
        <a href="/admin/credit/create" className="flex justify-between">
          <Button type="primary" className="mb-4 flex justify-end ">
            Create Credit
          </Button>
        </a>
      </div>
      <Table
        columns={creditColumns({
          current: pagination.current,
          pageSize: pagination.pageSize,
          onDelete: handleDelete,
          onEdit: handleEdit,
        })}
        dataSource={credits}
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

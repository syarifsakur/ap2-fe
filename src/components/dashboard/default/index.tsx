import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Card, Statistic } from "antd";
import {
  ShoppingOutlined,
  DollarOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { Line } from "@ant-design/plots";
import { fetchUnit, fetchCredit, fetchService } from "../../../utils";

const { Content } = Layout;

const Dashboard: React.FC = () => {
  const [totalUnit, setTotalUnit] = useState<number>(0);
  const [totalCredit, setTotalCredit] = useState<number>(0);
  const [totalService, setTotalService] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const units = await fetchUnit();
        const credits = await fetchCredit();
        const service = await fetchService();

        setTotalUnit(units.data.total);
        setTotalCredit(credits.data.total);
        setTotalService(service.data.total);
      } catch (error) {
        console.error("Gagal fetch data dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const data = [
    { month: "Jan", value: 30 },
    { month: "Feb", value: 45 },
    { month: "Mar", value: 25 },
    { month: "Apr", value: 60 },
    { month: "May", value: 75 },
    { month: "Jun", value: 50 },
  ];

  const config = {
    data,
    xField: "month",
    yField: "value",
    smooth: true,
    point: { size: 5, shape: "diamond" },
  };

  return (
    <Content style={{ margin: "20px" }}>
      {/* Statistik Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card loading={loading} className="shadow-xl h-40 flex items-center">
            <Statistic
              title={<span className="text-xl">Total Unit</span>}
              value={totalUnit}
              prefix={<ShoppingOutlined />}
              valueRender={(val) => <span className="text-2xl">{val}</span>}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card loading={loading} className="shadow-xl h-40 flex items-center">
            <Statistic
              title={<span className="text-xl">Total Kredit</span>}
              value={totalCredit}
              prefix={<DollarOutlined />}
              valueRender={(val) => <span className="text-2xl">{val}</span>}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card loading={loading} className="shadow-xl h-40 flex items-center">
            <Statistic
              title={<span className="text-xl">Total Service</span>}
              value={totalService}
              prefix={<DatabaseOutlined />}
              valueRender={(val) => <span className="text-2xl">{val}</span>}
            />
          </Card>
        </Col>
      </Row>

      {/* Grafik */}
      <Row style={{ marginTop: "30px" }}>
        <Col xs={24}>
          <Card title="Grafik Penjualan Unit" className="shadow-xl">
            <Line {...config} />
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Dashboard;

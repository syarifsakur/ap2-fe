import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Card, Statistic } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  DollarOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { Line } from "@ant-design/plots";
import { fetchUnit, fetchCredit } from "../../../utils";

const { Content } = Layout;

const Dashboard: React.FC = () => {
  const [totalUnit, setTotalUnit] = useState<number>(0);
  const [totalCredit, setTotalCredit] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Ambil data unit & kredit
  useEffect(() => {
    const loadData = async () => {
      try {
        const units = await fetchUnit();
        const credits = await fetchCredit();

      console.log(units)
        setTotalUnit(units.data.total);


        setTotalCredit(credits.data.total);
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
      <Row gutter={16}>
        <Col span={12}>
          <Card loading={loading} className="shadow-xl">
            <Statistic
              title="Total Unit"
              value={totalUnit}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card loading={loading} className="shadow-xl">  
            <Statistic
              title="Total Kredit"
              value={totalCredit}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
        {/* <Col span={6}>
          <Card>
            <Statistic
              title="Total User"
              value={34}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Database Records"
              value={500}
              prefix={<DatabaseOutlined />}
            />
          </Card>
        </Col> */}
      </Row>

      <Row style={{ marginTop: "30px" }}>
        <Col span={24}>
          <Card title="Grafik Penjualan Unit">
            <Line {...config} />
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Dashboard;

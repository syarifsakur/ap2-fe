import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Card} from "antd";
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
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card
            loading={loading}
            className="relative shadow-lg h-40 rounded-2xl overflow-hidden text-white"
            bodyStyle={{ height: "100%", padding: "1.5rem" }}
            style={{
              background: "linear-gradient(135deg, #ffb347 0%, #ffcc33 100%)",
            }}
          >
            <div className="absolute bottom-[-40px] right-[-40px] w-40 h-40 bg-white/20 rounded-full"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-center gap-2">
                <ShoppingOutlined className="text-2xl opacity-90" />
                <span className="text-2xl font-semibold">Total Unit</span>
              </div>
              <div>
                <div className="text-4xl font-bold">{totalUnit}</div>
                <div className="text-sm opacity-80">Units</div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card
            loading={loading}
            className="relative shadow-lg h-40 rounded-2xl overflow-hidden text-white"
            bodyStyle={{ height: "100%", padding: "1.5rem" }}
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
            }}
          >
            <div className="absolute bottom-[-40px] right-[-40px] w-40 h-40 bg-white/20 rounded-full"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-center gap-2">
                <DollarOutlined className="text-2xl opacity-90" />
                <span className="text-xl">Total Kredit</span>
              </div>
              <div>
                <div className="text-4xl font-bold">{totalCredit}</div>
                <div className="text-sm opacity-80">Kredit</div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card
            loading={loading}
            className="relative shadow-lg h-40 rounded-2xl overflow-hidden text-white"
            bodyStyle={{ height: "100%", padding: "1.5rem" }}
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
            }}
          >
            <div className="absolute bottom-[-40px] right-[-40px] w-40 h-40 bg-white/20 rounded-full"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-center gap-2">
                <DatabaseOutlined className="text-2xl opacity-90" />
                <span className="text-2xl">Total Service</span>
              </div>
              <div>
                <div className="text-4xl font-bold">{totalService}</div>
                <div className="text-sm opacity-80">Services</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: "30px" }}>
        <Col xs={24}>
          <Card
            title="📊 Grafik Penjualan Unit"
            className="shadow-xl rounded-2xl"
          >
            <Line {...config} />
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Dashboard;

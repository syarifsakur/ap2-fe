import React, { useEffect, useState } from "react";
import { Spin, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { AdminLayout } from "../../../layouts";
import FormUnitStep from "../../../components/unit/form";
import { fetchUnitById, updateUnit } from "../../../utils";

const EditUnit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [unitData, setUnitData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const res = await fetchUnitById(id);
        console.log(res.data.response.frame.braking_system)

        setUnitData({
          uuid: res.data.response.uuid,
          type_name: res.data.response.type_name,
          price: res.data.response.price,
          category: res.data.response.category,
          path_img: res.data.response.path_img,
          machine_type: res.data.response.machine?.machine_type,
          diameter: res.data.response.machine?.diameter,
          machine_capacity: res.data.response.machine?.machine_capacity,
          compression_ratio: res.data.response.machine?.compression_ratio,
          max_power: res.data.response.machine?.max_power,
          max_torque: res.data.response.machine?.max_torque,
          kopling_type: res.data.response.machine?.kopling_type,
          starter_type: res.data.response.machine?.starter_type,
          fuel_supply_system: res.data.response.machine?.fuel_supply_system,
          tranmisi_type: res.data.response.machine?.tranmisi_type,
          air_cooled_engine: res.data.response.machine?.air_cooled_engine,
          gear_shift_pattern: res.data.response.machine?.gear_shift_pattern,
          frame_type: res.data.response.frame?.frame_type,
          front_suspension_type: res.data.response.frame?.front_suspension_type,
          rear_suspension_type: res.data.response.frame?.rear_suspension_type,
          front_tire_size: res.data.response.frame?.front_tire_size,
          rear_tire_size: res.data.response.frame?.rear_tire_size,
          front_brake: res.data.response.frame?.front_brake,
          rear_brake: res.data.response.frame?.rear_brake,
          braking_system: res.data.response.frame?.braking_system,
          lwh: res.data.response.Dimensions?.lwh,
          wheel_axis_distance: res.data.response.Dimensions?.wheel_axis_distance,
          lowest_distance: res.data.response.Dimensions?.lowest_distance,
          curb_weight: res.data.response.Dimensions?.curb_weight,
          fuel_tank_capacity: res.data.response.Capacity?.fuel_tank_capacity,
          lubricating_oil_capacity: res.data.response.Capacity?.lubricating_oil_capacity,
          battery_type: res.data.response.Electricity?.battery_type,
          ignition_system: res.data.response.Electricity?.ignition_system,
          plug_type: res.data.response.Electricity?.plug_type,
        });
      } catch (error) {
        console.error(error);
        message.error("Gagal mengambil data unit!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (formData: FormData) => {
    try {
      await updateUnit(id!, formData);
      message.success("Unit berhasil diperbarui!");
      navigate("/admin/unit");
    } catch (error) {
      console.error(error);
      message.error("Gagal memperbarui unit!");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-96">
          <Spin size="large" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <FormUnitStep onSubmit={handleSubmit} initialData={unitData} />
    </AdminLayout>
  );
};

export default EditUnit;

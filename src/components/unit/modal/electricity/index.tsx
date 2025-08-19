import React from "react";
import type { Electricity } from "../../../../types";

interface ModalElectricityProps {
  electricity: Electricity;
}

const ModalElectricity: React.FC<ModalElectricityProps> = ({ electricity }) => {
  return (
    <div>
      <p><strong>Tipe Baterai:</strong> {electricity.battery_type}</p>
      <p><strong>Sistem Pengapian:</strong> {electricity.ignition_system}</p>
      <p><strong>Tipe Busi:</strong> {electricity.plug_type}</p>
    </div>
  );
};

export default ModalElectricity;
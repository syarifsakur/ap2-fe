import React from "react";
import type { Capacity } from "../../../../types";

interface ModalCapacityProps {
  capacity: Capacity;
}

const ModalCapacity: React.FC<ModalCapacityProps> = ({ capacity }) => {
  return (

          <div>
            <p><strong>Kapasitas Tangki Bahan Bakar:</strong> {capacity.fuel_tank_capacity}</p>
            <p><strong>Kapasitas Oli Pelumas:</strong> {capacity.lubricating_oil_capacity}</p>
          </div>
  );
};

export default ModalCapacity;
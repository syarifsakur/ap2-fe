import React from "react";
import type { Dimensions } from "../../../../types";

interface ModalDimensionsProps {
  dimensions: Dimensions;
}

const ModalDimensions: React.FC<ModalDimensionsProps> = ({ dimensions }) => {
  return (
          <div>
            <p><strong>Dimensi (P x L x T):</strong> {dimensions.lwh}</p>
            <p><strong>Jarak Sumbu Roda:</strong> {dimensions.wheel_axis_distance}</p>
            <p><strong>Jarak Terendah:</strong> {dimensions.lowest_distance}</p>
            <p><strong>Berat Kosong:</strong> {dimensions.curb_weight}</p>
          </div>
  );
};

export default ModalDimensions;
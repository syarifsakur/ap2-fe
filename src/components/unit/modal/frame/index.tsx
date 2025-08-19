import React from "react";
import type { Frame } from "../../../../types";

interface ModalFrameProps {
  frame: Frame; 
}

const ModalFrame: React.FC<ModalFrameProps> = ({ frame }) => {
  return (
    <div>
      <p><strong>Tipe Kerangka:</strong> {frame.frame_type}</p>
      <p><strong>Suspensi Depan:</strong> {frame.front_suspension_type}</p>
      <p><strong>Suspensi Belakang:</strong> {frame.rear_suspension_type}</p>
      <p><strong>Ukuran Ban Depan:</strong> {frame.front_tire_size}</p>
      <p><strong>Ukuran Ban Belakang:</strong> {frame.rear_tire_size}</p>
      <p><strong>Rem Depan:</strong> {frame.front_brake}</p>
      <p><strong>Rem Belakang:</strong> {frame.rear_brake}</p>
    </div>
  );
};

export default ModalFrame;
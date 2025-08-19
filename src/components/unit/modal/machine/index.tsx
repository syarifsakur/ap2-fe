import React from "react";

interface ModalMachineProps {
  machine: {
    air_cooled_engine: string;
    compression_ratio: string;
    diameter: string;
    fuel_supply_system: string;
    gear_shift_pattern: string;
    kopling_type: string;
    machine_capacity: string;
    machine_type: string;
    max_power: string;
    max_torque: string;
    starter_type: string;
    tranmisi_type: string;
  };
}

const ModalMachine: React.FC<ModalMachineProps> = ({ machine }) => {
  return (
    <div>
      <p><strong>Tipe Mesin:</strong> {machine.machine_type}</p>
      <p><strong>Kapasitas Mesin:</strong> {machine.machine_capacity}</p>
      <p><strong>Sistem Bahan Bakar:</strong> {machine.fuel_supply_system}</p>
      <p><strong>Diameter:</strong> {machine.diameter}</p>
      <p><strong>Tipe Transmisi:</strong> {machine.tranmisi_type}</p>
      <p><strong>Rasio Kompresi:</strong> {machine.compression_ratio}</p>
      <p><strong>Daya Maksimum:</strong> {machine.max_power}</p>
      <p><strong>Torsi Maksimum:</strong> {machine.max_torque}</p>
      <p><strong>Tipe Starter:</strong> {machine.starter_type}</p>
      <p><strong>Tipe Kopling:</strong> {machine.kopling_type}</p>
      <p><strong>Penyejuk Udara:</strong> {machine.air_cooled_engine}</p>
      <p><strong>Pola Pergantian Gigi:</strong> {machine.gear_shift_pattern}</p>
    </div>
  );
};

export default ModalMachine;
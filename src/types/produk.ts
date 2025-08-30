export interface Frame {
  uuid: string;
  frame_type: string;
  front_suspension_type: string;
  rear_suspension_type: string;
  front_tire_size: string;
  rear_tire_size: string;
  front_brake: string;
  rear_brake: string;
}

export interface Machine {
  uuid: string;
  machine_type: string;
  machine_capacity: string;
  fuel_supply_system: string;
  diameter: string;
  tranmisi_type: string;
  compression_ratio: string;
  max_power: string;
  max_torque: string;
  starter_type: string;
  kopling_type: string;
  air_cooled_engine: string;
  gear_shift_pattern: string;
}

export interface Dimensions {
  uuid: string;
  lwh: string;
  wheel_axis_distance: string;
  lowest_distance: string;
  curb_weight: string;
}

export interface Capacity {
  fuel_tank_capacity: string;
  lubricating_oil_capacity: string;
}

export interface Electricity {
  battery_type: string;
  ignition_system: string;
  plug_type: string;
}

export interface Products {
  uuid: string;
  type_name: string;
  img?: string;
  path_img?: string;
  price: string;
  frame: Frame;
  machine: Machine;
  Dimensions: Dimensions;
  Capacity: Capacity;
  Electricity: Electricity;
  specs: Array<{ label: string; value: string }>;
  category: string;
  ket?: string;
}

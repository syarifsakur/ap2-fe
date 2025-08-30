export type Category = "matic" | "sport" | "cub" | "ev" | "bigbike";

// export type ServiceType = 
//   | "general service"
//   | "service ringan"
//   | "service berat"
//   | "ganti oli"
//   | "lainnya";

export interface Unit {
  uuid: string;
  type_name: string;
}

export interface Service {
  uuid: string;
  name: string;
  no_hp: string;
  email: string;
  address: string;
  category: Category;
  year: string;
  service_type: string;
  service_date: string;
  service_time: string;
  unit: Unit;
}

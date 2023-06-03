import type { ColumnsType } from "antd/es/table";

export interface IMaterial {
  name: string;
  bulk_mass_dry_condition: string;
  thermal_conductivity: string;
  heat_capacity: string;
  reduced_radiation_coefficient: string;
  blackness: string;
}

export const columns: ColumnsType<IMaterial> = [
  {
    title: "Материал",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Объемная масса в сухом состоянии",
    dataIndex: "bulk_mass_dry_condition",
    key: "bulk_mass_dry_condition",
  },
  {
    title: "Теплопроводность",
    dataIndex: "thermal_conductivity",
    key: "thermal_conductivity",
  },
  {
    title: "Теплоемкость",
    key: "heat_capacity",
    dataIndex: "heat_capacity",
  },
  {
    title: "Коэффициент излучения",
    key: "reduced_radiation_coefficient",
    dataIndex: "reduced_radiation_coefficient",
  },
  {
    title: "Чернота",
    key: "blackness",
    dataIndex: "blackness",
  },
];

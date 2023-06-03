export interface IFormInput {
  name: string;
  bulk_mass_dry_condition: string;
  thermal_conductivity: string;
  heat_capacity: string;
  reduced_radiation_coefficient: string;
  blackness: string;
}

export interface IFormProps {
  messageApi: any;
  title?: string;
}

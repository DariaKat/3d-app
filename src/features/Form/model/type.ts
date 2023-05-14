export interface IFormInput {
  materialType: string;
  wallThickness: string;
  startTemp: string;
  endTemp: string;
  humidity: string;
  tempHeatedSurface: string;
}

export interface IParam {
  bulk_mass_dry_condition: number;
  thermal_conductivity: (t: number) => number;
  heat_capacity: (t: number) => number;
  reduced_radiation_coefficient: (t: number) => number;
  blackness: (t: number) => number;
}

export interface IResult {
  arrayYak: number[];
  tlayer: number[][];
  tmn: number[];
  tnm: number[];
  tnp: number[];
  top: number[];
}

export interface IProps {
  setIsOpen: (t: boolean) => void;
  setGetResult: (t: IResult) => void;
}

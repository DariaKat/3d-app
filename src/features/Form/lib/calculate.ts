import { IFormInput, IParam } from "../model/type";
import { defaultData } from "./data";

const mathModel = (
  tempArray: number[],
  boundaryConditionsArray: number[],
  data: IFormInput,
  infoMaterial: IParam,
  countLayers: number,
  layer: number,
  timeIntervalArray: number[]
) => {
  //инициализируем массивы и заполняем первичными данными
  const tmn = [+data.startTemp];
  const top = [+data.startTemp];
  const tnp = Array(countLayers + 1).fill(+data.startTemp);
  const tnm = Array(countLayers + 1).fill(+data.startTemp);

  const arrayYak = Array(countLayers + 1).fill(+data.startTemp);

  const tlayer = [];
  for (let i = 1; i <= countLayers; i++) {
    tlayer.push([...Array(i + 1).fill(+data.startTemp)]);
  }
  let index = 0;

  while (tnm[tnm.length - 1] < data.endTemp) {
    const ambientTemperature =
      (tempArray[index] + tlayer[0][tlayer[0].length - 1]) / 2;
   
    const thermalConductivity =
      infoMaterial.thermal_conductivity(ambientTemperature);

    const temp =
      tlayer[0][tlayer[0].length - 1] +
      (tempArray[index] - tlayer[0][tlayer[0].length - 1]) *
        (layer /
          (thermalConductivity / boundaryConditionsArray[index] + layer / 2));
    
    tmn.push(temp);

    const tempop = (temp + tlayer[1][tlayer[1].length - 2]) / 2;

    tlayer[0].push(tempop);
    top.push(tempop);

    for (let j = 1; j < countLayers; j++) {
      if (j + 1 < countLayers) {
        tlayer[j].push(
          (tlayer[j - 1][tlayer[j - 1].length - 1] +
            tlayer[j + 1][tlayer[j + 1].length - 2]) /
            2
        );
      } else {
        tlayer[j].push(
          (tlayer[j - 1][tlayer[j - 1].length - 1] + tnp[tnp.length - 1]) / 2
        );
      }
    }

    const paramPreEndLength =
      tlayer[tlayer.length - 1][tlayer[tlayer.length - 1].length - 2];

    const tempnew = (paramPreEndLength + tnm[tnm.length - 1]) / 2;

    const thermalConductivityNew = infoMaterial.thermal_conductivity(tempnew);
    const heatCapacity = infoMaterial.heat_capacity(tempnew);

    const coef = tnm[tnm.length - 1];

    const coefTempnp =
      1.5 * Math.cbrt(coef - +data.startTemp) +
      5.67 *
        infoMaterial.blackness(coef) *
        ((Math.pow((coef + 273) / 100, 4) -
          Math.pow((+data.startTemp + 273) / 100, 4)) /
          (coef - +data.startTemp));

    const coefCheck = isNaN(coefTempnp) ? 0 : coefTempnp;

    const temYakovlev =
      coef +
      (2 *
        timeIntervalArray[index] *
        (thermalConductivityNew * (paramPreEndLength - coef) -
          coefCheck * layer * (coef - +data.startTemp))) /
        (infoMaterial.bulk_mass_dry_condition * layer * layer * heatCapacity);

    arrayYak.push(temYakovlev);

    const check = coefCheck === 0 ? 0 : thermalConductivityNew / coefCheck;

    const zn =
      paramPreEndLength +
      (tlayer[tlayer.length - 1][tlayer[tlayer.length - 1].length - 1] -
        paramPreEndLength) *
        ((check - layer / 2) / (check + layer / 2));

    const patanTnm = zn < 0 ? +data.startTemp : zn;

    tnm.push(patanTnm);

    const tm =
      (tlayer[tlayer.length - 1][tlayer[tlayer.length - 1].length - 1] + zn) /
      2;

    tnp.push(tm);

    index++;
  }

  const dataInfo: any = {
    tmn: tmn,
    top: top,
    tlayer: tlayer,
    tnp: tnp,
    tnm: tnm,
    arrayYak: arrayYak,
  };

  return dataInfo;
};

const initialProperties = (infoMaterial: IParam, data: IFormInput) => {
  // расчет начальных значений

  //расчет теплофизических характеристик
  //теплопроводность
  const thermalConductivity = infoMaterial.thermal_conductivity(
    +data.startTemp
  );
  //теплоемкость
  const heatCapacity = infoMaterial.heat_capacity(+data.startTemp);
  //температуропроводность
  const temperatureConductivity =
    (thermalConductivity /
      ((heatCapacity + 0.05 * +data.humidity) *
        infoMaterial.bulk_mass_dry_condition)) *
    3.6;

  //граничные условия теплообмена на обогреваемой поверхности
  const boundaryConditions = 29;

  //максимальная толщина слоев
  const thicknessLayers = 2 * (thermalConductivity / boundaryConditions);

  //определяем толщину слоя
  const layer = thicknessLayers > 0.03 ? 0.03 : 0.01;

  //количество слоев
  const countLayers = Math.round(+data.wallThickness / layer);

  //определяем расчетный интервал времени
  const timeInterval = (layer * layer) / (2 * temperatureConductivity);

  //заполняем массив с интервалами времени прогрева железобетонной стены
  const timeIntervalArray = [...Array(countLayers + 1)].map((_, index) => {
    return timeInterval * (index + 1);
  });

  //заполняем массив температурой пожарапо формуле "стандартного" пожара
  const tempArray = [...Array(countLayers + 1)].map((_, index) => {
    return (
      345 * Math.log10(8 * timeInterval * (index + 1) * 60 + 1) +
      +data.startTemp
    );
  });

  //значения с установки "АКИ-1"
  const tempHeatedSurface = data.tempHeatedSurface
    .replace(/\s/g, "")
    .split(",")
    .map((item) => Number(item));

  const tempHeatedSurfaceCheck =
    tempHeatedSurface.length < countLayers + 1
      ? [
          ...tempHeatedSurface,
          ...Array(countLayers + 1 - tempHeatedSurface.length).fill(
            tempHeatedSurface[tempHeatedSurface.length - 1]
          ),
        ]
      : tempHeatedSurface;

  //звполним массив граничными условиями теплообмена
  const boundaryConditionsArray = [...Array(countLayers + 1)].map(
    (_, index) => {

      return (
        29 +
        infoMaterial.reduced_radiation_coefficient(tempArray[index]) *
          ((Math.pow((tempArray[index] + 273) / 100, 4) -
            Math.pow((tempHeatedSurfaceCheck[index] + 273) / 100, 4)) /
            (tempArray[index] - tempHeatedSurfaceCheck[index]))
      );
    }
  );

  return mathModel(
    tempArray,
    boundaryConditionsArray,
    data,
    infoMaterial,
    countLayers,
    layer,
    timeIntervalArray
  );
};

export const startCalculate = (data: IFormInput) => {
  const infoMaterial: IParam = defaultData[data.materialType];

  if (infoMaterial) {
    const result = initialProperties(infoMaterial, data);
    
    return result;
  } else {
    return "error";
  }
};
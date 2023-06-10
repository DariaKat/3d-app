import { IResult } from "features/Form";
import { FC, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
  YAxis,
  Legend,
  Label,
} from "recharts";
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

interface IProps {
  getData: IResult;
}

const formatData = (getData: IResult): any[] => {
  let result: any[] = [];

  getData.time.map((item) => result.push({ name: item }));
  getData.top.map((item, index) => (result[index]["top"] = +item.toFixed(2)));
  getData.tlayer.map((item, indexX) =>
    item.map(
      (item, index) => (result[index][`layer${indexX}`] = +item.toFixed(2))
    )
  );
  getData.tnp.map((item, index) => (result[index]["tnp"] = +item.toFixed(2)));

  return result;
};

export const LineGraph: FC<IProps> = ({ getData }) => {
  const dataNew = useMemo(() => formatData(getData), [getData]);

  console.log(dataNew);

  return (
    <LineChart width={660} height={300} data={dataNew}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="name"
        label={{
          value: "Время (ч)",
          position: {
            x: 300,
            y: 30,
          },
        }}
      />

      <YAxis
        label={{
          value: "Температура (C°)",
          angle: -90,
          position: {
            x: 15,
            y: 71,
          },
        }}
      />
      <Tooltip />
      <Legend align="right" verticalAlign="top" />
      <Line
        type="monotone"
        dataKey="top"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="tnp" stroke="#82ca9d" />
      {getData.tlayer.map((_, index) => (
        <Line type="monotone" dataKey={`layer${index}`} stroke={`#c882ca`} />
      ))}
    </LineChart>
  );
};

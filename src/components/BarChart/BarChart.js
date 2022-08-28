import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

// export const data = [
//   ["Language", "Density", { role: "style" }],
//   //   ["Copper", 8.94, "#b87333"], // RGB value
//   //   ["Silver", 10.49, "#b87333"], // English color name
//   //   ["Gold", 19.3, "#b87333"],
//   //   ["Platinum", 21.45, "#b87333"], // CSS-style declaration
// ];

const BarChart = ({ resultList }) => {
  const [data, setData] = useState([
    ["Language", "Density", { role: "style" }],
  ]);

  useEffect(() => {
    let dataObj = {};
    for (let i of resultList) {
      if (!dataObj[i.language]) dataObj[i.language] = 1;
      else dataObj[i.language] += 1;
    }
    let updatedData = [];
    for (let i in dataObj) {
      updatedData.push([i, dataObj[i], "#b87333"]);
    }
    setData([...data, ...updatedData]);
  }, []);

  return (
    <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
  );
};

export default BarChart;

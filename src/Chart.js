import React from "react";
import "./App.css";
import { Card } from "@material-ui/core";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
function Chart({ chartData }) {
  let cardStyle = {
    display: "box",
    width: "40vw",
    textAlign: "center",
    height: "54vh",
    margin: "5px",
    padding: "10px",
  };
  return (
    <div className="chart">
      <Card style={cardStyle}>
        <BarChart
          width={750}
          height={500}
          margin={{
            top: 10,
            right: 30,
            left: 40,
            bottom: 5,
          }}
          data={chartData}
        >
          <XAxis dataKey="name" stroke="#00000" />

          <YAxis />
          <Tooltip wrapperStyle={{ width: 150, backgroundColor: "#ccc" }} />

          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="value" fill="fill" barSize={70} />
        </BarChart>
      </Card>
    </div>
  );
}

export default Chart;

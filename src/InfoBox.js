import React from "react";

import { Card, CardContent, Typography } from "@material-ui/core";
import "./App.css";

import CountUp from "react-countup";
function InfoBox({ title, cases, total, boxStyle, fontColor }) {
  let cardStyle = {
    display: "box",
    width: "9.5vw",
    textAlign: "center",
    height: "17vh",
    margin: "5px",
    padding: "10px",
    borderRadius: "20px",
    zIndex: "200",
    boxShadow: "0 30px 60px 0 rgba(90, 116, 148, 0.4)",
  };

  return (
    <div>
      <Card className={`${boxStyle} `} style={cardStyle}>
        <CardContent>
          <Typography
            className="infoBox_title"
            color="textPrimary"
            style={{ fontWeight: "bolder", fontSize: "21.5px" }}
          >
            {title}
          </Typography>
          <Typography
            style={{
              fontWeight: "bolder",
              fontSize: "21.5px",
              color: `${fontColor}`,
            }}
            className="infoBox_cases"
          >
            +<CountUp start={0} end={cases} duration={3} />
          </Typography>
          <Typography
            className="infoBox_total"
            color="textSecondary"
            style={{ fontWeight: "bolder", fontSize: "21.5px" }}
          >
            {total}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default InfoBox;

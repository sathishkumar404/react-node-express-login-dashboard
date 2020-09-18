import React from "react";
import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";

import Widget from "components/Widget";

const data = [{name: 'Normal', value: 58}, {name: 'Height', value: 20},
  {name: 'Critical', value: 8}, {name: 'Low', value: 15}];

const COLORS = [
  "#1cf005",
  "#5797fc",
  "#FA8C16",
  "#d234eb",
  "#dceb34",
  "#f5222d",
  "#d9d9d9",
  "black"
];


const TaskByStatus = ({ data1, title }) => {
  var obj = [];
  var big = 0;
  var winner='';
  console.log("props", data1);
  data1.length > 0 &&
    data1.filter((filter) => filter.emp_emot_id != 384).map((item, i) => {
      if (item.avg_emot_value > big) big = item.avg_emot_value;
      obj.push({ name: item.emp_emot_type, value: item.avg_emot_value });
    });

  obj.sort(function(a, b) {
    return parseInt(b.value) - parseInt(a.value);
  });
  winner = obj[0]

  

  console.log("pie", obj);

  return (
    <Widget
      title={
        <h2 className="h4 gx-text-capitalize gx-mb-0">
          {winner?winner.name.toUpperCase() : title}
        </h2>
      }
      styleName="gx-text-center"
    >
      <div className="gx-py-3">
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Tooltip />
            <text
              x="50%"
              className="h1"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {big}
            </text>
            <Pie
              data={obj}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={47}
              outerRadius={57}
              fill="#8884d8"
            >
              {obj.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Widget>
  );
};
export default TaskByStatus;

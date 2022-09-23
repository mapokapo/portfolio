import React from "react";
import { PageView } from "../utils/getEntries";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
ChartJS.defaults.font.size = 16;
ChartJS.defaults.color = "#ddd";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);
import { Line } from "react-chartjs-2";

type Props = {
  entries: PageView[];
};
const LineGraph: React.FC<Props> = ({ entries }) => {
  return (
    <Line
      options={{
        responsive: true,
        borderColor: "#ddd",
        elements: {
          point: {
            radius: 0,
          },
        },
        scales: {
          y: {
            ticks: {
              stepSize: 1,
            },
          },
        },
        font: {
          size: 32,
          family: "Segoe UI",
        },
      }}
      data={{
        datasets: [
          {
            data: entries.map(e => e.totalViews),
            tension: 0,
          },
        ],
        labels: entries.map(
          entry => new Date(entry.recordStartTimestamp).getHours() + ":00"
        ),
      }}
    />
  );
};

export default LineGraph;

"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

import { PageView } from "@/lib/schemas/pageView";

ChartJS.defaults.font.size = 16;
ChartJS.defaults.color = "#ddd";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export type StatisticsGraphProps = {
  entries: PageView[];
};

const StatisticsGraph: React.FC<StatisticsGraphProps> = ({ entries }) => {
  return (
    <Line
      className="mb-auto"
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
      options={{
        borderColor: "#ddd",
        elements: {
          point: {
            radius: 0,
          },
        },
        font: {
          family: "Segoe UI",
          size: 32,
        },
        responsive: true,
        scales: {
          y: {
            ticks: {
              stepSize: 1,
            },
          },
        },
      }}
    />
  );
};

export default StatisticsGraph;

"use client";

import { useEffect } from "react";

export const ReportView: React.FC = () => {
  useEffect(() => {
    console.log("Incrementing page view count");
    fetch("/api/pageView", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  }, []);

  return null;
};

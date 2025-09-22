"use client";

import { useEffect } from "react";

export const ReportView: React.FC = () => {
  useEffect(() => {
    console.log("Incrementing page view count");
    fetch("/api/pageView", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  return null;
};

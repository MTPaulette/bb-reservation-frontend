"use client";
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/jsvectormap.css";
import React, { useEffect } from "react";
// import "@/lib/js/us-aea-en";
import "@/lib/js/world-merc";
import Title from "@/components/Title";

export default function MapOne({title}: {title: string}) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mapOne = new jsVectorMap({
      selector: "#mapOne",
      // map: "us_aea_en",
      map: "world_merc",
      zoomButtons: true,

      regionStyle: {
        initial: {
          fill: "#C8D0D8",
        },
        hover: {
          fillOpacity: 1,
          fill: "#3056D3",
        },
      },
      regionLabelStyle: {
        initial: {
          fontFamily: "Satoshi",
          fontWeight: "semibold",
          fill: "#fff",
        },
        hover: {
          cursor: "pointer",
        },
      },

      labels: {
        regions: {
          render(code: string) {
            return code.split("-")[1];
          },
        },
      },
    });

    return () => {
      const map = document.getElementById("mapOne");
      if (map) {
        map.innerHTML = "";
      }
      // mapOne.destroy();
    };
  }, []);

  return (
    // <div className="col-span-12 rounded-sm border border-divider bg-background px-7.5 py-6 shadow-default xl:col-span-7">
    <div className="col-span-12 rounded-sm border border-divider bg-background px-7.5 py-6 shadow-default">
      <Title className="mb-6 text-xl">{title}</Title>
      <div className="h-90">
        <div id="mapOne" className="mapOne map-btn"></div>
      </div>
    </div>
  );
};

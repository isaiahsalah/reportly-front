import {SplinePointer} from "lucide-react";

export const menuData = {
  versions: ["0.0.1"],
  navMain: [
    {
      title: "Bolsas",
      url: "#",
      items: [
        {
          title: "trazabilidad",
          url: "/bags/traceability",
          icon: SplinePointer,
          state: true,
        },
      ],
    },
    {
      title: "Termoformado",
      url: "#",
      items: [
        {
          title: "trazabilidad",
          url: "/thermo/traceability",
          icon: SplinePointer,
          state: true,
        },
      ],
    },
    {
      title: "Tanque",
      url: "#",
      items: [
        {
          title: "trazabilidad",
          url: "traceability",
          icon: SplinePointer,
          state: false,
        },
      ],
    },
  ],
};

export const typeSearch = [
  {id: 1, name: "Proceso Siguiente"},
  {id: 2, name: "Proceso Anterior"},
];

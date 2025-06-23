export type ITraceability = {
  date: Date;
  sector: string;
  turn: string;
  operador: string;
  group: string;
  product: string;
  primary_unit: string;
  primary_quantity: number;
  secondary_unit: string;
  secondary_quantity: number;
  lote: string;
};

// export type Extrusion_pa_po_withoutTurno = Omit<IExtrusion, 'turno'>; // Excluye 'turno' del tipo

export type IGeneral = ITraceability;

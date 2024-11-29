import { Compañia, CompañiaModel } from "./types.ts";

export const fromModelToCompañia = (CompañiaModel: CompañiaModel): Compañia => {
  return {
    id: CompañiaModel._id!.toString(),
    origen: CompañiaModel.origen,
    destino: CompañiaModel.destino,
    fecha: CompañiaModel.fecha,
  };
};
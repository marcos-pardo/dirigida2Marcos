import { OptionalId } from "mongodb";

export type CompañiaModel = OptionalId<{
    origen: string;
    destino: string;
    fecha: string;
}>;

export type Compañia = {
  id: string;
    origen: string;
    destino: string;
    fecha: string;
};
import { Collection, ObjectId } from "mongodb";
import { Compañia, CompañiaModel } from "./types.ts";
import { fromModelToCompañia } from "./utils.ts";

export const resolvers = {
  Query: {
    getFlights: async ( _: unknown, {origen, destino}: {origen:string, destino:string}, context: { CompañiaCollections: Collection<CompañiaModel> }, ): Promise<Compañia[]> => {

        if (origen && destino) {
            const CompañiasModel = await context.CompañiaCollections.find({origen, destino}).toArray();
            return CompañiasModel.map((CompañiaModel) =>
                fromModelToCompañia(CompañiaModel)
            );
            }
        if (origen) {
            const CompañiasModel = await context.CompañiaCollections.find({origen}).toArray();
            return CompañiasModel.map((CompañiaModel) =>
                fromModelToCompañia(CompañiaModel)
            );
            }
        if (destino) {
            const CompañiasModel = await context.CompañiaCollections.find({destino}).toArray();
            return CompañiasModel.map((CompañiaModel) =>
                fromModelToCompañia(CompañiaModel)
            );
            }
        const CompañiasModel = await context.CompañiaCollections.find().toArray();
        return CompañiasModel.map((CompañiaModel) =>
          fromModelToCompañia(CompañiaModel)
        );

      /*const CompañiasModel = await context.CompañiaCollections.find().toArray();
      return CompañiasModel.map((CompañiaModel) =>
        fromModelToCompañia(CompañiaModel)
      );
      */
    },
    getFlight: async ( _: unknown, { id }: { id: string }, context: { CompañiaCollections: Collection<CompañiaModel>; }, ): Promise<Compañia | null> => {
      const CompañiaModel = await context.CompañiaCollections.findOne({
        _id: new ObjectId(id),
      });
      if (!CompañiaModel) {
        return null;
      }
      return fromModelToCompañia(CompañiaModel);
    },
  },
  Mutation: {
    addFlight: async (
      _: unknown,
      args: { origen: string; destino: string; fecha: string },
      context: {
        CompañiaCollections: Collection<CompañiaModel>;
      },
    ): Promise<Compañia> => {
      const { origen, destino , fecha } = args;
      const { insertedId } = await context.CompañiaCollections.insertOne({
        origen,
        destino,
        fecha,
      });
      const CompañiaModel = {
        _id: insertedId,
        origen,
        destino,
        fecha,
      };
      return fromModelToCompañia(CompañiaModel!);
    },

  },
};
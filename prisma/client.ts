import { PrismaClient, Cupcake, PastryChef } from "@prisma/client";
const globalForPrisma = globalThis as unknown as { cupcakesDBClient: PrismaClient };
export const cupcakesDBClient = globalForPrisma.cupcakesDBClient || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.cupcakesDBClient = cupcakesDBClient;

export type CupcakeWithPastryChef = Cupcake & { pastryChef: PastryChef };

export default cupcakesDBClient;

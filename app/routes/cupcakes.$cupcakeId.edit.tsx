import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { cupcakesDBClient } from "../../prisma/client";

export async function loader({ params }: LoaderFunctionArgs) {
  const cupcakeId = params.cupcakeId || "fff79311-a00e-4d33-85c3-dcaae367a54f";
  const cupcake = await cupcakesDBClient.cupcake.findUnique({
    where: { id: cupcakeId },
  });
  return Response.json({ cupcake, name: "cupcake" });
}

export default function EditCupcake() {
  const { cupcake } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Edit Cupcake</h1>
      <pre>{JSON.stringify(cupcake, null, 2)}</pre>
    </div>
  );
}

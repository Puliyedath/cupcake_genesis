import { Outlet, useLoaderData } from "@remix-run/react";
import { cupcakesDBClient } from "../../prisma/client";
import { ActionFunctionArgs } from "@remix-run/node";
import { Cupcake } from "~/components/Cupcake";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const cupcakeId = formData.get("cupcakeId") as string;
  const intent = formData.get("intent") as string;
  if (cupcakeId && intent === "delete") {
    await cupcakesDBClient.cupcake.delete({
      where: { id: cupcakeId },
    });
  }
  return Response.json({ success: true });
}

export async function loader() {
  const cupcakes = await cupcakesDBClient.cupcake.findMany({
    take: 20,
    include: { pastryChef: true },
    orderBy: {
      id: "desc",
    },
  });
  return Response.json({ cupcakes });
}

export default function Cupcakes() {
  const { cupcakes } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-wrap gap-4 hover:cursor-pointer">
      {cupcakes.map(cupcake => (
        <Cupcake key={cupcake.id} cupcake={cupcake} />
      ))}
      <Outlet />
    </div>
  );
}

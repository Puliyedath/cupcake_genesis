import { useLoaderData } from "@remix-run/react";
import { cupcakesDBClient } from "../../prisma/client";
import { Rating } from "~/components/rating";

export async function loader() {
  const cupcakes = await cupcakesDBClient.cupcake.findMany({
    take: 20,
    include: { pastryChef: true },
  });
  return { cupcakes };
}

export default function Cupcakes() {
  const { cupcakes } = useLoaderData<typeof loader>();
  return (
    <div className="gap-10 sm:columns-2 md:columns-3 lg:columns-4">
      {cupcakes.map(cupcake => (
        <div key={cupcake.id} className="bg-white py-4">
          <div className="mt-4">
            <p className="text-sm text-gray-700 font-mono font-bold">{cupcake.name}</p>
          </div>
          <div className="group relative">
            <img
              src={cupcake.imageUrl}
              alt={cupcake.name}
              className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
            />
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700 font-mono font-bold">
                  <span aria-hidden="true" className="absolute inset-0"></span>
                  {cupcake.pastryChef.name}
                </h3>
              </div>
              <Rating value={cupcake.rating} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

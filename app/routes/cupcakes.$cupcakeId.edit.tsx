import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { cupcakesDBClient } from "../../prisma/client";
import { ratingValues } from "../components/CupcakeRating";
import { JsonValue } from "@prisma/client/runtime/library";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const cupcakeId = formData.get("cupcakeId") as string;
  const oldCupcake = await cupcakesDBClient.cupcake.findUnique({
    where: { id: cupcakeId },
  });
  if (!oldCupcake) {
    return Response.json({ error: "Cupcake not found" }, { status: 404 });
  }
  const name = formData.get("name") || (oldCupcake?.name as string);
  const ingredientsString = (formData.get("ingredients") || "") as string;
  const ingredients = ingredientsString ? ingredientsString?.split(",") : [];
  const rating = (formData.get("rating") as (typeof ratingValues)[number]) || oldCupcake?.rating;
  const newCupcakePayload = {
    name: name as string,
    imageUrl: oldCupcake?.imageUrl,
    id: oldCupcake.id,
    description: {
      ...(oldCupcake.description as Record<string, JsonValue>),
      ingredients,
    },
    pastryChefId: oldCupcake.pastryChefId,
    rating: rating,
  };
  const cupcake = await cupcakesDBClient.cupcake.update({
    where: { id: cupcakeId },
    data: newCupcakePayload,
  });
  return Response.json({ cupcake });
}

export async function loader({ params }: LoaderFunctionArgs) {
  const cupcakeId = params.cupcakeId || "fff79311-a00e-4d33-85c3-dcaae367a54f";
  const cupcake = await cupcakesDBClient.cupcake.findUnique({
    where: { id: cupcakeId },
  });
  return Response.json({ cupcake });
}

export default function EditCupcake() {
  const { cupcake } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col p-6 bg-white rounded-lg shadow-md w-1/2 sm:w-full md:w-3/4 mt-4 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Cupcake: {cupcake.name}</h1>
      <img src={cupcake.imageUrl} alt={cupcake.name} className="w-1/3 self-center" />

      <Form method="post" className="flex flex-col gap-4">
        <input type="hidden" name="cupcakeId" value={cupcake.id} />
        <label className="font-medium" htmlFor="name">
          Cupcake Name
        </label>
        <input
          type="text"
          name="name"
          defaultValue={cupcake.name}
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="font-medium" htmlFor="ingredients">
          Ingredients
        </label>
        <input
          type="text"
          name="ingredients"
          defaultValue={cupcake.description.ingredients?.join(", ")}
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="font-medium" htmlFor="rating">
          Rating
        </label>
        <select
          name="rating"
          defaultValue={cupcake.rating}
          className="border border-gray-300 rounded-md p-2"
        >
          {ratingValues.map((rating: string) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Update
        </button>
      </Form>
    </div>
  );
}

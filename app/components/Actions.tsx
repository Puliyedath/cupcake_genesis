import { Link, NavLink, useFetcher } from "@remix-run/react";

export function CupCakeActions({ cupcakeId }: { cupcakeId: string }) {
  const fetcher = useFetcher();
  return (
    <div className="flex justify-evenly absolute top-0 left-0 right-0 bottom-0 items-center opacity-0 hover:opacity-100 transition-opacity">
      <fetcher.Form method="post">
        <input type="hidden" name="cupcakeId" value={cupcakeId} />
        <input type="hidden" name="intent" value="delete" />
        <button
          type="submit"
          className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
          title="Delete cupcake"
          onClick={() => {
            console.log("clicked");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </fetcher.Form>
      <NavLink to={`/cupcakes/${cupcakeId}/edit`}>
        <button
          className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
          title="Edit cupcake"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
      </NavLink>
    </div>
  );
}

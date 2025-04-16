import { Rating } from "./CupcakeRating";
import { CupCakeActions } from "./Actions";
import { Cupcake as CupcakeType } from "@prisma/client";
import { useEffect, useRef } from "react";

function Image({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
  cupcakeId: string;
}) {
  return (
    <div className="flex flex-col relative">
      <img src={src} alt={alt} className="rounded-md bg-gray-200 w-full h-auto" />
      {children}
    </div>
  );
}

export function Cupcake({ cupcake }: { cupcake: CupcakeType }) {
  useEffect(() => {
    requestAnimationFrame(() => {
      const container = document.querySelector(`div[data-cupcake-id="${cupcake.id}"]`);
      const img = document.querySelector(`div[data-cupcake-id="${cupcake.id}"] img`);
      if (!container || !img) return;
      const rowGap = 10;
      const rowHeight = 10;
      const containerHeight = container.getBoundingClientRect().height;
      const imgHeight = img.getBoundingClientRect().height;
      const height = Math.max(containerHeight, imgHeight);
      const span = Math.ceil(height / (rowHeight + rowGap));
      console.log({ containerHeight, span });
      if (container instanceof HTMLElement) {
        container.style.gridRowEnd = `span ${span}`;
      }
    });
  }, [cupcake.id]);

  return (
    <div key={cupcake.id} className="bg-white py-4" data-cupcake-id={cupcake.id}>
      <div className="mt-4">
        <p className="text-sm text-gray-700 font-mono font-bold">{cupcake.name}</p>
      </div>
      <Image src={cupcake.imageUrl} alt={cupcake.name} cupcakeId={cupcake.id}>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700 font-mono font-bold">{cupcake.pastryChef.name}</h3>
          </div>
          <Rating value={cupcake.rating} />
        </div>
        <CupCakeActions cupcakeId={cupcake.id} />
      </Image>
    </div>
  );
}

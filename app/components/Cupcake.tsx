import { Rating } from "./CupcakeRating";
import { CupCakeActions } from "./Actions";
import { Cupcake as CupcakeType, PastryChef } from "@prisma/client";
import { useEffect, useRef, forwardRef } from "react";

const Image = forwardRef<HTMLImageElement, { src: string; alt: string; children: React.ReactNode }>(
  ({ src, alt, children }, ref) => {
    return (
      <div className="flex flex-col relative">
        <img ref={ref} src={src} alt={alt} className="rounded-md bg-gray-200 w-full h-auto" />
        {children}
      </div>
    );
  },
);

Image.displayName = "Image";

type CupcakeWithPastryChef = CupcakeType & { pastryChef: PastryChef };
export function Cupcake({ cupcake }: { cupcake: CupcakeWithPastryChef }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const img = imageRef.current;
    requestAnimationFrame(() => {
      const container = containerRef.current;

      if (!container || !img || !nameRef.current || !metadataRef.current) return;
      const rowGap = 10;
      const rowHeight = 10;
      const imgHeight = img.getBoundingClientRect().height;
      const nameRefHeight = nameRef.current?.getBoundingClientRect().height || 0;
      const metadataRefHeight = metadataRef.current?.getBoundingClientRect().height || 0;
      const span = Math.ceil(
        (nameRefHeight + metadataRefHeight + imgHeight) / (rowHeight + rowGap),
      );
      if (container instanceof HTMLElement) {
        container.style.gridRowEnd = `span ${span}`;
      }
    });
  }, [cupcake.id]);

  return (
    <div ref={containerRef} key={cupcake.id} className="bg-white" data-cupcake-id={cupcake.id}>
      <Image ref={imageRef} src={cupcake.imageUrl} alt={cupcake.name}>
        <p ref={nameRef} className="text-sm text-gray-700 font-mono font-bold py-2">
          {cupcake.name}
        </p>
        <div ref={metadataRef} className="flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700 font-mono font-bold">
              {cupcake?.pastryChef?.name}
            </h3>
          </div>
          <Rating value={cupcake.rating} />
        </div>
        <CupCakeActions id={cupcake.id} />
      </Image>
    </div>
  );
}

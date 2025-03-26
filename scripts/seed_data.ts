// import { loadEnv } from "vite";
import { cupcakesDBClient } from "../prisma/client";
import { CupcakeRating } from "../prisma/generated/client";
import { faker } from "@faker-js/faker";

// const env = loadEnv("development", process.cwd(), "");

// console.log({ env });

const CUPCAKE_NAMES = [
  "Chocolate Dream",
  "Vanilla Cloud",
  "Red Velvet Delight",
  "Strawberry Bliss",
  "Lemon Sunshine",
  "Caramel Swirl",
  "Mint Chocolate Chip",
  "Blueberry Burst",
  "Cookies & Cream",
  "Peanut Butter Cup",
];

const CHEF_NAMES = [
  "Gordon Ramsay",
  "Julia Child",
  "Wolfgang Puck",
  "Martha Stewart",
  "Ina Garten",
];

const RATINGS = Object.values(CupcakeRating);

async function seed() {
  // Clear existing data
  await cupcakesDBClient.cupcake.deleteMany();
  await cupcakesDBClient.pastryChef.deleteMany();

  // Create chefs
  const chefs = await Promise.all(
    CHEF_NAMES.map(name =>
      cupcakesDBClient.pastryChef.create({
        data: {
          name,
        },
      }),
    ),
  );

  // Create cupcakes
  const cupcakes = await Promise.all(
    Array.from({ length: 100 }).map(async (_, index) => {
      const randomChef = chefs[Math.floor(Math.random() * chefs.length)];
      const baseName = CUPCAKE_NAMES[Math.floor(Math.random() * CUPCAKE_NAMES.length)];
      const name = `${baseName} #${index + 1}`;

      return cupcakesDBClient.cupcake.create({
        data: {
          name,
          rating: RATINGS[Math.floor(Math.random() * RATINGS.length)],
          description: {
            ingredients: [
              faker.commerce.productMaterial(),
              faker.commerce.productMaterial(),
              faker.commerce.productMaterial(),
            ],
            allergens: [faker.commerce.productAdjective(), faker.commerce.productAdjective()],
            nutritionalInfo: {
              calories: faker.number.int({ min: 200, max: 500 }),
              protein: faker.number.int({ min: 2, max: 8 }),
              carbs: faker.number.int({ min: 20, max: 50 }),
              fat: faker.number.int({ min: 8, max: 25 }),
            },
          },
          imageUrl: faker.image.urlLoremFlickr({ category: "food" }),
          pastryChefId: randomChef.id,
        },
      });
    }),
  );

  console.log(`Created ${cupcakes.length} cupcakes`);
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await cupcakesDBClient.$disconnect();
  });

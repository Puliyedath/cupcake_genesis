// import { loadEnv } from "vite";
import { cupcakesDBClient } from "../prisma/client";
import { CupcakeRating } from "@prisma/client";
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

const CUPCAKE_IMAGES = [
  // Original set
  "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80", // Chocolate cupcake
  "https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=80", // Vanilla cupcake
  "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=80", // Red velvet
  "https://images.unsplash.com/photo-1623246123320-0d6636755796?w=800&q=80", // Strawberry
  "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&q=80", // Birthday cupcake
  "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&q=80", // Rainbow cupcake
  "https://images.unsplash.com/photo-1612203985729-70726954388c?w=800&q=80", // Sprinkles
  "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=800&q=80", // Chocolate frosting
  "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&q=80", // Holiday cupcake
  "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=80", // Elegant cupcake

  // Additional cupcakes
  "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=800&q=80", // Vanilla with sprinkles
  "https://images.unsplash.com/photo-1587536849024-daaa4a417b16?w=800&q=80", // Chocolate ganache
  "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80", // Birthday sprinkles
  "https://images.unsplash.com/photo-1599785209796-786432b228bc?w=800&q=80", // Classic vanilla
  "https://images.unsplash.com/photo-1607478900766-efe13248b125?w=800&q=80", // Red velvet special
  "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80", // Pastel cupcake
  "https://images.unsplash.com/photo-1563778084459-859099e48677?w=800&q=80", // Rainbow sprinkles
  "https://images.unsplash.com/photo-1615837136007-701de6015cfb?w=800&q=80", // Chocolate swirl
  "https://images.unsplash.com/photo-1612203985729-70726954388c?w=800&q=80", // Pink frosting
  "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&q=80", // Party cupcake

  // More variety
  "https://images.unsplash.com/photo-1587536849024-daaa4a417b16?w=800&q=80", // Dark chocolate
  "https://images.unsplash.com/photo-1612201142855-7873bc1661b4?w=800&q=80", // Wedding cupcake
  "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=80", // Elegant rose
  "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=800&q=80", // Golden swirl
  "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&q=80", // Christmas theme

  // Seasonal and special
  "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&q=80", // Valentine's day
  "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&q=80", // Easter cupcake
  "https://images.unsplash.com/photo-1612203985729-70726954388c?w=800&q=80", // Halloween theme
  "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=800&q=80", // New Year's
  "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&q=80", // Birthday special

  // Gourmet collection
  "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80", // Triple chocolate
  "https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=80", // Vanilla bean
  "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=80", // Salted caramel
  "https://images.unsplash.com/photo-1623246123320-0d6636755796?w=800&q=80", // Tiramisu
  "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&q=80", // Matcha green tea

  // Fruit flavors
  "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&q=80", // Lemon burst
  "https://images.unsplash.com/photo-1612203985729-70726954388c?w=800&q=80", // Strawberry fields
  "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=800&q=80", // Blueberry dream
  "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&q=80", // Raspberry swirl
  "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=80", // Orange cream

  // Classic favorites
  "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80", // Double chocolate
  "https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=80", // French vanilla
  "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=80", // Red velvet classic
  "https://images.unsplash.com/photo-1623246123320-0d6636755796?w=800&q=80", // Cookies & cream
  "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&q=80", // Peanut butter cup

  // Premium selection
  "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&q=80", // Gold leaf
  "https://images.unsplash.com/photo-1612203985729-70726954388c?w=800&q=80", // Champagne
  "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=800&q=80", // Dark truffle
  "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&q=80", // Lavender honey
  "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=80", // Rose pistachio

  // Unique flavors
  "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80", // Maple bacon
  "https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=80", // Spiced chai
  "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=80", // Earl grey
  "https://images.unsplash.com/photo-1623246123320-0d6636755796?w=800&q=80", // Mint chocolate
  "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&q=80", // Caramel apple

  // Mini cupcakes
  "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&q=80", // Mini chocolate
  "https://images.unsplash.com/photo-1612203985729-70726954388c?w=800&q=80", // Mini vanilla
  "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=800&q=80", // Mini red velvet
  "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&q=80", // Mini lemon
  "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=80", // Mini strawberry
];

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
          imageUrl: getCupcakeImage(),
          pastryChefId: randomChef.id,
        },
      });
    }),
  );

  console.log(`Created ${cupcakes.length} cupcakes`);
}

function getCupcakeImage(): string {
  return CUPCAKE_IMAGES[Math.floor(Math.random() * CUPCAKE_IMAGES.length)];
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await cupcakesDBClient.$disconnect();
  });

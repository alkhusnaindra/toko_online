import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding data");

  await prisma.product.createMany({
    data: [
      {
        name: "Monstera",
        price: 150000,
        description: "Tanaman hias dauh lebar",
      },
      {
        name: "Algonema",
        price: 100000,
        description: "Tanaman hias cantik dan tahan lama",
      },
      {
        name: "Lidah Mertua",
        price: 50000,
        description: "Tanaman hias penyerap polusi",
      },
    ],
  });

  console.log("Seeding complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

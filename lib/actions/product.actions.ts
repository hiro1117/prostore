"use server";
import { PrismaClient } from "@/lib/generated/prisma";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { prisma } from "@/db/prisma";

// Get latest products
export async function getLatestProducts() {
  const prisma = new PrismaClient();

  // Note:behavior - LATEST_PRODUCTS_LIMIT is a constant that is used to limit the number of products returned by the getLatestProducts function.
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return data.map((product) => ({
    ...product,
    price: product.price.toString(),
    rating: product.rating.toString(),
  }));
}

// Get single product by it's slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
}

"use server";
import { PrismaClient } from "@/lib/generated/prisma";
import { convertToPlainObject } from "@/lib/utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

// Get latest products
export async function getLatestProducts() {
  const prisma = new PrismaClient();

  // Note:behavior - LATEST_PRODUCTS_LIMIT is a constant that is used to limit the number of products returned by the getLatestProducts function.
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return convertToPlainObject(data);
}

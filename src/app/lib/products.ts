import prisma from "./db";
import { cache } from "./cache";

const day = 60 * 60 * 24;

export const getCategoryList = cache(
  async () => {
    try {
      const categories = await prisma.product.findMany({
        select: { category: true },
        orderBy: { category: "asc" },
      });
      const list: string[] = [];
      for (const item of categories) {
        if (!list.includes(item.category.toLowerCase())) {
          list.push(item.category.toLowerCase());
        }
      }

      return list;
    } catch (error) {
      console.error(error);
      // can't throw error here because of no error boundary at the layout level
    }
  },
  ["/products", "getCategoryList"],
  { revalidate: day },
);

export const getBrandList = cache(
  async (category: string) => {
    try {
      const brands = await prisma.product.findMany({
        ...(category && { where: { category } }),
        select: { brand: true },
        orderBy: { brand: "asc" },
      });

      const list: string[] = [];
      for (const item of brands) {
        if (!list.includes(item.brand)) {
          list.push(item.brand);
        }
      }

      return list;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  ["/products", "getBrandList"],
  { revalidate: day },
);

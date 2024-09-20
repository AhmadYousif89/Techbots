import prisma from "./db";
import { cache } from "./cache";

const day = 60 * 60 * 24;

export type Data = {
  asin: string;
  title: string;
  mainImage: string;
  category: string;
};

export const getSearchItems = cache(
  async () => {
    try {
      const result = await prisma.product.findMany({
        select: {
          asin: true,
          title: true,
          category: true,
          mainImage: true,
        },
      });

      const data = result.reduce((list: Record<string, Data[]>, p) => {
        const item = {
          asin: p.asin,
          title: p.title,
          mainImage: p.mainImage,
          category: p.category,
        };
        list[p.category] = [...(list[p.category] ?? []), item];
        return list;
      }, {});

      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch search data!");
    }
  },
  ["/products", "getSearchItems"],
  { revalidate: day },
);

export const getCategories = cache(
  async () => {
    try {
      const categories = await prisma.product.findMany({
        select: { category: true },
        orderBy: { category: "asc" },
      });

      return [...new Set(categories.map((c) => c.category))];
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  ["/products", "getCategories"],
  { revalidate: day },
);

export const getBrands = cache(
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
  ["/products", "getBrands"],
  { revalidate: day },
);

import { NextResponse } from "next/server";

import prisma from "@/app/lib/db";
import type { Data } from "@/app/lib/products";

type SearchResultGroups = Record<string, Data[]>;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim();

  if (!query) {
    return NextResponse.json<SearchResultGroups>({});
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { category: { contains: query, mode: "insensitive" } },
          { asin: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        asin: true,
        title: true,
        category: true,
        mainImage: true,
      },
      orderBy: { title: "asc" },
      take: 50,
    });

    const data = products.reduce<SearchResultGroups>((list, product) => {
      const item = {
        asin: product.asin,
        title: product.title,
        mainImage: product.mainImage,
        category: product.category,
      };

      list[product.category] = [...(list[product.category] ?? []), item];
      return list;
    }, {});

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch search data." },
      { status: 500 },
    );
  }
}

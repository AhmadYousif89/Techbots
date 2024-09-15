"use server";

import { PathLike } from "fs";
import { FileHandle, readFile } from "fs/promises";

type ImageData = { asin: string; data: string };
type Base64ImgList = { asin: string }[];

export async function getBase64Images() {
  try {
    const data = await readFile("data/thumbnail_data_uri.json", "utf8");
    const uriObject = JSON.parse(data) as Record<string, Base64ImgList>;

    const categories: Record<string, ImageData[]> = {};
    for (const [type, imageData] of Object.entries(uriObject)) {
      const images: ImageData[] = [];
      for (const image of imageData) {
        const [asin, data] = Object.entries(image)[0];
        images.push({ asin, data });
      }
      categories[type] = images;
    }

    return categories;
  } catch (error) {
    console.error(error);
    return {};
  }
}

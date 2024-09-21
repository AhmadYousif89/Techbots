import path from "path";
import { readFile } from "fs/promises";

type ImageData = { asin: string; data: string };
type Base64ImgList = { asin: string }[];

export async function getThumbnailImages() {
  try {
    const filePath = path.join(
      process.cwd(),
      "data",
      "thumbnail_data_uri.json",
    );
    const data = await readFile(filePath, "utf8");
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
    console.error("Error reading thumbnail data:", error);
    return {};
  }
}

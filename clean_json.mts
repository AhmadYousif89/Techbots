import { PathLike } from 'fs';
import { FileHandle, readFile, writeFile } from 'fs/promises';

function cleanString(input: string) {
  return input.replace(/[^\x00-\x7F]/g, ''); // Replace non-UTF-8 characters with empty string
}

function cleanObject(obj: { [key: string]: unknown }) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = cleanString(obj[key] as string); // Use type assertion to cast obj[key] to string
    } else if (typeof obj[key] === 'object' && obj[key]) {
      obj[key] = cleanObject(obj[key] as { [key: string]: unknown }); // Use type assertion to cast obj[key] to object
    }
  }
  return obj;
}

async function cleanJsonFile(
  inputFile: PathLike | FileHandle,
  outputFile: PathLike | FileHandle
) {
  const data = await readFile(inputFile, 'utf8');
  const jsonData = JSON.parse(data);
  const cleanedData = jsonData.map((item: { [key: string]: unknown }) =>
    cleanObject(item)
  );
  await writeFile(outputFile, JSON.stringify(cleanedData, null, 4), 'utf8');
}

const inputFile = './data/all_products.json';
const outputFile = './data/products.json';

try {
  cleanJsonFile(inputFile, outputFile);
} catch (error) {
  console.error('Error cleaning JSON file:', error);
}
console.log('JSON file cleaned and saved as ./data/products.json');

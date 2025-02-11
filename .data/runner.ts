import * as fs from 'fs';
import * as path from 'path';

const OUTPUT_DIR = '.data/seed';

function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function writeJsonToFile(filename: string, data: any): void {
  const filePath = path.join(OUTPUT_DIR, filename);
  ensureDirectoryExists(OUTPUT_DIR);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Generated ${filePath}`);
}

export function generateMockData(
  fn: () => void,
  descriptionFileName: string
): void {
  writeJsonToFile(`${descriptionFileName}.json`, fn());
}

export function readJsonAsObject(fileBasename: string) {
  const filePath = path.join(OUTPUT_DIR, `${fileBasename}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const res = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  if (Object.keys(res).length === 0) {
    throw new Error(`File content is not an object: ${fileBasename}`);
  }
  return res;
}

export function readJsonProperty(fileBasename: string, property: string) {
  const filePath = path.join(OUTPUT_DIR, `${fileBasename}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileContent);
  return data[property];
}

export function readRandomArrayProperty(
  fileBasename: string,
  property: string,
  index?: number
) {
  const filePath = path.join(OUTPUT_DIR, `${fileBasename}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileContent);

  if (!Array.isArray(data)) {
    throw new Error(`Content of ${filePath} is not an array`);
  }

  if (data.length === 0) {
    throw new Error(`Array in ${filePath} is empty`);
  }

  if (index === undefined) {
    index = Math.floor(Math.random() * data.length);
  }

  if (index == -1) {
    index = data.length - 1;
  }

  return data[index][property];
}

// Run the generator

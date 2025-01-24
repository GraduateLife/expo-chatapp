import * as fs from 'fs';
import * as path from 'path';
import { MessageMocker } from './MessageMocker';

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

export function generateMockData(fn: () => void, descriptionFileName: string): void {
  writeJsonToFile(`${descriptionFileName}.json`, fn());
}

// Run the generator

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export default function handler(req, res) {
  const csvFilePath = path.join(process.cwd(), 'data', 'salaries.csv');

  try {
    const csvData = fs.readFileSync(csvFilePath, 'utf-8');
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true
    });
    res.status(200).json(records);
  } catch (error) {
    console.error("Failed to read or parse the CSV:", error);
    res.status(500).json({ error: "Failed to process the CSV file." });
  }
}

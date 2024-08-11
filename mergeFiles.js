import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Directory containing the files (relative to the project root)
const folderPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'src'); // Change 'src' to your specific directory

// Output file (relative to the project root)
const outputFile = path.join(path.dirname(fileURLToPath(import.meta.url)), 'output.txt');

// Allowed file extensions (add more if needed)
const allowedExtensions = ['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.json'];

// Function to recursively get all files in a directory
const getAllFiles = (dirPath, arrayOfFiles = []) => {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else if (stat.isFile() && allowedExtensions.includes(path.extname(file))) {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
};

// Get all files in the folder and subfolders
const allFiles = getAllFiles(folderPath);

let allContents = '';

// Read and merge all file contents with titles
allFiles.forEach((filePath) => {
  const fileName = path.relative(folderPath, filePath); // Relative path from the folderPath
  const fileContents = fs.readFileSync(filePath, 'utf8');
  allContents += `\n\n--- File: ${fileName} ---\n\n${fileContents}\n`;
});

// Write the combined content to the output file
fs.writeFile(outputFile, allContents, (err) => {
  if (err) {
    return console.error(`Unable to write to file: ${err}`);
  }
  console.log('All files have been merged into output.txt');
});

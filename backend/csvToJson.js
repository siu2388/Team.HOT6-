import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';

const inputDir = 'data';
const outputDir = 'data';

// JSON 파일로 변환하는 함수
const convertCsvToJson = (inputPath, outputPath) => {
  const results = [];
  fs.createReadStream(inputPath)
    .pipe(csv())
    .on('data', data => results.push(data))
    .on('end', () => {
      // JSON 파일로 저장
      const jsonPath = path.join(outputPath, `${path.basename(inputPath, '.csv')}.json`);
      fs.writeFileSync(jsonPath, JSON.stringify(results));
      console.log(`Converted ${inputPath} to ${jsonPath}`);
      return;
    });
};

// data 폴더의 CSV 파일들을 처리
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading input directory:', err);
    return;
  }

  // CSV 파일들을 순회하며 JSON으로 변환
  files.forEach(file => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir);
    convertCsvToJson(inputPath, outputPath);
  });
  console.log('변환성공');
});

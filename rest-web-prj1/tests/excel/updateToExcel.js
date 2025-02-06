const ExcelJs = require('exceljs');

async function updateDataToExcel(weatherData, filePath){
    const excelWorkbook = new ExcelJs.Workbook();

    await excelWorkbook.xlsx.readFile(filePath);

    const eWsWeather = excelWorkbook.getWorksheet('Weather')

    const totalRows = weatherData[0].length;
    const totalCols = weatherData.length;

    for(let colIdx = 1; colIdx <= totalCols; colIdx++){
        for(let rowIdx = 1; rowIdx <= totalRows; rowIdx++){
            const cell = eWsWeather.getCell(rowIdx, colIdx);
            const eWsCellData = weatherData[colIdx - 1][rowIdx - 1];

            cell.value = eWsCellData;
        }
    }

    await excelWorkbook.xlsx.writeFile(filePath);
}

module.exports = { updateDataToExcel };
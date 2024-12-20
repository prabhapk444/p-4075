import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface ExportData {
  headers: string[];
  data: any[];
  reportType: string;
}

export const exportToPDF = ({ headers, data, reportType }: ExportData) => {
  const doc = new jsPDF();
  const title = `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`;
  
  // Add title
  doc.setFontSize(16);
  doc.text(title, 20, 20);
  
  // Add headers
  doc.setFontSize(12);
  headers.forEach((header, index) => {
    doc.text(header, 20 + (index * 40), 40);
  });
  
  // Add data
  data.forEach((row, rowIndex) => {
    Object.values(row).forEach((cell: any, cellIndex) => {
      if (cellIndex === 0) return; // Skip ID
      doc.text(String(cell), 20 + ((cellIndex - 1) * 40), 50 + (rowIndex * 10));
    });
  });
  
  doc.save(`${reportType}-report.pdf`);
};

export const exportToExcel = ({ headers, data, reportType }: ExportData) => {
  const worksheet = XLSX.utils.json_to_sheet(
    data.map(row => {
      const newRow: any = {};
      headers.forEach((header, index) => {
        newRow[header] = Object.values(row)[index + 1]; // Skip ID
      });
      return newRow;
    })
  );
  
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, reportType);
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
  saveAs(
    new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
    `${reportType}-report.xlsx`
  );
};

export const exportToCSV = ({ headers, data, reportType }: ExportData) => {
  const rows = [
    headers.join(','),
    ...data.map(row => 
      Object.values(row)
        .slice(1) // Skip ID
        .map(cell => `"${cell}"`)
        .join(',')
    )
  ];
  
  const csvContent = rows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${reportType}-report.csv`);
};

export const exportToWord = ({ headers, data, reportType }: ExportData) => {
  const title = `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`;
  
  let htmlContent = `
    <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
      </head>
      <body>
        <h1>${title}</h1>
        <table border="1" cellpadding="5" cellspacing="0">
          <tr>
            ${headers.map(header => `<th>${header}</th>`).join('')}
          </tr>
          ${data.map(row => `
            <tr>
              ${Object.values(row)
                .slice(1) // Skip ID
                .map(cell => `<td>${cell}</td>`)
                .join('')}
            </tr>
          `).join('')}
        </table>
      </body>
    </html>
  `;
  
  const blob = new Blob([htmlContent], { type: 'application/msword' });
  saveAs(blob, `${reportType}-report.doc`);
};
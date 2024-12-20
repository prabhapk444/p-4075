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
  const date = new Date().toLocaleDateString('en-IN');
  const time = new Date().toLocaleTimeString('en-IN');
  
  // Add header with logo placeholder and title
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Bank Management System", 105, 20, { align: "center" });
  
  // Add report title
  doc.setFontSize(16);
  doc.text(title, 105, 35, { align: "center" });
  
  // Add date and time
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated on: ${date} at ${time}`, 105, 45, { align: "center" });
  
  // Add table headers
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  headers.forEach((header, index) => {
    doc.text(header, 20 + (index * 40), 60);
  });
  
  // Add table data
  doc.setFont("helvetica", "normal");
  data.forEach((row, rowIndex) => {
    Object.values(row).forEach((cell: any, cellIndex) => {
      if (cellIndex === 0) return; // Skip ID
      let cellValue = String(cell);
      // Replace dollar with rupee symbol
      if (cellValue.includes('$')) {
        cellValue = cellValue.replace('$', '₹');
      }
      doc.text(cellValue, 20 + ((cellIndex - 1) * 40), 70 + (rowIndex * 10));
    });
  });
  
  // Add footer
  doc.setFontSize(10);
  doc.text("This is a computer-generated document", 105, doc.internal.pageSize.height - 20, { align: "center" });
  doc.text("No signature required", 105, doc.internal.pageSize.height - 15, { align: "center" });
  
  doc.save(`${reportType}-report-${date}.pdf`);
};

export const exportToExcel = ({ headers, data, reportType }: ExportData) => {
  // Convert data to worksheet format with rupee symbol
  const worksheetData = data.map(row => {
    const newRow: any = {};
    headers.forEach((header, index) => {
      let value = Object.values(row)[index + 1]; // Skip ID
      if (typeof value === 'string' && value.includes('$')) {
        value = value.replace('$', '₹');
      }
      newRow[header] = value;
    });
    return newRow;
  });
  
  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  
  // Style the worksheet
  const workbook = XLSX.utils.book_new();
  
  // Set column widths
  const columnWidths = headers.map(() => ({ wch: 20 }));
  worksheet['!cols'] = columnWidths;
  
  // Add title row
  XLSX.utils.sheet_add_aoa(worksheet, [
    [`${reportType.toUpperCase()} REPORT`],
    [`Generated on: ${new Date().toLocaleDateString('en-IN')}`],
    [],
    headers
  ], { origin: 'A1' });
  
  XLSX.utils.book_append_sheet(workbook, worksheet, reportType);
  
  const excelBuffer = XLSX.write(workbook, { 
    bookType: 'xlsx', 
    type: 'array',
    bookSST: false
  });
  
  saveAs(
    new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
    `${reportType}-report-${new Date().toLocaleDateString('en-IN')}.xlsx`
  );
};

export const exportToCSV = ({ headers, data, reportType }: ExportData) => {
  // Add title and date to CSV
  const title = `${reportType.toUpperCase()} REPORT`;
  const date = `Generated on: ${new Date().toLocaleDateString('en-IN')}`;
  
  const rows = [
    [title],
    [date],
    [''],
    headers,
    ...data.map(row => 
      Object.values(row)
        .slice(1) // Skip ID
        .map(cell => {
          let value = String(cell);
          if (value.includes('$')) {
            value = value.replace('$', '₹');
          }
          return `"${value}"`;
        })
    )
  ];
  
  const csvContent = rows.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${reportType}-report-${new Date().toLocaleDateString('en-IN')}.csv`);
};

export const exportToWord = ({ headers, data, reportType }: ExportData) => {
  const title = `${reportType.toUpperCase()} REPORT`;
  const date = new Date().toLocaleDateString('en-IN');
  
  let htmlContent = `
    <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .header { text-align: center; margin-bottom: 30px; }
          .title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .date { font-size: 14px; color: #666; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background-color: #f5f5f5; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">Bank Management System</div>
          <div class="title">${title}</div>
          <div class="date">Generated on: ${date}</div>
        </div>
        <table>
          <tr>
            ${headers.map(header => `<th>${header}</th>`).join('')}
          </tr>
          ${data.map(row => `
            <tr>
              ${Object.values(row)
                .slice(1) // Skip ID
                .map(cell => {
                  let value = String(cell);
                  if (value.includes('$')) {
                    value = value.replace('$', '₹');
                  }
                  return `<td>${value}</td>`;
                })
                .join('')}
            </tr>
          `).join('')}
        </table>
        <div class="footer">
          <p>This is a computer-generated document</p>
          <p>No signature required</p>
        </div>
      </body>
    </html>
  `;
  
  const blob = new Blob([htmlContent], { type: 'application/msword' });
  saveAs(blob, `${reportType}-report-${date}.doc`);
};
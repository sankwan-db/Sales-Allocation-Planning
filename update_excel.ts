import fs from 'fs';
let content = fs.readFileSync('src/data/reportData.ts', 'utf8');

const oldExcel = `export function exportReportToExcel(reportName: string, data: any, filters: any) {
  console.log('Exporting Excel for', reportName, data, filters);
}`;

const newExcel = `export function exportReportToExcel(reportName: string, data: any, filters: GlobalFilterState) {
  if (!data || !data.rows || data.rows.length === 0) {
    alert('ไม่มีข้อมูลสำหรับส่งออก (No data to export)');
    return;
  }
  const keys = Object.keys(data.rows[0]);
  const headerRow = keys.join(',');
  const contentRows = data.rows.map((row: any) => {
    return keys.map(k => {
      const val = row[k];
      if (typeof val === 'string') {
        return '"' + val.replace(/"/g, '""') + '"';
      }
      return val;
    }).join(',');
  });
  
  const csvContent = '\\uFEFF' + [headerRow, ...contentRows].join('\\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', \`\${reportName.replace(/\\s+/g, '_')}_Report.csv\`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}`;

content = content.replace(oldExcel, newExcel);
fs.writeFileSync('src/data/reportData.ts', content);

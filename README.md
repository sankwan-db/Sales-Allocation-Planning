# SAPE — Sales Allocation, Planning & Execution Management System

Enterprise prototype สำหรับการวางแผน Supply, Demand-Supply Balance, Sales Allocation, Sales Execution และ ERP SO workflow.

## Patch V1.3

- แก้ Report Center ที่บางรายงานแสดงหน้าว่าง
- เพิ่มรายงาน Yield พร้อม KPI, Yield comparison, trend, calculation flow และ detail drill-down
- เพิ่ม Demand-Supply Report พร้อมสูตร Available Supply / Requirement / Balance / Status
- เพิ่ม Allocation Report พร้อม Allocation → SO → Pipeline → Gap และ drill-down ระดับฝ่ายขาย
- เพิ่ม report data สำหรับ Stock at Risk, Forecast Accuracy และ Variance เพื่อป้องกัน dead report
- ทำ Filter แบบ context-aware: Yield ไม่แสดง Sales Team; Allocation แสดง Channel/Team/Salesperson
- เพิ่ม Chicken Type / Breed filtering รองรับ Broiler, Layer, PS และข้อมูลใหม่จาก Master
- เชื่อม mock flow Chicken Intake → Yield → Demand-Supply → Allocation → SO → Delivery
- Export Excel และ Export PDF สามารถทำงานจาก Report Center
- เพิ่ม Error / No Data fallback เพื่อไม่ให้แสดง blank report body

## Run locally

1. `npm install`
2. `npm run dev`

Build / type-check:

- `npm run build`
- `npm run lint`

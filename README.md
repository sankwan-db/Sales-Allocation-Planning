# SAPE — Sales Allocation, Planning & Execution Management System

เว็บแอปพลิเคชันสำหรับวางแผนไก่เข้าโรงงาน คำนวณ Supply/Yield เปรียบเทียบ Demand–Supply จัดสรรการขาย และส่งต่อเป้าหมายสู่ Sales Execution

## Phase 1 scope

- Executive Dashboard และ Planning Alerts
- Chicken Intake Plan รองรับ Chicken Type/Breed และ Revision
- Supply & Yield calculation view
- Demand–Supply Balance
- Allocation by Sales Channel พร้อม Over-allocation control
- Sales Action Pipeline
- โครงเมนู Quotation, Contract, Oracle R12 SO Interface, KPI และ Master Data

## Run locally

```bash
npm install
npm run dev
```

เปิด `http://localhost:3000`

## Verify

```bash
npm run lint
npm run build
```

## Architecture direction

Oracle R12 จะเป็น Source of Truth สำหรับ Product, Customer, Sales Order และ Actual Sales ส่วน SAPE ดูแล Planning, Yield, Allocation, CRM, Quotation, Contract และ KPI เอกสารที่อนุมัติแล้วต้องสร้าง Revision ใหม่เมื่อแก้ไขและไม่เขียนทับประวัติเดิม

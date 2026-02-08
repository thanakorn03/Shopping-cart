# 🛒 Shopping Cart - High Performance Hardware Dashboard

คู่มือการพัฒนาโปรเจกต์ระบบตะกร้าสินค้าและจัดการสต็อกสินค้า (Inventory-Aware Cart System) ตั้งแต่เริ่มต้นจนจบ

## 🛠 เทคโนโลยีที่ใช้ (Tech Stack)
- **Frontend Framework**: React (Vite)
- **State Management**: Redux Toolkit
- **Styling**: TailwindCSS & DaisyUI
- **Icons**: Lucide React
- **Form Management**: React Hook Form

---

## 🚀 ขั้นตอนการเริ่มต้นโปรเจกต์ (Project Setup)

### 1. การสร้างโปรเจกต์และติดตั้ง Library
เปิด Terminal และรันคำสั่งตามลำดับดังนี้:

```bash
# 1. สร้างโปรเจกต์ด้วย Vite
npm create vite@latest shopping-cart -- --template react
cd shopping-cart

# 2. ติดตั้ง Dependencies สำหรับจัดการ State และ UI
npm install @reduxjs/toolkit react-redux lucide-react react-hook-form

# 3. ติดตั้ง TailwindCSS และ DaisyUI
npm install -D tailwindcss postcss autoprefixer daisyui
npx tailwindcss init -p
```

### 2. การตั้งค่าไฟล์คอนฟิก
แก้ไขไฟล์ `tailwind.config.js` เพื่อเปิดใช้งาน DaisyUI และตั้งค่า Theme:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00d1ff", // สี Cyan สำหรับธีม Cyberpunk
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: { themes: ["dark"] },
};
```

---

## 🏗 การสร้างระบบจัดการข้อมูล (State Management)

### 1. สร้างไฟล์ ActionType.js
เพื่อรวบรวม Action Names ทั้งหมดไว้ที่เดียว ป้องกันการพิมพ์ผิด:
- `PRODUCT_ACTIONS`: สำหรับจัดการสินค้าและสต็อก
- `CART_ACTIONS`: สำหรับจัดการสินค้าในตะกร้าและการสั่งซื้อ
- `UI_ACTIONS`: สำหรับการค้นหาและฟิลเตอร์

### 2. สร้าง Redux Slices
- **productSlice.js**: เก็บข้อมูลสินค้าเริ่มต้น และฟังก์ชัน `reduceQuantity` (ตัดสต็อก) / `restoreQuantity` (คืนสต็อก)
- **cartSlice.js**: จัดการรายการในตะกร้า, คำนวณราคารวม และฟังก์ชัน `processOrder` (ล้างตะกร้าเมื่อจ่ายเงิน)
- **uiSlice.js**: เก็บสถานะการค้นหา (Search) และการจัดเรียงข้อมูล

---

## 💡 ฟีเจอร์และลอจิกสำคัญ (Core Logic)

### 📦 ระบบเชื่อมโยงสต็อก (Inventory-Cart Sync)
นี่คือจุดเด่นของโปรเจกต์นี้:
- **เมื่อกด Buy Now**: ระบบจะเรียก `addToCart` พร้อมกับ `reduceQuantity` เพื่อลดสินค้าในร้านทันที
- **การเพิ่มจำนวนในตะกร้า (+)**: มีการตรวจสอบ `originalQuantity` ไม่ให้ผู้ใช้กดเพิ่มเกินจำนวนสินค้าจริงที่มี
- **การลดจำนวนสินค้า (-)**: เมื่อลดจำนวนในตะกร้า ระบบจะคืนสินค้ากลับเข้าสต็อกร้านค้าอัตโนมัติ (เฉพาะกรณีจำนวน > 1)
- **การลบสินค้า (Trash)**: คืนสินค้าทั้งหมดที่อยู่ในตะกร้ากลับเข้าสต็อกร้านค้า

### 💳 ระบบชำระเงิน (Payment Flow)
- สร้าง **PaymentModal** ที่ให้ผู้ใช้เลือกได้ 3 วิธี:
  1. เงินสดเก็บเงินปลายทาง (Cash on Delivery)
  2. สแกน QR Code
  3. TrueMoney Wallet
- มีระบบจำลองการประมวลผล (Simulation) และแจ้งยืนยันความสำเร็จ

---

## 💻 วิธีการรันโปรเจกต์ (How to Run)

หากต้องการรันโปรเจกต์ในเครื่องเครื่องใหม่:

```bash
# 1. ติดตั้ง dependencies ทั้งหมด
npm install

# 2. รันโปรเจกต์ในโหมด Development
npm run dev
```

---

## 📝 รายการ Commit ที่แนะนำ
- `init: project setup with vite and tailwindcss`
- `feat: implement redux store and action types`
- `feat: add inventory management and stock validation`
- `feat: implement payment modal with multiple methods`
- `fix: inventory synchronization and quantity bugs`


🌸 FlowerShop API
FlowerShop — bu Express.js va MySQL asosida yaratilgan backend API bo‘lib, foydalanuvchi autentifikatsiyasi, kategoriya boshqaruvi va boshqa asosiy CRUD amallarni bajarishga mo‘ljallangan.

🚀 Base URL
bash

http://localhost:4000/api/
🔐 Auth (Foydalanuvchi ro‘yxatdan o‘tishi va login)
📌 Register
POST /auth/register

Body:
{
  "first_name": "Ali",
  "last_name": "Valiyev",
  "phone": "+998901234567",
  "email": "ali@gmail.com",
  "password": "12345678"
}
📌 Login
POST /auth/login

Body:
{
  "email": "ali@gmail.com",
  "password": "12345678"
}
📁 Category (Kategoriya CRUD)
✅ 1. Yangi kategoriya yaratish
POST /category/create

Body:
{
  "name": "Tug'ilgan kun",
  "description": "Bayram uchun atirgullar",
  "count": 20,
  "img_url": "https://example.com/image.jpg"
}
📥 2. Barcha kategoriyalarni olish
GET /category/getAll

🔍 3. ID orqali bitta kategoriya olish
GET /category/getById/:id
Masalan:
GET /category/getById/1

✏️ 4. Kategoriya ma’lumotlarini yangilash
PUT /category/update/:id

Body:
(create'dagidek bir xil)


{
  "name": "Sevgi gullari",
  "description": "Romantik holatlar uchun",
  "count": 12,
  "img_url": "https://example.com/love.jpg"
}
🗑 5. Kategoriya o‘chirish
DELETE /category/delete/:id
Masalan:
DELETE /category/delete/3

⚠️ Eslatma: Faqat flowers jadvalidagi bog‘liq ma’lumotlar bo‘lmasa yoki soft delete bo‘lsa o‘chirish mumkin.

📌 Eslatmalar:
Barcha so‘rovlar uchun Content-Type: application/json headeri kerak.

Validatsiyalar joi orqali amalga oshirilgan.

DELETE route — soft delete bo‘lishi tavsiya qilinadi.

Ma'lumotlar MySQL bazasida saqlanadi (flowershop).

🔧 Texnologiyalar:
Node.js + Express.js

MySQL + mysql2

Joi (validatsiya)

RESTful architecture

shokhijakhon-error-handler (xatoliklarni boshqarish)
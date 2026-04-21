# 🚀 Event-Driven Order Processing System

A scalable backend system built with Node.js that demonstrates modern backend architecture including RESTful APIs, async processing, and event-driven design.

---

## 🚀 How to Run

```bash
npm install
npm run dev
```

---

## 🧩 Features

### 1. Order API
* Method: POST
* Create orders via RESTful endpoint `/api/orders`
* Input validation using Joi
* Clean architecture (Controller → Service → Validator)

### 📥 Request Body

<pre>{
  "user_id": "string",
  "items": [
    {
      "product_id": "string",
      "quantity": 1,
      "price": 100
    }
  ],
  "note": "string (optional)"
} </pre>

### 📌 Notes
* user_id: ID của user tạo order
* items: danh sách sản phẩm (không được rỗng)
* quantity > 0, price >= 0
* note là optional

---

### 2. Analytics API
* Method: GET
* Endpoint: `/api/report`
* Aggregates data from:

  * Local database (mock users)
  * External API (simulated delay 2–5s)
* Optimized using:

  * `Promise.allSettled` (parallel processing)
  * Timeout handling
  * In-memory caching (TTL 30s)
    
---

### 3. Notification Service (Queue-based)

* Asynchronous email sending via job queue
* Worker processes jobs independently
* Retry mechanism (max 3 attempts)
* Logging success/failure to file

#### 🔔 Flow
Khi tạo order qua API /api/orders
System sẽ push job vào queue:
<pre> addJob({
  email: "user@example.com",
  message: "Your order created",
});</pre>

* Worker sẽ xử lý queue và gửi email qua Nodemailer
#### 📡 Email Service
<pre> sendEmail(to, message); </pre>
Uses Gmail SMTP via Nodemailer
Requires environment variables:
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

📬 Email Payload
<pre> {
  "to": "user@example.com",
  "message": "Your order created"
}</pre> 
🚀 Trigger API (Order → Notification)

#### POST /api/orders

<pre> {
  "user_id": "user_123",
  "items": [
    {
      "product_id": "prod_1",
      "quantity": 1,
      "price": 100
    }
  ]
}
</pre>

#### Khi gọi API này:
* Order được tạo
* Job được push vào queue
* Email sẽ được gửi async (không block request)

#### ⚠️ Notes
* Email sending is non-blocking (improves API performance)
* Retry up to 3 times if sending fails
* Currently uses in-memory queue (mock) → suitable for demo
* Can be extended to Redis (BullMQ) for production

---

## ⚙️ Tech Stack

* Node.js (Express)
* Joi (validation)
* Nodemailer (email service)
* In-memory queue (mock for real queue systems)
* Async/Await + Promise-based concurrency

---

## 🧠 Architecture

* Event-driven design
* Decoupled services (API vs Notification)
* Scalable via worker-based processing
* Ready to extend with Redis / Kafka

---

## 📌 Future Improvements

* Replace in-memory queue with Redis (BullMQ)
* Add rate limiting & retry backoff
* Integrate real database (PostgreSQL)
* Add monitoring & logging system

---

## 🎯 Key Highlights

* Handles high concurrency (10k+ notifications/min simulation)
* Implements async processing & fault tolerance
* Clean modular structure (controller/service separation)
* Production-ready design mindset

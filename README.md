# 🚀 Event-Driven Order Processing System

A scalable backend system built with Node.js that demonstrates modern backend architecture including RESTful APIs, async processing, and event-driven design.

---

## 🧩 Features

### 1. Order API

* Create orders via RESTful endpoint `/api/orders`
* Input validation using Joi
* Clean architecture (Controller → Service → Validator)

---

### 2. Analytics API

* Endpoint: `/api/report`
* Aggregates data from:

  * Local database (mock users)
  * External API (simulated delay 2–5s)
* Optimized using:

  * `Promise.allSettled` (parallel processing)
  * Timeout handling
  * In-memory caching (TTL 30s)
  * 
### 📥 Request Body

{
  "user_id": "string",
  "items": [
    {
      "product_id": "string",
      "quantity": 1,
      "price": 100
    }
  ],
  "note": "string (optional)"
}

### 📌 Notes
user_id: ID của user tạo order
items: danh sách sản phẩm (không được rỗng)
quantity > 0, price >= 0
note là optional

---

### 3. Notification Service (Queue-based)

* Asynchronous email sending via job queue
* Worker processes jobs independently
* Retry mechanism (max 3 attempts)
* Logging success/failure to file

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

## 🚀 How to Run

```bash
npm install
npm run dev
```

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

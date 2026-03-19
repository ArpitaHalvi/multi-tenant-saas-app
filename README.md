Overview

This project is a full-stack application designed for tenants/businesses to manage bookings, customers, and staff efficiently. It provides authentication, data listing, and management capabilities with a modern frontend and scalable backend architecture.

⚙️ Tech Stack
🖥️ Frontend

Next.js – React framework for building server-side rendered and optimized web applications

TanStack Query – Used for efficient API handling, caching, and server-state management

Redux Toolkit – Manages global authentication state

ShadCN UI – Provides reusable and accessible UI components

🗄️ Backend

Node.js – Runtime environment for building scalable APIs

Express.js – Backend framework for handling routes and middleware

MongoDB – NoSQL database for storing application data

🔐 Features
✅ Authentication

Tenants/Businesses can:

Register

Login

Authentication state is managed using Redux Toolkit

📊 Booking Management

Tenants can:

Add bookings

View booking list

Note: Update and delete operations for bookings are not implemented yet.

👥 Customer Management

Tenants can:

View customer list

Manage customer-related data (currently limited to listing)

Note: Create, update, and delete operations are not implemented yet.

🧑‍💼 Staff Management

Staff data is associated with bookings and customers

Tenants can view staff-related details

⚡ Frontend Data Handling

API calls are handled using TanStack Query
Data caching is partially implemented

Booking list caching (Pending)
Customer list caching (Pending, especially tenant-specific)

# 🚌 University Of Barishal Bus Schedule System - Backend

This is the backend server for the **University of Barishal Bus Schedule System**, a robust, real-time platform designed to manage university transportation, including buses, drivers, schedules, and student bookings.

> Built with **Node.js**, **Express.js**, **TypeScript**, **MongoDB**, **Socket.io**, and **Zod** for validation.

---

## 📂 Project Structure

```

server/
│
├── src/
│ ├── modules/
│ │ ├── user/
│ │ ├── admin/
│ │ ├── student/
│ │ ├── driver/
│ │ ├── bus/
│ │ ├── route/
│ │ ├── schedule/
│ │ ├── booking/
│ │ └── auth/
│ │ └── .../
│ ├── config/
│ ├── constants/
│ ├── middlewares/
│ ├── utils/
│ ├── app.ts
│ └── server.ts
├── .env
├── tsconfig.json
├── package.json
├── .gitignore
├── prettier.json
└── README.md

```

---

## 🚀 Features

- ✅ User Authentication (JWT access and refresh tokens)
- ✅ Role-based Authorization: `admin`, `student`, `driver`
- ✅ Soft Delete, Blocking, Default Password
- ✅ Bus, Route, Schedule, and Booking Management
- ✅ Real-time Features (e.g., bus status updates via polling/socket)
- ✅ Email functionality for password reset and notifications
- ✅ File uploads via `multer` and `cloudinary`
- ✅ Robust validation using `Zod`
- ✅ Modular MVC Structure
- ✅ Environment Variable Management
- ✅ RESTful API Design

---

## ⚙️ Tech Stack

| Category     | Tech / Package                        |
| ------------ | ------------------------------------- |
| Language     | TypeScript                            |
| Runtime      | Node.js                               |
| Framework    | Express.js                            |
| Database     | MongoDB + Mongoose                    |
| Auth         | JWT (`jsonwebtoken`)                  |
| Validation   | Zod                                   |
| File Upload  | Multer + Cloudinary                   |
| Mail Service | Nodemailer (Gmail SMTP)               |
| Security     | bcryptjs, cookie-parser, cors, dotenv |
| Real-Time    | (Pluggable via Socket.IO or polling)  |
| Dev Tools    | ts-node-dev, nodemon                  |
| Lint/Format  | Prettier, ESLint                      |

---

## 🔐 .env Configuration (example)

```env
PORT=
NODE_ENV=

MONGO_URI=

BCRYPT_SALT=
DEFAULT_PASSWORD=

JWT_SECRET=
JWT_EXPIRATION=
JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRATION=

MAIL_HOST=
MAIL_PORT=
MAIL_SECURE=
MAIL_USER=
MAIL_PASS=

RESET_UI_URL=
RESET_PASSWORD_URL=

CLOUD_NAME=
API_KEY=
API_SECRET=
```

---

### 📦 Entity Models and Relationships

---

### 1. 👤 User Model

Represents a user in the system (Admin, Driver, or Student).

| Field          | Type       | Description                                               |
| -------------- | ---------- | --------------------------------------------------------- |
| `name`         | `String`   | Full name (required)                                      |
| `email`        | `String`   | Unique email for login (required)                         |
| `password`     | `String`   | Hashed password (required)                                |
| `role`         | `String`   | Role of the user: `admin`, `driver`, `student` (required) |
| `busAssigned`  | `ObjectId` | (Driver only) Reference to the Bus assigned               |
| `mobileNumber` | `String`   | Contact number (optional)                                 |
| `status`       | `String`   | `active`, `inactive`, or `suspended`                      |
| `isBlocked`    | `Boolean`  | Flag for user ban (default: false)                        |
| `isDeleted`    | `Boolean`  | Soft delete flag (default: false)                         |
| `refreshToken` | `String`   | Token for refreshing session                              |
| `accessToken`  | `String`   | JWT token for login                                       |
| `createdAt`    | `Date`     | Account creation date                                     |
| `updatedAt`    | `Date`     | Last update time                                          |

---

### 2. 🚌 Bus Model

Represents a bus with details and scheduling.

| Field             | Type       | Description                                     |
| ----------------- | ---------- | ----------------------------------------------- |
| `busNumber`       | `String`   | Unique identifier for the bus (required)        |
| `route`           | `[String]` | List of bus stops                               |
| `currentLocation` | `Object`   | GPS coordinates `{ latitude, longitude }`       |
| `status`          | `String`   | `on-time`, `delayed`, `offline`                 |
| `driver`          | `ObjectId` | Reference to assigned `User` (driver)           |
| `schedule`        | `[Object]` | Schedule: each entry includes `stop` and `time` |
| `capacity`        | `Number`   | Seating capacity                                |
| `busType`         | `String`   | `minibus`, `large bus`, etc.                    |
| `createdAt`       | `Date`     | Date bus was added                              |
| `updatedAt`       | `Date`     | Last update time                                |

---

### 3. 🗺️ Route Model

Represents a predefined route for buses.

| Field       | Type         | Description                          |
| ----------- | ------------ | ------------------------------------ |
| `routeName` | `String`     | Name of the route (e.g., Route 1)    |
| `stops`     | `[String]`   | List of stops in order               |
| `buses`     | `[ObjectId]` | List of Buses that follow this route |
| `duration`  | `String`     | Total estimated route duration       |
| `createdAt` | `Date`       | Route creation date                  |
| `updatedAt` | `Date`       | Last update time                     |

---

### 4. ⏰ Schedule Model

Defines bus timings for specific stops.

| Field       | Type       | Description                |
| ----------- | ---------- | -------------------------- |
| `bus`       | `ObjectId` | Reference to the `Bus`     |
| `time`      | `Date`     | Scheduled time for arrival |
| `stop`      | `String`   | Name of the stop           |
| `createdAt` | `Date`     | Schedule creation date     |
| `updatedAt` | `Date`     | Last update time           |

---

### 5. 📍 Tracking Model (Real-time Location)

Tracks the real-time GPS location of buses.

| Field       | Type       | Description                              |
| ----------- | ---------- | ---------------------------------------- |
| `bus`       | `ObjectId` | Reference to `Bus`                       |
| `location`  | `Object`   | `{ coordinates: [longitude, latitude] }` |
| `timestamp` | `Date`     | Time when location was recorded          |
| `createdAt` | `Date`     | Record creation date                     |

---

### 6. 🔔 Notification Model

Used to send messages or alerts to users.

| Field       | Type       | Description                                         |
| ----------- | ---------- | --------------------------------------------------- |
| `user`      | `ObjectId` | Reference to `User`                                 |
| `message`   | `String`   | Notification content                                |
| `type`      | `String`   | e.g., `bus-arrival`, `bus-delay`, `schedule-update` |
| `status`    | `String`   | `read`, `unread`                                    |
| `createdAt` | `Date`     | Notification creation time                          |
| `updatedAt` | `Date`     | Last updated time                                   |

---

### 7. 🎒 Student Journey Model

Tracks student usage and trip completion.

| Field       | Type       | Description                         |
| ----------- | ---------- | ----------------------------------- |
| `student`   | `ObjectId` | Reference to `User` (student)       |
| `bus`       | `ObjectId` | Reference to `Bus`                  |
| `route`     | `ObjectId` | Reference to `Route`                |
| `startTime` | `Date`     | Time journey started                |
| `endTime`   | `Date`     | Time journey ended                  |
| `status`    | `String`   | `ongoing`, `completed`, `cancelled` |
| `createdAt` | `Date`     | Journey record creation date        |

---

### 8. 🚏 Bus Stop Model (Optional)

Represents individual bus stops.

| Field        | Type       | Description                                    |
| ------------ | ---------- | ---------------------------------------------- |
| `name`       | `String`   | Stop name (e.g., Stop 1, Main Gate)            |
| `location`   | `Object`   | `{ latitude, longitude }`                      |
| `facilities` | `[String]` | Optional facilities like shelter, waiting area |
| `createdAt`  | `Date`     | Date stop was added                            |
| `updatedAt`  | `Date`     | Last update time                               |

---

### 9. 💬 Feedback Model (Optional)

Allows students to provide ratings and feedback.

| Field       | Type       | Description               |
| ----------- | ---------- | ------------------------- |
| `student`   | `ObjectId` | Reference to the student  |
| `bus`       | `ObjectId` | Reference to the bus      |
| `driver`    | `ObjectId` | Reference to the driver   |
| `rating`    | `Number`   | Rating between 1–5        |
| `comment`   | `String`   | Optional written feedback |
| `createdAt` | `Date`     | Feedback submission date  |

---

### 10. 🧾 Admin Logs (Optional)

Logs admin actions for transparency.

| Field       | Type       | Description                             |
| ----------- | ---------- | --------------------------------------- |
| `user`      | `ObjectId` | Admin who performed the action          |
| `action`    | `String`   | Description of action (e.g., Added Bus) |
| `timestamp` | `Date`     | When action occurred                    |
| `details`   | `String`   | Additional details of the action        |

---

### 🔁 Relationships Summary

- `User (Driver)` ⟶ `Bus` (One-to-One via `busAssigned`)
- `Bus` ⟶ `Schedule` (One-to-Many)
- `Route` ⟶ `Bus` (One-to-Many)
- `Bus` ⟶ `Tracking` (One-to-Many)
- `Student` ⟶ `Journey` (One-to-Many)
- `Student` ⟶ `Feedback` (One-to-Many)
- `Bus` ⟶ `Feedback`, `Tracking`, `Journey` (One-to-Many)
- `User` ⟶ `Notification`, `Logs` (One-to-Many)

---

## 📦 Installation

```bash
git clone https://github.com/mdimamhosen/BU-Bus-Schedule-Server
cd bu-bus-management-server
npm install
```

---

## ▶️ Scripts

```bash
# Start in development mode
npm run dev

# Build TypeScript
npm run build

# Start in production
npm run start

# Run ESLint
npm run lint

# Format with Prettier
npm run format
```

---

## API Routes

### User Routes

- `POST /api/users/register`
- `POST /api/users/login`
- `POST /api/users/logout`
- `PUT /api/users/block/:userId`
- `PUT /api/users/unblock/:userId`
- `PUT /api/users/status/:userId`
- `DELETE /api/users/delete/:userId`
- `POST /api/users/refresh-token`

### Bus Routes

- `POST /api/buses`
- `PUT /api/buses/:busId/assign`
- `PUT /api/buses/:busId/location`
- `PUT /api/buses/:busId/block`
- `PUT /api/buses/:busId/unblock`
- `DELETE /api/buses/:busId/delete`
- `POST /api/buses/restore/:busId`

### Route Routes

- `POST /api/routes`
- `PUT /api/routes/:routeId`
- `PUT /api/routes/:routeId/block`
- `PUT /api/routes/:routeId/unblock`
- `DELETE /api/routes/:routeId/delete`
- `POST /api/routes/restore/:routeId`

### Schedule Routes

- `POST /api/schedules`
- `PUT /api/schedules/:scheduleId`
- `PUT /api/schedules/:scheduleId/block`
- `PUT /api/schedules/:scheduleId/unblock`
- `DELETE /api/schedules/:scheduleId/delete`
- `POST /api/schedules/restore/:scheduled`

### Driver Routes

- `POST /api/drivers`
- `PUT /api/drivers/:driverId`
- `PUT /api/drivers/:driverId/assign`
- `PUT /api/drivers/:driverId/block`
- `PUT /api/drivers/:driverId/unblock`
- `DELETE /api/drivers/:driverId/delete`
- `POST /api/drivers/restore/:driverId`

### Auth Routes

- `POST /api/auth/refresh-token`
- `POST /api/auth/login`

### Feedback Routes

- `POST /api/feedbacks`
- `GET /api/feedbacks/:busId`

### Trip Routes

- `POST /api/trips`
- `PUT /api/trips/:tripId`
- `GET /api/trips/active`

### Notification Routes

- `POST /api/notifications`
- `PUT /api/notifications/:notificationId/read`
- `GET /api/notifications/:userId`

---

## 📡 Real-Time Features (Pluggable)

This backend is designed to support **real-time communication**, such as:

- 🚍 Live bus location updates (via polling or Socket.IO)
- 📲 Push notifications (via frontend integration)
- 🧑‍🎓 Booking status updates

> These features are structured in a scalable way and can be added easily.

---

## 📌 Best Practices Implemented

- Clean **Controller → Service → Model** pattern
- Environment-based configurations
- Role-based route protection
- Input validation using Zod
- Soft delete & block support
- DTOs and custom error handling
- Secure token and password handling

---

## 🛠️ Future Roadmap

- ✅ Admin dashboard (frontend)
- ✅ Password reset via email
- 🔄 Live location tracking via GPS/Socket.IO
- 📱 Driver mobile interface
- 🔔 Push notifications via OneSignal or Firebase

---

## 📞 Contact

**Developer:** Md Imam Hosen  
📧 Email: [mdimam.cse9.bu@gmail.com](mailto:mdimam.cse9.bu@gmail.com)  
📱 WhatsApp: [+8801733570761](https://wa.me/8801733570761)

---

> Made with ❤️ for University Of Barishal

# 📝 Task Manager API

A simple Task Manager REST API built with **Node.js** and **Express**, using file-based storage (`tasks.json`). Tasks can be created, viewed, updated, and deleted. The API validates inputs and saves all changes back to the file system automatically.

---

## 🚀 Features

- Create, read, update, and delete tasks
- Input validation for all endpoints
- Auto-persist changes to a `tasks.json` file
- Fully testable with [Tap](https://www.node-tap.org/) and [Supertest](https://github.com/visionmedia/supertest)
- Frontend-ready REST API

---

## 📁 Project Structure

```
.
├── app.js                           # Express app logic also will start the server
├── task.json                        # File-based storage for tasks
├── test/  server.test,js            # Test directory with test files
└── README.md
```

---

## 📦 Installation & Usage

1. **Clone the repo**:

```bash
git clone <your-repo-url>
cd task-manager-api
```

2. **Install dependencies**:

```bash
npm install
```

3. **Start the server**:

```bash
node app.js
```

Runs at: [http://localhost:3000](http://localhost:3000)

---

## 📬 API Endpoints

### `GET /tasks`
- ✅ Returns a list of all tasks

### `GET /tasks/:id`
- ✅ Returns a specific task by ID
- 🟥 Returns `404` if the task is not found

### `POST /tasks`
Create a new task.

#### Body Example:

```json
{
  "title": "Example Task",
  "description": "Write good documentation",
  "completed": false
}
```

#### Validations:
- `title`: **string**, required
- `description`: **string**, required
- `completed`: **boolean**, required

- ✅ Returns `201` on success
- 🟥 Returns `400` on invalid input

### `PUT /tasks/:id`
Update an existing task.

#### Body Example:

```json
{
  "title": "Updated Task",
  "description": "Updated description",
  "completed": true
}
```

- ✅ Returns `200` on success
- 🟥 Returns `400` on validation error
- 🟥 Returns `404` if task doesn't exist

### `DELETE /tasks/:id`
Deletes a task.

- ✅ Returns `200` on success
- 🟥 Returns `404` if task doesn't exist

---

## 💾 File-Based Storage

- All tasks are stored in `tasks.json` in this format:

```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Install Node.js",
      "description": "Set up the runtime environment",
      "completed": false
    }
  ]
}
```

- Tasks are loaded into memory at startup and saved back after every update.
- Changes made through the API will overwrite `tasks.json`.

---

## ✅ Running Tests

This API is test-ready with Tap + Supertest.

To run tests:

```bash
npm install --save-dev tap supertest
npx tap
```

---

## 💻 Frontend Integration

You can use this API with any frontend (React, Vue, etc.)

**Create Task Example:**

```js
fetch("http://localhost:3000/tasks", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title: "New Task",
    description: "Complete documentation",
    completed: false
  })
})
  .then(res => res.json())
  .then(data => console.log("Task created:", data));
```

**Fetch All Tasks:**

```js
fetch("http://localhost:3000/tasks")
  .then(res => res.json())
  .then(tasks => console.log(tasks));
```

---

## 🧠 Future Improvements

- Add authentication (JWT or sessions)
- Support pagination and search
- Store data in a database (MongoDB, PostgreSQL)

---

## 📄 License

MIT

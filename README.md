Here’s a good **README.md** file for  project based on the files  uploaded (`index.js`, `package.json`, and the solution files).

---

# 🌍 Travel Tracker

A simple Node.js + Express web application that helps track the countries you have visited.
It uses **PostgreSQL** as the database and **EJS** as the templating engine.

---

## 🚀 Features

* View all visited countries on the home page.
* Add new countries by entering their name.
* Prevents duplicate entries.
* Validates if a country exists in the database before adding.
* Error messages for:

  * Duplicate country
  * Invalid country name

---

## 📂 Project Structure

```
.
├── index.js           # Main application file
├── package.json       # Project metadata & dependencies
├── solution1.js       # Early solution (basic fetch of visited countries)
├── solution2.js       # Adds country insert functionality
├── solution3.js       # Handles duplicate/invalid entries with error messages
├── solution4.js       # Improves search with case-insensitive LIKE queries
├── views/
│   └── index.ejs      # EJS template for rendering UI (not provided here)
├── public/            # Static files (CSS, JS, images)
```

---

## 🛠️ Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: PostgreSQL
* **View Engine**: EJS
* **Middleware**: express.urlencoded (or body-parser in older solutions)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd travel-tracker
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup PostgreSQL

Create a database named **`world`** and required tables:

```sql
CREATE TABLE countries (
  country_code CHAR(2) PRIMARY KEY,
  country_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE visited_countries (
  id SERIAL PRIMARY KEY,
  country_code CHAR(2) REFERENCES countries(country_code) UNIQUE
);
```

Insert sample data into the `countries` table (you can load from an existing dataset or manually add).

### 4️⃣ Configure Database

Update database credentials in **`index.js`**:

```js
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "your_password_here",
  port: 5432,
});
```

### 5️⃣ Run the server

```bash
node index.js
```

Server runs at:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🧪 Alternate Solutions

* **solution1.js** → Minimal version (fetch only)
* **solution2.js** → Adds new country functionality
* **solution3.js** → Error handling (duplicate/invalid)
* **solution4.js** → Enhanced search (case-insensitive, partial matches)



## 📜 License

This project is licensed under the ISC License.




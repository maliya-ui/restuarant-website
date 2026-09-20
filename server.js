const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;
const dbPath = path.join(__dirname, 'restaurant.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Xiriiriyaha SQLite wuu fashilmay:', err.message);
    process.exit(1);
  }
  console.log('Waxaa lagu xidhiidhay SQLite database');
});

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

function initDatabase() {
  const tables = [
    `CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0
    )`,
    `CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      guests INTEGER NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`
  ];

  db.serialize(() => {
    tables.forEach((sql) => {
      db.run(sql, (err) => {
        if (err) {
          console.error('Khalad ka dhacay abuurista jadwalka:', err.message);
        }
      });
    });

    db.get('SELECT COUNT(*) AS count FROM menu_items', (err, row) => {
      if (err) {
        console.error('Hubinta menu wuu fashilmay:', err.message);
        return;
      }

      if (row && row.count === 0) {
        const seed = [
          ['Truffle Burrata', 'Starters', 'Creamy burrata, roasted tomatoes, basil oil and toasted sourdough.', 12.5, 'images/for p.avif', 1],
          ['Crispy Calamari', 'Starters', 'Lightly fried squid rings with lemon aioli and chili salt.', 14, 'images/open.avif', 2],
          ['Roasted Tomato Soup', 'Starters', 'Silky comfort soup finished with herb cream and parmesan.', 10.5, 'images/for p.avif', 3],
          ['Herb Salmon', 'Main Course', 'Atlantic salmon with lemon butter sauce and saffron rice.', 22, 'images/main course.avif', 4],
          ['Filet Mignon', 'Main Course', 'Grilled beef tenderloin, potato fondant, red wine reduction.', 31, 'images/main course.avif', 5],
          ['Wild Mushroom Risotto', 'Main Course', 'Creamy arborio rice with parmesan and roasted mushrooms.', 19, 'images/main course.avif', 6],
          ['Chocolate Lava Cake', 'Desserts', 'Warm molten center with vanilla bean cream and berries.', 9.5, 'images/desserts.avif', 7],
          ['Lemon Tart', 'Desserts', 'Citrus curd, almond crust and whipped mascarpone.', 8.5, 'images/desserts.avif', 8],
          ['Tiramisu', 'Desserts', 'Espresso-soaked ladyfingers with mascarpone and cocoa.', 9, 'images/desserts.avif', 9]
        ];

        const insert = db.prepare('INSERT INTO menu_items (name, category, description, price, image, sort_order) VALUES (?, ?, ?, ?, ?, ?)');

        seed.forEach(([name, category, description, price, image, sortOrder]) => {
          insert.run(name, category, description, price, image, sortOrder);
        });

        insert.finalize();
      }
    });
  });
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'API-da Tasteful waa shaqaynaysa' });
});

app.get('/api/menu', (req, res) => {
  db.all('SELECT * FROM menu_items ORDER BY sort_order ASC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/reservation', (req, res) => {
  const { name, email, phone, guests, date, time, notes } = req.body;
  if (!name || !email || !phone || !guests || !date || !time) {
    return res.status(400).json({ error: 'Fadlan buuxi dhammaan goobaha booqashada ee loo baahan yahay.' });
  }

  const stmt = db.prepare('INSERT INTO reservations (name, email, phone, guests, date, time, notes) VALUES (?, ?, ?, ?, ?, ?, ?)');
  stmt.run(name, email, phone, Number(guests), date, time, notes || '', function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ success: true, message: 'Dalabka meelaynta waa la helay. Kooxdeena waxay ku xaqiijin doontaa dhowaan.', reservationId: this.lastID });
  });
  stmt.finalize();
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Magaca, email, iyo fariin waa lagama maarmaan.' });
  }

  const stmt = db.prepare('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)');
  stmt.run(name, email, message, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ success: true, message: 'Mahadsanid inaad naga soo gaartay. Waxaan dhowaan ka jawaabi doonnaa.' });
  });
  stmt.finalize();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'restuarant.html'));
});

initDatabase();

app.listen(PORT, () => {
  console.log(`Server-ka Tasteful wuxuu ku shaqeeyaa http://localhost:${PORT}`);
});

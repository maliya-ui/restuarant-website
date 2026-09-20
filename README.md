# Tasteful Restaurant

Website makhaayad casri ah oo leh frontend, Express API, iyo SQLite database. Site-ka waxaa ku jira bogga hordhaca ee guryaha, menu firfircoon, foomka bookhadhka, iyo foomka xidhiidhka.

## Astaamaha

- Bogga hore ee makhaayadda oo qurux badan
- Menu firfircoon oo laga soo qaato SQLite via API
- Foomka bookhadhka oo lagu keydinayo backend
- Foomka xidhiidhka oo lagu keydinayo backend
- Naqshad u habboon desktop iyo mobil
- Qaab full-stack oo fudud iyadoo la isticmaalayo Node.js + Express + SQLite

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: SQLite

## Qaab dhismeedka mashruuca

- `restuarant.html` – bogga frontend ee ugu weyn
- `style.css` – qaabka site-ka
- `app.js` – isku xidhka frontend API
- `server.js` – server-ka Express iyo dejinta SQLite
- `package.json` – scripts-ka mashruuca iyo dependencies
- `restaurant.db` – faylka SQLite ee lagu abuuro marka server-ku bilaabmo

## Rakibidda iyo socodsiinta

1. Fur terminal gudaha folder-ka mashruuca.
2. Run:

```bash
npm install
npm start
```

3. Fur biraawsarka adigoo galaya:

```text
http://localhost:3000
```

## API Endpoints

- `GET /api/health` – hubin status-ka API
- `GET /api/menu` – soo saara menu items
- `POST /api/reservation` – keydinta xogta bookhadhka
- `POST /api/contact` – keydinta fariinta xidhiidhka

## Dejinta GitHub

Ka dib markaad abuurtid GitHub repository, ku socodsiinta:

```bash
git init
git add .
git commit -m "Initial restaurant app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Beddel URL-ka GitHub ee meelaha banaan.

## Xusuusin

- SQLite database waxaa la abuuraa si toos ah marka server-ku bilaabmo.
- Menu-ka waxaa lagu buuxinayaa xog ah markii ugu horeysay oo la bilaabmo.

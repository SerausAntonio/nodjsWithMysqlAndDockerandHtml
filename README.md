# MySQL met Docker en Node.js

## Architectuur

```text
HTML pagina → Node.js (Express) → MySQL database
```

In dit project:

* MySQL draait in Docker.
* Je ontwikkelt in Visual Studio Code.
* Node.js maakt verbinding met MySQL.
* Een HTML-formulier stuurt gegevens naar Node.js.
* Node.js slaat de gegevens op in MySQL.

---

# 1. Start een MySQL-container

```bash
docker run --name mysql-training \
  -e MYSQL_ROOT_PASSWORD=root123 \
  -e MYSQL_DATABASE=testdb \
  -p 3306:3306 \
  -d mysql:8.0
```

Controleer of de container draait:

```bash
docker ps
```

---

# 2. Installeer MySQL Workbench

Download en installeer alleen MySQL Workbench. Je hoeft de MySQL Server niet te installeren.

---

# 3. Maak een verbinding in Workbench

| Instelling | Waarde    |
| ---------- | --------- |
| Hostname   | localhost |
| Port       | 3306      |
| Username   | root      |
| Password   | root123   |

Klik op **Test Connection**.

---

# 4. SQL uitvoeren

Maak een tabel:

```sql
CREATE TABLE klanten (
    id INT PRIMARY KEY AUTO_INCREMENT,
    naam VARCHAR(100)
);
```

Voeg een record toe:

```sql
INSERT INTO klanten (naam)
VALUES ('Jan Jansen');
```

Controleer de gegevens:

```sql
SELECT * FROM klanten;
```

---

# 5. Docker Compose gebruiken

Maak een bestand `docker-compose.yml`:

```yaml
services:
  mysql:
    image: mysql:8.0
    container_name: mysql-training
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: testdb
    ports:
      - "3306:3306"
```

Start de container:

```bash
docker compose up -d
```

---

# 6. Maak een Node.js project

```bash
mkdir mysql-demo
cd mysql-demo

npm init -y
npm install express mysql2
```

---

# 7. Maak een server

Bestand: `server.js`

```javascript
const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'testdb'
});

connection.connect(err => {
    if (err) {
        console.error(err);
        return;
    }

    console.log('Connected to MySQL');
});

app.post('/opslaan', (req, res) => {
    const naam = req.body.naam;

    connection.query(
        'INSERT INTO klanten (naam) VALUES (?)',
        [naam],
        (err, results) => {
            if (err) {
                console.error(err);
                res.send('Fout');
                return;
            }

            res.send('Klant opgeslagen');
        }
    );
});

app.listen(3000, () => {
    console.log('Server draait op poort 3000');
});
```

---

# 8. Maak een HTML-pagina

Bestand: `index.html`

```html
<!DOCTYPE html>
<html>
<head>
    <title>Klanten</title>
</head>
<body>

<form action="http://localhost:3000/opslaan" method="post">
    <input type="text" name="naam" placeholder="Naam">
    <button type="submit">Opslaan</button>
</form>

</body>
</html>
```

---

# 9. Start de applicatie

```bash
node server.js
```

Open vervolgens de HTML-pagina in je browser en voeg een klant toe.

---

# 10. Controleer de database

```sql
SELECT * FROM klanten;
```

Als alles goed gaat zie je de ingevoerde klant in de tabel.

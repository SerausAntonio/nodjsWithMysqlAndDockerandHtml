const db = require('../db');

exports.maakKlant = async (req, res) => {
    try {
        const { naam } = req.body;

        await db.execute(
            'INSERT INTO klanten (naam) VALUES (?)',
            [naam]
        );

        res.json({ message: 'Klant opgeslagen' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database fout' });
    }
};

exports.alleKlanten = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM klanten');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Database fout' });
    }
};
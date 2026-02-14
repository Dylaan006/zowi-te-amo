const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '../valentine.db');
const db = new Database(dbPath);

// Create table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS phrases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL
  )
`);

const phrases = [
    "Eres la razón por la que sonrío cada mañana.",
    "En un mar de gente, mis ojos siempre te buscarán a ti.",
    "Cada momento contigo es mi favorito.",
    "Tu amor es el mejor regalo que he recibido.",
    "Eres mi lugar favorito en el mundo.",
    "Contigo, el amor se siente como magia.",
    "Eres mi sol en los días nublados.",
    "No buscaba nada, pero al verte lo encontré todo.",
    "Eres el capítulo más bonito de mi vida.",
    "Mi corazón late más fuerte cuando estás cerca.",
    "Gracias por hacerme tan feliz.",
    "Eres la persona que siempre soñé tener a mi lado.",
    "Tu sonrisa es mi parte favorita del día.",
    "Amo cada detalle de ti.",
    "Estar contigo es como estar en casa."
];

const insert = db.prepare('INSERT INTO phrases (text) VALUES (?)');

// Check if table is empty before seeding
const count = db.prepare('SELECT COUNT(*) as count FROM phrases').get().count;

if (count === 0) {
    console.log('Seeding database with initial phrases...');
    const insertMany = db.transaction((data) => {
        for (const text of data) insert.run(text);
    });
    insertMany(phrases);
    console.log('Database seeded successfully!');
} else {
    console.log('Database already has phrases. Use the add function to add more.');
}

// Function to add a single phrase (for the user to use manually)
function addPhrase(text) {
    insert.run(text);
    console.log(`Added phrase: "${text}"`);
}

module.exports = { addPhrase };

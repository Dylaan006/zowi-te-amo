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
    "Sos la razón por la que sonrío cada mañana.",
    "Te amo incondicionalmente.",
    "Cada momento con vos es mi favorito.",
    "Tu amor es el mejor regalo que me dio la vida.",
    "Sos mi lugar favorito en el mundo.",
    "Con vos, el amor se siente como magia.",
    "Sos mi sol en los días nublados.",
    "No buscaba nada, pero al verte lo encontré todo.",
    "Sos el capítulo más bonito de mi vida.",
    "Mi corazon late por vos",
    "Gracias por hacerme tan feliz.",
    "Sos la persona con la que siempre soñé",
    "Verte es lo mejor de mi dia",
    "Amo cada detalle de vos.",
    "Estar juntos es como estar en casa.",
    "Cada momento juntos es único.",
    "Te amo",
    "Un beso tuyo cura todo",
    "Sos hermosa, recordalo",
    "Te extraño",
    "Amo todo de vos",
    "Hasta tus imperfecciones son perfectas",
    "Quiero abrazarte por toda la eternidad",
    "Te amo cada segundo del día",
    "No importa lo que pase, siempre voy a estar a tu lado",
    "Amo esa sonrisa hermosa",
    "Quiero ser el amor de tu vida",
    "Sos el amor de mi vida",
    "Sos el pensamiento mas hermoso que tengo",
    "Cada dia pienso en vos",
    "Nuestro fuego es real, y el resto es azar",
    "Sos mi todo",
    "Te amor achurita",
    "Sos mi princesa hermosa",
    "MI GORDI TE AMOOOOOO",
    "Espero que estes pensando en mi",
    "MUAAKKKK",
    "te amo demasiado",
    "Recorda que te amo",
    "te amo te amo te amo te amo te amo te amo te amo te amo te amo te amoooooooooooooo",
    "Gracias por ser parte de mi vida",
    "Espero pasar toda la vida con vos",
    "Cada dia me haces mas feliz",
    "Por vos lo dejo todo",
    "Siempre voy a estar para vos",
    "Sos la mujer de mis sueños",
    "COMO TE AMO MUJERRR",
    "SOS MI RE AMOR"
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

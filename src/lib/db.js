import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'valentine.db');

let db;

if (process.env.NODE_ENV === 'production') {
  db = new Database(dbPath, { readonly: true });
} else {
  if (!global._db) {
    global._db = new Database(dbPath);
  }
  db = global._db;
}

export default db;

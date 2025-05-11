const sql = require("better-sqlite3");
const db = sql("public/expenses.db");
function formatDate(date) {
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);

  return `${day}-${month}-${year}`;
}

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL UNIQUE,
        expense TEXT NOT NULL,
        amount REAL NOT NULL,
        created_at TEXT NOT NULL 
     )
 `
).run();

function initData() {
  const stmt = db.prepare(`
       INSERT INTO expenses(slug, expense, amount,created_at) VALUES (
        
          @slug,
          @expense,
          @amount,
          @created_at
       )
    `);
  const example = {
    slug: "electricity-april",
    expense: "Electricity Bill",
    amount: 1200.5,
    created_at: formatDate(new Date("2022-03-25")),
  };

  stmt.run(example);
}

initData();

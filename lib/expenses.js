import sql from "better-sqlite3";
const db = sql("public/expenses.db");

import slugify from "slugify";

export async function getExpenses() {
  // await new Promise((res) => setTimeout(res, 2000));
  return db.prepare("SELECT * FROM expenses").all();
}

function formatDate(date) {
  if (!(date instanceof Date) || isNaN(date)) {
    console.warn("Invalid date provided:", date);
    return "9-May-20"; // Default date in case of invalid input
  }

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

export function saveExpense(expense) {
  
  let baseSlug = slugify(expense.expense, { lower: true });
  let uniqueSlug = baseSlug;
  let count = 1;

  // Check for existing slugs and generate a unique slug if needed
  while (db.prepare(`SELECT 1 FROM expenses WHERE slug = ?`).get(uniqueSlug)) {
    uniqueSlug = `${baseSlug}-${count}`;
    count++;
  }

  const createdDate = expense.created_at
    ? new Date(expense.created_at)
    : new Date();
  const createdAt = formatDate(createdDate);
  db.prepare(
    `
    INSERT INTO EXPENSES (slug,expense,amount,created_at)
    VALUES(
    :slug,
    :expense,
    :amount,
    :created_at
    )
    `
  ).run({ ...expense, slug: uniqueSlug, created_at: createdAt });
}

export function getExpensesByDate(date) {
  return db.prepare("SELECT * FROM expenses WHERE created_at = ?").all(date);
}

export function expensesTotal() {
  const result = db.prepare("SELECT SUM(amount) AS total FROM expenses").get();
  return result.total || 0;
}

export function getExpensesByMonth() {
  const result = db
    .prepare(
      `
    SELECT 
      created_at AS month,
      expense,
      amount 
    FROM expenses 
    ORDER BY month DESC
  `
    )
    .all();

  if (!result || result.length === 0) {
    console.warn("No expenses found.");
    return [];
  }

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

  const groupedExpenses = {};

  result.forEach((entry) => {
    if (!entry.month) {
      console.warn("Month is null or undefined in:", entry);
      return;
    }

    // Extract the month and year using regex
    const dateParts = entry.month.split("-");
    if (dateParts.length !== 3) {
      console.warn("Unexpected date format in:", entry.month);
      return;
    }

    const [day, month, year] = dateParts;
    const formattedMonth = `${month} ${year}`;

    if (!groupedExpenses[formattedMonth]) {
      groupedExpenses[formattedMonth] = {
        month: formattedMonth,
        total: 0,
        expenses: [],
      };
    }

    groupedExpenses[formattedMonth].total += entry.amount;
    groupedExpenses[formattedMonth].expenses.push({
      expense: entry.expense,
      amount: entry.amount,
    });
  });

  return Object.values(groupedExpenses);
}

export function getExpensesByMonthName(month) {
  const decodedMonth = decodeURIComponent(month);
  console.log("Decoded Month:", decodedMonth);

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
  const [monthName, year] = decodedMonth.split(" "); // e.g., "May 25"
  const monthNumber = monthNames.indexOf(monthName) + 1;

  if (monthNumber === 0) {
    console.warn("Invalid month name:", monthName);
    return [];
  }

  const formattedMonth = `${monthName}-${year}`;
  console.log("Formatted Month for Query:", formattedMonth);

  const query = `
    SELECT id, expense, amount, created_at
FROM expenses
WHERE created_at LIKE ?
ORDER BY 
    SUBSTR(created_at, -4) || '-' || 
    CASE 
        WHEN INSTR('JanFebMarAprMayJunJulAugSepOctNovDec', SUBSTR(created_at, INSTR(created_at, '-') + 1, 3)) / 3 < 10 
        THEN '0' 
        ELSE '' 
    END || 
    (INSTR('JanFebMarAprMayJunJulAugSepOctNovDec', SUBSTR(created_at, INSTR(created_at, '-') + 1, 3)) / 3) || '-' || 
    CASE 
        WHEN LENGTH(SUBSTR(created_at, 1, INSTR(created_at, '-') - 1)) = 1 
        THEN '0' 
        ELSE '' 
    END || 
    SUBSTR(created_at, 1, INSTR(created_at, '-') - 1) DESC;
  `;

  // We use `%` to match any day in the month
  const result = db.prepare(query).all(`%-${formattedMonth}`);

  return result;
}

export function deleteExpense(id) {
  try {
    const stmt = db.prepare("DELETE FROM expenses WHERE id = ?");
    stmt.run(id);
    console.log(`Expense with ID ${id} deleted.`);
  } catch (err) {
    console.error("Error deleting expense:", err);
    throw err;
  }
}

export async function updateExpense(id, expenseName, amount) {
  const statement = db.prepare(`
    UPDATE EXPENSES 
    SET 
      expense = ?,
      amount = ?
    WHERE id = ?;
  `);

  try {
    const result = statement.run(expenseName, amount, id);
    return { success: true, changes: result.changes };
  } catch (error) {
    console.error("Error updating expense:", error);
    return { success: false, error };
  }
}

export const exportToCSV = (expenses) => {
    if (!expenses || !expenses.length) return;
  
    const headers = ["Title", "Amount", "Category","Notes", "Date"];
  
    const rows = expenses.map(expense => [
      expense.title,
      expense.amount,
      expense.category,
      expense?.note,
      new Date(expense.date).toLocaleDateString()
    ]);
  
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(",")),
    ].join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
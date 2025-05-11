
import Monthlyexpense from "@/components/monthly/monthly-expense";
import { getExpenseMonth } from "@/lib/action";


export default async function MonthlyExpense({ params }) {
  const { slug } = await params;
  const expenses = await getExpenseMonth(slug);
  console.log(slug)

  // Group expenses by date and calculate daily totals
  

  return (
    <Monthlyexpense slug={slug} expenses={expenses}/>
      
  );
}

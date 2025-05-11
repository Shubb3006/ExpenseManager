
import HomeLayout from "@/components/Home/home";
import { getExpenseMonth } from "@/lib/action";

function formatMonth(date) {
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

  return `${month} ${year}`;
}


export default async function Home() {
  const monthYear = formatMonth(new Date());
  const expenses = await getExpenseMonth(monthYear);

  return <HomeLayout expenses={expenses} monthYear={monthYear} />;
}

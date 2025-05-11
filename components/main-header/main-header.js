
import classes from "./main-header.module.css";
import NavLink from "./nav-links";
export default function MainHeader() {
  return (
    <ul className={classes.navList}>
      <li className={classes.navItem}>
        <NavLink href="/">Home</NavLink>
      </li>
      <li className={classes.navItem}>
        <NavLink href="/expense">Add Expense</NavLink>
      </li>
      <li className={classes.navItem}>
        <NavLink href="/allexpenses">My Expenses</NavLink>
      </li>
    </ul>
  );
}

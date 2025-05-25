import { Link, useLocation } from "react-router-dom"
import styles from "./Header.module.css"

const Header = () => {
  const location = useLocation()

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link to="/" className={styles.logo}>
          Employee Management
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={`${styles.navLink} ${location.pathname === "/" ? styles.activeLink : ""}`}>
            Employees
          </Link>
          <Link to="/add" className={`${styles.navLink} ${location.pathname === "/add" ? styles.activeLink : ""}`}>
            Add Employee
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header

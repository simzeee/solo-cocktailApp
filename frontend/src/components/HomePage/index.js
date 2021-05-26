import styles from './HomePage.module.css'
import { NavLink } from 'react-router-dom'

function HomePage(){
  return(
    <div className={styles.signContainer}>
  <h1 className={styles.greeting}>
    <NavLink to="/cocktails">Five O'clock Somewhere</NavLink>
  </h1>
  </div>
  )
}

export default HomePage;
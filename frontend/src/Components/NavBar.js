import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'
import Logo from './../assets/amazonlogo.png'

import { UserIcon, ShoppingCartIcon } from '@heroicons/react/solid'

const NavBar = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles['img-container']}>
                <Link to="/">
                    <img
                        className={styles.logo}
                        src={Logo}
                        alt="logo"
                        width="100px"
                        height="70px"
                    />
                </Link>
            </div>

            <div className={styles.search}>
                <input type="text" placeholder="Search for books"></input>
            </div>

            <div className={styles.profile}>
                <ShoppingCartIcon height="25px" />
                <UserIcon height="25px" />
            </div>
        </nav>
    )
}

export default NavBar

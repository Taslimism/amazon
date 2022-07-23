import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'
import Logo from './../assets/amazonlogo.png'

import { UserIcon, ShoppingCartIcon } from '@heroicons/react/solid'
import { useState } from 'react'

const NavBar = () => {
    const token = localStorage.getItem('etoken')

    const [visibility, setVisibility] = useState(false)
    return (
        <nav className={styles.nav}>
            <div className={styles['img-container']}>
                <Link to="/">
                    <img
                        className={styles.logo}
                        src={Logo}
                        alt="logo"
                        width="60px"
                        height="40px"
                    />
                </Link>
            </div>

            <div className={styles.search}>
                <input type="text" placeholder="Search for books"></input>
            </div>

            <div className={styles.profile}>
                <div className={styles.carticon}>
                    <Link to="/cart">
                        <ShoppingCartIcon
                            style={{ cursor: 'pointer' }}
                            height="25px"
                        />
                        <div className={styles.cartcount}>0</div>
                    </Link>
                </div>
                <div className={styles['form-nav-container']}>
                    <UserIcon
                        onClick={() => setVisibility(!visibility)}
                        style={{ cursor: 'pointer' }}
                        height="25px"
                    />
                    {visibility && (
                        <div className={styles['form-navigation']}>
                            <Link to="/form/signup">
                                <h4 style={{ cursor: 'pointer' }}>Signup</h4>
                            </Link>
                            <Link to="/form/login">
                                <div style={{ cursor: 'pointer' }}>Login</div>
                            </Link>
                            <hr className={styles.break} />
                            {token && (
                                <Link to="/profile">
                                    <div style={{ cursor: 'pointer' }}>
                                        Profile
                                    </div>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default NavBar

import { Link } from 'react-router-dom'
import shallow from 'zustand/shallow'
import styles from './NavBar.module.css'
import Logo from './../assets/amazonlogo.png'
import { UserIcon, ShoppingCartIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import swal from 'sweetalert'
import useCartStore from '../store/cart.store'

const NavBar = () => {
    const { quantity, cart } = useCartStore((state) => ({
        quantity: state.quantity,
        cart: state.cart,
    }))

    const token = localStorage.getItem('etoken')
    const [visibility, setVisibility] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('etoken')
        localStorage.removeItem('name')
        setVisibility(false)
        swal('Logged out!', 'See you Again!', 'success')
    }

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
                        <div className={styles.cartcount}>
                            {quantity || cart[0]?.quantity}
                        </div>
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
                            {!token && (
                                <>
                                    <Link to="/form/signup">
                                        <h4
                                            className={styles.profilebtn}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Signup
                                        </h4>
                                    </Link>
                                    <Link to="/form/login">
                                        <div style={{ cursor: 'pointer' }}>
                                            Login
                                        </div>
                                    </Link>
                                </>
                            )}
                            {token && (
                                <div>
                                    <Link to="/profile">
                                        <h4
                                            className={styles.profilebtn}
                                            styles={{ cursor: 'pointer' }}
                                        >
                                            Profile
                                        </h4>
                                    </Link>
                                    <div
                                        onClick={handleLogout}
                                        className={styles.logoutbtn}
                                    >
                                        Log out
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default NavBar

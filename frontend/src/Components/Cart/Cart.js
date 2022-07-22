import Header from '../NavBar'
import { Button } from '@mantine/core'
import styles from './Cart.module.css'

const Cart = () => {
    return (
        <>
            <Header />
            <div className={styles['cart-container']}>
                <h4>Items in your bag</h4>
                <br />
                <div>
                    <div>
                        <img src="https://placehold.it" alt="book" />
                    </div>
                    <div></div>
                    <div></div>
                </div>
                <hr />
                <div className={styles.button}>
                    <Button color="red">Pay Now</Button>
                </div>
            </div>
        </>
    )
}

export default Cart

import PaymentButton from '../PaymentButton/PaymentButton'
import Header from '../NavBar'
import { Button } from '@mantine/core'
import styles from './Cart.module.css'
import { useQuery } from '@tanstack/react-query'
import useCartStore from '../../store/cart.store'
import shallow from 'zustand/shallow'

const getCartUrl = (hostname, id) => {
    const url =
        hostname === 'localhost'
            ? `http://localhost:5001/api/cart/${id}`
            : `https://b-okstore.herokuapp.com/api/cart/${id}`
    return url
}
const deleteCartUrl = (hostname, id) => {
    const url =
        hostname === 'localhost'
            ? `http://localhost:5001/api/cart/${id}/`
            : `https://b-okstore.herokuapp.com/api/cart/${id}/`
    return url
}
const updateCartUrl = (hostname) => {
    const url =
        hostname === 'localhost'
            ? `http://localhost:5001/api/cart/`
            : `https://b-okstore.herokuapp.com/api/cart/`
    return url
}

const Cart = () => {
    const token = localStorage.getItem('etoken')

    const { quantity, getCartItems, updateCart, deleteCart, cart } =
        useCartStore(
            (state) => ({
                quantity: state.quantity,
                getCartItems: state.getCartItems,
                updateCart: state.updateCart,
                deleteCart: state.deleteCart,
                cart: state.cart,
            }),
            shallow
        )

    const userid = localStorage.getItem('euserid')
    const { hostname } = window.location
    const url = getCartUrl(hostname, userid)
    const updtateUrl = updateCartUrl(hostname)
    const deleteUrl = deleteCartUrl(hostname, userid)

    const { isError, isLoading, data, isSuccess, refetch } = useQuery(
        ['cart', { hostname, userid }],
        () => getCartItems(url)
    )

    const handleUpdate = (orderid, product_id, quantity) => {
        if (quantity === 0) {
            deleteCart(deleteUrl + product_id).then(() => refetch())
            return
        }
        updateCart(updtateUrl + orderid, { product_id, quantity }).then(() =>
            refetch()
        )
    }
    if (isLoading) {
        return null
    }
    if (!isError) {
        ;<div>Please Log in to view items in your bag!</div>
    }

    if (isSuccess) {
        return (
            <>
                <Header />
                <h4>Items in your bag</h4>
                <div className={styles['cart-container']}>
                    {token ? (
                        <>
                            {data[0]?.items?.length > 0 &&
                                data[0].items.map((item) => {
                                    return (
                                        <div className={styles.cartitems}>
                                            <div className={styles.img}>
                                                <img
                                                    src={item.thumbnail}
                                                    alt="book-cover"
                                                />
                                            </div>
                                            <div className={styles.info}>
                                                <p>Name : {item.title}</p>
                                                <p>Author : {item.author} </p>
                                                <p>Amount : {item.price}</p>
                                                <p>
                                                    Quantity :
                                                    <div
                                                        className={
                                                            styles.quantity
                                                        }
                                                    >
                                                        <Button
                                                            disabled={
                                                                item.quantity ===
                                                                0
                                                            }
                                                            onClick={() =>
                                                                handleUpdate(
                                                                    data[0]._id,
                                                                    item.product_id,
                                                                    item.quantity -
                                                                        1
                                                                )
                                                            }
                                                            variant="outline"
                                                        >
                                                            -
                                                        </Button>
                                                        <Button
                                                            variant="filled"
                                                            color="yellow"
                                                            value={
                                                                item.quantity
                                                            }
                                                        >
                                                            {item.quantity}
                                                        </Button>
                                                        <Button
                                                            disabled={
                                                                item.quantity ===
                                                                10
                                                            }
                                                            onClick={() =>
                                                                handleUpdate(
                                                                    data[0]._id,
                                                                    item.product_id,
                                                                    item.quantity +
                                                                        1
                                                                )
                                                            }
                                                            variant="outline"
                                                        >
                                                            +
                                                        </Button>
                                                    </div>
                                                </p>
                                                <p>
                                                    Total Amount :{' '}
                                                    {item.totalPrice}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}

                            {cart.length > 0 ? (
                                <div className={styles.button}>
                                    <PaymentButton text="Pay Now" />
                                </div>
                            ) : (
                                <p>Oops! your cart seems empty!!!</p>
                            )}
                        </>
                    ) : (
                        <div>Please Log in to view items in your bag!</div>
                    )}
                </div>
            </>
        )
    }
}

export default Cart

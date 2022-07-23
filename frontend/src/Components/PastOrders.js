import { useState } from 'react'
import styles from './PastOrders.module.css'

const PastOrders = () => {
    const [order, setOrder] = useState([])

    return (
        <div>
            <h5>Past Orders</h5>
            <div>
                <div className={styles.card}>
                    <div className={styles['order-container']}>
                        {order.items.map((item) => {
                            return (
                                <div className={styles['cartitem-container']}>
                                    <img
                                        src={item.thumbnail}
                                        alt="book-cover"
                                    />
                                    <div className={styles['info-container']}>
                                        <p>name : {item.title}</p>
                                        <p>author : {item.author} </p>
                                        <p>price : {item.price}</p>
                                        <p>quantity : {item.quantity} </p>
                                        <p>total price : {item.totalPrice}</p>
                                    </div>
                                </div>
                            )
                        })}
                        <h2 className={styles['message']}>
                            Congrats, Order Successfully placed! for &#8377;{' '}
                            {order.amount / 100}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PastOrders

import { useState } from 'react'
import styles from './PastOrders.module.css'

const PastOrders = () => {
    const [order, setOrder] = useState([
        {
            items: [
                {
                    thumbnail: 'https://placehold.it/100x100',
                    title: 'Experiences of my life',
                    author: 'Taslim Raza Ansari',
                    price: 20000,
                    quantity: 5,
                    totalPrice: 45,
                    amount: 44,
                },
                {
                    thumbnail: 'https://placehold.it/100x100',
                    title: 'Experiences of my life',
                    author: 'Taslim Raza Ansari',
                    price: 20000,
                    quantity: 5,
                    totalPrice: 45,
                    amount: 44,
                },
            ],
            amount: 84937,
        },
    ])

    return (
        <div>
            <h5 className={styles.heading}>Past Orders</h5>
            <div className={styles['card-container']}>
                <div className={styles.card}>
                    {order[0].items.map((item) => {
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
                                    <p>Quantity : {item.quantity} </p>
                                    <p>Total Amount : {item.totalPrice}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <h4 className={styles['message']}>
                    Congrats, Order Successfully placed! for &#8377;{' '}
                    {order[0].amount / 100}
                </h4>
            </div>
        </div>
    )
}

export default PastOrders

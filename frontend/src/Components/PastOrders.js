import styles from './PastOrders.module.css'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
const { hostname } = window.location

const url =
    hostname === 'localhost'
        ? 'http://localhost:5001/api/users/'
        : `https://b-okstore.herokuapp.com/api/users/`

const getPastOrders = async ({ queryKey }) => {
    const { userid } = queryKey[1]
    const {
        data: {
            data: { orders },
        },
    } = await axios.get(url + userid)

    const items = orders.map((order) => [...order.items])
    const createdAT = orders.map((order) => order.createdAt)
    const cost = orders.reduce((acc, curr) => acc.amount + curr.amount)
    console.log(createdAT)
    const order = []

    for (let i = 0; i < items.length; i++) {
        items[i].forEach((item) => {
            item.createdAt = createdAT[i]
            order.push(item)
        })
    }
    console.log(order)
    return { order, cost }
}

const PastOrders = () => {
    const userid = localStorage.getItem('euserid')
    const { isSuccess, isLoading, data, isError } = useQuery(
        ['orders', { userid }],
        getPastOrders
    )

    if (isSuccess) {
        const { cost, order } = data
        return (
            <div>
                <h5 className={styles.heading}>Past Orders</h5>

                <div className={styles['card-container']}>
                    <>
                        <div className={styles.card}>
                            {order.length > 0 &&
                                order.map((item) => {
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
                                                    Quantity : {item.quantity}{' '}
                                                </p>
                                                <p>
                                                    Total Amount :{' '}
                                                    {item.totalPrice}
                                                </p>
                                                <p>
                                                    Bought On :{' '}
                                                    {new Date(
                                                        item.createdAt
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                        <h4 className={styles['message']}>
                            Congrats, Total Order Placed till now for &#8377;{' '}
                            {cost / 100} !
                        </h4>
                    </>
                </div>
            </div>
        )
    }
}

export default PastOrders

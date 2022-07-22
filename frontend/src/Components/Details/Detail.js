import styles from './Detail.module.css'
import Review from '../Review/Review'
import { useQuery } from '@tanstack/react-query'
import NavBar from '../NavBar'
import axios from 'axios'
import { Skeleton, Button } from '@mantine/core'

const getABook = async ({ queryKey }) => {
    const { hostname, id } = queryKey[1]
    const url =
        hostname === 'localhost'
            ? `http://localhost:5001/api/products/knuth/${id}`
            : `https://b-okstore.herokuapp.com/api/products/knuth/${id}`

    const { data } = await axios.get(`${url}`)
    return data.data.product
}
const Detail = () => {
    const { hostname, pathname } = window.location
    const id = pathname.split('/')[2]

    const { isSuccess, isLoading, data } = useQuery(
        ['book', { hostname, id }],
        getABook
    )
    if (isLoading) {
        return (
            <>
                <NavBar />
                <div className={styles.detail}>
                    <div className={styles.hero}>
                        <div className={styles.img}>
                            <div className={styles.product}>
                                <Skeleton radius="xl" />
                                <Skeleton radius="xl" />
                            </div>
                            <Skeleton radius="xl" />
                        </div>

                        <div className={styles.description}>
                            <Skeleton radius="xl" />
                            <Skeleton radius="xl" />
                        </div>
                    </div>
                </div>
            </>
        )
    }

    if (isSuccess) {
        return (
            <>
                <NavBar />
                <div className={styles.detail}>
                    <div className={styles.hero}>
                        <div className={styles.img}>
                            <div className={styles.product}>
                                <img src={data.thumbnail} alt="product" />
                                <p>{data.description}</p>
                            </div>
                            <p className={styles.title}>{data.title}</p>
                        </div>

                        <div className={styles.description}>
                            <p>{data.textSnippet}</p>
                            <p>{data.subtitle}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.cart}>
                    <div className={styles.review}>
                        <p>Write a review</p>
                        <textarea cols="100" rows="7"></textarea>
                        <Button color="primary">Submit</Button>
                    </div>
                    <div className={styles.addtocart}>
                        <p>Cost - &#8377;{data.price}</p>
                        <p>This could be the best investment of your life</p>
                        <Button color="red">Add To Cart</Button>
                    </div>
                </div>
                <Review id={id} hostname={hostname} />
            </>
        )
    }
}

export default Detail

import Header from '../NavBar'
import { useState, useRef, useEffect } from 'react'
import shallow from 'zustand/shallow'
import styles from './Detail.module.css'
import Review from '../Review/Review'
import { useQuery } from '@tanstack/react-query'
import useCartStore from '../../store/cart.store'
import axios from 'axios'
import { Skeleton, Button } from '@mantine/core'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'

const getABook = async ({ queryKey }) => {
    const { hostname, id } = queryKey[1]
    const url =
        hostname === 'localhost'
            ? `http://localhost:5001/api/products/knuth/${id}`
            : `https://b-okstore.herokuapp.com/api/products/knuth/${id}`

    const { data } = await axios.get(`${url}`)
    return data.data.product
}

const addToCartUrl = (hostname) => {
    const url =
        hostname === 'localhost'
            ? `http://localhost:5001/api/cart/`
            : `https://b-okstore.herokuapp.com/api/cart/`

    return url
}
const Detail = () => {
    const addToCart = useCartStore((state) => state.addToCart, shallow)
    const navigate = useNavigate()
    const token = localStorage.getItem('etoken')
    const quantity = useRef()
    const [count, setCount] = useState(1)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { hostname, pathname } = window.location
    const id = pathname.split('/')[2]

    const { isSuccess, isLoading, data } = useQuery(
        ['book', { hostname, id }],
        getABook
    )

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [token])

    const handleAddToCart = () => {
        if (!isLoggedIn) {
            swal('Want to log in first?').then((value) => {
                if (value) {
                    navigate('/form/signup')
                }
            })

            return
        }

        const url = addToCartUrl(hostname)
        const userid = localStorage.getItem('euserid')
        const quant = quantity.current.value
        console.log(quantity.current.textContent)
        const productid = data._id
        addToCart(url, {
            user_id: userid,
            quantity: quant,
            product_id: productid,
        })
    }
    if (isLoading) {
        return (
            <>
                <Header />
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
                <Header />
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
                        <div className={styles.quantity}>
                            <Button
                                disabled={count === 1}
                                onClick={() => setCount(count - 1)}
                                variant="outline"
                            >
                                -
                            </Button>
                            <Button
                                ref={quantity}
                                variant="filled"
                                color="dark"
                                value={count}
                            >
                                {count}
                            </Button>
                            <Button
                                disabled={count === 10}
                                onClick={() => setCount(count + 1)}
                                variant="outline"
                            >
                                +
                            </Button>
                        </div>
                        <Button onClick={handleAddToCart} color="red">
                            Add To Cart
                        </Button>
                    </div>
                </div>
                <Review id={id} hostname={hostname} />
            </>
        )
    }
}

export default Detail

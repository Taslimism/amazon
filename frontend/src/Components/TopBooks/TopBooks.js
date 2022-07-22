import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from './TopBooks.module.css'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@mantine/core'
import { Pagination } from '@mantine/core'
const hostname = window.location.hostname

const getTopBooks = async ({ queryKey }) => {
    const url =
        hostname === 'localhost'
            ? 'http://localhost:5001/api/products/get/allbooks/allkind'
            : `https://b-okstore.herokuapp.com/api/products/get/allbooks/allkind`

    const { count, page } = queryKey[1]
    const { data } = await axios.get(`${url}?page=${page}&count=${count}`)

    return data.data
}
const TopBooks = () => {
    const [activePage, setPage] = useState(1)

    const { isSuccess, isLoading, data } = useQuery(
        [
            'allbooks',
            {
                page: activePage,
                count: 10,
            },
        ],
        getTopBooks
    )

    if (isLoading) {
        return (
            <>
                <h3 className={styles.title}>Top Books</h3>
                <div className={styles['card-container']}>
                    {new Array(10).fill(0).map((_, index) => (
                        <>
                            <Skeleton
                                key={index}
                                className={styles['books']}
                                radius="xl"
                            />
                        </>
                    ))}
                </div>
            </>
        )
    }

    if (isSuccess) {
        return (
            <div>
                <h3 className={styles.title}>Top Books</h3>
                <div className={styles['card-container']}>
                    {data.map((item) => (
                        <Link to={`books/${item._id}`}>
                            <div key={item.id} className={styles['books']}>
                                <img src={item.thumbnail} alt="books" />
                                <p>
                                    <h4>Title : </h4>
                                    {item.title}
                                </p>
                                <p>
                                    <h4>Author : </h4>
                                    {item.author}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className={styles.pagination}>
                    <Pagination
                        page={activePage}
                        onChange={setPage}
                        total={5}
                    />
                </div>
            </div>
        )
    }
}

export default TopBooks

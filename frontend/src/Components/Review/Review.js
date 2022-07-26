import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@mantine/core'
import axios from 'axios'
import styles from './Review.module.css'

const getReview = async ({ queryKey }) => {
    const { hostname, id } = queryKey[1]
    const url =
        hostname === 'localhost'
            ? `http://localhost:5001/api/products/review/knuth/${id}`
            : `https://b-okstore.herokuapp.com/api/products/review/knuth/${id}`

    const { data } = await axios.get(`${url}`)

    return data
}

const Review = ({ id, hostname }) => {
    const { isSuccess, isLoading, data } = useQuery(
        ['review', { hostname, id }],
        getReview
    )

    if (isLoading) {
        return <Skeleton radius="xl" />
    }
    if (isSuccess) {
        return (
            <>
                {data.length > 0 && (
                    <h4 className={styles.heading}>See all the reviews</h4>
                )}
                <div className={styles.review}>
                    {data.map((each) => (
                        <div className={styles.rev}>
                            <div className={styles.name}>
                                <span>
                                    Review by : {each.name.toUpperCase()}
                                </span>
                                <span>Rating : {each.rating} stars</span>
                            </div>

                            <div className={styles.reviewPara}>
                                {each.review}
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )
    }
}

export default Review

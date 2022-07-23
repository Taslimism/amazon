import { useForm } from 'react-hook-form'
import styles from './ChangePassword.module.css'
import axios from 'axios'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const { hostname } = window.location

const url =
    hostname === 'localhost'
        ? `http://localhost:5001/api/users/`
        : `https://b-okstore.herokuapp.com/api/users/`

const ChangePassword = () => {
    const userid = localStorage.getItem('euserid')
    const token = localStorage.getItem('etoken')
    const schema = yup.object().shape({
        oldPassword: yup.string().min(6).max(20),
        password: yup.string().min(6).max(20),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) })

    const handlePasswordChange = async (formdata) => {
        const { data } = await axios.put(url + userid, formdata, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
        console.log(data)
    }

    return (
        <div className={styles.changePassword}>
            <form onSubmit={handleSubmit(handlePasswordChange)}>
                <div className={styles.row}>
                    <label>Old Password</label>
                    <input
                        type="password"
                        name="current-password"
                        {...register('oldPassword')}
                    />
                </div>
                <div className={styles.row}>
                    <label>New Password</label>
                    <input
                        type="password"
                        name="new-password"
                        {...register('password')}
                    />
                    <p className={styles.errors}>{errors.password?.message}</p>
                </div>
                <div className={styles.row}>
                    <button>Change</button>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword

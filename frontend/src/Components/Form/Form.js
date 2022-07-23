import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import styles from '../Form/Form.module.css'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'

const hostname = window.location.hostname

const registerurl =
    hostname === 'localhost'
        ? `http://localhost:5001/api/users/register/`
        : `https://b-okstore.herokuapp.com/api/users/register/`

const loginurl =
    hostname === 'localhost'
        ? `http://localhost:5001/api/users/login/`
        : `https://b-okstore.herokuapp.com/api/users/login/`
const Form = () => {
    const schema = yup.object().shape({
        name: yup.string(),
        email: yup.string().email(),
        password: yup.string().min(6).max(20),
    })
    const pathname = window.location.pathname.split('/')[2]
    const navigate = useNavigate()

    const [isSignup, setIsSignup] = useState(false)
    useEffect(() => {
        if (pathname === 'signup') {
            setIsSignup(true)
        } else {
            setIsSignup(false)
        }
    }, [pathname])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const handleRegistration = async (userData) => {
        if (isSignup) {
            const { data } = await axios.post(registerurl, userData)
            if (data.status === 'success') {
                localStorage.setItem('etoken', data.token)
                navigate('/')
            }
        } else {
            const { data } = await axios.post(loginurl, userData)
            if (data.status === 'success') {
                localStorage.setItem('etoken', data.token)
                navigate('/')
            }
        }
    }

    return (
        <>
            <h5 className={styles.title}>{isSignup ? 'Register' : 'Login'}</h5>
            <form
                className={styles.loginform}
                onSubmit={handleSubmit(handleRegistration)}
            >
                {isSignup && (
                    <div className={styles.row}>
                        <label>Name</label>
                        <input name="name" {...register('name')} />
                    </div>
                )}
                <div className={styles.row}>
                    <label>Email</label>
                    <input type="text" name="email" {...register('email')} />
                    <p className={styles.errors}>{errors.email?.message}</p>
                </div>
                <div className={styles.row}>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        {...register('password')}
                    />
                    <p className={styles.errors}>{errors.password?.message}</p>
                </div>
                <div className={styles.row}>
                    <button>Submit</button>
                </div>
                {!isSignup ? (
                    <p className={styles.signupprompt}>
                        Don't have an account?{' '}
                        <span
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/form/signup')}
                        >
                            Create one.
                        </span>
                    </p>
                ) : (
                    <p className={styles.signupprompt}>
                        Have an account?{' '}
                        <span
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/form/login')}
                        >
                            Log in.
                        </span>
                    </p>
                )}
            </form>
        </>
    )
}

export default Form

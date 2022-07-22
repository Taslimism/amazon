import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import styles from '../Form/Form.module.css'

const Form = () => {
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

    const { register, handleSubmit } = useForm()
    const handleRegistration = (data) => console.log(data)

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
                    <input type="email" name="email" {...register('email')} />
                </div>
                <div className={styles.row}>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        {...register('password')}
                    />
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

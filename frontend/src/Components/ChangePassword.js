import { useForm } from 'react-hook-form'
import styles from './ChangePassword.module.css'

const ChangePassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({})

    const handlePasswordChange = () => {}

    return (
        <div className={styles.changePassword}>
            <form onSubmit={handleSubmit(handlePasswordChange)}>
                <div className={styles.row}>
                    <label>Old Password</label>
                    <input
                        type="password"
                        name="current-password"
                        {...register('current-password')}
                    />
                </div>
                <div className={styles.row}>
                    <label>New Password</label>
                    <input
                        type="password"
                        name="new-password"
                        {...register('new-password')}
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

import bookstack from './../assets/bookstack.png'
import styles from './Hero.module.css'
const Hero = () => {
    return (
        <div className={styles.hero}>
            <div className={styles.quote}>
                <h1>
                    Reading books is like collecting mushrooms in Super Mario
                </h1>
                <button className={styles['button-50']}>Order Now</button>
            </div>
            <img src={bookstack} alt="hero" />
        </div>
    )
}

export default Hero

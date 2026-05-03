import styles from './HomePage.module.css'

function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Emoticons Factory</h1>
      <p className={styles.description}>이모티콘을 만들어보세요!</p>
    </div>
  )
}

export default HomePage

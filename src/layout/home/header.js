import styles from './styles.less'

export default function Header({ children }) {
  return (
    <header className={styles.header}>
      <div className={styles.fixed__container}>
        {children}
      </div>
    </header>
  );
}

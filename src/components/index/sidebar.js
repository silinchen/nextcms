import Category from '@components/index/category'
import styles from './styles.less'
const Sidebar = ({ categories = [] }) => {
  return (
    <div className={styles.right__sidebar}>
      <div className={styles.post__categories}>
        <Category categories={categories} />
      </div>
    </div>
  )
}

export default Sidebar

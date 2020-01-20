import classnames from 'classnames'
import Container from '@components/container';
import ArrowRight from '@components/icons/arrow-right'
import Category from '@components/index/category'
import styles from './styles.less'

const Dropdown = ({ categories = [] }) => {
  return (
    <label htmlFor="dropdown__input" className={styles.dropdown__toggle}>
      <input id="dropdown__input" type="checkbox" />
      <div className={styles.docs__select}>
        <Container>
          <span>
            <ArrowRight />
          </span>
          分类
        </Container>
      </div>
      <div className={`${styles.documentation__sidebar} ${styles.docs__dropdown}`}>
        <Container>
          <nav>
            <Category categories={categories} />
          </nav>
        </Container>
      </div>
    </label>
  )
}

export default Dropdown

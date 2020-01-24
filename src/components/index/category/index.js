import classnames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createTree } from '@utils'
import styles from './styles.less'

const Category = ({ categories = [] }) => {
  const router = useRouter()
  const { query: { cateSeoUrl } } = router
  const loop = data => (
    <ul>
      {data.map(item => (
        <li key={item._id}>
          <Link href="/c/[cateSeoUrl]" as={`/c/${item.seoUrl}`} prefetch={false}>
            <a className={classnames({ [styles.active]: cateSeoUrl === item.seoUrl })}>{item.name}</a>
          </Link>
          {item.children && loop(item.children)}
        </li> 
      ))}
    </ul>
  )
  return (
    <div className={styles.category}>
      {loop(createTree(categories))}
    </div>
  )
}

export default Category

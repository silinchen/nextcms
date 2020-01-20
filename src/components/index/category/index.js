import classnames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createTree } from '@utils'
import styles from './styles.less'

const Category = ({ categories = [] }) => {
  const router = useRouter()
  const { query: { cateSeoUrl } } = router
  const treeData = createTree(categories)
  return (
    <div className={styles.category}>
      <ul>
        {treeData.map((cate) => (
          <li key={cate._id}>
            <Link href="/c/[cateSeoUrl]" as={`/c/${cate.seoUrl}`} prefetch={false}>
              <a className={classnames({ [styles.active]: cateSeoUrl === cate.seoUrl })}>{cate.name}</a>
            </Link>
            {cate.children && 
              <ul>
                {cate.children.map(child => (
                  <li key={child._id}>
                    <Link href="/c/[cateSeoUrl]" as={`/c/${child.seoUrl}`} prefetch={false}>
                      <a className={classnames({ [styles.active]: cateSeoUrl === child.seoUrl })}>{child.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            }
          </li> 
        ))}
      </ul>
    </div>
  )
}

export default Category

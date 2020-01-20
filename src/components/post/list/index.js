import PostItem from './item'
import styles from './styles.less'

const Posts = props => {
  const { list = [] } = props
  return (
    <ul className={styles.post__list}>
      {list.map(post => <PostItem key={post._id} post={post} />)}
    </ul>
  )
}

export default Posts

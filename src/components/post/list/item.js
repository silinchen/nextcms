import classnames from 'classnames'
import PageViewIcon from '@components/icons/page-view'
import CommentsIcon from '@components/icons/comments'
import LikeIcon from '@components/icons/like'
import styles from './styles.less'

const PostItem =  props => {
  const { title, seoUrl, imageUrl, abstract, author, uauthor, pageView, commentNum, likeNum } = props.post
  return (
    <li className={styles.post__item}>
      { imageUrl && 
        <a href={`/p/${seoUrl}`}>
          <img className={styles.post__img} src={imageUrl} alt={title} />
        </a>
      }
      <div className={classnames(styles.content, { [styles.has__image]:!!imageUrl })}>
        <a className={styles.title} href={`/p/${seoUrl}`}>{title}</a>
        <p className={styles.abstract}>
          {`${abstract}...`} 
        </p>
        <div className={styles.meta}>
          <span>
            <PageViewIcon />
            <span className={styles.text}>{pageView || 0}</span>
          </span>
          <a className={styles.text}>{author && author.nickname}</a>
          <a href={`/p/${seoUrl}#comments`}>
            <CommentsIcon />
            <span className={styles.text}>{commentNum || 0}</span>
          </a>
          <span>
            <LikeIcon /> 
            <span className={styles.text}>{likeNum || 0}</span>
          </span>
        </div>
      </div>
    </li>
  )
}

export default PostItem

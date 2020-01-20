import styles from './styles.less'

const Detail = props => {
  const {
    title, content, seoUrl, imageUrl, abstract, author, uauthor,
    pageView, commentNum, likeNum, wordNum, createdDate
  } = props.post
  const avatarUrl = author ? (author.avatarUrl || '') : (uauthor ? (uauthor.avatarUrl || '') : '')
  const nickname = author ? (author.nickname || '') : (uauthor ? (uauthor.nickname || '') : '')

  return (
    <div className={styles.post__wrapper}>
      <h1 className={styles.post__title}>{title}</h1>
      <div className={styles.post__info}>
        <img className={styles.user__avatar} src={avatarUrl} alt="" />
        <div className={styles.info}>
          <div className={styles.user__info}>
            <div className={styles.user__nickname}>{nickname}</div>
          </div>
          <div className={styles.meta}>
            <time>{createdDate}</time>
            <span>{`字数 ${wordNum || 0}`}</span>
            <span>{`阅读 ${pageView || 0}`}</span>
          </div>
        </div>
      </div>
      <div className={styles.post__content} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default Detail

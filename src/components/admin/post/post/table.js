import { Table, Button, Divider, Breadcrumb, Tag, Descriptions } from 'antd'
import Link from 'next/link'
import PageViewIcon from '@components/icons/page-view'
import CommentsIcon from '@components/icons/comments'
import LikeIcon from '@components/icons/like'
import { other__wrapper } from './styles.less'
const PostTable = (props) => {
  const { posts, pagination, handleUpdatePostClick, handleDeletePostClick } = props
  
  const actionRender = (text, record) => (
    <span>
      <Link href="/admin/post/form/[id]" as={`/admin/post/form/${record._id}`}>
        <Button size="small" shape="circle" icon="edit" />
      </Link>
      <Divider type="vertical" />
      <Button size="small" shape="circle" icon="delete" onClick={() => (handleDeletePostClick(record._id))}/>
    </span>
  )
  const imageRender = (text) => ( text ? <img src={text} width="80" height="50" /> : '')
  const authorRender = (text, { author, uauthor }) => {
    const _author = author || uauthor
    return _author ? _author.nickname : ''
  }
  const categoryRender = (text, record) => (
    <>
      {record.categories.map(category => (
        <span key={category._id}>
          {category.name}<Divider type="vertical" />
        </span>
      ))}
    </>
  )
  const tagRender = (text, record) => (
    <div>
      {record.tags.map(tag => <Tag key={tag._id}>{tag.name}</Tag>)}
    </div>
  )
  const otherRender = record => {
    const { pageView, seoUrl, commentNum, likeNum, wordNum } = record
    return (
      <div className={other__wrapper}>
        <span>
          <PageViewIcon />
          {`  ${pageView || 0}`}
        </span>
        <span>
          <a href={`/p/${seoUrl}#comments`}>
            <CommentsIcon />
            {`  ${commentNum || 0}`}
          </a>
        </span>
        <span>
          <LikeIcon /> 
          {`  ${likeNum || 0}`}
        </span>
        <span>
          字数：{wordNum || 0}
        </span>
      </div>
    )
  }
  const columns = [
    { title: '标题', dataIndex: 'title', key: 'title', ellipsis: true, width: '300px' },
    { title: '缩略图', dataIndex: 'imageUrl', key: 'imageUrl', render: imageRender },
    { title: '作者', render: authorRender },
    { title: '分类', render: categoryRender, ellipsis: true },
    { title: '创建时间', dataIndex: 'createdDate', key: 'createdDate', width: '160px' },
    { title: '操作', key: 'action', width: '150px', render: actionRender }
  ]
  const expandedRowRender = record => {
    const { title, imageUrl, abstract, seoUrl, createdDate, updatedDate } = record
    return (
      <Descriptions title={title}>
        <Descriptions.Item label="作者">{authorRender('', record)}</Descriptions.Item>
        <Descriptions.Item label="分类">{categoryRender('', record)}</Descriptions.Item>
        <Descriptions.Item label="标签">{tagRender('', record)}</Descriptions.Item>
        <Descriptions.Item label="缩略图">{imageUrl && <img src={imageUrl} width="120px" height="75px" />}</Descriptions.Item>
        <Descriptions.Item label="摘要" span={2}>{abstract}</Descriptions.Item>
        <Descriptions.Item label="Seo Url">{seoUrl}</Descriptions.Item>
        <Descriptions.Item label="创建时间">{createdDate}</Descriptions.Item>
        <Descriptions.Item label="更新时间">{updatedDate}</Descriptions.Item>
        <Descriptions.Item label="其他">{otherRender(record)}</Descriptions.Item>
      </Descriptions>
    )
  }

  return (
    <Table
      rowKey="_id"
      dataSource={posts}
      columns={columns}
      pagination={pagination}
      expandedRowRender={expandedRowRender}
    />
  )
}

export default PostTable

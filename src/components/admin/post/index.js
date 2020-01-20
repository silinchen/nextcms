import { Tag, Button, Table, Divider } from 'antd'
import Link from 'next/link'
const dataSource = [
  {
    key: '1',
    title: 'webpack ',
    image: '/upload/',
    content: '西湖区湖底公园1号',
    author: 'csl',
    tags: ['web', 'webpack']
  },
  {
    key: '2',
    title: 'react',
    image: '/upload/',
    content: '西湖区湖底公园1号',
    tags: ['web', 'webpack']
  },
];

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '图片',
    dataIndex: 'image',
    key: 'image',
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    )
  },
  {
    title: '创建时间',
    dataIndex: 'create_date',
    key: 'create_date',
  },
  {
    title: '更新时间',
    dataIndex: 'update_date',
    key: 'update_date',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button size="small" shape="circle" icon="edit" />
        <Divider type="vertical" />
        <Button size="small" shape="circle" icon="delete" />
      </span>
    ),
  }
];

const Post = () => {
  return (
    <>
      <Link href="/admin/post/form">
        <Button type="primary">新增文章</Button>
      </Link>
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}

export default Post

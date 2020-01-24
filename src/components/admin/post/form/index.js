import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Form, Input, Select, TreeSelect, Icon } from 'antd'
import Editor from './editor'
import UploadImage from '@components/uploadImage'
import { createTitleAndValueAndKeyTree } from '@utils'

const { Option } = Select
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
}
const editorItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
}

const rules = {
  title: [{ required: true, message: '请输入文章标题' }],
  seoUrl: [{ required: true, message: '请输入seo url' }],
  categories: [{ required: true, message: '请选择文章类别' }]
}

const PostForm = forwardRef((props, ref) => {
  const { form, post, categories = [], tags = [] } = props
  const { getFieldDecorator } = form

  useImperativeHandle(ref, () => ({ form }))

  return (
    <Form {...formItemLayout}>
      <Form.Item label="标题">
        {getFieldDecorator('title', {
          rules: rules.title,
          initialValue: post.title
        })(<Input />)}
      </Form.Item>
      <Form.Item label="seo url">
        {getFieldDecorator('seoUrl', {
          rules: rules.seoUrl,
          initialValue: post.seoUrl
        })(<Input />)}
      </Form.Item>
      <Form.Item label="文章类别">
        {getFieldDecorator('categories', {
          rules: rules.categories,
          initialValue: post.categories
        })(<TreeSelect showSearch allowClear multiple treeData={createTitleAndValueAndKeyTree(categories)} />)}
      </Form.Item>
      <Form.Item label="标签/关键词">
        {getFieldDecorator('tags', { initialValue: post.tags })(
          <Select mode="multiple" >
            {tags.map((tag) => (<Option value={tag._id} key={tag._id}>{tag.name}</Option>))}
          </Select>
        )}
      </Form.Item>
      <Form.Item label="缩略图">
        {getFieldDecorator('imageUrl', { initialValue: post.imageUrl })(
          <UploadImage
            name="file"
            style={{ height: '102px' }}
            listType="picture-card"
            className="avatar-uploader"
          />
        )}
      </Form.Item>
      <Form.Item label="摘要">
        {getFieldDecorator('abstract', {
          rules: rules.abstract,
          initialValue: post.abstract
        })(<TextArea rows={3} />)}
      </Form.Item>
      <Form.Item label="内容" {...editorItemLayout}>
        {getFieldDecorator('content', { initialValue: post.content })(<Editor />)}
      </Form.Item>
    </Form>
  )
})
const WrappedPostForm = Form.create({ name: 'post_form' })(PostForm)

export default WrappedPostForm

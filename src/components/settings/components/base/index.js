import { useEffect, useState } from 'react'
import { Button, Form, Input, Upload, message } from 'antd';
import { connect } from 'react-redux'
import { updateManagerInfo } from '@store/actions'
import UploadImage from '@components/uploadImage'
import styles from './styles.less';

const FormItem = Form.Item;

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = connect()(props => {
  const { avatar, dispatch } = props
  const [avatarUrl, setAvatarUrl] = useState(avatar || '')
  const handleChange = avatarUrl => {
    dispatch(updateManagerInfo({ avatarUrl }, () => {
      setAvatarUrl(avatarUrl)
    }))
  }
  return (
    <>
      <div className={styles.avatar_title}>头像</div>
      <div className={styles.avatar}>
        <img src={avatarUrl} alt="avatar" />
      </div>
      <UploadImage
        onChange={handleChange}
      >
        <div className={styles.button_view}>
          <Button icon="upload">更改头像</Button>
        </div>
      </UploadImage>
    </>
  )
})

const BaseView = props => {
  let view

  useEffect(() => {
    setBaseInfo()
  }, [])

  const setBaseInfo = () => {
    const { currentUser, form } = props
    if (currentUser) {
      Object.keys(form.getFieldsValue()).forEach(key => {
        const obj = {};
        obj[key] = currentUser[key] || null;
        form.setFieldsValue(obj);
      });
    }
  }

  const handlerSubmit = event => {
    event.preventDefault();
    const { form, dispatch } = props
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const callback = () => {
          message.success('更新成功')
        }
        dispatch(updateManagerInfo(values, callback))
      }
    });
  };

  const { form: { getFieldDecorator }, currentUser: { avatarUrl } } = props
  return (
    <div className={styles.baseView} ref={ref => view = ref}>
      <div className={styles.left}>
        <Form layout="vertical" hideRequiredMark>
          <FormItem label="邮箱">
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '请输入邮箱' }],
            })(<Input />)}
          </FormItem>
          <FormItem label="昵称">
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: '请输入昵称' } ],
            })(<Input />)}
          </FormItem>
          <FormItem label="个人简介">
            {getFieldDecorator('introduction')(<Input.TextArea placeholder='个人简介' rows={4} />)}
          </FormItem>
          <FormItem label="手机号">
            {getFieldDecorator('phone')(<Input />)}
          </FormItem>
          <Button type="primary" onClick={handlerSubmit}>更新基本信息</Button>
        </Form>
      </div>
      <div className={styles.right}>
        <AvatarView avatar={avatarUrl} />
      </div>
    </div>
  );
}

export default connect()(Form.create()(BaseView))

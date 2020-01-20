import { useState, useEffect } from 'react'
import { Modal, Card, Divider, Tag, Icon, Input, message } from 'antd'
import styles from './styles.less'
const { confirm } = Modal

const UserInfo = props => {
  const { currentUser, handleUpdateManagerTags } = props
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const { tags } = currentUser
  let inputDom
  
  const showInput = () => {
    setInputVisible(true)
  }
  useEffect(() => {
    inputVisible && inputDom && inputDom.focus()
  }, [inputVisible])
  const saveInputRef = input => {
    inputDom = input
  }
  const handleInputChange = e => {
    setInputValue(e.target.value)
  }
  const handleInputConfirm = () => {
    if (inputValue && tags.filter(tag => tag === inputValue).length === 0) {
      handleUpdateManagerTags([...tags, inputValue])
    }
    setInputVisible(false)
    setInputValue('')
  }
  const handleDeleteTagsConfirm = tag => {
    confirm({
      title: `确认标签 ${tag} 吗?`,
      onOk() {
        tag && handleUpdateManagerTags(tags.filter(item => item !== tag))
        message.success('删除成功')
      },
      onCancel() {
        message.info('取消删除')
      },
    });
  }
  return (
    <Card
      bordered={false}
      style={{
        marginBottom: 24,
      }}
    >
      <div>
        <div className={styles.avatarHolder}>
          <img alt="" src={currentUser.avatarUrl} />
          <div className={styles.name}>{currentUser.nickname}</div>
          <div>{currentUser.introduction}</div>
        </div>
        <div className={styles.detail}>
          <p>
            <i className={styles.role} />
            {currentUser.role.name}
          </p>
        </div>
        <Divider dashed />
        <div className={styles.tags}>
          <div className={styles.tagsTitle}>标签</div>
          {currentUser.tags.map(tag => (
            <Tag key={tag} onClick={() => handleDeleteTagsConfirm(tag)}>{tag}</Tag>
          ))}
          {inputVisible && (
            <Input
              ref={ref => saveInputRef(ref)}
              type="text"
              size="small"
              style={{
                width: 78,
              }}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          )}
          {!inputVisible && (
            <Tag onClick={showInput}
              style={{
                background: '#fff',
                borderStyle: 'dashed',
              }}
            >
              <Icon type="plus" />
            </Tag>
          )}
        </div>
      </div>
    </Card>
  )
}

export default UserInfo

import { useState, useEffect } from 'react'
import { Modal, Form, Input, Switch, Tree, Row, Col } from 'antd'
import { createLabelAndValueTree, createTree } from '@utils'

const { TreeNode } = Tree

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 17 },
  }
}

const rules = {
  name: [
    { required: true, whitespace: true, message: '请输入角色名称' },
    { min: 2, max: 20, message: '角色名称长度在 2 到 20 之间' }
  ],
  description: [{ max: 50, message: '描述信息长度不能超过 50 个字符' }]
}

const RoleFrom = (props) => {
  const {
    resources, formData, action, visible, handleFormVisible, handleSubmit,
    form: { getFieldDecorator, validateFieldsAndScroll, resetFields } } = props
  const [initivalPower, setInitivalPower] = useState([])

  const hanldeOK = () => {
    validateFieldsAndScroll((err, values) => {
      if (err) { return }
      const addParentPower = (data = []) => {
        for(let i=0; i < data.length; i++) {
          const { _id, parentId, children, name } = data[i]
          // 包含本身，但不包含父节点，则把父节点加上
          if(parentId && values.power.includes(_id) && !values.power.includes(parentId)) {
            values.power.push(parentId)
          }

          // 有子节点的，继续判断子节点是否有被选中的项，如果有则选中自己
          if(children && children.length > 0) {
            addParentPower(children)
          }
        }
      }
      if (values.power.length> 0) {
        addParentPower(createTree(resources))
      }
      handleSubmit({ ...formData, ...values })
    })
  }
  // 过滤掉父节点，只显示子节点，不然会导致父节点选中后自动选中全部子节点（包括本来不需选中的子节点）
  const filterParentPower = (powers = []) => {
    const selects = []
    const findInTree = (data) => {
      data.forEach((item) => {
        if(item.children && item.children.length > 0) {
          // 非叶子节点，继续寻找下一层
          findInTree(item.children)
        } else {
          // 叶子节点，判断是否需要选中
          if(powers.includes(item._id)) {
            selects.push(item._id)
            return
          }
        }
      })
    }
    if (powers.length > 0) {
      findInTree(createTree(resources))
    }
    return selects
  }

  useEffect(() => {
    setInitivalPower(filterParentPower(formData.power))
    resetFields()
  }, [formData])

  const loop = data =>
    data.map(item => {
      if (item.children && item.children.length) {
        return (
          <TreeNode key={item.value} title={item.label}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.value} title={item.label} />
    })

  return (
    <Modal
      title={action === 'add' ? '新增角色' : '修改角色'}
      visible={visible}
      onOk={hanldeOK}
      onCancel={handleFormVisible}
      width={700}
    >
      <Form {...formItemLayout}>
        <Row>
          <Col span={12}>
            <Form.Item label="角色名称">
              {getFieldDecorator('name', { rules: rules.name, initialValue: formData.name })(<Input />)}
            </Form.Item>
            <Form.Item label="启用">
              {getFieldDecorator('enable', { valuePropName: 'checked', initialValue: formData.enable })(<Switch />)}
            </Form.Item>
            <Form.Item label="描述">
              {getFieldDecorator('description', { rules: rules.description, initialValue: formData.description })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="角色权限">
              {getFieldDecorator('power', {
                valuePropName: 'checkedKeys',
                initialValue: initivalPower,
                trigger: 'onCheck'
              })(
                <Tree checkable >
                  {loop(createLabelAndValueTree(resources))}
                </Tree>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

const WrappedRoleFrom = Form.create({ name: 'Role_form' })(RoleFrom)

export default WrappedRoleFrom

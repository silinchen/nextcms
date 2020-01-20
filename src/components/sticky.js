import { useState, useEffect } from 'react'
const isServer = typeof window === 'undefined'
let refDom

const Sticky = props => {
  const { className = '', stickyTop = 0, zIndex = 1, children } = props
  const [position, setPosition] = useState('')
  const [positionTop, setPositionTop] = useState('') 
  const [isSticky, setIsSticky] = useState(false)
  const [height, setHeight] = useState('')
  const [width, setWidth] = useState('auto')

  const handleScroll = () => {
    const width = refDom.getBoundingClientRect().width
    const offsetTop = refDom.getBoundingClientRect().top
    // sticky 状态下，动态设置组件的宽度，使sticky 生效后的组件可以保持宽度不变
    if(offsetTop < stickyTop) {
      setWidth(width || 'auto')
    }
    setIsSticky(offsetTop < stickyTop)
  }
  const handleResize = () => {
    const width = refDom.getBoundingClientRect().width // 组件容器的宽度
    const offsetTop = refDom.getBoundingClientRect().top
    // sticky 状态下，动态设置组件的宽度，使sticky 生效后的组件可以随窗口宽度变化而变化
    if (offsetTop < stickyTop) {
      setWidth(width || 'auto')
    }
  }

  useEffect(() => {
    if(!isServer) {
      // 保存容器的高度，方便 sticky 状态下可以保持高度不变
      setHeight(refDom.getBoundingClientRect().height)
      window.addEventListener('scroll', handleScroll)
      window.addEventListener('resize', handleResize)
    }
    return () => {
      if(!isServer) {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  useEffect(() => {
    setPosition(isSticky ? 'fixed' : '')
    setPositionTop(isSticky ? stickyTop : '')
    !isSticky && setWidth('auto')
  }, [isSticky])

  return (
    <div style={{ height:height, zIndex:zIndex }} ref={ref => {refDom = ref}}>
    <div
      className={className}
      style={{ top: positionTop, zIndex: zIndex, position: position, width: width, height: height }}
    >
      {children}
    </div>
  </div>
  )
}

export default Sticky

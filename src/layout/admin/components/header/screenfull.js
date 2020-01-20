import { useState, useEffect } from 'react'
import { Icon, message } from 'antd'
import screenfull from 'screenfull'

const Screenfull = props =>{
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  const handleClick = () => {
    if (!screenfull.isEnabled) {
      message.warning('当前浏览器不支持全屏');
      return false
    }
    screenfull.toggle()
  }

  const handleChange = () => {
    setIsFullscreen(!isFullscreen)
  }
  
  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', handleChange)
    }
    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', handleChange)
      }
    }
  }, [])
  
  return (
    <div style={{ fontSize: 24 }}>
      <Icon type={isFullscreen ? 'fullscreen-exit' : 'fullscreen' } onClick={handleClick} />
    </div>
  )
}

export default Screenfull

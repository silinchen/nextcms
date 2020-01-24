// reference https://github.com/noeldelgado/gemini-scrollbar/blob/master/index.js
import React, { useState, useEffect, useRef } from 'react'
import classnames from 'classnames'
import { addResizeListener, removeResizeListener } from './util';
import scrollbarWidth from './scrollbar-width';
import { toObject } from './util';
import Bar from './bar';
import styles from './styles.less';

const Scrollbar = props => {
  // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
  const { className, children,
    wrapStyle = {}, wrapClass,
    viewClass, viewStyle,
    native = false, noresize, 
  } = props

  const [sizeWidth, setSizeWidth] = useState('0')
  const [sizeHeight, setSizeHeight] = useState('0')
  const [moveX, setMoveX] = useState(0)
  const [moveY, setMoveY] = useState(0)
  const [style, setStyle] = useState({})
  const [gutter, setGutter] = useState(0)

  const resizeRef = useRef(null)
  const wrapRef = useRef(null)

  const handleScroll = () => {
    if(!wrapRef.current) return
    const wrap = wrapRef.current
    setMoveY((wrap.scrollTop * 100) / wrap.clientHeight)
    setMoveX((wrap.scrollLeft * 100) / wrap.clientWidth)
  }
  useEffect(() => {
    setGutter(scrollbarWidth())
  }, [])
  const update = () => {
    if(!wrapRef.current) return
    let heightPercentage, widthPercentage;
    const wrap = wrapRef.current

    heightPercentage = (wrap.clientHeight * 100 / wrap.scrollHeight);
    widthPercentage = (wrap.clientWidth * 100 / wrap.scrollWidth);
  
    setSizeHeight(heightPercentage < 100 ? heightPercentage + '%' : '')
    setSizeWidth(widthPercentage < 100 ? widthPercentage + '%' : '')
  }
  // 兼容页面 resize
  useEffect(() => {
    if (native) return
    update()
    !noresize && resizeRef.current && addResizeListener(resizeRef.current, update)
    return () => {
      if (native) return
      !noresize && resizeRef.current && removeResizeListener(resizeRef.current, update);
    }
  }, [])

  useEffect(() => {
    if (gutter) {
      const gutterWith = `-${gutter}px`;
      const gutterStyle = { marginBottom: gutterWith, marginRight: gutterWith }
      setStyle({ ...wrapStyle, ...gutterStyle })
    } else {
      setStyle(wrapStyle)
    }
  }, [gutter])
  
  // 跟踪滚动条
  const trackBar = ({ scroll, scrollSize, positionPercentage}) => {
    if (!wrapRef.current) return
    wrapRef.current[scroll] = positionPercentage * wrapRef.current[scrollSize]
  }

  let wrapProps = {
    ref: wrapRef,
    className: styles.wrap,
    style: style
  }
  if(!native) {
    wrapProps = {
      ...wrapProps,
      onScroll: handleScroll,
      className: classnames(wrapClass, styles.wrap, {
        [styles.wrap__hidden_default]: !gutter
      })
    }
  }

  return (
    <div className={classnames(styles.container, className)}>
      <div {...wrapProps}>
        <div
          ref={resizeRef}
          style={viewStyle}
          className={classnames({ [styles.view]:styles.view, viewClass })}
        >
          {children}
        </div>
      </div>
      {!native && <Bar move={moveX} size={sizeWidth} trackBar={trackBar} />}
      {!native && <Bar move={moveY} size={sizeHeight} trackBar={trackBar} vertical />}
    </div>
  )
}

export default Scrollbar

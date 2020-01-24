import React, { useState, useEffect, useRef } from 'react'
import classnames from 'classnames'
import { on, off, renderThumbStyle, BAR_MAP } from './util'
import styles from './styles.less'

const Bar = props => {
  const { vertical, size, move, wrap, trackBar } = props
  const bar = BAR_MAP[vertical ? 'vertical' : 'horizontal']
  const cursorDown = useRef(false)
  const barAxisRef = useRef({})
  const barRef = useRef()
  const thumbRef = useRef()

  // 点击滚动条（拖动）
  const clickThumbHandler = e => {
    // 按 ctrl 或 鼠标右键 则不触发
    // prevent click event of right button
    if (e.ctrlKey || e.button === 2) {
      return;
    }
    startDrag(e)
    barAxisRef.current[bar.axis] = (e.currentTarget[bar.offset] - (e[bar.client] - e.currentTarget.getBoundingClientRect()[bar.direction]))
  }
  // 点击滚动条容器
  const clickTrackHandler = e => {
    // 点击的位置距离元素顶部或左边的距离
    const offset = Math.abs(e.target.getBoundingClientRect()[bar.direction] - e[bar.client])
    // 滚动条长度的一半
    const thumbHalf = (thumbRef.current[bar.offset] / 2);
    // 滚动条中间点位置（百分比）
    const positionPercentage = ((offset - thumbHalf) / barRef.current[bar.offset])
    const { scroll, scrollSize } = bar
    trackBar({ scroll, scrollSize, positionPercentage })
  }

  const startDrag = e => {
    e.stopImmediatePropagation && e.stopImmediatePropagation();
    cursorDown.current = true

    on(document, 'mousemove', mouseMoveDocumentHandler)
    on(document, 'mouseup', mouseUpDocumentHandler)
    document.onselectstart = () => false;
  }

  const mouseMoveDocumentHandler = e => {
    if (cursorDown.current === false) return
    const prevPage = barAxisRef.current[bar.axis]

    if (!prevPage) return

    const offset = ((barRef.current.getBoundingClientRect()[bar.direction] - e[bar.client]) * -1);
    const thumbClickPosition = (thumbRef.current[bar.offset] - prevPage);
    const positionPercentage = ((offset - thumbClickPosition) / barRef.current[bar.offset]);
    const { scroll, scrollSize } = bar
    trackBar({ scroll, scrollSize, positionPercentage })
  }

  const mouseUpDocumentHandler = e => {
    cursorDown.current = false
    barAxisRef.current[bar.axis] = 0
    off(document, 'mousemove', mouseMoveDocumentHandler);
    document.onselectstart = null;
  }
  return (
    <div
      ref={barRef}
      className={classnames({ [styles.bar]: styles.bar, [styles[`is_${bar.key}`]]: bar.key })}
      onMouseDown={clickTrackHandler} >
      <div
        ref={thumbRef}
        className={styles.thumb}
        onMouseDown={clickThumbHandler}
        style={renderThumbStyle({ size, move, bar })}>
      </div>
    </div>
  )
}

export default Bar

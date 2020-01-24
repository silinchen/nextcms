import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Container from '@components/container';
import ArrowRight from '@components/icons/arrow-right'
import Category from '@components/index/category'
import styles from './styles.less'

const Dropdown = ({ categories = [] }) => {
  const router = useRouter()
  const { asPath } = router
  const inputRef = useRef()
  useEffect(() => {
    if(!inputRef.current) return
    inputRef.current.checked = false
  }, [asPath])
  return (
    <label htmlFor="dropdown__input" className={styles.dropdown__toggle}>
      <input ref={inputRef} id="dropdown__input" type="checkbox" />
      <div className={styles.docs__select}>
        <Container>
          <span>
            <ArrowRight />
          </span>
          分类
        </Container>
      </div>
      <div className={`${styles.documentation__sidebar} ${styles.docs__dropdown}`}>
        <Container>
          <nav>
            <Category categories={categories} />
          </nav>
        </Container>
      </div>
    </label>
  )
}

export default Dropdown

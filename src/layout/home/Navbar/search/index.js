import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import SearchSvg from '@components/icons/search'
import styles from './styles.less'
import transition from './transition.less'

const Search = () => {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  const router = useRouter()
  const { pathname, query: { q }} = router

  useEffect(() => {
    if('/search' === pathname && q) {
      setValue(q)
    }
  }, [pathname, q])

  const handleSearch = e => {
    router.push(`/search?q=${e.target.value}`)
    setFocused(false)
  }
  const handleKeyUp = e => {
    // 回车
    if(e.keyCode === 13) {
      router.push(`/search?q=${e.target.value}`)
    }
  }

  return (
    <div className={classNames(styles.wrapper, { [styles.focused]: focused })}>
      <CSSTransition
        in={focused}
        timeout={200}
        classNames={{ ...transition }}
      >
        <input
          value={value}
          placeholder="搜索"
          onChange={e => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={handleSearch}
          onKeyUp={handleKeyUp}
          className={styles.input}
        ></input>
      </CSSTransition>
      <div className={styles.icons__wapper}>
        <SearchSvg color={focused ? '#ffffff' : '#969696'}></SearchSvg>
      </div>
    </div>
  )
}
export default Search
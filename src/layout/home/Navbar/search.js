import { useState } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import SearchSvg from '@components/icons/search'
import styles from '../styles.less'

const Search = () => {
  const [focused, setFocused] = useState(false)

  return (
    <div className={classNames(styles.search__wrapper, { focused })}>
      <CSSTransition
        in={focused}
        timeout={200}
        className="search__input"
      >
        <input
          placeholder="搜索"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        ></input>
      </CSSTransition>
      <div className="icons__wapper">
        <SearchSvg color={focused ? '#ffffff' : '#969696'}></SearchSvg>
      </div>
      <style jsx global>
        {`
          .search__input {
            border: 1px solid #eee;
            width: 160px;
            height: 38px;
            padding: 0 30px 0 20px;
            box-sizing: border-box;;
            outline: none;
            border-radius: 19px;
            background: #eee;
            font-size: 14px;
            color: #666;
          }
          .search__input::placeholder {
            color: #999;
          }
          .focused .search__input {
            width: 240px;
          }
          .search__input.enter {
            transition: all .2s ease-out;
          }
          .search__input.enter-active {
            width: 240px;
          }
          .search__input.exit {
            transition: all .2s ease-out;
          }
          .search__input.exit-active {
            width: 160px;
          }
          .icons__wapper {
            position: absolute;
            top: 4px;
            right: 5px;
            width: 30px;
            height: 30px;
            line-height: 38px;
            border-radius: 15px;
            text-align: center;
          }
          .focused .icons__wapper {
            background: #777;
            color: #fff;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  )
}
export default Search
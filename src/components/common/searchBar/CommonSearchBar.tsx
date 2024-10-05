import { useState } from 'react'
import styles from './CommonSearchBar.module.scss'
import { useRecoilState } from 'recoil'
import { searchState } from '@/recoil/atoms/searchState'
import { pageState } from '@/recoil/atoms/pageState'

function CommonSearchBar() {
  const [search, setSearch] = useRecoilState(searchState)
  // 검색 후 페이징 재설정
  const [page, setPage] = useRecoilState(pageState)
  const [text, setText] =useState('')
  const onChange = (event) => {
    setText(event.target.value)
  }
  const onSearch = () =>{ // text갑유무 체크
      if(text === ''){
        // input 태그 안에 빈 값으로 검색하였을 때 => searching default value
        setSearch('korea')
        setPage(1) // 첫페이지로 설정
      }else {
        setSearch(text) // 작성한 Input Value 값 할당
        setPage(1) // 첫페이지로 설정
      }
  }
  const handleKeyDown = (event: React.KeyboardEvent) => {
    console.log('handleKeyDown >>'+event.key)
    if(event.key === "Enter"){ //엔터키 일때 이벤트
      if(text === ''){
          // input 태그 안에 빈 값으로 검색하였을 때 => searching default value
          setSearch('korea')
          setPage(1) // 첫페이지로 설정
      }else {
        setSearch(text) // 작성한 Input Value 값 할당
        setPage(1) // 첫페이지로 설정
      }
    }
  }
  return (
    <div className={styles.searchBar}>
        <div className={styles.searchBar__search}>
            <input type="text" placeholder="찾으실 이미지를 검색하세요." className={styles.searchBar__search__input} value={text} onChange={onChange} onKeyDown={handleKeyDown} />
            <img src="src/assets/icons/icon-search.svg" alt="" onClick={onSearch} />
        </div>
    </div>
  )
}

export default CommonSearchBar
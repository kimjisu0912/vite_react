import { useEffect, useState } from 'react';
import styles from './CommonNav.module.scss';
import { Link, useLocation } from 'react-router-dom';
import navJson from './nav.json'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { pageState } from '@/recoil/atoms/pageState';
import { searchState } from '@/recoil/atoms/searchState';

interface Navigation {
    index: number;
    path: string;
    lable: string;
    searchValue: string;
    isActive: boolean;
}

function CommonNav() {
  const location = useLocation() // 페이지 라우팅을 할떄 사용
  const [navigation, setNavigation] = useState<Navigation[]>(navJson)
  const [page, setPage] = useRecoilState(pageState) // 읽기 쓰기가 가능한 훅을 호출
  const [search, setSearch] = useRecoilState(searchState) // 서치스테이트를 세팅한다

  // 페이지가 마운트가 완료가되면
  useEffect(() => {
    console.log(location.pathname) // 위에 링크태그의 path 이름을 감지해서 실행
    navigation.forEach((nav: Navigation) => {
      nav.isActive = false
      // 선택값을 찾아서 맞으면 true
      if(nav.path === location.pathname || location.pathname.includes(nav.path)){
        nav.isActive = true
        setSearch(nav.searchValue)
        setPage(1) //내용이 바뀌니까 1페이지부터
      }
    })
    setNavigation([...navigation]) // 네비게이션을 다시 등록
  }, [location.pathname])

    // useState로 선언한 반응성을 가진 데이터를 기반으로 UI를 반복호출해보도록 한다.
    // item 매개변수를 배열의 값 하나하나 라고 생각하자 그러므로 타입은 네비게이션 타입
    const navLinks = navigation.map((item: Navigation)=>{
      return (
          // map함수 사용할때 반드시 key값을 해줘야한다
          <Link to={item.path} className={item.isActive ? `${styles.navigation__menu} ${styles.active}` : `${styles.navigation__menu} ${styles.inactive}`} key={item.path}>
              <span className={styles.navigation__menu__label}>{item.lable}</span>
          </Link>
      )
  })


    return (
      <nav className={styles.navigation}>{navLinks}</nav>
    )
}

export default CommonNav
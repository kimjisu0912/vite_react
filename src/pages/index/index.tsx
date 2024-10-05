import CommonHeader from '@components/common/header/CommonHeader'
import CommonSearchBar from '@components/common/searchBar/CommonSearchBar'
import CommonNav from '@components/common/navigation/CommonNav'
import CommonFooter from '@/components/common/footer/CommonFooter'
import Card from './components/Card'
import DetailDialog from '@/components/common/dialog/DetailDialog'
import { useMemo, useState } from 'react'
import { CardDTO } from './types/card'
import { useRecoilValue, useRecoilValueLoadable } from 'recoil'
import { imageData } from '@/recoil/selectors/imageSelector'
import Loading from './components/Loading'
// CSS
import styles from "./styles/index.module.scss"

function index() {
     //useRecoilValue 속성을 통해서 imageData를 불러옴 API가 있음
    //const imgSelector = useRecoilValue(imageData)
    const imgSelector = useRecoilValueLoadable(imageData) // recoil비동기 처리 API (데이터 상태값이 사용가능 한 상태인지 로딩인상태인지 에러인지 처리해준다)
    const [imgData, setImgData] = useState<CardDTO>();
    const [open, setOpen] = useState<boolean>(false) // 이미지 상세 다이얼로그 발생(관리) State

    // useMemo 계산된 데이터(로직) 만들 때 반복 해서 호출 하면 그 데이타를 어딘가에 저장하고 호출지원
    const CARD_LIST = useMemo(() => {
        console.log(imgSelector) 
        // useRecoilValueLoadable 에 의하여 상태값에 따라 처리
        // imgSelector.state = hasValue or loading
        if(imgSelector.state === "hasValue"){
            const result = imgSelector.contents.results.map((card: CardDTO)=>{
                // handleDialog 통해서 card태그의 온클릭 이벤트 발생에 함수를 호출 하면서 setOpen 값을 받아온다
                return (
                    <Card data={card} key={card.id} handleDialog={setOpen} handleSetData={setImgData} />
                )
            })
            return result
        }else {
            return <Loading />
        }
    }, [imgSelector])

  return (
    <div className={styles.page}>
        {/* 공통 헤더 UI 부분 */}
        <CommonHeader />
        {/* 공통 네비게이션 UI 부분 */}
        <CommonNav />
        <div className={styles.page__contents}>
            <div className={styles.page__contents__introBox}>
                <div className={styles.wrapper}>
                    <span className={styles.wrapper__title}>PhtoSplash</span>
                    <span className={styles.wrapper__desc}>
                        인터넷의 시각 자료 출처입니다. <br/>
                        모든 지역에 있는 크리에이터들의 지원을 받습니다.
                    </span>
                    {/* 검색창 UI 부분 */}
                    <CommonSearchBar />
                </div>
            </div>
            <div className={styles.page__contents__imageBox}>
                {CARD_LIST}
            </div>
        </div>
        {/* 공통 푸터 UI 부분 */}
        <CommonFooter />
        {/* 오픈이 참일때만 다이얼로그가 발생 */}
        {open &&  <DetailDialog data={imgData} handleDialog={setOpen}/>}
    </div>
  )
}

export default index
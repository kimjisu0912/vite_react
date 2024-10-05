import { imageData } from '@/recoil/selectors/imageSelector'
import styles from './CommonFooter.module.scss'
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil'
import { pageState } from '@/recoil/atoms/pageState'
import { useEffect, useState } from 'react'
import { searchState } from '@/recoil/atoms/searchState'

function CommonFooter() {
  const imgSelector = useRecoilValueLoadable(imageData)
  const search = useRecoilValue(searchState) // 검색이벤트 후 첫페이지
  const [page, setPage] = useRecoilState(pageState) 
  const [step, setStep] = useState(0) // 현재 보여주는 페이지값

  useEffect(() => {
    setStep(0)
  },[search])

  // 페이지 리스트 UI 생성
  const newArr: number[] = new Array()
  for(let i=1; i<= imgSelector.contents.total_pages; i++){
    newArr.push(i)
  }
  const length = newArr.length // 전체 길이 값 
  // 길의 Math.floor 정수처리 함수로 감싸서 전체길이의 10으로 나누고(그럼 나머지값 빼고 길이 나오고) 
  // 전체길이의 10으로 나눈값의 나머지값을 더해준다 0보다 크면 1이고 아니면 0이다
  const divide = Math.floor(length/ 10) + (Math.floor(length%10) > 0 ? 1 : 0)
  const res = []

  for(let i = 0; i<= divide; i++){
    // 배열 0부터 n개씩 잘라 새 배열에 넣기
    res.push(newArr.splice(0, 10))
  }

// -----------------------------------------------------------------------------------------------------------------------------

// 온클릭 이벤트에서 셀렉트 값을 받아옴 숫자로
const moveToPage = (selected: number) => {
  setPage(selected)
}
const moveToPrev = () =>{
  if(step === 0) return
  else{
    // step가 현재 보여주는 페이지값이므로 두번째 페이지에서 -1 하게되면 현재 step이 1로 되서 1페이지로 가고
    // 페이지는 2차원 배열로 0, 0 이므로 첫페이지가 나오게 되는 로직 즉 예를들면 첫페이지의 첫화면으로 간다
    setStep(step -1)
    setPage(res[step - 1][0])
  }
}
const moveToNext = () => {
  if(step < res[step].length -2){
    // 현재 페이징 하나 증가 시키고 배열의 페이지 위지를 변경한다 1 0 하면 2번째 페이의 첫번째부터 보여줘라 의미
    setStep(step +1)
    setPage(res[step +1][0])
  } else return
}

  return (
    <footer className={styles.footer}>
        <div className={styles.pagination}>
            <button className={styles.pagination__button} onClick={moveToPrev}>
                <img src="src/assets/icons/icon-arrowLeft.svg" alt="" />
            </button>
            {/* 변경될 UI 부분 */}
            {/* <span>1</span> */}
            {/* res에 images 길이를 0부터 10 까지 배열로 넣고 step는 0  그러므로 map으로 함수 돌린다 item와 index를 넘버로 설정하고  */}
            {res[step] &&
              res[step].map((item:number, index:number) =>{
                console.log("step>>"+step+", item>"+item+",index>>"+index + ",page >>"+ page)
                // res[step] &&는 값이 있을경우만 맵함수 실행하라 의미 res[step]는 배열의 첫번째 요소를 지정 
                // step는 res의 첫번째 두번쨰 페이지 의미고 
                // item은 페이지 리스트 UI 생성할떄 for문을 1부터 돌려서 입력한것의 각각 10개씩 자르거므로 1~10 , 11~20 이런씩으로 들어가고
                // index는 해당 배열의 길이값을 의미하므로 0부터 9까지 항상 찍힌다 
                // 버튼에서 클래스로 현재 위치 엑티브 로직은 첫페이지경우는 index 0이므로 현재 페이지 번호 1페이지를 뺴면 현재 위치값 인텍스를 활성화
                // 두번쨰 페이지부터는 index가 역시 0부터 9까지 0이 위치값이지만 페이지값은 11에서 스탭값인 1 곱해 10 그리고 1 뺴줘서 0으로맞춰서 
                // 다음페이지 위치값 0인걸 활성화 시켜준다 
                if(item < 11){
                  return (
                    <button className={index === page - 1 ? `${styles.pagination__button} ${styles.active}` : `${styles.pagination__button} ${styles.inactive}`} key={item} onClick={()=>moveToPage(item)}>
                      {item}
                    </button>
                  )
                }else {
                  return (
                    <button className={index === page - 1 - step * 10 ? `${styles.pagination__button} ${styles.active}` : `${styles.pagination__button} ${styles.inactive}`} key={item} onClick={()=>moveToPage(item)}>
                      {item}
                    </button>
                  )
                }
              })
            }
            <button className={styles.pagination__button} onClick={moveToNext}>
                <img src="src/assets/icons/icon-arrowRight.svg" alt="" />
            </button>
        </div>
    </footer>
  )
}

export default CommonFooter
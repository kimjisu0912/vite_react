import { CardDTO, Tag } from '@/pages/index/types/card'
import { useState } from 'react'
import styles from './DetailDialog.module.scss'
// React Toast Popup 모듈 사용 선언
import toast, { toastConfig } from 'react-simple-toasts'

interface Props {
    data: CardDTO
    handleDialog: (eventValue: boolean) => void
}

function DetailDialog({ data, handleDialog }: Props) {
    const [bookmark, setBookmark] = useState(false)
    // 다이얼로그 끄기
    const closeDialog = () =>{
    handleDialog(false)
    }

    // 북마크 추가 이벤트
    const addBookmark = (selected: CardDTO) => {
        setBookmark(true)

        let getLocalStorage = JSON.parse(localStorage.getItem("bookmark")) // localStorage.getItem 로컬스토리지의 키값을 조회 JSON.parse 사용
        getLocalStorage = null;
        console.log(getLocalStorage);
        // 1. 로컬스토리지에 bookmark이라는 데이터가 없을 경우
        if(!getLocalStorage || getLocalStorage === null){
            // javascript지원하는 기능임 key값과 value값을 넣어야함
            localStorage.setItem('bookmark', JSON.stringify([selected]))
            // React Toast Popup 모듈 사용
            console.log('북마크 추가');
            toast('해당 이미지를 북마크에 저장하였습니다.😀', { className: styles.toast__dark});

        }
    }
  return (
    <div className={styles.container}>
        <div className={styles.container__dialog}>
            <div className={styles.container__dialog__header}>
                <div className={styles.close}>
                    <button className={styles.close__button} onClick={closeDialog}>
                        {/* 구글 아이콘을 사용 */}
                        <span className='material-symbols-outlined' style={{fontSize: 28 + 'px'}}>close</span>
                    </button>
                    <img src={data.user.profile_image.small} alt="사진작가 프로필 사진" className={styles.close__authorImage} />
                    <span className={styles.close__authorName}>{data.user.name}</span>
                </div>
                <div className={styles.bookmark}>
                    <button className={styles.bookmark__button} onClick={()=>addBookmark(data)}>
                        {/* 구글 아이콘을 사용 */}
                        {bookmark === false ? (
                            <span className='material-symbols-outlined' style={{fontSize: 16 + 'px'}}>
                                favorite
                            </span>
                        ) : (
                            <span className='material-symbols-outlined' style={{fontSize: 16 + 'px', color: 'red' }}>
                                favorite
                            </span>
                        )}
                        북마크
                    </button>
                    <button className={styles.bookmark__button}>다운로드</button>
                </div>
            </div>
            <div className={styles.container__dialog__body}>
                <img src={data.urls.small} alt="상세이미지" className={styles.image} />
            </div>
            <div className={styles.container__dialog__footer}>
                <div className={styles.infoBox}>
                    <div className={styles.infoBox__item}>
                        <span className={styles.infoBox__item__label}>이미지 크기</span>
                        <span className={styles.infoBox__item__value}>
                            {data.width} X {data.height}
                        </span>
                    </div>
                    <div className={styles.infoBox__item}>
                        <span className={styles.infoBox__item__label}>업로드</span>
                        <span className={styles.infoBox__item__value}>
                            {data.created_at.split('T')[0]}
                        </span>
                    </div>
                    <div className={styles.infoBox__item}>
                        <span className={styles.infoBox__item__label}>마지막 업데이트</span>
                        <span className={styles.infoBox__item__value}>{data.updated_at.split('T')[0]}</span>
                    </div>
                    <div className={styles.infoBox__item}>
                        <span className={styles.infoBox__item__label}>다운로드</span>
                        <span className={styles.infoBox__item__value}>{data.likes}</span>
                    </div>
                </div>
                <div className={styles.tagBox}>
                    {/* api에서 tags를 제공을 안해서 주석처리함 */}
                    {/* {data.tags.map((tag: Tag) => {
                        return (
                        <div className={styles.tagBox__tag} key={tag.title}>
                            {tag.title}
                        </div>
                        )
                    })} */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default DetailDialog
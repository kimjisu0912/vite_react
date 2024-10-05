import Styles from './Card.module.scss'
import { CardDTO } from '../types/card'

interface Props{
  data: CardDTO
  handleDialog: (eventValue: boolean) => void
  handleSetData: (eventValue: CardDTO) => void
}

function Card({data, handleDialog, handleSetData}: Props) {
const openDialog = () =>{
    console.log("함수호출")
    handleDialog(true)
    // CardDTO의 값을 다시 넘겨준다
    handleSetData(data)
}

  return (
    <div className={Styles.card} onClick={openDialog}>
        <img src={data.urls.small} alt={data.alt_description} className={Styles.card__image} />
    </div>
  )
}

export default Card
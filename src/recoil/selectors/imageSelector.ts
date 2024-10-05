import { selector } from 'recoil'
// API 통신 지원 라이브러리
import axios from 'axios'
import { searchState } from '../atoms/searchState'
import { pageState } from '../atoms/pageState'

const API_URL = 'https://api.unsplash.com/search/photos'
const API_KEY = '_ipuWBvA_xXMwbAVLt9dHrzzELQS3fIcl11SJ0lc4V8'
const PER_PAGE = 30

export const imageData = selector({
    key: 'imageData',
    get: async ({get}) => {
        const searchValue = get(searchState)
        const pageValue =  get(pageState)

        // API 호출
        try{
            const res = await axios.get(`${API_URL}?query=${searchValue}&client_id=${API_KEY}&page=${pageValue}&per_page=${PER_PAGE}`)

            return res.data
        }catch(error){
            console.log(error)
        }
    }
})
import axios from 'axios'
import moment from 'moment'

export const SearchPageByKeyword = (keyword, page) => {
  const startTime = moment(new Date().getTime())
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(process.env.REACT_APP_API_URL + `/pages/search?term=${keyword}&page=${page}`)
      const timeTaken = moment(new Date().getTime()) - startTime
      const processedData = { ...data, timeTaken: timeTaken }
      resolve(processedData)
    } catch (error) {
      reject(error)
    }
  })
}
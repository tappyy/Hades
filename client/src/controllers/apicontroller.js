import axios from 'axios'
import moment from 'moment'

export const SearchPageByKeyword = (keyword) => {
  const startTime = moment(new Date().getTime())
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(process.env.REACT_APP_API_URL + `/pages/search/${keyword}`)
      const timeTaken = moment(new Date().getTime()) - startTime
      const processedData = { ...data, timeTaken: timeTaken }
      console.log(processedData)
      resolve(processedData)
    } catch (error) {
      reject(error)
    }
  })
}
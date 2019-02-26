import axios from 'axios'

export const SearchPageByKeyword = (keyword) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(process.env.REACT_APP_API_URL + `/pages/search/${keyword}`)

      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}
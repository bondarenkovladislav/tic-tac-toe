import axios from 'axios'

export class ApiClient {
  public static async testReq() {
    return (await axios.get('https://still-plateau-44878.herokuapp.com/')).data
  }
  public static async testReq2() {
    return (await axios.get('https://still-plateau-44878.herokuapp.com/')).data
  }

  public static get = async (endpoint: string) => {
    return (await axios.get(`https://still-plateau-44878.herokuapp.com${endpoint}`)).data
  }

  public static login = async (userName: string) => {
    const result = (
      await axios.get(`https://still-plateau-44878.herokuapp.com/login?userName=${userName}`)
    ).data
    if (result.token) {
      localStorage.setItem('token', result.token)
    }
  }

  public static fetchLeaderBoard = async () => {
    return (await axios.get('https://still-plateau-44878.herokuapp.com/get-score')).data.result
  }
}

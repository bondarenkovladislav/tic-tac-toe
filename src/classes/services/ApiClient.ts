import axios from 'axios'

export class ApiClient {
  public static async testReq() {
    return (await axios.get('https://still-plateau-44878.herokuapp.com/')).data
  }
  public static async testReq2() {
    return (await axios.get('http://localhost:4433/')).data
  }
}

import axios from "axios";
class HttpService {
  environment = process.env.REACT_APP_ENV;
  registerpost = async (obj) => {
    return await axios.post(this.environment + "/user", obj);
  };
  loginget = (email) => {
    return axios.get(this.environment + `/user?email=${email}`);
  };
}

const service = new HttpService();
export default service;

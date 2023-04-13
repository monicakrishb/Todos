import axios from "axios";

class HttpService {
  environment = process.env.REACT_APP_ENV;
  registerpost = (obj) => {
    return axios.post(this.environment + "/user", obj);
  };
  loginget = (email) => {
    return axios.get(this.environment + `/user?email=${email}`);
  };
  homeget = () => {
    return axios.get(this.environment + "/task");
  };
  createpost = (obj) => {
    return axios.post(this.environment + "/task/", obj);
  };
  editput = (v, obj) => {
    return axios.put(this.environment + "/task/" + v, obj);
  };
  editget = (v) => {
    return axios.get(this.environment + "/task/" + v);
  };

}
const service = new HttpService();
export default service;

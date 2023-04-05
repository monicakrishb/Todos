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

export const passvalid = (pass) => {
  const passregex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  return passregex.test(pass);
};
const service = new HttpService();
export default service;

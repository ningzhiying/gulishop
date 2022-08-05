import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css"

NProgress.configure({showSpinner: false});

const request = axios.create({
    baseURL: "/mock",
    timeout: 10000
})
request.interceptors.request.use(config => {
    NProgress.start();
    return config
}, (error) => {
    NProgress.done();
    return Promise.reject(error);
})
request.interceptors.response.use(res => {
    NProgress.done();
    return res.data
}, (error) => {
    NProgress.done();
    return Promise.reject(error);
})
export default request
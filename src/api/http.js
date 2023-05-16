import axios from "axios";

// axios 객체 생성
export default axios.create({
  baseURL: "http://localhost:80/", // .env 로 옮기기
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});
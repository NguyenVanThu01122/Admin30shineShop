import axios from 'axios'

const privateAxios = axios.create({
  baseURL: 'http://localhost:3030', // cổng 3030 là cổng chạy local của backend
  timeout: 4000
})

// // Buoc 1: Duoc chay truoc khi gui api len backend
// privateAxios.interceptors.request.use(
//   (config) => {
//     // lam cai gi do truoc khi gui api len backend
//     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

//     // {
//     //   baseURL: 'http://localhost:3030', // cổng 3030 là cổng chạy local của backend
//     //   timeout: 4000,
//     //   headers: {
//     //     Authorization: `Bearer ${localStorage.getItem('token')}`
//     //   }
//     // }

//     return config // cú pháp cố định
//   },
//   (error) => Promise.reject(error)
// )

// // Buoc 2: Gui api len backend

// // Buoc 3: Duoc chay sau khi nhan du lieu thanh cong tu backend
// privateAxios.interceptors.response.use(
//   (response) => {
//     // lam cai gi do voi du lieu nhan duoc
//     return response
//   },
//   (error) => {
//     //khối if này sẽ dc thực thi khi token hết hạn
//     if (error.response.status === 401) {
//       // check token nếu hết hạn thì gọi api và kèm refreshToken đc lưu trong ứng dụng, để lấy token và refreshToken mới
//       axios
//         .post('http://localhost:3030/generate-token', {
//           refreshToken: localStorage.getItem('refreshToken') //gửi kèm body, giá trị refreshToken dc lưu trên ứng dụng, để lấy token va refreshToken mới từ backend
//         })
//         .then((res) => {
//           // luu token moi va resfreshToken moi
//           localStorage.setItem('token', res.data?.token)
//           localStorage.setItem('refreshToken', res.data?.refreshToken)
//           window.location.reload() // load lại trang nhận dữ liệu
//         })
//         .catch((error) => {
//           if (error.response.status === 401) {
//             // xóa token và refreshToken và bắt người dùng đăng nhập lại
//             localStorage.removeItem('token')
//             localStorage.removeItem('refreshToken')
//             window.location.assign('/login')
//           }
//           // console.log(error.response)
//         })
//     }

//     Promise.reject(error)
//   }
// )

export { privateAxios }
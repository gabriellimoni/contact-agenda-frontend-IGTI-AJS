export default function ({ $axios }) {
    $axios.onRequest(config => {
      console.log('Making request to ' + config.url)
    })
  
    $axios.defaults.headers.common['Authorization'] = Date.now()
  }
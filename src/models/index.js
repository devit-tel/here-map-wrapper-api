import Axios from 'axios'

const hereMapUrl = 'http://rme.cit.api.here.com/2/matchroute.json'

const http = Axios.create({
  headers: {
    'Content-Type': '*',
  }
})

const mathRoute = (routeMode, appId, appCode, data) => {
  return http.post(`${hereMapUrl}?routemode=car&app_id=${appId}&app_code=${appCode}`, data)
}

const hereMapModel = {
  mathRoute,
}

export default hereMapModel

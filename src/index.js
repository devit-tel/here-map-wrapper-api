import 'babel-polyfill'
import 'babel-core/register'

import hereMapModel from './models'
import jsontoxml from 'jsontoxml'
import polyLine from '@mapbox/polyline'

function HereMapWrapper(config) {
  this.appId = config.appId
  this.appCode = config.appCode
}

HereMapWrapper.prototype.getPolyline = async function(locations) {
  let locationToXml = locations.map(item => ({name: 'trkpt', attrs: `lat="${item.lat}" lon="${item.lng}"`}))
  let dataJson = {
    gpx: [
      {
        trk: [
          {
          trkseg: locationToXml
        }
      ]
      }
    ]
  }
  const option = {
    xmlHeader: true,
  }
  let data = jsontoxml(dataJson, option)
    const result = await hereMapModel.mathRoute('car', this.appId, this.appCode, data)
    try {
      let polyLineLatlng = result.data.RouteLinks.map(item => item.shape).join(' ')
      let locationLatLng = polyLineLatlng.split(' ').map((item, index) => {
      if (index === 0) {
       return [ item, polyLineLatlng.split(' ')[ index + 1]]
     } else if (index !== 0 && index % 2 === 0) { return [item, polyLineLatlng.split(' ')[ index + 1] ] }
   }).filter(item => item)
      let encodeToPolyLine = polyLine.encode(locationLatLng)
      return encodeToPolyLine
    } catch (err) {
      return err
    }
}

// const config = {
//   appId: 'MIbdO7rKh5YgK3wFkxH0',
//   appCode: 'PSVGgwwZ2DtMigt4PKLPZQ'
// }

// let hereMap = new HereMapWrapper(config)

// let locations = [
//   {lat: 51.10177, lng: 0.39349},
//   {lat: 51.10181, lng: 0.39335},
//   {lat: 51.10255, lng: 0.39369}
// ]

// let x = hereMap.getPolyline(locations)
// console.log('test')
// x.then(function(res) {
//   console.log(res)
// })

export default HereMapWrapper

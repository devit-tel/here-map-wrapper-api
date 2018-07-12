import 'babel-core/register'
import 'babel-polyfill'

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

export default HereMapWrapper

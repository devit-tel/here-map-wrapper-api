# Here Map Wrapper API

### how to use 
```javascript

const config = {
  appId: 'your appId',
  appCode: 'your appCode'
}


let hereMap = new HereMapWrapper(config)

let locations = [
  {lat: 51.10177, lng: 0.39349},
  {lat: 51.10181, lng: 0.39335},
  {lat: 51.10255, lng: 0.39369}
]

hereMap.getPolyline(locations).then(function(polyline) {
  console.log(polyline)
})

```
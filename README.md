[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
# Here Map Wrapper API

### How to install

```shell
  $ npm install here-map-wrapper --save 

  or 

  $ yarn add here-map-wrapper
```

### How to use 

```javascript

const config = {
  appId: 'your appId',
  appCode: 'your appCode'
}


const hereMap = new HereMapWrapper(config)

const locations = [
  {lat: 51.10177, lng: 0.39349},
  {lat: 51.10181, lng: 0.39335},
  {lat: 51.10255, lng: 0.39369}
]

hereMap.getPolyline(locations).then(function(polyline) {

  console.log(polyline)

  // polyline = 'ox{vHq|kA_@nB??{@_@??SI??OG??YMSK??[Q' 

})

```

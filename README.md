# vue-monthly-picker

> Vue Monthly Picker Components

Checkout demo at https://ittus.github.io/vue-monthly-picker/
# Install
```
npm install vue-monthly-picker --save
```
```javascript
import VueMonthlyPicker from 'vue-monthly-picker'
Vue.component('my-component', {
    components: {
        VueMonthlyPicker
    }
});
```
# Usage

```html
<vue-monthly-picker
 v-model="selectedMonth">
</vue-monthly-picker>
```

## Available props


| Prop                  | Type            | Default     | Description                              |
|-----------------------|-----------------|-------------|------------------------------------------|
| disabled                 | Boolean    |      `false`     | Enable/disable component             |
| monthLabels                  | Array          |    `['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']`         | Customize month labels                      |
| placeHolder                  | String          |    ''         | Place holder when value is null                      |
| min                  | moment          |    `null`         | Minimum time to select                      |
| max                  | moment          |    `null`         | Maximum time to select                      |
| dateFormat                  | String          |    `YYYY/MM`         | Display format.                      |

## Events

| Event | Params | Description |
|-------|--------|-------------|
|selected| selected month in `moment`| A month has been selected |

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

# vue-monthly-picker

> Vue Monthly Picker Components

[![npm version](https://badge.fury.io/js/vue-monthly-picker.svg)](https://badge.fury.io/js/vue-monthly-picker)
[![CircleCI](https://circleci.com/gh/ittus/vue-monthly-picker.svg?style=shield&circle-token=fa41e296ca28a346dfcea28addb1d5f671f187a8)](https://circleci.com/gh/ittus/vue-monthly-picker)

Checkout demo at https://ittus.github.io/vue-monthly-picker/

# Support
<a href="https://www.buymeacoffee.com/8buMYCOog" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;"></a>

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

**Note**: `v-model` binding value need to be a **moment** object
## Available props


| Prop                  | Type            | Default     | Description                              |
|-----------------------|-----------------|-------------|------------------------------------------|
| disabled                 | Boolean    |      `false`     | Enable/disable component             |
| monthLabels                  | Array          |    `['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']`         | Customize month labels                      |
| placeHolder                  | String          |    ''         | Place holder when value is null                      |
| min                  | moment          |    `null`         | Minimum time to select                      |
| max                  | moment          |    `null`         | Maximum time to select                      |
| dateFormat                  | String          |    `YYYY/MM`         | Display format.                      |
| value                  | moment          |    `null`         | Moment value of selected month and year                  |
| alignment                  | String          |    `left`         | Alignment of input value, possible value: `left`, `right`, `center`                  |
| selectedBackgroundColor                  | String          |    `#007bff`         | Background color of selected value. It can be HTML color name (red, green, blue) or hexa color code (`#00FF00`, `#0000FF`)                  |
| clearOption                  | Boolean          |    true         | Show/Hide clear option                  |


## Events

| Event | Params | Description |
|-------|--------|-------------|
|selected| selected month in `moment`| A month has been selected |

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn dev

# build for production with minification
yarn build

# run all tests
yarn test
```

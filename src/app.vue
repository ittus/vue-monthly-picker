<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h3>Vue Monthly Picker</h3>
    <div class="demo-component">
      <vue-monthly-picker
       :inputClass="{'input': isDisplayInput}"
       :disabled="isDisable"
       :monthLabels="locale"
       :clearOption="clearOption"
       :min="min"
       :max="max"
       @selected="handleSelect"
       v-model="selectedMonth"
       :alignment="alignment"
       :selectedBackgroundColor="selectedBackgroundColor">
      </vue-monthly-picker>
    </div>
    <div class="columns option-list">
      <div class="column is-3">
        <b-field label="Disabled" expanded>
            <b-checkbox v-model="isDisable">
                {{ isDisable ? 'Disabled': 'Enable'}}
            </b-checkbox>
        </b-field>
      </div>
      <div class="column is-3">
        <b-field label="Range" expanded>
            <b-checkbox v-model="isLimitRange">
                {{ rangeDisplay }}
            </b-checkbox>
        </b-field>
      </div>
      <div class="column is-3">
        <b-field label="Display" expanded position="is-centered">
            <b-switch v-model="isDisplayInput"
                true-value="Input"
                false-value="Label">
                {{ isDisplayInput? 'Input': 'Label' }}
            </b-switch>
        </b-field>
      </div>
      <div class="column is-3">
        <b-field label="Clear icon" expanded>
            <b-checkbox v-model="clearOption">
                {{ clearOption ? 'Enable': 'Disabled'}}
            </b-checkbox>
        </b-field>
      </div>
    </div>
    <div class="columns">
      <div class="column is-4">
        <b-field label="Localization" expanded>
            <b-select placeholder="Select a language" v-model="locale">
              <option
                  v-for="option in options"
                  :value="option.monthLabels"
                  :key="option.id">
                  {{ option.title }}
              </option>
            </b-select>
        </b-field>
      </div>
      <div class="column is-4">
        <b-field label="Alignment" expanded>
           <b-select placeholder="Select an alignment" v-model="alignment">
             <option
                 v-for="alignment in alignments"
                 :value="alignment"
                 :key="alignment">
                 {{ alignment }}
             </option>
           </b-select>
       </b-field>
      </div>
      <div class="column is-4">
        <b-field label="Selected background color" expanded>
            <b-select placeholder="Select an color" v-model="selectedBackgroundColor">
              <option
                  v-for="color in colorExamples"
                  :value="color"
                  :key="color">
                  {{ color }}
              </option>
            </b-select>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import VueMonthlyPicker from './lib'

export default {
  name: 'app',
  data () {
    return {
      selectedMonth: moment(),
      isDisable: false,
      isDisplayInput: true,
      locale: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      alignment: 'left',
      selectedBackgroundColor: 'blue',
      options: [
        {
          id: 1,
          title: 'English',
          monthLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        {
          id: 2,
          title: 'Japanese',
          monthLabels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        {
          id: 3,
          title: 'Korean',
          monthLabels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
        }
      ],
      alignments: ['left', 'center', 'right'],
      colorExamples: ['blue', 'red', 'black'],
      min: null,
      max: null,
      isLimitRange: false,
      clearOption: true
    }
  },
  computed: {
    rangeDisplay () {
      if (!this.min || !this.max) {
        return 'Disabled'
      }
      return this.min.format('YYYY/MM') + '-' + this.max.format('YYYY/MM')
    }
  },
  watch: {
    isLimitRange (newValue) {
      if (newValue) {
        this.setSelectRange(moment().subtract(6, 'months'), moment().add(6, 'months'))
      } else {
        this.setSelectRange(null, null)
      }
    }
  },
  methods: {
    handleSelect (value) {
      console.log('Select', value)
    },
    setSelectRange (min, max) {
      this.min = min
      this.max = max
    }
  },
  components: {
    VueMonthlyPicker
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.demo-component {
  width: 250px;
  margin: auto;
}
.control-group {
  margin-top: 100px;
}
.control {
  text-align: center;
}
.option-list {
  margin-top: 20px;
}
</style>

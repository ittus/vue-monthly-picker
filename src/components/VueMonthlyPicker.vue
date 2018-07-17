<template>
  <div class="vue-monthly-picker">
    <div class="month-picker-wrapper"
         :class="{ 'active visible':showMenu }">
      <div class="month-year-label picker" type="text" autocomplete="off" tabindex="0" @click="openMenu">
          <div  @click="openMenu"
            class="month-year-display"
            :disabled="disabled"
            :class="[inputClass, {'placeholder': !value}]">
            {{ displayText }}
          </div>
      </div>
      <div class="text"></div>
      <div class="date-popover" :class="menuClass" :style="menuStyle" tabindex="-1">
        <div class="picker" style="text-align: center">
          <div class="flexbox">
            <span class="prev" @click="prevYear" :class="{deactive: !canBack}"></span>
            <div>{{year}}</div>
            <span class="next" @click="nextYear" :class="{deactive: !canNext}"></span>
          </div>
          <div class="flexbox monthItem">
            <template v-for="(month, idx) in monthLabels">
              <div class="item active"
                :class="{'selected': isCurrentSelected(year, idx)}"
                v-if="isActive(idx)"
                @click="selectMonth(idx)"
                :key="idx">{{month}}
              </div>
              <div v-else
                :class="{'selected': isCurrentSelected(year, idx)}"
                :key="idx"
                class="item deactive">
                {{ month }}
              </div>
            </template>
          </div>
        </div>
      </div>
   </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'vue-monthly-picker',
  props: {
    'value': {
      default: null
    },
    'disabled': {
      type: Boolean,
      default: false
    },
    'inputClass': {
      default: ''
    },
    'placeHolder': {
      type: String,
      default: ''
    },
    monthLabels: {
      type: Array,
      default: function () {
        return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
      }
    },
    min: {
      default: null
    },
    max: {
      default: null
    },
    dateFormat: {
      type: String,
      default: 'YYYY/MM'
    }
  },
  data () {
    return {
      showMenu: false,
      year: moment().format('YYYY'),
      month: moment().format('MM')
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    value: function (value) {
      this.setValue(value)
    }
  },
  computed: {
    menuClass () {
      return {
        visible: this.showMenu,
        hidden: !this.showMenu
      }
    },
    menuStyle () {
      return {
        display: this.showMenu ? 'block' : 'none'
      }
    },
    displayText () {
      if (this.value) {
        let valueMoment = null
        if (typeof this.value === 'string') {
          valueMoment = moment(this.value)
        } else {
          valueMoment = this.value
        }
        if (valueMoment && valueMoment.isValid()) {
          return valueMoment.format(this.dateFormat)
        }
      } else {
        return this.placeHolder
      }
    },
    canBack () {
      if (!this.min) return true
      const currentVal = this.internalMomentValue.clone().startOf('year')
      return this.min.isBefore(currentVal)
    },
    canNext () {
      if (!this.max) return true
      const currentVal = this.internalMomentValue.clone().endOf('year')
      return currentVal.isBefore(this.max)
    },
    internalMomentValue () {
      const yrMonth = this.year + '/' + this.month
      return moment(yrMonth, 'YYYY/MM')
    }
  },
  methods: {
    init () {
      document.addEventListener('click', (e) => {
        if (this.$el && !this.$el.contains(e.target)) {
          this.closeMenu()
        }
      }, false)
      this.setValue(this.value)
    },
    openMenu () {
      if (!this.disabled) {
        this.showMenu = true
      }
    },
    closeMenu () {
      this.showMenu = false
    },
    prevYear () {
      if (!this.canBack) return
      let newYear = parseInt(this.year) - 1
      this.year = newYear.toString()
    },
    nextYear () {
      if (!this.canNext) return
      let newYear = parseInt(this.year) + 1
      this.year = newYear.toString()
    },
    selectMonth (idx) {
      this.month = (parseInt(idx) + 1).toString()
      this.selectPicker()
      this.closeMenu()
    },
    selectPicker () {
      this.$emit('input', this.internalMomentValue)
      this.$emit('selected', this.internalMomentValue)
    },
    setValue (value) {
      if (typeof value === 'string') {
        value = moment(value)
      }
      if (value && value.isValid()) {
        this.month = value.format('MM')
        this.year = value.format('YYYY')
      }
    },
    isActive (idx) {
      let realMonth = idx + 1
      const yrMonth = this.year + '/' + (realMonth < 10 ? '0' + realMonth : realMonth)
      if (this.min && moment(yrMonth, 'YYYY/MM').isBefore(this.min)) {
        return false
      }
      if (this.max && moment(yrMonth, 'YYYY/MM').isAfter(this.max)) {
        return false
      }
      return true
    },
    isCurrentSelected (year, monthIdx) {
      if (!this.value) {
        return false
      }
      let checkValue = this.value
      if (typeof this.value === 'string') {
        checkValue = moment(this.value)
      }
      if (checkValue && checkValue.isValid()) {
        const currentMonth = checkValue.format('MM')
        const currentYear = checkValue.format('YYYY')
        return Number(currentMonth) === Number(monthIdx + 1) && Number(currentYear) === Number(year)
      }
      return false
    }
  }
}
</script>

<style lang="scss">
$lightgray: #d4d4d4;

.vue-monthly-picker {
  .picker {
    .next,
    .prev {
      &:hover {
        cursor: pointer;
      }
    }

    .monthItem {
      .item {
        border-top: 1px solid $lightgray;
        &.active {
          &:hover {
            cursor: pointer;
            background-color: $lightgray;
          }
        }
      }
    }

    .flexbox {
      padding: 0px;
      display: flex;
      flex-wrap: wrap;
      div {
        flex-grow: 1;
        padding: 15px 0;
      }
      .item {
        flex: 1;
        flex-basis: 25%;
      }
    }
  }

  .placeholder {
    color: #8b8b8b;
  }

  .date-popover {
    overflow-x: hidden;
    overflow-y: hidden;
    outline: none;
    max-width: 350px;
    width: 100%;
    border-radius: 0 0 .28571429rem .28571429rem;
    box-shadow: 0 2px 3px 0 rgba(34,36,38,.15);
    background: #fff;
    transition: opacity .1s ease;
    position: absolute;
    margin: auto;
    z-index: 10;
    border: 1px solid $lightgray;
    font-size: 1rem;
    font-weight: 200;
  }

  .month-picker-wrapper {
    position: relative;
    display: block;
    min-width: 200px;
  }

  .month-year-label {
    outline: none;
  }
  .text {
    position: relative;
    z-index: 2;
  }
  .month-year-display {
    &:hover {
      cursor: pointer;
    }
  }

  .next,
  .prev {
    width: 16%;
    float: left;
    text-indent: -10000px;
    position: relative;

    &:after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translateX(-50%) translateY(-50%);
      transform: translateX(-50%) translateY(-50%);
      border: 6px solid transparent;
    }
  }
  .next {
    &:after {
      border-left: 10px solid #000;
      margin-left: 5px;
    }
    &.deactive {
      &:hover {
        cursor: default;
      }
      &:after {
        border-left: 10px solid #999999;
      }
    }
  }

  .prev {
    &:after {
      border-right: 10px solid #000;
      margin-left: -5px;
    }
    &.deactive {
      &:hover {
        cursor: default;
      }
      &:after {
        border-right: 10px solid #999999;
      }
    }
  }

  .input {
    -moz-appearance: none;
    -webkit-appearance: none;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 3px;
    box-shadow: none;
    display: inline-flex;
    font-size: 1rem;
    height: 2.25em;
    justify-content: flex-start;
    line-height: 1.5;
    padding: 2px calc(.625em - 1px);
    position: relative;
    vertical-align: top;
    background-color: #fff;
    border-color: #dbdbdb;
    color: #363636;
    box-shadow: inset 0 1px 2px hsla(0,0%,4%,.1);
    max-width: 100%;
    width: 100%;
  }
  .deactive {
    color: #999999;
  }

  .selected {
    background: #007bff;
    color: #fff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
    font-weight: bold;
  }
}
</style>

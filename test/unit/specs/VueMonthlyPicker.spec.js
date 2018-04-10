import Vue from 'vue'
import Hello from '@/components/VueMonthlyPicker'

describe('VueMonthlyPicker.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Hello)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('div:first-child').className)
      .to.equal('month-picker-wrapper')
  })
})

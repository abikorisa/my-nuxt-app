/* Jestはどうやって記述していけば良いのか

1. まずはimport
2. describeでテストの項目を記述
   describe('テストの種類がわかる文字列', () => {
　  test('display Hello World', () => {
    const wrapper = mount(Hello)
    expect(wrapper.text()).toBe("Hello World")
  })
  })

*/

import { mount } from '@vue/test-utils'
import CartTitle from '@/pages/Cart'

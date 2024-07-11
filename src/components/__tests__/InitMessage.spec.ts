import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import InitMessage from '../InitMessage.vue'

describe('InitMessage', () => {
  it('renders properly', () => {
    const wrapper = mount(InitMessage, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})

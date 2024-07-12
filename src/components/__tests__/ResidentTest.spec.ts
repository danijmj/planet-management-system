import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ResidentComponent from '../residents/ResidentComponent.vue'
import type { Habitant } from '@/types/planet'

describe('ResidentComponent', () => {
  it('renders properly', () => {

    const resident:Habitant = {
        name: "C-3PO",
        mass: 75,
        height: 167,
        birthYear: "112BBY"
    }
    const wrapper = mount(ResidentComponent, { props: { resident: resident } })
    expect(wrapper.text()).toContain(resident.name)
  })
})

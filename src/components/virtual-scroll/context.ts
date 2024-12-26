import { createComponentState } from 'solid-uses'

export const context = createComponentState({
  state: () => ({
    count: 0,
    overscan: 5,
    horizontal: false,
    paddingStart: 0,
    paddingEnd: 0,
    scrollPaddingStart: 0,
    scrollPaddingEnd: 0,
  }),
})

import Vue from 'vue'

const eventBus = new Vue()

export const emitEventBus = (event, ...args) => {
  eventBus.$emit(event, ...args)
}

export const onEventBus = (event, handler) => {
  eventBus.$on(event, handler)
}

export default eventBus

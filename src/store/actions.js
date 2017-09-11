import * as types from './mutations_type.js'
export const changeSelectedDays = ({commit}, data) => {
  commit(types.SELECTEDDAYS, data)
}
export const changeSelectDaysTime = ({commit}, data) => {
  commit(types.SELECTTIEME, data)
}

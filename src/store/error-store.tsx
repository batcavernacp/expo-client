export const initialState = {}

export const errorReducer = (state, action) => {
  const { type } = action

  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type)

  if (!matches) return state

  const [, requestName, requestState] = matches

  switch (requestState) {
    case 'FAILURE':
      return {
        ...state,
        [requestName]: action.payload.error
      }

    default:
      return {
        ...state,
        [requestName]: ''
      }
  }
}

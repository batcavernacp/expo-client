import { useRef } from 'react'

export function useFocus<T> (): [React.MutableRefObject<T>, any] {
  const htmlElRef = useRef<T>()

  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus()
  }

  return [htmlElRef, setFocus]
}

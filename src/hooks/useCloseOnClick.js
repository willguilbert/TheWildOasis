import { useEffect, useRef } from 'react'

export default function useCloseOnClick(handler, listenCapturing = true) {
  const ref = useRef()
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler()
        }
      }
      document.addEventListener('click', handleClick, true)
      return () => document.removeEventListener('click', handleClick, true)
    },
    [handler],
  )
  return ref
}

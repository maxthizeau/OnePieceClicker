import { useEffect, useState, useRef, useReducer } from "react"
/* Thanks Dan Abramov  for useInterval hook
 https://overreacted.io/making-setinterval-declarative-with-react-hooks/
*/
function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<any>()
  useEffect(() => {
    savedCallback.current = callback
  })
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    let id = setInterval(tick, delay)
    return () => clearInterval(id)
  }, [delay])
}

export default useInterval

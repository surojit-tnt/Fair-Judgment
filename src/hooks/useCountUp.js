import { useEffect, useState } from "react"

// hooks/useCountUp.js — port of hooks/useCountUp.ts
// Animates a number from 0 to `end` over `duration` ms (used on StatsBar).
export function useCountUp(end, duration = 1500) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const startTime = performance.now()
    let frame
    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1)
      setCount(Math.floor(progress * (end - start) + start))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [end, duration])
  return count
}

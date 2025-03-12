"use client"

import { useState, useEffect } from "react"

export default function BarMascot() {
  const [blinking, setBlinking] = useState(false)
  const [talking, setTalking] = useState(false)

  // Random blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(
      () => {
        setBlinking(true)
        setTimeout(() => setBlinking(false), 200)
      },
      Math.random() * 3000 + 2000,
    )

    return () => clearInterval(blinkInterval)
  }, [])

  // Random talking effect
  useEffect(() => {
    const talkInterval = setInterval(
      () => {
        setTalking(true)
        setTimeout(() => setTalking(false), 300)
      },
      Math.random() * 5000 + 3000,
    )

    return () => clearInterval(talkInterval)
  }, [])

  return (
    <div className="relative w-12 h-12">

    </div>
  )
}


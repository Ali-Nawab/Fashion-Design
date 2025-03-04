import React, { useMemo } from 'react'
import Countdown from "react-countdown"

interface TimerProps {

  time: number | null;
  setIsExpire: (value: boolean) => void;

}

const Timer: React.FC<TimerProps> = ({setIsExpire,time}) => {
  const targetTime = useMemo(() => Date.now() + (time ?? 0), [time])
  return (
    <div>
        <Countdown onComplete={() => setIsExpire(true)} date={targetTime} />
    </div>
  )
}

export default Timer
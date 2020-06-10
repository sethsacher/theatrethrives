import React, { Component } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const minuteSeconds = 60
const hourSeconds = 3600
const daySeconds = 86400

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6,
}

const renderTime = (dimension, time) => {
  return (
    <div className="">
      <div className="text-center">{time}</div>
      <div>{dimension}</div>
    </div>
  )
}

const getTimeSeconds = time => (minuteSeconds - time / 1000) | 0
const getTimeMinutes = time => ((time % hourSeconds) / minuteSeconds) | 0
const getTimeHours = time => ((time % daySeconds) / hourSeconds) | 0
const getTimeDays = time => (time / daySeconds) | 0

class Countdown extends Component {
  render() {
    const startTime = Date.now() / 1000 // use UNIX timestamp in seconds
    const endTime = 1595026800 // use UNIX timestamp in seconds, 07/17/2020 @ 11:00pm (UTC)

    const remainingTime = endTime - startTime
    const days = Math.ceil(remainingTime / daySeconds)
    const daysDuration = days * daySeconds
    return (
      <div className="d-flex justify-content-around pt-5">
        <CountdownCircleTimer
          {...timerProps}
          colors={[['#33b5e5']]}
          duration={daysDuration}
          initialRemainingTime={remainingTime}
        >
          {({ elapsedTime }) =>
            renderTime('days', getTimeDays(daysDuration - elapsedTime / 1000))
          }
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          colors={[['#33b5e5']]}
          duration={daySeconds}
          initialRemainingTime={remainingTime % daySeconds}
          onComplete={totalElapsedTime => [
            remainingTime - totalElapsedTime > hourSeconds,
          ]}
        >
          {({ elapsedTime }) =>
            renderTime('hours', getTimeHours(daySeconds - elapsedTime / 1000))
          }
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          colors={[['#33b5e5']]}
          duration={hourSeconds}
          initialRemainingTime={remainingTime % hourSeconds}
          onComplete={totalElapsedTime => [
            remainingTime - totalElapsedTime > minuteSeconds,
          ]}
        >
          {({ elapsedTime }) =>
            renderTime(
              'minutes',
              getTimeMinutes(hourSeconds - elapsedTime / 1000)
            )
          }
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          colors={[['#33b5e5']]}
          duration={minuteSeconds}
          initialRemainingTime={remainingTime % minuteSeconds}
          onComplete={totalElapsedTime => [
            remainingTime - totalElapsedTime > 0,
          ]}
        >
          {({ elapsedTime }) =>
            renderTime('seconds', getTimeSeconds(elapsedTime))
          }
        </CountdownCircleTimer>
      </div>
    )
  }
}

export default Countdown

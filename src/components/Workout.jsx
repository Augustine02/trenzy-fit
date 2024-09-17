import React from 'react'
import SectionWrapper from './SectionWrapper'
import ExerciseCard from './ExerciseCard'

export default function Workout({workout}) {
  return (
    <SectionWrapper id={'workout'} header={"welcome to"} title={
      ['The', 'DANGER', 'zone']}>
        <div className='flex flex-col gap-4'>
          {workout.map((exercise, i) => {
            return (
              <ExerciseCard exercise={exercise} i={i} key={i}/>
            )
          })}
        </div>
    </SectionWrapper>
    // <div>Workout</div>
  )
}

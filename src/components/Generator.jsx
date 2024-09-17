import React, { useState } from 'react'
import SectionWrapper from './SectionWrapper'
import Button from './Button'
import { SCHEMES, WORKOUTS } from '../utils/swoldier'

function Header(props){
  const {index, title, description} = props
  return(
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-center gap-2'>
        <p className='text-3xl sm:text-4xl md:text-5xl 
        font-semibold text-slate-400'>{index}</p>
        <h4 className='text-xl sm:text-2xl md:text-3xl'>{title}</h4>
      </div>
      <p className='text-sm sm:text-base mx-auto'>{description}</p>
    </div>
  )
}
export default function Generator(props) {
  // let showModal = true
  const {muscles, setMuscles, poison, setPoison, goal, setGoal, updateWorkout} = props
  const[showModal, setShowModal] = useState(false)
  

  function toggleModal(){
    setShowModal(!showModal)
  }

  function updateMuscles(muscleGroup){
    // Case where poison is 'individual'
    console.log({muscles,muscleGroup})
    if(muscles.includes(muscleGroup)){
      // Remove muscleGroup if it already exists
      setMuscles(muscles.filter(val => val !== 
      muscleGroup))
      return
    }
    console.log({muscles,muscleGroup})
     // Exit if there are more than 2 muscles
    if(muscles.length > 2){
      return
    }
    console.log({muscles,muscleGroup})
    // Case where poison is not 'individual'
    if(poison !== 'individual'){
      setMuscles([muscleGroup])
      setShowModal(false)
      // console.log({muscles,muscleGroup})
      return
    }
    console.log({muscles,muscleGroup})
    
    // Add muscleGroup if it already exists
    setMuscles([...muscles, muscleGroup])
    console.log({muscles,muscleGroup})
    if(muscles.length === 2){
      setShowModal(false)
      return
    }
    console.log({muscles,muscleGroup})
  }
  return (
    <SectionWrapper id={'generate'} header={"generate your workout"} title=
    {['It\'s', 'huge', 'o\'clock']}>
      <Header index={'01'} title={'Pick your poison'} 
      description={'Select the workout you wish to endure.'}></Header>
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
        {Object.keys(WORKOUTS).map((type, typeIndex)=>{
          return (
          <button onClick={()=>{
            setMuscles([])
            setPoison(type)
          }} className={`bg-slate-950 border duration-200 
          hover:border-blue-600 py-3 rounded-lg px-4 ${type === poison ?
          'border-blue-600':'border-blue-400'}`}
          key={typeIndex}>
            <p className='capitalize'>{type.replaceAll('_'," ")}</p>
          </button>
          )
        })}
      </div>
      <Header index={'02'} title={'Lock on targets'} 
      description={'Select the muscles judged for annihilation.'}></Header>
      <div className='bg-slate-950 border border-solid 
      border-blue-400 rounded-lg flex flex-col'>
        <button onClick = {toggleModal}className='relative p-3 flex items-center justify-center'>
          <p className='upperscore'>{muscles.length == 0 ? 'Select muscle groups': muscles.join(' ')}</p>
          <i className='fa-solid absolute right-3 
          top-1/2 -translate-y-1/2 fa-caret-down'></i>
        </button>
        {showModal && (
        <div className='flex flex-col p-3'>
          {(poison === 'individual' ? WORKOUTS[poison]
          :Object.keys(WORKOUTS[poison])).map((muscleGroup,
          muscleGroupIndex)=>{
            return(
              // <button onClick={()=>{
              //   updateMuscles(muscleGroup)
              // }} key={muscleGroupIndex} className={`hover:text-blue-400 
              //   duration-200 ${muscles.includes(muscleGroup) ?
              //   'border-blue-400':''}`}>
              //   <p className='uppercase'>{muscleGroup.replaceAll('_'," ")}</p>
              // </button>
              <button onClick={() => {
                updateMuscles(muscleGroup)
            }} key={muscleGroupIndex} className={'hover:text-blue-400 duration-200 ' 
            + (muscles.includes(muscleGroup) ? ' text-blue-400' : ' ')}>
                <p className='uppercase'>{muscleGroup.replaceAll('_', ' ')}</p>
            </button>
            )
          })}</div>)}
      </div>
      <Header index={'03'} title={'Become Juggernut'} 
      description={'Select your ultimate objective.'}></Header>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {Object.keys(SCHEMES).map((scheme, schemeIndex)=>{
          return (
            <button onClick={()=>{
              setGoal(scheme)
            }} className={`bg-slate-950 border duration-200 
            hover:border-blue-600 py-3 rounded-lg px-4 ${scheme === goal ?
            'border-blue-600':'border-blue-400'}`}
            key={schemeIndex}>
              <p className='capitalize'>{scheme.replaceAll('_'," ")}</p>
            </button>)
        })}
      </div>
      <Button func={updateWorkout} text = {'Formulate'}/>
    </SectionWrapper>
    
  )
}

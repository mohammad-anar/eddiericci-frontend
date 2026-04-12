import React from 'react'
import SearchBar from './components/SearchBar'
import AnalyciesSection from './components/AnalyciesSection'
import ImageCarousel from '../components/ImageCarousel'
import StartJourneySection from '../components/StartJourneySection'

const CVSPage = () => {
  return (
    <div>
      <SearchBar/>
      <AnalyciesSection/>
      <ImageCarousel/>
      <StartJourneySection/>
    </div>
  )
}

export default CVSPage
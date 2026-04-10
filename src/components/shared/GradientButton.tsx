import React from 'react'
import { Button } from '../ui/button'

const GradientButton = ({text}:{text:string}) => {
  return (
    <Button className="bg-gradient-to-b from-[#00CD4F] to-[#003D18] text-white mt-10 p-6 text-lg">{text}</Button>
  )
}

export default GradientButton
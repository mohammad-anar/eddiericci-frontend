'use client'

import { Award } from 'lucide-react'
import logo1 from "@/assets/cvs-page/id/courses-logo1.png"
import logo2 from "@/assets/cvs-page/id/courses-logo2.png"
import logo3 from "@/assets/cvs-page/id/courses-logo3.png"
import logo4 from "@/assets/cvs-page/id/courses-logo4.png"
import Image from 'next/image'

export default function ComplementaryCoursesSection() {
  const logos = [
    { id: 1, name: 'Logo 1', image: logo1 },
    { id: 2, name: 'Logo 2', image: logo2 },
    { id: 3, name: 'Logo 3', image: logo3 },
    { id: 4, name: 'Logo 4', image: logo4 },
    { id: 5, name: 'Logo 5', image: logo1 },
    { id: 6, name: 'Logo 6', image: logo2 },
    { id: 7, name: 'Logo 7', image: logo3 },
  ]

  const courses = [
    { id: 1, title: 'Level 1 Coaching Certificate' },
    { id: 2, title: 'Football Management' },
    { id: 3, title: 'Level 3 Coaching Certificate' },
    { id: 4, title: 'Technical Coordination in the Base Categories' },
    { id: 5, title: 'Performance Analysis in Professional Football' },
    { id: 6, title: 'Strength, Power and Speed from Base to Professional' },
    { id: 7, title: 'Level 2 Coaching Certificate' },
  ]

  return (
    <div className="py-20 bg-black p-12">
      <div className="container mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-heading text-white text-center mb-12 tracking-wide">
          COMPLEMENTARY COURSES
        </h1>

        {/* Logo Badges */}
        <div className="flex justify-center gap-6 mb-16 flex-wrap">
          {logos.map((logo) => (
            <div key={logo.id} className='border p-5 rounded-xl'>
                <Image  src={logo.image} className='w-20 h-20 object-contain'  alt='logo'/>
            </div>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="flex items-center flex-wrap gap-6 justify-center">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border border-gray-700 rounded-lg p-6 bg-gray-900 hover:bg-gray-800 transition-colors flex items-center gap-4 group"
            >
              <Award className="w-6 h-6 text-white flex-shrink-0 group-hover:text-yellow-400 transition-colors" />
              <p className="text-white text-sm font-medium">
                {course.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

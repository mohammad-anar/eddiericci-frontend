'use client'

import Image from 'next/image'
import { useCoach } from '@/lib/hooks/useCoach'
import { Award, Plus, Trash2, X, Check } from 'lucide-react'
import { useRef, useState } from 'react'

export default function ComplementaryCoursesSection({ editable }: { editable?: boolean }) {
  const { coachData, handleUpdate } = useCoach()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const newLogo = {
          id: Date.now(),
          name: file.name,
          image: event.target?.result as string
        }
        handleUpdate('complementaryLogos', [...(coachData.complementaryLogos || []), newLogo])
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = (id: number) => {
    handleUpdate('complementaryLogos', (coachData.complementaryLogos || []).filter(l => l.id !== id))
  }

  const [newCourseTitle, setNewCourseTitle] = useState('')
  const [isAddingCourse, setIsAddingCourse] = useState(false)

  const addCourse = () => {
    if (newCourseTitle.trim()) {
      const newCourse = {
        id: Date.now(),
        title: newCourseTitle.trim()
      }
      handleUpdate('complementaryCourses', [...(coachData.complementaryCourses || []), newCourse])
      setNewCourseTitle('')
      setIsAddingCourse(false)
    }
  }

  const removeCourse = (id: number) => {
    handleUpdate('complementaryCourses', (coachData.complementaryCourses || []).filter(c => c.id !== id))
  }

  return (
    <div className="py-20 bg-black p-12">
      <div className="container mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-heading text-white text-center mb-12 tracking-wide">
          COMPLEMENTARY COURSES
        </h1>

        {/* Logo Badges */}
        <div className="flex justify-center gap-6 mb-16 flex-wrap">
          {(coachData.complementaryLogos || []).map((logo) => (
            <div key={logo.id} className='relative border border-gray-700 p-5 rounded-xl bg-gray-900/50 group'>
                <Image src={logo.image} className='w-20 h-20 object-contain' alt={logo.name} width={80} height={80} />
                {editable && (
                  <button 
                    onClick={() => removeLogo(logo.id)}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
            </div>
          ))}
          {editable && (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className='border border-dashed border-gray-600 p-5 rounded-xl w-[122px] h-[122px] flex items-center justify-center cursor-pointer hover:bg-gray-900 transition-colors'
            >
              <Plus className="text-gray-500" />
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleLogoUpload} 
                className="hidden" 
                accept="image/*"
              />
            </div>
          )}
        </div>

        {/* Course Cards Grid */}
        <div className="flex items-center flex-wrap gap-6 justify-center">
          {(coachData.complementaryCourses || []).map((course) => (
            <div
              key={course.id}
              className="relative border border-gray-700 rounded-lg p-6 bg-gray-900 hover:bg-gray-800 transition-colors flex items-center gap-4 group min-w-[280px]"
            >
              <Award className="w-6 h-6 text-white flex-shrink-0 group-hover:text-yellow-400 transition-colors" />
              <p className="text-white text-sm font-medium">
                {course.title}
              </p>
              {editable && (
                <button 
                  onClick={() => removeCourse(course.id)}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          ))}

          {editable && (
            <div className="min-w-[280px]">
              {isAddingCourse ? (
                <div className="border border-primary rounded-lg p-4 bg-gray-900 flex items-center gap-3 animate-in fade-in zoom-in duration-200">
                  <input
                    autoFocus
                    type="text"
                    value={newCourseTitle}
                    onChange={(e) => setNewCourseTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addCourse()
                      if (e.key === 'Escape') setIsAddingCourse(false)
                    }}
                    placeholder="Course Title..."
                    className="bg-transparent text-white text-sm outline-none w-full"
                  />
                  <div className="flex items-center gap-1">
                    <button onClick={addCourse} className="p-1 hover:text-green-500 text-white/50 transition-colors">
                      <Check size={16} />
                    </button>
                    <button onClick={() => setIsAddingCourse(false)} className="p-1 hover:text-red-500 text-white/50 transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsAddingCourse(true)}
                  className="w-full border border-dashed border-gray-600 rounded-lg p-6 hover:bg-gray-900 hover:border-gray-500 transition-all flex items-center justify-center gap-2 text-gray-500 hover:text-white group"
                >
                  <Plus size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold uppercase tracking-widest">Add Course</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

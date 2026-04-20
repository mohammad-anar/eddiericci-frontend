'use client'

import { Star } from 'lucide-react'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'

export default function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: 'Emanuel',
      role: 'Assistant Coach',
      text: 'Working with this coach changed everything for our team. Skills that felt impossible now look effortless.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'Dylan Hodges',
      role: 'Head Coach of the club',
      text: 'The coach improved our squad faster than we expected. Progress that used to take months now shows within days.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Madonna',
      role: 'Youth Academy Director',
      text: 'Our players develop twice as fast under this coach. What once felt confusing is now clear and structured.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
    },
    {
      id: 4,
      name: 'Iris Barrows',
      role: 'Professional Scout',
      text: 'This coach unlocked a new level in my son\'s game. Techniques that took ages to grasp now make perfect sense.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53a8c9c0c0d0?w=400&h=400&fit=crop'
    },
    {
      id: 5,
      name: 'Jitzsche',
      role: 'National Data Engineer',
      text: 'Simplified learning for our players. Skills that took forever to pick up now come quickly.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
    },
    {
      id: 6,
      name: 'Elliott',
      role: 'Senior Tactics Executive',
      text: 'The coach has simplified learning for our players. Skills that took forever to pick up now come quickly.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
    },
    {
      id: 7,
      name: 'Evelyn Pollich',
      role: 'Strategist',
      text: 'Our team grows rapidly with this coach. Drills that used to drain the boys now boost their confidence.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
    },
    {
      id: 8,
      name: 'Shanelle',
      role: 'Coordinator',
      text: 'The coach brought discipline and clarity. Progress that was slow before now happens session after session.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
    },
    {
      id: 9,
      name: 'Aletha',
      role: 'Assistant',
      text: 'This coach helps players improve. Techniques that took repeated practice now look natural.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53a8c9c0c0d0?w=400&h=400&fit=crop'
    }
  ]

  const StarRating = () => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
      ))}
    </div>
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const TestimonialCard = ({ testimonial }:any) => (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 min-w-[320px] flex-shrink-0">
      <div className="flex items-start gap-4 mb-4">
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          width={200}
          height={200}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">{testimonial.name}</p>
          <p className="text-gray-400 text-xs">{testimonial.role}</p>
          <div className="mt-2">
            <StarRating />
          </div>
        </div>
      </div>
      <p className="text-gray-300 text-sm max-w-sm leading-relaxed">
        {testimonial.text}
      </p>
    </div>
  )

  return (
    <div className=" bg-black py-20">
      <div className=" mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-heading text-white text-center mb-16 tracking-wide">
          TESTIMONIALS
        </h1>

        {/* First Marquee Row */}
        <div className="mb-8">
          <Marquee gradient gradientColor="#000000" pauseOnHover speed={40}>
            {testimonials.slice(0, 5).map((testimonial) => (
              <div key={testimonial.id} className="mr-6">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
            {testimonials.slice(0, 5).map((testimonial) => (
              <div key={testimonial.id} className="mr-6">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </Marquee>
        </div>

        {/* Second Marquee Row */}
        <div>
          <Marquee gradient gradientColor="#000000" pauseOnHover speed={40} direction="right">
            {testimonials.slice(5).map((testimonial) => (
              <div key={testimonial.id} className="mr-6">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
            {testimonials.slice(5).map((testimonial) => (
              <div key={testimonial.id} className="mr-6">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  )
}

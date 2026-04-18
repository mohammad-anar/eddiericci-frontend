'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Eye, Heart, Upload } from 'lucide-react'

interface VideoCard {
  id: string
  title: string
  date: string
  views: number
  likes: number
  video: string
}

const SAMPLE_VIDEOS: VideoCard[] = [
  {
    id: '1',
    title: 'vs Arsenal U19',
    date: 'Mar 15, 2024',
    views: 234,
    likes: 97,
    video: 'https://www.pexels.com/download/video/15436956',
  },
  {
    id: '2',
    title: 'Training Highlights',
    date: 'Mar 10, 2024',
    views: 189,
    likes: 45,
    video: 'https://www.pexels.com/download/video/32614272',
  },
  {
    id: '3',
    title: 'Training Highlights',
    date: 'Mar 10, 2024',
    views: 189,
    likes: 45,
    video: 'https://www.pexels.com/download/video/32614272',
  },
  {
    id: '4',
    title: 'Training Highlights',
    date: 'Mar 10, 2024',
    views: 189,
    likes: 45,
    video: 'https://www.pexels.com/download/video/32614272',
  },
]

export default function MyVideosSection() {
  const [videos, setVideos] = useState<VideoCard[]>(SAMPLE_VIDEOS)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    video: null as File | null,
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, video: e.target.files![0] }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title && formData.date && formData.video) {
      const newVideo: VideoCard = {
        id: String(videos.length + 1),
        title: formData.title,
        date: formData.date,
        views: 0,
        likes: 0,
        video: URL.createObjectURL(formData.video),
      }
      setVideos((prev) => [newVideo, ...prev])
      setFormData({ title: '', date: '', description: '', video: null })
      setIsModalOpen(false)
    }
  }

  return (
    <div className="mt-20">
      <div className="container bg-cardBg p-10 rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl text-white mb-2 font-heading">My Videos</h1>
            <p className="text-gray-400">Match highlights & training</p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
            variant="outline"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Video
          </Button>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((vid) => (
            <Card
              key={vid.id}
              className="bg-gray-900 border-gray-800 overflow-hidden hover:border-gray-700 transition-colors"
            >
              <div className="aspect-video bg-black">
                <video
                  src={vid.video}
                  className="w-full h-full object-cover"
                  controls
                />
              </div>

              <div className="p-4 flex flex-col justify-end h-full">
                <h3 className="text-white font-semibold mb-1">{vid.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{vid.date}</p>

                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{vid.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{vid.likes}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              Upload Video
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Video Upload */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Video File
              </label>

              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="video-input"
                />

                <label htmlFor="video-input" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">
                    {formData.video
                      ? formData.video.name
                      : 'Click to upload or drag video'}
                  </p>
                </label>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Title
              </label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Date
              </label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Description
              </label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-700 text-white h-24"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Upload
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
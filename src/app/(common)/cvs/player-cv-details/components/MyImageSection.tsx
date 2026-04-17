"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Heart, Upload } from "lucide-react";
import Image from "next/image";

interface ImageCard {
  id: string;
  title: string;
  date: string;
  views: number;
  likes: number;
  image: string;
}

const SAMPLE_IMAGES: ImageCard[] = [
  {
    id: "1",
    title: "vs Arsenal U19",
    date: "Mar 15, 2024",
    views: 234,
    likes: 97,
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    title: "vs Chelsea U19",
    date: "Mar 10, 2024",
    views: 189,
    likes: 45,
    image:
      "https://images.unsplash.com/photo-1517466895259-89a351ef5e64?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    title: "vs Liverpool U19",
    date: "Mar 5, 2024",
    views: 312,
    likes: 227,
    image:
      "https://images.unsplash.com/photo-1531415074968-36d367b2d5fb?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    title: "Training Highlights",
    date: "Feb 28, 2024",
    views: 156,
    likes: 62,
    image:
      "https://images.unsplash.com/photo-1552109067-f038ef16f675?w=400&h=300&fit=crop",
  },
];

export default function MyImagesSection() {
  const [images, setImages] = useState<ImageCard[]>(SAMPLE_IMAGES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    image: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.date && formData.image) {
      const newImage: ImageCard = {
        id: String(images.length + 1),
        title: formData.title,
        date: formData.date,
        views: 0,
        likes: 0,
        image: URL.createObjectURL(formData.image),
      };
      setImages((prev) => [newImage, ...prev]);
      setFormData({ title: "", date: "", description: "", image: null });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-linier-to-b from-black to-gray-900 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Images</h1>
            <p className="text-gray-400">Match highlights & training</p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
            variant="outline"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Image
          </Button>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <Card
              key={img.id}
              className="bg-gray-900 border-gray-800 overflow-hidden hover:border-gray-700 transition-colors"
            >
              <div className="aspect-video overflow-hidden bg-gray-800">
                <Image
                  src={img.image}
                  alt={img.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold mb-1">{img.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{img.date}</p>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{img.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{img.likes}</span>
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
              Upload Image
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Image File
              </label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-input"
                />
                <label htmlFor="image-input" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">
                    {formData.image
                      ? formData.image.name
                      : "Click to upload or drag and drop"}
                  </p>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Title
              </label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., vs Arsenal U19"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
              />
            </div>

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

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Description
              </label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Add a description for this image..."
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 h-24"
              />
            </div>

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
  );
}

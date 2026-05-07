'use client'

import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts'
import { Input } from '@/components/ui/input'
import { usePlayerStats } from './FullEditablePage'

interface AttributeCard {
  title: string
  score: number
  color: string
  attributes: Array<{
    name: string
    value: number
  }>
}

const AttributeDonut = ({ score, color }: { score: number; color: string }) => {
  const data = [
    { name: 'filled', value: score },
    { name: 'empty', value: 100 - score },
  ]

  return (
    <ResponsiveContainer width={120} height={120}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={35}
          outerRadius={55}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
        >
          <Cell fill={color} />
          <Cell fill="#ffffff" />
          <Label
            value={score}
            position="center"
            fill={color}
            className="text-lg font-bold"
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

const AttributesAnalysis = ({ editable = false }: { editable?: boolean }) => {
  const { setAttributesAvg } = usePlayerStats();
  const [cards, setCards] = useState<AttributeCard[]>([
    {
      title: 'Technical Ability',
      score: 82,
      color: '#00FF62',
      attributes: [
        { name: 'Ball Control', value: 90 },
        { name: 'Passing', value: 92 },
        { name: 'Dribbling', value: 85 },
        { name: 'First Touch', value: 88 },
      ],
    },
    {
      title: 'Reaction Skills',
      score: 88,
      color: '#0077FF',
      attributes: [
        { name: 'Positioning', value: 88 },
        { name: 'Vision', value: 91 },
        { name: 'Decision Making', value: 85 },
        { name: 'Teamwork', value: 89 },
      ],
    },
    {
      title: 'Physical Attributes',
      score: 78,
      color: '#FF1010',
      attributes: [
        { name: 'Speed', value: 77 },
        { name: 'Stamina', value: 85 },
        { name: 'Strength', value: 72 },
        { name: 'Agility', value: 81 },
      ],
    },
    {
      title: 'Mental Strength',
      score: 82,
      color: '#FDC700',
      attributes: [
        { name: 'Composure', value: 84 },
        { name: 'Determination', value: 88 },
        { name: 'Leadership', value: 79 },
        { name: 'Bravery', value: 73 },
      ],
    },
    {
      title: 'Attacking Skills',
      score: 84,
      color: '#F200FF',
      attributes: [
        { name: 'Shooting', value: 78 },
        { name: 'Finishing', value: 75 },
        { name: 'Long Shots', value: 80 },
        { name: 'Att. Position', value: 87 },
      ],
    },
    {
      title: 'Defensive Skills',
      score: 72,
      color: '#FF8010',
      attributes: [
        { name: 'Tackling', value: 68 },
        { name: 'Interceptions', value: 74 },
        { name: 'Marking', value: 70 },
        { name: 'Heading', value: 72 },
      ],
    },
  ])

  useEffect(() => {
    const avg = cards.reduce((sum, c) => sum + c.score, 0) / cards.length;
    setAttributesAvg(Math.round(avg));
  }, [cards, setAttributesAvg]);

  const handleUpdate = (cardIdx: number, attrIdx: number | null, value: any) => {
    setCards(prev => {
      const newCards = [...prev];
      if (attrIdx === null) {
        (newCards[cardIdx] as any).score = parseInt(value);
      } else {
        newCards[cardIdx].attributes[attrIdx].value = parseInt(value);
      }
      return newCards;
    });
  };

  const handleTitleChange = (cardIdx: number, value: string) => {
    setCards(prev => {
      const newCards = [...prev];
      newCards[cardIdx].title = value;
      return newCards;
    });
  };

  return (
    <div className="container my-20">
      <h1 className="text-4xl font-light text-center font-heading mb-12 text-foreground tracking-wide">
        ANALYSIS OF PLAYER ATTRIBUTES
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="border border-border bg-black/30 rounded-lg p-8 flex flex-col items-center"
          >
            {/* Title */}
            {editable ? (
              <Input 
                value={card.title} 
                onChange={(e) => handleTitleChange(index, e.target.value)}
                className="text-lg font-light font-heading text-center mb-6 bg-transparent h-8"
              />
            ) : (
              <h2 className="text-lg font-light font-heading text-center mb-6 text-foreground">
                {card.title}
              </h2>
            )}

            {/* Donut Chart */}
            <div className="flex flex-col items-center mb-8">
              <AttributeDonut score={card.score} color={card.color} />
              {editable && (
                <div className="mt-2 w-20">
                  <Input 
                    type="number" 
                    value={card.score} 
                    onChange={(e) => handleUpdate(index, null, e.target.value)}
                    className="h-7 text-xs text-center"
                  />
                </div>
              )}
            </div>

            {/* Score Text */}
            <p className="text-sm text-gray-400 text-center mb-6">Score</p>

            {/* Attributes List */}
            <div className="w-full space-y-3">
              {card.attributes.map((attr, attrIndex) => (
                <div
                  key={attrIndex}
                  className="flex justify-between border-b pb-2 items-center text-sm"
                >
                  <span className="text-gray-300">{attr.name}</span>
                  {editable ? (
                    <Input 
                      type="number" 
                      value={attr.value} 
                      onChange={(e) => handleUpdate(index, attrIndex, e.target.value)}
                      className="h-6 w-14 text-xs text-right bg-transparent border-none"
                    />
                  ) : (
                    <span className="text-foreground font-medium">{attr.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AttributesAnalysis
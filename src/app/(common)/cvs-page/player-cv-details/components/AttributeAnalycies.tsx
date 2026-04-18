'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts'

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

 const AttributesAnalysis = () => {
  const attributeCards: AttributeCard[] = [
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
  ]

  return (
    <div className="container my-20">
      <h1 className="text-4xl font-light text-center font-heading mb-12 text-foreground tracking-wide">
        ANALYSIS OF PLAYER ATTRIBUTES
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {attributeCards.map((card, index) => (
          <div
            key={index}
            className="border border-border bg-black/30 rounded-lg p-8 flex flex-col items-center"
          >
            {/* Title */}
            <h2 className="text-lg font-light font-heading text-center mb-6 text-foreground">
              {card.title}
            </h2>

            {/* Donut Chart */}
            <div className="flex justify-center mb-8">
              <AttributeDonut score={card.score} color={card.color} />
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
                  <span className="text-foreground font-medium">{attr.value}</span>
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
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Label } from 'recharts'

interface ChartDataItem {
  name: string
  value: number
  color: string
}

interface PerformanceChartProps {
  title: string
  percentage: number
  data: ChartDataItem[]
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-primary/50 rounded px-3 py-2">
        <p className="text-white text-sm font-medium">{payload[0].payload.name}</p>
        <p className="text-primary text-sm">{payload[0].value}%</p>
      </div>
    )
  }
  return null
}

const PerformanceChart = ({ title, percentage, data }: PerformanceChartProps) => {
  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width={280} height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <Label
              value={`${percentage}%`}
              position="center"
              fill="white"
              className="text-4xl font-bold"
            />
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* ✅ Added Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-white">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PerformanceAnalytics() {
  const skillData = [
    { name: 'Tactical', value: 30, color: '#00FF62' },
    { name: 'Technical', value: 35, color: '#0077FF' },
    { name: 'Physical', value: 20, color: '#FF1010' },
    { name: 'Mental', value: 15, color: '#FDC700' },
  ]

  const roleData = [
    { name: 'Midfield', value: 45, color: '#0077FF' },
    { name: 'Attack', value: 40, color: '#FF1010' },
    { name: 'Defense', value: 15, color: '#00FF62' },
  ]

  const footData = [
    { name: 'Right Foot', value: 65, color: '#FDC700' },
    { name: 'Left Foot', value: 25, color: '#FF1010' },
    { name: 'Head', value: 15, color: '#00FF62' },
  ]

  return (
    <div className="mt-20 container">
      <h1 className="text-4xl font-light font-heading text-center mb-12 text-foreground">
        PERFORMANCE ANALYTICS
      </h1>

      <div className=" bg-black/30 rounded-2xl ">
        {/* Charts Grid */}
        <div className="grid grid-cols-2 gap-8 mb-12 items-start">
          {/* Chart 1 - Skills */}
          <div className="flex justify-center">
            <PerformanceChart
              title="Skills"
              percentage={83}
              data={skillData}
            />
          </div>

          {/* Chart 2 - Role */}
          <div className="flex justify-center">
            <PerformanceChart
              title="Role"
              percentage={90}
              data={roleData}
            />
          </div>
        </div>

        {/* Chart 3 - Foot (Bottom Center) */}
        <div className="flex justify-center">
          <div className="mb-12">
            <PerformanceChart
              title="Foot"
              percentage={80}
              data={footData}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

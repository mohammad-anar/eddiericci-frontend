'use client'

import { useState } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface MetricRow {
  category: string
  score: number
  trend: number
  grade: 'Excellent' | 'Good'
}

const METRIC_CATEGORIES = ['Perception', 'Vision', 'Intelligence']

const METRICS_DATA: Record<string, MetricRow[]> = {
  Perception: [
    { category: 'Space Awareness', score: 92, trend: 3, grade: 'Excellent' },
    { category: 'Opponent Reading', score: 88, trend: 5, grade: 'Excellent' },
    { category: 'Game Flow Understanding', score: 85, trend: 2, grade: 'Good' },
    { category: 'Pressure Handling', score: 90, trend: 4, grade: 'Excellent' },
    { category: 'Pressure Handling', score: 90, trend: 4, grade: 'Good' },
  ],
  Vision: [
    { category: 'Peripheral Vision', score: 87, trend: 3, grade: 'Excellent' },
    { category: 'Focus Control', score: 92, trend: 2, grade: 'Excellent' },
    { category: 'Pattern Recognition', score: 89, trend: 4, grade: 'Good' },
    { category: 'Decision Speed', score: 91, trend: 5, grade: 'Excellent' },
    { category: 'Visual Acuity', score: 86, trend: 1, grade: 'Good' },
  ],
  Intelligence: [
    { category: 'Tactical Analysis', score: 94, trend: 3, grade: 'Excellent' },
    { category: 'Strategy Planning', score: 89, trend: 2, grade: 'Excellent' },
    { category: 'Adaptation Rate', score: 91, trend: 4, grade: 'Good' },
    { category: 'Risk Assessment', score: 88, trend: 5, grade: 'Excellent' },
    { category: 'Learning Curve', score: 90, trend: 3, grade: 'Good' },
  ],
}

export function MetricsAnalysis() {
  const [activeTab, setActiveTab] = useState('Perception')

  return (
    <div className="w-full py-16 px-6 bg-background">
      <div className="container mx-auto">

        {/* Heading */}
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center text-foreground mb-12 tracking-wider">
          DETAILED ANALYSIS METRICS
        </h2>

        {/* Card */}
        <div className="border border-border rounded-lg  p-8">

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

            {/* Tabs */}
            <TabsList className="grid w-full grid-cols-3 mb-8 p-1 rounded-full">
              {METRIC_CATEGORIES.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-full font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-black data-[state=inactive]:text-foreground"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Table */}
            <TabsContent value={activeTab}>
              <Table className="border border-border">
                
                {/* Header */}
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="border-r border-border">
                      Category
                    </TableHead>
                    <TableHead className="text-center border-r border-border">
                      Score
                    </TableHead>
                    <TableHead className="text-center border-r border-border">
                      Trend
                    </TableHead>
                    <TableHead className="text-right">
                      Grade
                    </TableHead>
                  </TableRow>
                </TableHeader>

                {/* Body */}
                <TableBody>
                  {METRICS_DATA[activeTab].map((metric, idx) => (
                    <TableRow
                      key={idx}
                      className="border-b border-border hover:bg-[#262626] transition-colors"
                    >
                      {/* Category */}
                      <TableCell className="font-medium border-r border-border">
                        {metric.category}
                      </TableCell>

                      {/* Score */}
                      <TableCell className="border-r border-border">
                        <div className="flex items-center justify-center gap-3">
                          <Progress value={metric.score} className="w-16 h-1.5" />
                          <span className="font-medium text-sm min-w-[35px] text-right">
                            {metric.score}
                          </span>
                        </div>
                      </TableCell>

                      {/* Trend */}
                      <TableCell className="text-center border-r border-border">
                        <span className="text-primary font-medium text-sm">
                          +{metric.trend}
                        </span>
                      </TableCell>

                      {/* Grade */}
                      <TableCell className="text-right">
                        <Badge
                          className={`font-medium ${
                            metric.grade === 'Excellent'
                              ? 'bg-primary text-black hover:bg-primary'
                              : 'bg-blue text-white hover:bg-blue'
                          }`}
                        >
                          {metric.grade}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  )
}
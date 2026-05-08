/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { usePlayerStats } from './FullEditablePage'
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
import { useUpdatePlayerProfileMutation } from '@/lib/features/cv/cvApi'
import { CMSField } from '@/components/shared/CMSField'
import { toast } from 'sonner'

interface MetricRow {
  category: string
  score: number
  trend: number
  grade: 'Excellent' | 'Good' | 'Average' | 'Poor'
}

const getGrade = (score: number): 'Excellent' | 'Good' | 'Average' | 'Poor' => {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Good';
  if (score >= 70) return 'Average';
  return 'Poor';
};

const getGradeColor = (grade: string) => {
  switch (grade) {
    case 'Excellent': return 'bg-primary text-black';
    case 'Good': return 'bg-blue text-white';
    case 'Average': return 'bg-yellow text-black';
    case 'Poor': return 'bg-red text-white';
    default: return 'bg-gray-500 text-white';
  }
};

const getProgressColor = (grade: string) => {
  switch (grade) {
    case 'Excellent': return '[&>div]:bg-primary';
    case 'Good': return '[&>div]:bg-blue';
    case 'Average': return '[&>div]:bg-yellow';
    case 'Poor': return '[&>div]:bg-red';
    default: return '[&>div]:bg-gray-500';
  }
};

const METRIC_CATEGORIES = ['Perception', 'Vision', 'Intelligence']

export function MetricsAnalysis({ editable = false }: { editable?: boolean }) {
  const [updatePlayer] = useUpdatePlayerProfileMutation();
  const [activeTab, setActiveTab] = useState('Perception')
  const [metricsData, setMetricsData] = useState<Record<string, MetricRow[]>>({
    Perception: [
      { category: 'Space Awareness', score: 92, trend: 3, grade: 'Excellent' },
      { category: 'Opponent Reading', score: 88, trend: 5, grade: 'Good' },
      { category: 'Game Flow Understanding', score: 85, trend: 2, grade: 'Good' },
      { category: 'Pressure Handling', score: 90, trend: 4, grade: 'Excellent' },
    ],
    Vision: [
      { category: 'Peripheral Vision', score: 87, trend: 3, grade: 'Good' },
      { category: 'Focus Control', score: 92, trend: 2, grade: 'Excellent' },
      { category: 'Pattern Recognition', score: 89, trend: 4, grade: 'Good' },
      { category: 'Decision Speed', score: 91, trend: 5, grade: 'Excellent' },
      { category: 'Visual Acuity', score: 86, trend: 1, grade: 'Good' },
    ],
    Intelligence: [
      { category: 'Tactical Analysis', score: 94, trend: 3, grade: 'Excellent' },
      { category: 'Strategy Planning', score: 89, trend: 2, grade: 'Good' },
      { category: 'Adaptation Rate', score: 91, trend: 4, grade: 'Excellent' },
      { category: 'Risk Assessment', score: 88, trend: 5, grade: 'Good' },
      { category: 'Learning Curve', score: 90, trend: 3, grade: 'Excellent' },
    ],
  })

  const { setMetricsAvg, role } = usePlayerStats();

  useEffect(() => {
    const allRows = Object.values(metricsData).flat();
    const avg = allRows.reduce((sum, r) => sum + r.score, 0) / allRows.length;
    setMetricsAvg(Math.round(avg));
  }, [metricsData, setMetricsAvg]);

  const handleUpdate = async (tab: string, idx: number, field: keyof MetricRow, value: any) => {
    const metricName = metricsData[tab][idx].category;
    
    setMetricsData(prev => {
      const newData = { ...prev };
      const row = { ...newData[tab][idx] };
      
      if (field === 'score') {
        const score = Math.max(0, Math.min(100, parseInt(value) || 0));
        row.score = score;
        row.grade = getGrade(score);
      } else if (field === 'trend') {
        row.trend = Math.max(0, parseInt(value) || 0);
      } else {
        (row as any)[field] = value;
      }
      
      newData[tab][idx] = row;
      return newData;
    });

    try {
      await updatePlayer({
        id: "current-player",
        data: { [`metrics.${tab}.${metricName}.${field}`]: value }
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full py-16 px-6 bg-background">
      <div className="container mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center text-foreground mb-12 tracking-wider">
          DETAILED ANALYSIS METRICS
        </h2>

        <div className="border border-border rounded-lg  p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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

            <TabsContent value={activeTab}>
              <Table className="border border-border">
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="border-r border-border">
                      Category
                    </TableHead>
                    <TableHead className="text-center border-r border-border">
                      Score (0-100)
                    </TableHead>
                    <TableHead className="text-center border-r border-border">
                      Trend
                    </TableHead>
                    <TableHead className="text-right">
                      Grade
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {metricsData[activeTab].map((metric, idx) => (
                    <TableRow
                      key={idx}
                      className="border-b border-border hover:bg-[#262626] transition-colors"
                    >
                      <TableCell className="font-medium border-r border-border">
                        <CMSField
                          value={metric.category}
                          onUpdate={(val) => handleUpdate(activeTab, idx, 'category', val)}
                          canEdit={editable}
                          className="w-full"
                        />
                      </TableCell>

                      <TableCell className="border-r border-border min-w-[200px]">
                        <div className="flex items-center justify-center gap-3">
                          <Progress 
                            value={metric.score} 
                            className={`w-32 h-1.5 ${getProgressColor(metric.grade)}`} 
                          />
                          <CMSField
                            value={metric.score}
                            onUpdate={(val) => handleUpdate(activeTab, idx, 'score', val)}
                            canEdit={editable}
                            isNumeric
                            className="font-medium text-sm min-w-[35px] justify-end"
                            inputClassName="text-right w-16"
                          />
                        </div>
                      </TableCell>

                      <TableCell className="text-center border-r border-border">
                        <div className="flex justify-center">
                          <span className="text-primary font-medium text-sm">+</span>
                          <CMSField
                            value={metric.trend}
                            onUpdate={(val) => handleUpdate(activeTab, idx, 'trend', val)}
                            canEdit={editable}
                            isNumeric
                            className="text-primary font-medium text-sm"
                            inputClassName="w-12 text-center"
                          />
                        </div>
                      </TableCell>

                      <TableCell className="text-right">
                        <Badge
                          className={`font-medium min-w-[80px] justify-center ${getGradeColor(metric.grade)}`}
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

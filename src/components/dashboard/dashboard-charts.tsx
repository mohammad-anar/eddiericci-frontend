"use client";

import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const barData = [
  { month: "Jan-Feb", value: 6 },
  { month: "Mar-Apr", value: 10 },
  { month: "May-Jun", value: 5 },
  { month: "Jul-Aug", value: 8 },
  { month: "Sept-Oct", value: 9 },
  { month: "Nov-Dec", value: 4 },
];

const areaData = [
  { month: "Jan-Feb", value: 400 },
  { month: "Mar-Apr", value: 600 },
  { month: "May-Jun", value: 550 },
  { month: "Jul-Aug", value: 800 },
  { month: "Sept-Oct", value: 700 },
  { month: "Nov-Dec", value: 900 },
];

export const DashboardCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Bar Chart */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-black uppercase text-white font-orbitron">Game Reports Engagement</h3>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} 
              />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
              />
              <Bar dataKey="value" fill="rgba(255,255,255,0.1)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Area Chart */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-black uppercase text-white font-orbitron">Earnings Trend</h3>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E31B23" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#E31B23" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} 
              />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#E31B23" 
                fillOpacity={1} 
                fill="url(#colorValue)" 
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type { AnimeStatistics } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useMemo } from 'react';

interface StatisticsChartProps {
  statistics: AnimeStatistics | null;
}

export function StatisticsChart({ statistics }: StatisticsChartProps) {
  const chartData = useMemo(() => {
    if (!statistics?.scores) return [];
    return statistics.scores.map(item => ({
      name: `Score ${item.score}`,
      value: item.votes,
      percentage: item.percentage.toFixed(2),
    }));
  }, [statistics]);

  if (!statistics || !chartData.length) {
    return null;
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col space-y-1">
                <span className="text-[0.70rem] uppercase text-muted-foreground">
                    {label}
                </span>
                <span className="font-bold text-muted-foreground">
                    {payload[0].value.toLocaleString()} votes
                </span>
                <span className="font-bold text-primary">
                    ({payload[0].payload.percentage}%)
                </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-primary">Statistics</CardTitle>
        <CardDescription>Based on {statistics.total.toLocaleString()} user ratings.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value.toLocaleString()}`} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent) / 0.2)' }}/>
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

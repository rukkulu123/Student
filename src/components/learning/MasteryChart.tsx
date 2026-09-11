import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { format } from 'date-fns'

export function MasteryChart({ data, height = 220 }: { data: { date: string; mastery: number }[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid stroke="#E1DED2" vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={(d) => format(new Date(d), 'MMM d')}
          tick={{ fontSize: 11, fill: '#8A8D93' }}
          axisLine={{ stroke: '#E1DED2' }}
          tickLine={false}
          minTickGap={24}
        />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#8A8D93' }} axisLine={false} tickLine={false} width={32} />
        <Tooltip
          formatter={(v: number) => [`${v}%`, 'Mastery']}
          labelFormatter={(d) => format(new Date(d), 'MMM d, yyyy')}
          contentStyle={{ borderRadius: 6, borderColor: '#E1DED2', fontSize: 12 }}
        />
        <Line type="monotone" dataKey="mastery" stroke="#3F7A5C" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

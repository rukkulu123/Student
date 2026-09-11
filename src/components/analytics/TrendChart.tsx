import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { format } from 'date-fns'

export function TrendChart({
  data, color = '#3F7A5C', height = 200, valueLabel = 'Value',
}: { data: { date: string; value: number }[]; color?: string; height?: number; valueLabel?: string }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id={`fill-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.25} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#E1DED2" vertical={false} />
        <XAxis dataKey="date" tickFormatter={(d) => format(new Date(d), 'MMM d')} tick={{ fontSize: 11, fill: '#8A8D93' }} axisLine={{ stroke: '#E1DED2' }} tickLine={false} minTickGap={24} />
        <YAxis tick={{ fontSize: 11, fill: '#8A8D93' }} axisLine={false} tickLine={false} width={32} />
        <Tooltip formatter={(v: number) => [v, valueLabel]} labelFormatter={(d) => format(new Date(d), 'MMM d, yyyy')} contentStyle={{ borderRadius: 6, borderColor: '#E1DED2', fontSize: 12 }} />
        <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fill={`url(#fill-${color})`} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

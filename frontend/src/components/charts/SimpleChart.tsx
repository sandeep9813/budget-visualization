import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

interface ChartData {
  name: string;
  value: number;
  color?: string;
}

interface SimpleChartProps {
  data: ChartData[];
  type: 'pie' | 'bar' | 'line';
  height?: number;
}

const COLORS = [
  'hsl(215, 84%, 35%)', // primary
  'hsl(142, 76%, 36%)', // accent
  'hsl(38, 92%, 50%)',  // warning
  'hsl(0, 84%, 60%)',   // destructive
  'hsl(215, 84%, 55%)', // primary-light
  'hsl(142, 60%, 50%)', // accent-light
];

export const SimpleChart = ({ data, type, height = 300 }: SimpleChartProps) => {
  if (type === 'pie') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={height * 0.35} // Make pie chart bigger based on height
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}M`, 'Amount']} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ left: 10, right: 10, top: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 18%, 85%)" />
          <XAxis
            dataKey="name"
            stroke="hsl(215, 14%, 45%)"
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0} // Show all labels
          />
          <YAxis stroke="hsl(215, 14%, 45%)" />
          <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}M`, 'Budget']} />
          <Bar dataKey="value" fill="hsl(215, 84%, 35%)" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'line') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 18%, 85%)" />
          <XAxis dataKey="name" stroke="hsl(215, 14%, 45%)" />
          <YAxis stroke="hsl(215, 14%, 45%)" />
          <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}M`, 'Budget']} />
          <Line type="monotone" dataKey="value" stroke="hsl(215, 84%, 35%)" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return null;
};
import React from 'react';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

// Fancy Reusable PieChart Component
const FancyPieChart = ({
  data,
  dataKey = 'value',
  nameKey = 'name',
  colors = [],
}) => {
  // Default colors
  const DEFAULT_COLORS = [
    '#6a0dad',
    '#4caf50',
    '#2196f3',
    '#ff5722',
    '#ffc107',
  ];
  const chartColors = colors.length > 0 ? colors : DEFAULT_COLORS;

  return (
    <div className="flex justify-center items-center py-10 bg-gray-100 rounded-lg shadow-lg">
      <PieChart width={350} height={350}>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          // Creates a donut chart effect
          fill="#8884d8"
          label={(entry) => `${entry[dataKey]}`}
          labelStyle={{ fontSize: '12px', fontWeight: 'bold' }}
          isAnimationActive={true} // Enable animation
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={chartColors[index % chartColors.length]}
              stroke="white" // Adds a stroke for separation
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '10px',
          }}
          itemStyle={{ color: '#555' }}
        />
        <Legend
          verticalAlign="bottom"
          align="center"
          layout="horizontal"
          wrapperStyle={{
            marginTop: '20px',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        />
      </PieChart>
    </div>
  );
};

export default FancyPieChart;

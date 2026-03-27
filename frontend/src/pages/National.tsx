import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SimpleChart } from "@/components/charts/SimpleChart";
import { Calendar, Filter, TrendingUp } from "lucide-react";

interface SectorData {
  name: string;
  value: number;
  color: string;
}

interface TrendData {
  name: string;
  data: { year: number; value: number }[];
  color: string;
}

interface Budget {
  _id: string;
  Year: number; // Note: backend returns "Year" not "year"
  sectors?: Record<string, number>;
  // Individual sector fields from the actual data
  Education?: number;
  Health?: number;
  Agriculture?: number;
  Energy?: number;
  Infrastructure_Transport?: number;
  Social_Security?: number;
  Defense?: number;
  IT_Digital?: number;
  Industry_Commerce?: number;
  Provincial_Local?: number;
}

const National = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [chartType, setChartType] = useState<'pie' | 'bar'>('bar');
  const [selectedSector, setSelectedSector] = useState("Education");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNationalBudgets = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("http://localhost:3001/api/nationalBudgets");

        console.log("API Response:", response.data); // Debug log

        // The backend returns the data directly as an array
        setBudgets(response.data);

        // Set the selected year to the most recent year available
        if (response.data.length > 0) {
          const latestYear = Math.max(...response.data.map((budget: Budget) => budget.Year));
          setSelectedYear(latestYear.toString());
        }
      } catch (err) {
        console.error("Error fetching national budgets:", err);
        setError("Failed to fetch national budget data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNationalBudgets();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg text-muted-foreground">Loading national budget data...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    </div>
  );

  const selectedBudget = budgets.find(b => b.Year.toString() === selectedYear);

  if (!selectedBudget) return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg text-muted-foreground">
          No budget data available for {selectedYear}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Available years: {budgets.map(b => b.Year).join(', ')}
        </p>
      </div>
    </div>
  );

  // Extract budget data from individual fields (not nested sectors)
  const sectorFields = [
    'Education', 'Health', 'Agriculture', 'Energy', 'Infrastructure_Transport',
    'Social_Security', 'Defense', 'IT_Digital', 'Industry_Commerce', 'Provincial_Local'
  ];

  const budgetData: SectorData[] = sectorFields
    .map((field, i) => ({
      name: field.replace(/_/g, ' '), // Replace underscores with spaces for display
      value: Number(selectedBudget[field as keyof Budget] || 0),
      color: `hsl(${i * 45 + 200}, 40%, 60%)` // More muted colors with higher hue, lower saturation
    }))
    .filter(item => item.value > 0); // Only show sectors with budget > 0

  // Create trend data for the selected sector
  const trendData: TrendData = {
    name: selectedSector.replace(/_/g, ' '),
    data: budgets
      .sort((a, b) => a.Year - b.Year)
      .map(budget => ({
        year: budget.Year,
        value: Number(budget[selectedSector as keyof Budget] || 0)
      })),
    color: `hsl(${sectorFields.indexOf(selectedSector) * 45 + 200}, 40%, 60%)` // Matching muted colors
  };

  // Create trend data for top 3 sectors
  const topSectors = [...budgetData].sort((a, b) => b.value - a.value).slice(0, 3);
  const multiSectorTrends: TrendData[] = topSectors.map((sector, index) => {
    const sectorField = sectorFields.find(field => field.replace(/_/g, ' ') === sector.name);
    return {
      name: sector.name,
      data: budgets
        .sort((a, b) => a.Year - b.Year)
        .map(budget => ({
          year: budget.Year,
          value: Number(budget[sectorField as keyof Budget] || 0)
        })),
      color: sector.color
    };
  });

  const totalBudget = budgetData.reduce((sum, item) => sum + item.value, 0);
  const topAllocations = [...budgetData].sort((a, b) => b.value - a.value).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            National Budget Analysis
          </h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive view of national budget allocations by sector and year
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Card className="flex-1">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Year:</span>
                </div>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {budgets.map(budget => (
                      <SelectItem key={budget.Year} value={budget.Year.toString()}>
                        {budget.Year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2 ml-4">
                  <Filter className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">View:</span>
                </div>
                <Select value={chartType} onValueChange={value => setChartType(value as 'pie' | 'bar')}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="pie">Pie Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Year Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-card shadow-card">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">
                {selectedYear} Budget Allocation
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Sector-wise budget distribution
              </p>
            </CardHeader>
            <CardContent>
              {budgetData.length > 0 ? (
                <SimpleChart data={budgetData} type={chartType} height={500} />
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  No budget data available for {selectedYear}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-card">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">
                Budget Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-lg border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Total Budget {selectedYear}</h3>
                  <p className="text-3xl font-bold text-foreground">
                    ${totalBudget.toLocaleString()}M
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Top Allocations:</h4>
                  {topAllocations.length > 0 ? (
                    topAllocations.map((sector, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sector.color }} />
                          <span className="font-medium text-foreground">{sector.name}</span>
                        </div>
                        <span className="font-bold text-primary">${sector.value.toLocaleString()}M</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">No budget allocations found</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Budget Trends Over Years */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-card shadow-card">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Budget Trend - {selectedSector.replace(/_/g, ' ')}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Budget allocation trend over the years
              </p>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Select value={selectedSector} onValueChange={setSelectedSector}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectorFields.map(field => (
                      <SelectItem key={field} value={field}>
                        {field.replace(/_/g, ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {trendData.data.length > 0 ? (
                <div className="h-64 relative">
                  <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4].map((i) => (
                      <line
                        key={i}
                        x1="0"
                        y1={40 + i * 32}
                        x2="400"
                        y2={40 + i * 32}
                        stroke="#e5e7eb"
                        strokeWidth="1"
                      />
                    ))}

                    {/* Y-axis labels */}
                    {[0, 1, 2, 3, 4].map((i) => {
                      const maxValue = Math.max(...trendData.data.map(d => d.value));
                      const value = Math.round((maxValue * (4 - i)) / 4);
                      return (
                        <text
                          key={i}
                          x="5"
                          y={45 + i * 32}
                          fontSize="10"
                          fill="#6b7280"
                          textAnchor="start"
                        >
                          ${value.toLocaleString()}M
                        </text>
                      );
                    })}

                    {/* Line path */}
                    <path
                      d={trendData.data.map((point, index) => {
                        const x = 50 + (index * 350) / (trendData.data.length - 1);
                        const maxValue = Math.max(...trendData.data.map(d => d.value));
                        const y = 200 - ((point.value / maxValue) * 160);
                        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }).join(' ')}
                      stroke={trendData.color}
                      strokeWidth="3"
                      fill="none"
                    />

                    {/* Data points */}
                    {trendData.data.map((point, index) => {
                      const x = 50 + (index * 350) / (trendData.data.length - 1);
                      const maxValue = Math.max(...trendData.data.map(d => d.value));
                      const y = 200 - ((point.value / maxValue) * 160);
                      return (
                        <circle
                          key={index}
                          cx={x}
                          cy={y}
                          r="4"
                          fill={trendData.color}
                          stroke="white"
                          strokeWidth="2"
                        />
                      );
                    })}

                    {/* X-axis labels */}
                    {trendData.data.map((point, index) => {
                      const x = 50 + (index * 350) / (trendData.data.length - 1);
                      return (
                        <text
                          key={index}
                          x={x}
                          y="195"
                          fontSize="10"
                          fill="#6b7280"
                          textAnchor="middle"
                        >
                          {point.year}
                        </text>
                      );
                    })}
                  </svg>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  No trend data available
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-card">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Top 3 Sectors Trend
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Comparison of top 3 sectors over years
              </p>
            </CardHeader>
            <CardContent>
              {multiSectorTrends.length > 0 ? (
                <div className="h-64 flex items-end justify-between gap-2">
                  {budgets.sort((a, b) => a.Year - b.Year).map((budget, yearIndex) => (
                    <div key={budget.Year} className="flex flex-col items-center flex-1">
                      <div className="flex items-end gap-1 w-full">
                        {multiSectorTrends.map((sector, sectorIndex) => {
                          const point = sector.data[yearIndex];
                          const maxValue = Math.max(...sector.data.map(d => d.value));
                          return (
                            <div
                              key={sectorIndex}
                              className="flex-1 rounded-t"
                              style={{
                                height: `${(point.value / maxValue) * 180}px`,
                                backgroundColor: sector.color,
                                minHeight: '4px'
                              }}
                              title={`${sector.name}: $${point.value.toLocaleString()}M`}
                            />
                          );
                        })}
                      </div>
                      <span className="text-xs text-muted-foreground mt-2 rotate-45 origin-left">
                        {budget.Year}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  No trend data available
                </div>
              )}

              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-4">
                {multiSectorTrends.map((sector, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: sector.color }}
                    />
                    <span className="text-sm text-muted-foreground">{sector.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default National;

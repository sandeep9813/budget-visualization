import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SimpleChart } from "@/components/charts/SimpleChart";
import { GitCompare, Calendar, MapPin, TrendingUp } from "lucide-react";

interface SectorData {
  name: string;
  value: number;
  color: string;
}

interface NationalBudget {
  _id: string;
  Year: number;
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

interface ProvinceBudget {
  _id: string;
  Year: number;
  Province: string;
  Agriculture?: number;
  Health?: number;
  Infrastructure?: number;
  Industry_Manufacturing?: number;
  Education?: number;
  Tourism?: number;
  Social_Security?: number;
  Energy?: number;
  Environment_Forestry?: number;
}

const Comparison = () => {
  const [comparisonType, setComparisonType] = useState<'yearly' | 'provincial' | 'national-vs-provincial'>('yearly');
  const [selectedSector, setSelectedSector] = useState('Education');
  const [selectedYear, setSelectedYear] = useState('2021');
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>(['Koshi', 'Madhesh']);
  const [nationalBudgets, setNationalBudgets] = useState<NationalBudget[]>([]);
  const [provincialBudgets, setProvincialBudgets] = useState<ProvinceBudget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Define sector mappings between national and provincial
  const nationalSectors = [
    'Education', 'Health', 'Agriculture', 'Energy', 'Infrastructure_Transport',
    'Social_Security', 'Defense', 'IT_Digital', 'Industry_Commerce', 'Provincial_Local'
  ];

  const provincialSectors = [
    'Agriculture', 'Health', 'Infrastructure', 'Industry_Manufacturing',
    'Education', 'Tourism', 'Social_Security', 'Energy', 'Environment_Forestry'
  ];

  const colors = [
    'hsl(215, 40%, 60%)', 'hsl(260, 40%, 60%)', 'hsl(305, 40%, 60%)',
    'hsl(350, 40%, 60%)', 'hsl(35, 40%, 60%)', 'hsl(80, 40%, 60%)',
    'hsl(125, 40%, 60%)', 'hsl(170, 40%, 60%)', 'hsl(215, 40%, 60%)'
  ];

  // Get unique provinces and years
  const provinces = Array.from(new Set(provincialBudgets.map(b => b.Province))).sort();
  const years = Array.from(new Set([...nationalBudgets.map(b => b.Year), ...provincialBudgets.map(b => b.Year)])).sort();

  // Fetch national and provincial budgets
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [nationalRes, provincialRes] = await Promise.all([
          axios.get("http://localhost:3001/api/nationalBudgets"),
          axios.get("http://localhost:3001/api/provinceBudgets")
        ]);

        setNationalBudgets(nationalRes.data);
        setProvincialBudgets(provincialRes.data);

        // Set default selections
        if (nationalRes.data.length > 0) {
          const latestYear = Math.max(...nationalRes.data.map((b: NationalBudget) => b.Year));
          setSelectedYear(latestYear.toString());
        }

        if (provincialRes.data.length > 0) {
          const uniqueProvinces = Array.from(new Set(provincialRes.data.map((b: ProvinceBudget) => b.Province))).sort();
          setSelectedProvinces(uniqueProvinces.slice(0, 2) as string[]); // First two provinces
        }

      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch budget data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Generate national budget trend data
  const getNationalTrendData = () => {
    return nationalBudgets
      .sort((a, b) => a.Year - b.Year)
      .map(budget => {
        const total = nationalSectors.reduce((sum, sector) => {
          return sum + (Number(budget[sector as keyof NationalBudget]) || 0);
        }, 0);
        return {
          name: budget.Year.toString(),
          value: total,
          color: 'hsl(215, 40%, 60%)'
        };
      });
  };

  // Generate provincial comparison data for selected sector
  const getProvincialComparisonData = () => {
    return selectedProvinces
      .filter(province => province) // Filter out empty provinces
      .map((province, index) => {
        const provinceData = provincialBudgets.find(
          p => p.Province === province && p.Year.toString() === selectedYear
        );

        if (!provinceData) {
          console.warn(`No data found for province: ${province} in year: ${selectedYear}`);
        }

        const value = provinceData ? Number(provinceData[selectedSector as keyof ProvinceBudget]) || 0 : 0;

        return {
          name: province,
          value,
          color: colors[index % colors.length]
        };
      })
      .filter(item => item.value > 0 || item.name); // Keep items with data or valid names
  };

  // Generate national vs provincial comparison data
  const getNationalVsProvincialData = () => {
    // Map provincial sector names to national sector names
    const sectorMapping: { [key: string]: string } = {
      'Agriculture': 'Agriculture',
      'Health': 'Health',
      'Infrastructure': 'Infrastructure_Transport', // Map Infrastructure to Infrastructure_Transport
      'Industry_Manufacturing': 'Industry_Commerce', // Map Industry_Manufacturing to Industry_Commerce
      'Education': 'Education',
      'Tourism': 'IT_Digital', // Map Tourism to IT_Digital (closest match)
      'Social_Security': 'Social_Security',
      'Energy': 'Energy',
      'Environment_Forestry': 'Provincial_Local' // Map Environment_Forestry to Provincial_Local
    };

    const nationalSector = sectorMapping[selectedSector];
    const nationalData = nationalBudgets.find(b => b.Year.toString() === selectedYear);
    const nationalValue = nationalData && nationalSector ? Number(nationalData[nationalSector as keyof NationalBudget]) || 0 : 0;

    const provincialData = selectedProvinces.map((province, index) => {
      const provinceData = provincialBudgets.find(
        p => p.Province === province && p.Year.toString() === selectedYear
      );
      const value = provinceData ? Number(provinceData[selectedSector as keyof ProvinceBudget]) || 0 : 0;
      return {
        name: province,
        value,
        color: colors[index % colors.length]
      };
    });

    return [
      { name: 'National', value: nationalValue, color: 'hsl(215, 40%, 60%)' },
      ...provincialData
    ];
  };

  // Calculate growth insights for national budget
  const getGrowthInsights = () => {
    const trendData = getNationalTrendData();
    if (trendData.length < 2) return null;

    const insights = [];

    // Calculate year-over-year growth
    for (let i = 1; i < trendData.length; i++) {
      const currentYear = trendData[i];
      const previousYear = trendData[i - 1];
      const growth = ((currentYear.value - previousYear.value) / previousYear.value) * 100;

      insights.push({
        year: currentYear.name,
        growth: growth.toFixed(1),
        value: currentYear.value,
        previousValue: previousYear.value
      });
    }

    // Find largest growth
    const largestGrowth = insights.reduce((max, insight) =>
      parseFloat(insight.growth) > parseFloat(max.growth) ? insight : max
    );

    // Calculate average growth
    const averageGrowth = insights.reduce((sum, insight) =>
      sum + parseFloat(insight.growth), 0
    ) / insights.length;

    // Determine trend
    const recentGrowth = parseFloat(insights[insights.length - 1]?.growth || '0');
    const trend = recentGrowth > averageGrowth ? 'accelerating' :
      recentGrowth < averageGrowth ? 'decelerating' : 'steady';

    return {
      insights,
      largestGrowth,
      averageGrowth: averageGrowth.toFixed(1),
      trend,
      totalGrowth: ((trendData[trendData.length - 1].value - trendData[0].value) / trendData[0].value * 100).toFixed(1)
    };
  };

  // Calculate provincial comparison insights
  const getProvincialInsights = () => {
    const provincialData = getProvincialComparisonData();
    if (provincialData.length === 0) return null;

    const totalBudget = provincialData.reduce((sum, item) => sum + item.value, 0);
    const highestProvince = provincialData.reduce((max, item) =>
      item.value > max.value ? item : max
    );
    const lowestProvince = provincialData.reduce((min, item) =>
      item.value < min.value ? item : min
    );

    const insights = provincialData.map(item => ({
      province: item.name,
      value: item.value,
      percentage: ((item.value / totalBudget) * 100).toFixed(1),
      rank: provincialData.filter(p => p.value > item.value).length + 1
    }));

    return {
      totalBudget,
      highestProvince,
      lowestProvince,
      insights,
      variance: ((highestProvince.value - lowestProvince.value) / lowestProvince.value * 100).toFixed(1)
    };
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg text-muted-foreground">Loading comparison data...</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Budget Comparison Tool
          </h1>
          <p className="text-lg text-muted-foreground">
            Compare budget allocations across years and provinces
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-8 bg-card shadow-card">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex items-center gap-2">
                <GitCompare className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Comparison Type:</span>
              </div>
              <Select value={comparisonType} onValueChange={(value: 'yearly' | 'provincial' | 'national-vs-provincial') => setComparisonType(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yearly">Year-over-Year (National)</SelectItem>
                  <SelectItem value="provincial">Provincial Comparison</SelectItem>
                  <SelectItem value="national-vs-provincial">National vs Provincial</SelectItem>
                </SelectContent>
              </Select>

              {(comparisonType === 'provincial' || comparisonType === 'national-vs-provincial') && (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Sector:</span>
                  </div>
                  <Select value={selectedSector} onValueChange={setSelectedSector}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {provincialSectors.map(sector => (
                        <SelectItem key={sector} value={sector}>
                          {sector.replace(/_/g, ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Year:</span>
              </div>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(comparisonType === 'provincial' || comparisonType === 'national-vs-provincial') && (
                <>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Provinces:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {provinces.map(province => (
                      <button
                        key={province}
                        onClick={() => {
                          if (selectedProvinces.includes(province)) {
                            setSelectedProvinces(selectedProvinces.filter(p => p !== province));
                          } else {
                            setSelectedProvinces([...selectedProvinces, province]);
                          }
                        }}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${selectedProvinces.includes(province)
                          ? 'bg-primary text-white'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          }`}
                      >
                        {province}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {comparisonType === 'yearly' ? (
            // Year-over-Year National Comparison
            <Card className="bg-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-semibold text-foreground">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  National Budget Growth Trend
                </CardTitle>
                <p className="text-sm text-muted-foreground">Total national budget over years</p>
              </CardHeader>
              <CardContent>
                <SimpleChart
                  data={getNationalTrendData()}
                  type="line"
                  height={500}
                />
              </CardContent>
            </Card>
          ) : comparisonType === 'provincial' ? (
            // Provincial Comparison
            <Card className="bg-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-semibold text-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  {selectedSector.replace(/_/g, ' ')} Budget by Province ({selectedYear})
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Provincial allocation comparison - Selected: {selectedProvinces.join(', ')}
                </p>
              </CardHeader>
              <CardContent>
                {getProvincialComparisonData().length > 0 ? (
                  <SimpleChart data={getProvincialComparisonData()} type="bar" height={500} />
                ) : (
                  <div className="flex items-center justify-center h-64 text-muted-foreground">
                    <div className="text-center">
                      <p>No data available for selected provinces and sector</p>
                      <p className="text-sm mt-2">Available provinces: {provinces.join(', ')}</p>
                      <p className="text-sm">Available sectors: {provincialSectors.join(', ')}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            // National vs Provincial Comparison
            <Card className="bg-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-semibold text-foreground">
                  <GitCompare className="h-5 w-5 text-primary" />
                  National vs Provincial - {selectedSector.replace(/_/g, ' ')} ({selectedYear})
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Comparison of national and provincial allocations
                </p>
              </CardHeader>
              <CardContent>
                {getNationalVsProvincialData().length > 1 ? (
                  <SimpleChart data={getNationalVsProvincialData()} type="bar" height={500} />
                ) : (
                  <div className="flex items-center justify-center h-64 text-muted-foreground">
                    <div className="text-center">
                      <p>No comparison data available</p>
                      <p className="text-sm mt-2">Please select provinces and ensure data exists for the selected year</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Summary Statistics */}
          <Card className="bg-card shadow-card">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">
                Summary Statistics & Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              {comparisonType === 'yearly' ? (
                <div className="space-y-4">
                  {(() => {
                    const growthInsights = getGrowthInsights();
                    if (!growthInsights) return (
                      <div className="p-4 bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-lg border border-primary/20">
                        <h3 className="font-semibold text-primary mb-2">Total National Budget</h3>
                        <p className="text-2xl font-bold text-foreground">
                          ${getNationalTrendData().reduce((sum, item) => sum + item.value, 0).toLocaleString()}M
                        </p>
                        <p className="text-sm text-muted-foreground">Across all years</p>
                      </div>
                    );

                    return (
                      <>
                        <div className="p-4 bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-lg border border-primary/20">
                          <h3 className="font-semibold text-primary mb-2">Total Budget Growth</h3>
                          <p className="text-2xl font-bold text-foreground">
                            +{growthInsights.totalGrowth}%
                          </p>
                          <p className="text-sm text-muted-foreground">From {years[0]} to {years[years.length - 1]}</p>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-accent/10 to-accent-light/10 rounded-lg border border-accent/20">
                          <h3 className="font-semibold text-accent mb-2">Growth Insights</h3>
                          <div className="space-y-2">
                            <p className="text-sm">
                              <span className="font-medium">Largest Growth:</span> {growthInsights.largestGrowth.year} (+{growthInsights.largestGrowth.growth}%)
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Average Annual Growth:</span> {growthInsights.averageGrowth}%
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Trend:</span> {growthInsights.trend.charAt(0).toUpperCase() + growthInsights.trend.slice(1)} growth
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-foreground">Year-over-Year Growth:</h4>
                          {growthInsights.insights.map((insight, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                              <span className="font-medium text-foreground">{insight.year}</span>
                              <span className={`font-bold ${parseFloat(insight.growth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {parseFloat(insight.growth) >= 0 ? '+' : ''}{insight.growth}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : comparisonType === 'provincial' ? (
                <div className="space-y-4">
                  {(() => {
                    const provincialInsights = getProvincialInsights();
                    if (!provincialInsights) return (
                      <div className="p-4 bg-gradient-to-r from-accent/10 to-accent-light/10 rounded-lg border border-accent/20">
                        <h3 className="font-semibold text-accent mb-2">Provincial Comparison</h3>
                        <p className="text-2xl font-bold text-foreground">
                          {selectedProvinces.length} Provinces
                        </p>
                        <p className="text-sm text-muted-foreground">Comparing {selectedSector.replace(/_/g, ' ')} allocations</p>
                      </div>
                    );

                    return (
                      <>
                        <div className="p-4 bg-gradient-to-r from-accent/10 to-accent-light/10 rounded-lg border border-accent/20">
                          <h3 className="font-semibold text-accent mb-2">Provincial Analysis</h3>
                          <p className="text-2xl font-bold text-foreground">
                            ${provincialInsights.totalBudget.toLocaleString()}M
                          </p>
                          <p className="text-sm text-muted-foreground">Total {selectedSector.replace(/_/g, ' ')} budget</p>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-warning/10 to-warning/20 rounded-lg border border-warning/20">
                          <h3 className="font-semibold text-warning mb-2">Key Insights</h3>
                          <div className="space-y-2">
                            <p className="text-sm">
                              <span className="font-medium">Highest:</span> {provincialInsights.highestProvince.name} (${provincialInsights.highestProvince.value.toLocaleString()}M)
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Lowest:</span> {provincialInsights.lowestProvince.name} (${provincialInsights.lowestProvince.value.toLocaleString()}M)
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Variance:</span> {provincialInsights.variance}% difference
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-foreground">Provincial Rankings:</h4>
                          {provincialInsights.insights
                            .sort((a, b) => a.rank - b.rank)
                            .map((insight, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                <div className="flex items-center gap-3">
                                  <span className="text-sm font-bold text-primary">#{insight.rank}</span>
                                  <span className="font-medium text-foreground">{insight.province}</span>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-primary">${insight.value.toLocaleString()}M</p>
                                  <p className="text-xs text-muted-foreground">{insight.percentage}%</p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="space-y-4">
                  {(() => {
                    const nationalVsProvincialData = getNationalVsProvincialData();
                    if (nationalVsProvincialData.length <= 1) return (
                      <div className="p-4 bg-gradient-to-r from-warning/10 to-warning/20 rounded-lg border border-warning/20">
                        <h3 className="font-semibold text-warning mb-2">National vs Provincial</h3>
                        <p className="text-2xl font-bold text-foreground">
                          {selectedSector.replace(/_/g, ' ')}
                        </p>
                        <p className="text-sm text-muted-foreground">Year {selectedYear}</p>
                      </div>
                    );

                    const nationalData = nationalVsProvincialData.find(item => item.name === 'National');
                    const provincialData = nationalVsProvincialData.filter(item => item.name !== 'National');
                    const totalProvincial = provincialData.reduce((sum, item) => sum + item.value, 0);
                    const nationalValue = nationalData?.value || 0;
                    const provincialShare = nationalValue > 0 ? ((totalProvincial / nationalValue) * 100).toFixed(1) : '0';

                    return (
                      <>
                        <div className="p-4 bg-gradient-to-r from-warning/10 to-warning/20 rounded-lg border border-warning/20">
                          <h3 className="font-semibold text-warning mb-2">Scale Comparison</h3>
                          <p className="text-2xl font-bold text-foreground">
                            ${nationalValue.toLocaleString()}M
                          </p>
                          <p className="text-sm text-muted-foreground">National {selectedSector.replace(/_/g, ' ')} budget</p>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-lg border border-primary/20">
                          <h3 className="font-semibold text-primary mb-2">Provincial Share</h3>
                          <p className="text-2xl font-bold text-foreground">
                            {provincialShare}%
                          </p>
                          <p className="text-sm text-muted-foreground">Of national budget allocated to provinces</p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-foreground">Detailed Breakdown:</h4>
                          {nationalVsProvincialData.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="font-medium text-foreground">{item.name}</span>
                              </div>
                              <span className="font-bold text-primary">${item.value.toLocaleString()}M</span>
                            </div>
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Comparison;

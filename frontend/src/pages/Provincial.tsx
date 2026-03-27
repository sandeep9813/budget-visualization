import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SimpleChart } from "@/components/charts/SimpleChart";
import { MapPin, Building2, TrendingUp, Calendar } from "lucide-react";

interface SectorData {
  name: string;
  value: number;
  color: string;
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

const Provincial = () => {
  const [provincialBudgets, setProvincialBudgets] = useState<ProvinceBudget[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("Koshi");
  const [selectedYear, setSelectedYear] = useState("2021");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get unique provinces and years from the data
  const provinces = Array.from(new Set(provincialBudgets.map(b => b.Province))).sort();
  const years = Array.from(new Set(provincialBudgets.map(b => b.Year))).sort();

  useEffect(() => {
    const fetchProvincialBudgets = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("http://localhost:3001/api/provinceBudgets");
        const budgets: ProvinceBudget[] = response.data;

        setProvincialBudgets(budgets);

        // Set default selections
        if (budgets.length > 0) {
          const uniqueProvinces = Array.from(new Set(budgets.map(b => b.Province))).sort();
          const uniqueYears = Array.from(new Set(budgets.map(b => b.Year))).sort();

          if (uniqueProvinces.length > 0) {
            setSelectedProvince(uniqueProvinces[0]);
          }
          if (uniqueYears.length > 0) {
            setSelectedYear(uniqueYears[uniqueYears.length - 1].toString()); // Latest year
          }
        }
      } catch (err) {
        console.error("Error fetching provincial budgets:", err);
        setError("Failed to fetch provincial budget data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProvincialBudgets();
  }, []);

  // Get selected province data for the selected year
  const selectedProvinceData = provincialBudgets.find(
    (p) => p.Province === selectedProvince && p.Year.toString() === selectedYear
  );

  // Define sector fields and colors
  const sectorFields = [
    'Agriculture', 'Health', 'Infrastructure', 'Industry_Manufacturing',
    'Education', 'Tourism', 'Social_Security', 'Energy', 'Environment_Forestry'
  ];

  const colors = [
    'hsl(215, 40%, 60%)', 'hsl(260, 40%, 60%)', 'hsl(305, 40%, 60%)',
    'hsl(350, 40%, 60%)', 'hsl(35, 40%, 60%)', 'hsl(80, 40%, 60%)',
    'hsl(125, 40%, 60%)', 'hsl(170, 40%, 60%)', 'hsl(215, 40%, 60%)'
  ];

  // Convert budget data to sector format
  const sectors: SectorData[] = selectedProvinceData
    ? sectorFields
      .map((field, index) => ({
        name: field.replace(/_/g, ' '),
        value: Number(selectedProvinceData[field as keyof ProvinceBudget] || 0),
        color: colors[index % colors.length]
      }))
      .filter(sector => sector.value > 0) // Only include sectors with budget > 0
    : [];

  // Calculate total budget safely
  const totalBudget = sectors.reduce((sum, sector) => sum + sector.value, 0);

  // Find largest sector safely
  const largestSector = sectors.length > 0
    ? sectors.reduce((prev, current) => (current.value > prev.value ? current : prev))
    : null;

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg text-muted-foreground">Loading provincial budget data...</p>
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
            Provincial Budget Analysis
          </h1>
          <p className="text-lg text-muted-foreground">
            Detailed budget breakdown by province and sector
          </p>
        </div>

        {/* Province and Year Selector */}
        <Card className="mb-8 bg-card shadow-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Province:</span>
                <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((province) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Year:</span>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-primary/10 to-primary-light/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-primary mb-1">Total Budget</p>
                  <p className="text-2xl font-bold text-foreground">${totalBudget.toLocaleString()}M</p>
                </div>
                <Building2 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-accent/10 to-accent-light/10 border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-accent mb-1">Largest Sector</p>
                  <p className="text-2xl font-bold text-foreground">{largestSector?.name || "-"}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-warning/10 to-warning/20 border-warning/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-warning mb-1">Sectors</p>
                  <p className="text-2xl font-bold text-foreground">{sectors.length}</p>
                </div>
                <MapPin className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-card shadow-card">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">
                {selectedProvince} Budget Distribution ({selectedYear})
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Sector-wise allocation breakdown
              </p>
            </CardHeader>
            <CardContent>
              {sectors.length > 0 ? (
                <SimpleChart data={sectors} type="pie" height={500} />
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  No budget data available for {selectedProvince} in {selectedYear}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-card">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">
                Sector Comparison
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Budget amounts by sector
              </p>
            </CardHeader>
            <CardContent>
              {sectors.length > 0 ? (
                <SimpleChart data={sectors} type="bar" height={500} />
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  No budget data available for {selectedProvince} in {selectedYear}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Detailed Budget Breakdown */}
        {sectors.length > 0 && (
          <Card className="bg-card shadow-card">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">
                Detailed Budget Breakdown - {selectedProvince} ({selectedYear})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sectors.map((sector, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{sector.name}</h3>
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: sector.color }} />
                    </div>
                    <p className="text-2xl font-bold text-primary">${sector.value.toLocaleString()}M</p>
                    <p className="text-sm text-muted-foreground">
                      {((sector.value / totalBudget) * 100).toFixed(1)}% of total budget
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Provincial;

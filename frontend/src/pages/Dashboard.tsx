import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SimpleChart } from "@/components/charts/SimpleChart";
import { TrendingUp, DollarSign, Users, Building2 } from "lucide-react";

interface SectorData {
  name: string;
  value: number;
  color: string;
}

interface Budget {
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

interface NationalBudget {
  year: number;
  total: number;
  sectors: SectorData[];
}

const Dashboard = () => {
  const [nationalBudget, setNationalBudget] = useState<NationalBudget | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images: string[] = [
    "https://giwmscdnone.gov.np/media/carousels/5_ccqmmbh.jpeg",
    "https://giwmscdnone.gov.np/media/carousels/1_jfyxbbf.jpeg",
    "https://giwmscdnone.gov.np/media/carousels/1_jfyxbbf.jpeg",
  ];

  // Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Fetch national budgets
  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/api/nationalBudgets");
        const budgets: Budget[] = response.data;

        if (budgets && budgets.length > 0) {
          // Get the latest year's budget
          const latestBudget = budgets.reduce((latest, current) =>
            current.Year > latest.Year ? current : latest
          );

          // Define sector fields and colors
          const sectorFields = [
            'Education', 'Health', 'Agriculture', 'Energy', 'Infrastructure_Transport',
            'Social_Security', 'Defense', 'IT_Digital', 'Industry_Commerce', 'Provincial_Local'
          ];

          const colors = [
            'hsl(215, 40%, 60%)', 'hsl(260, 40%, 60%)', 'hsl(305, 40%, 60%)',
            'hsl(350, 40%, 60%)', 'hsl(35, 40%, 60%)', 'hsl(80, 40%, 60%)',
            'hsl(125, 40%, 60%)', 'hsl(170, 40%, 60%)', 'hsl(215, 40%, 60%)',
            'hsl(260, 40%, 60%)'
          ];

          // Convert budget data to sector format
          const sectorsArray: SectorData[] = sectorFields
            .map((field, index) => ({
              name: field.replace(/_/g, ' '),
              value: Number(latestBudget[field as keyof Budget] || 0),
              color: colors[index % colors.length]
            }))
            .filter(sector => sector.value > 0); // Only include sectors with budget > 0

          const total = sectorsArray.reduce((sum, s) => sum + s.value, 0);

          setNationalBudget({
            year: latestBudget.Year,
            total,
            sectors: sectorsArray
          });
        } else {
          // Fallback to mock data if API returns empty
          setNationalBudget({
            year: 2024,
            total: 1580,
            sectors: [
              { name: "Education", value: 320, color: "hsl(215, 40%, 60%)" },
              { name: "Health", value: 280, color: "hsl(260, 40%, 60%)" },
              { name: "Infrastructure Transport", value: 250, color: "hsl(305, 40%, 60%)" },
              { name: "Defense", value: 210, color: "hsl(350, 40%, 60%)" },
              { name: "Agriculture", value: 180, color: "hsl(35, 40%, 60%)" },
              { name: "IT Digital", value: 150, color: "hsl(80, 40%, 60%)" },
              { name: "Social Security", value: 120, color: "hsl(125, 40%, 60%)" },
              { name: "Industry Commerce", value: 70, color: "hsl(170, 40%, 60%)" }
            ]
          });
        }
      } catch (err) {
        console.error("Error fetching budget data:", err);
        // Fallback to mock data if API fails
        setNationalBudget({
          year: 2024,
          total: 1580,
          sectors: [
            { name: "Education", value: 320, color: "hsl(215, 40%, 60%)" },
            { name: "Health", value: 280, color: "hsl(260, 40%, 60%)" },
            { name: "Infrastructure Transport", value: 250, color: "hsl(305, 40%, 60%)" },
            { name: "Defense", value: 210, color: "hsl(350, 40%, 60%)" },
            { name: "Agriculture", value: 180, color: "hsl(35, 40%, 60%)" },
            { name: "IT Digital", value: 150, color: "hsl(80, 40%, 60%)" },
            { name: "Social Security", value: 120, color: "hsl(125, 40%, 60%)" },
            { name: "Industry Commerce", value: 70, color: "hsl(170, 40%, 60%)" }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBudgetData();
  }, []);

  // Use fallback data if nationalBudget is not loaded yet
  const budgetData = nationalBudget || {
    year: 2024,
    total: 1580,
    sectors: [
      { name: "Education", value: 320, color: "hsl(215, 40%, 60%)" },
      { name: "Health", value: 280, color: "hsl(260, 40%, 60%)" },
      { name: "Infrastructure Transport", value: 250, color: "hsl(305, 40%, 60%)" },
      { name: "Defense", value: 210, color: "hsl(350, 40%, 60%)" },
      { name: "Agriculture", value: 180, color: "hsl(35, 40%, 60%)" },
      { name: "IT Digital", value: 150, color: "hsl(80, 40%, 60%)" },
      { name: "Social Security", value: 120, color: "hsl(125, 40%, 60%)" },
      { name: "Industry Commerce", value: 70, color: "hsl(170, 40%, 60%)" }
    ]
  };

  const { year: currentYear, total: totalBudget, sectors } = budgetData;
  const sortedSectors = [...sectors].sort((a, b) => b.value - a.value);
  const largest = sortedSectors[0];

  const statsCards = [
    {
      title: "Total Budget",
      value: `$${totalBudget.toLocaleString()}M`,
      description: `${currentYear} National Budget`,
      icon: DollarSign,
      trend: "+12.8% from last year"
    },
    {
      title: "Largest Allocation",
      value: largest?.name || "",
      description: `$${largest?.value.toLocaleString()}M allocated`,
      icon: Building2,
      trend: `${((largest?.value / totalBudget) * 100).toFixed(1)}% of total budget`
    },
    {
      title: "Citizens Engaged",
      value: "12,847",
      description: "Active feedback submissions",
      icon: Users,
      trend: "+5.2% this month"
    },
    {
      title: "Budget Growth",
      value: "+12.8%",
      description: "Year-over-year increase",
      icon: TrendingUp,
      trend: "Above inflation rate"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">

        {/* Loading indicator */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-2 text-muted-foreground">Loading budget data...</p>
          </div>
        )}

        {/* Carousel */}
        <section className="relative h-[500px] md:h-[600px] w-full my-6 rounded-lg overflow-hidden">
          <div className="absolute inset-0 overflow-hidden w-full h-full">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                alt={`Slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-black/20 z-20"></div>
          <div className="relative z-30 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white">Government Budget Dashboard</h1>
            <p className="mt-4 text-base md:text-lg text-white/90">
              Interactive visualization of {currentYear} national budget allocations
            </p>
          </div>
        </section>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <Card key={index} className="bg-card shadow-card hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
                <p className="text-xs text-accent font-medium mt-2">{stat.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-card shadow-card">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">Budget Allocation by Sector</CardTitle>
              <p className="text-sm text-muted-foreground">
                Distribution of ${totalBudget.toLocaleString()}M total budget
              </p>
            </CardHeader>
            <CardContent>
              <SimpleChart data={sectors} type="pie" height={500} />
            </CardContent>
          </Card>

          <Card className="bg-card shadow-card">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">Sector-wise Budget Breakdown</CardTitle>
              <p className="text-sm text-muted-foreground">Detailed view of budget allocations</p>
            </CardHeader>
            <CardContent>
              <SimpleChart data={sectors} type="bar" height={500} />
            </CardContent>
          </Card>
        </div>

        {/* Detailed Budget */}
        <Card className="bg-card shadow-card">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground">Detailed Budget Breakdown</CardTitle>
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
      </div>
    </div>
  );
};

export default Dashboard;

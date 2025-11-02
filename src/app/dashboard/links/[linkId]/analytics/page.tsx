
"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  MousePointerClick,
  TrendingUp,
  DollarSign,
  CircleDollarSign,
  Calendar as CalendarIcon,
  ArrowLeft,
  Link2,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Data is hardcoded for now, in a real app this would be fetched.
const linksData = [
    { id: "link1", name: "Amazon Summer Sale", link: "https://amzn.to/summer24", destinationUrl: "https://amazon.com/", status: "Active", clicks: 5200, conversions: 650, epc: "$2.37", revenue: "$12,300", createdAt: "2024-05-01", category: "product", imageUrl: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Famazon.com%2F?w=400&h=225" },
    { id: "link2", name: "Coursera Data Science", link: "https://coursera.pxf.io/ds-pro", destinationUrl: "https://coursera.org/", status: "Active", clicks: 3100, conversions: 420, epc: "$2.82", revenue: "$8,750", createdAt: "2024-04-15", category: "product", imageUrl: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fcoursera.org%2F?w=400&h=225" },
    { id: "link3", name: "NordVPN 2-Year Plan", link: "https://nordvpn.sjv.io/2y-deal", destinationUrl: "https://nordvpn.com/", status: "Paused", clicks: 2800, conversions: 350, epc: "$2.21", revenue: "$6,200", createdAt: "2024-03-20", category: "product", imageUrl: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fnordvpn.com%2F?w=400&h=225" },
    { id: "link4", name: "Skillshare Premium", link: "https://skl.sh/premium-offer", destinationUrl: "https://skillshare.com/", status: "Active", clicks: 1900, conversions: 240, epc: "$2.16", revenue: "$4,100", createdAt: "2024-03-01", category: "product", imageUrl: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fskillshare.com%2F?w=400&h=225" },
    { id: "link5", name: "Old Winter Campaign", link: "https://amzn.to/winter23", destinationUrl: "https://picsum.photos/seed/winter/400/225", status: "Archived", clicks: 800, conversions: 95, epc: "$1.88", revenue: "$1,500", createdAt: "2023-11-10", category: "product", imageUrl: "https://picsum.photos/seed/winter/400/225" },
    { id: "link6", name: "New Tech Gadgets", link: "https://example.com/tech-gadgets", destinationUrl: "https://example.com/", status: "Active", clicks: 4500, conversions: 580, epc: "$2.33", revenue: "$10,500", createdAt: "2024-05-12", category: "product", imageUrl: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fexample.com%2F?w=400&h=225" },
    { id: "link7", name: "Fitness App Subscription", link: "https://example.com/fitness-app", destinationUrl: "https://example.com/", status: "Active", clicks: 3800, conversions: 490, epc: "$2.50", revenue: "$9,500", createdAt: "2024-05-05", category: "product", imageUrl: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fexample.com%2F?w=400&h=225" },
    { id: "link8", name: "Online Mattress Store", link: "https://example.com/mattress", destinationUrl: "https://example.com/", status: "Active", clicks: 6200, conversions: 750, epc: "$3.10", revenue: "$19,220", createdAt: "2024-05-20", category: "product", imageUrl: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fexample.com%2F?w=400&h=225" },
    { id: "link9", name: "Meal Kit Delivery Service", link: "https://example.com/mealkit", destinationUrl: "https://example.com/", status: "Paused", clicks: 1500, conversions: 180, epc: "$2.90", revenue: "$4,350", createdAt: "2024-02-10", category: "product", imageUrl: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fexample.com%2F?w=400&h=225" },
    { id: "link10", name: "Web Hosting Annual Plan", link: "https://example.com/webhost", destinationUrl: "https://example.com/", status: "Active", clicks: 7100, conversions: 820, epc: "$2.75", revenue: "$19,525", createdAt: "2024-05-22", category: "product", imageUrl: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fexample.com%2F?w=400&h=225" },
    { id: "link11", name: "E-book on Productivity", link: "https://example.com/ebook", destinationUrl: "https://example.com/", status: "Archived", clicks: 500, conversions: 60, epc: "$1.50", revenue: "$750", createdAt: "2023-10-01", category: "product", imageUrl: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fexample.com%2F?w=400&h=225" },
    { id: "link12", name: "Travel Booking Site", link: "https://example.com/travel", destinationUrl: "https://example.com/", status: "Active", clicks: 9800, conversions: 1100, epc: "$3.50", revenue: "$34,300", createdAt: "2024-05-18", category: "product", imageUrl: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fexample.com%2F?w=400&h=225" },
];

const generateChartData = (base: number) => {
    return Array.from({ length: 7 }, (_, i) => ({
      date: format(addDays(new Date(), i - 6), "yyyy-MM-dd"),
      value: base + Math.floor(Math.random() * 200) - 100,
    }));
};

const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
  clicks: { label: "Clicks", color: "hsl(var(--chart-2))" },
  conversions: { label: "Conversions", color: "hsl(var(--chart-3))" },
};

export default function SingleLinkAnalyticsPage() {
  const params = useParams();
  const router = useRouter();
  const linkId = params.linkId as string;
  const linkData = linksData.find((link) => link.id === linkId);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -6),
    to: new Date(),
  });

  if (!linkData) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold">Link not found</h2>
        <p className="text-muted-foreground">The requested link could not be found.</p>
        <Button onClick={() => router.push("/dashboard/links")} className="mt-4">
          Go Back to Links
        </Button>
      </div>
    );
  }

  const kpiData = [
    { title: "Total Clicks", value: linkData.clicks.toLocaleString(), change: "+12.5% vs last period", icon: MousePointerClick, positive: true, dataKey: "clicks" },
    { title: "Conversions", value: linkData.conversions.toLocaleString(), change: "+1.2% vs last period", icon: TrendingUp, positive: true, dataKey: "conversions" },
    { title: "Total Revenue", value: linkData.revenue, change: "+20.1% vs last period", icon: DollarSign, positive: true, dataKey: "revenue"},
    { title: "Earnings Per Click", value: linkData.epc, change: "+8.1% vs last period", icon: CircleDollarSign, positive: true },
  ];

  const clicksData = generateChartData(linkData.clicks / 7);
  const conversionsData = generateChartData(linkData.conversions / 7);
  const revenueData = generateChartData(parseFloat(linkData.revenue.replace(/[^0-9.-]+/g,"")) / 7);

  const performanceData = [
    { date: "2024-05-01", clicks: 200, conversions: 24, revenue: 2400 },
    { date: "2024-05-02", clicks: 220, conversions: 26, revenue: 2600 },
    { date: "2024-05-03", clicks: 180, conversions: 21, revenue: 2100 },
    { date: "2024-05-04", clicks: 250, conversions: 30, revenue: 3000 },
    { date: "2024-05-05", clicks: 230, conversions: 28, revenue: 2800 },
    { date: "2024-05-06", clicks: 280, conversions: 32, revenue: 3200 },
    { date: "2024-05-07", clicks: 260, conversions: 31, revenue: 3100 },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
        case "Active": return "default";
        case "Paused": return "secondary";
        case "Archived": return "outline";
        default: return "default";
    }
  };

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.back()} className="shrink-0">
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-grow">
                <h1 className="text-2xl font-bold tracking-tight truncate" title={linkData.name}>
                    Analysis: {linkData.name}
                </h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                    <Badge variant={getStatusVariant(linkData.status)}>{linkData.status}</Badge>
                    <span className="flex items-center gap-1 truncate">
                        <Link2 className="h-3 w-3" />
                        <a href={linkData.link} target="_blank" rel="noopener noreferrer" className="truncate hover:underline">{linkData.link}</a>
                    </span>
                </div>
            </div>
        </div>
        <div className="w-full sm:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal sm:w-[260px]",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p
                className={cn(
                  "text-xs text-muted-foreground",
                  kpi.positive ? "text-green-600" : "text-red-600"
                )}
              >
                {kpi.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Performance over the selected period.</CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full sm:h-[350px]">
            <LineChart data={performanceData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), 'MMM d')} tickMargin={8} />
                <YAxis yAxisId="left" orientation="left" stroke="var(--color-clicks)" tickMargin={8} />
                <YAxis yAxisId="right" orientation="right" stroke="var(--color-revenue)" tickMargin={8} />
                <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                <Legend wrapperStyle={{paddingTop: 20}} />
                <Line yAxisId="left" type="monotone" dataKey="clicks" stroke="var(--color-clicks)" strokeWidth={2} name="Clicks" dot={false} />
                <Line yAxisId="left" type="monotone" dataKey="conversions" stroke="var(--color-conversions)" strokeWidth={2} name="Conversions" dot={false} />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} name="Revenue ($)" dot={false} />
            </LineChart>
            </ChartContainer>
        </CardContent>
      </Card>

    </div>
  );
}

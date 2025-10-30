
"use client";

import * as React from "react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

const kpiData = [
  {
    title: "Total Clicks",
    value: "1,235,632",
    change: "+12.5% vs last period",
    icon: MousePointerClick,
    positive: true,
  },
  {
    title: "Conversion Rate",
    value: "12.5%",
    change: "+1.2% vs last period",
    icon: TrendingUp,
    positive: true,
  },
  {
    title: "Revenue",
    value: "$45,231.89",
    change: "+20.1% vs last period",
    icon: DollarSign,
    positive: true,
  },
  {
    title: "Earnings Per Click",
    value: "$0.037",
    change: "+8.1% vs last period",
    icon: CircleDollarSign,
    positive: true,
  },
];

const clicksConversionsData = [
  { date: "2024-05-01", clicks: 2000, conversions: 240 },
  { date: "2024-05-02", clicks: 2200, conversions: 260 },
  { date: "2024-05-03", clicks: 1800, conversions: 210 },
  { date: "2024-05-04", clicks: 2500, conversions: 300 },
  { date: "2024-05-05", clicks: 2300, conversions: 280 },
  { date: "2024-05-06", clicks: 2800, conversions: 320 },
  { date: "2024-05-07", clicks: 2600, conversions: 310 },
];

const revenueByCountryData = [
  { country: "USA", revenue: 18000 },
  { country: "UK", revenue: 9500 },
  { country: "Canada", revenue: 7200 },
  { country: "Germany", revenue: 5500 },
  { country: "Australia", revenue: 4800 },
  { country: "France", revenue: 3200 },
];

const linkPerformanceData = [
    { name: "Amazon Summer Sale", clicks: 5200, conversions: 650, status: "Active", affiliateLink: "https://amzn.to/summer24" },
    { name: "Coursera Data Science", clicks: 3100, conversions: 420, status: "Active", affiliateLink: "https://coursera.pxf.io/ds-pro" },
    { name: "NordVPN 2-Year Plan", clicks: 2800, conversions: 350, status: "Paused", affiliateLink: "https://nordvpn.sjv.io/2y-deal" },
    { name: "Skillshare Premium", clicks: 1900, conversions: 240, status: "Active", affiliateLink: "https://skl.sh/premium-offer" },
    { name: "Old Winter Campaign", clicks: 800, conversions: 95, status: "Archived", affiliateLink: "https://amzn.to/winter23" },
    { name: "New Tech Gadgets", clicks: 4500, conversions: 580, status: "Active", affiliateLink: "https://example.com/tech-gadgets" },
];

const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
  clicks: { label: "Clicks", color: "hsl(var(--chart-2))" },
  conversions: { label: "Conversions", color: "hsl(var(--chart-3))" },
};

const LinkPerformanceTable = () => (
    <Table>
        <TableHeader>
            <TableRow>
            <TableHead>Link Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Affiliate Link</TableHead>
            <TableHead className="text-right">Clicks</TableHead>
            <TableHead className="text-right">Conversions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {linkPerformanceData.map((link, index) => (
            <TableRow key={index}>
                <TableCell className="font-medium">{link.name}</TableCell>
                <TableCell>
                <Badge variant={
                    link.status === "Active" ? "default" :
                    link.status === "Paused" ? "secondary" : "outline"
                }>
                    {link.status}
                </Badge>
                </TableCell>
                <TableCell>
                    <a href={link.affiliateLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate block max-w-[250px]">
                        {link.affiliateLink}
                    </a>
                </TableCell>
                <TableCell className="text-right">{link.clicks.toLocaleString()}</TableCell>
                <TableCell className="text-right">{link.conversions.toLocaleString()}</TableCell>
            </TableRow>
            ))}
        </TableBody>
    </Table>
);

const LinkPerformanceCards = () => (
    <div className="space-y-4">
        {linkPerformanceData.map((link, index) => (
            <Card key={index}>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center text-lg">
                        <span>{link.name}</span>
                        <Badge variant={
                            link.status === "Active" ? "default" :
                            link.status === "Paused" ? "secondary" : "outline"
                        }>
                            {link.status}
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex flex-col">
                        <span className="text-muted-foreground">Clicks</span>
                        <span>{link.clicks.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-muted-foreground">Conversions</span>
                        <span>{link.conversions.toLocaleString()}</span>
                    </div>
                    <div className="col-span-2">
                        <div className="text-muted-foreground">Affiliate Link</div>
                        <div className="truncate text-primary hover:underline">
                            <a href={link.affiliateLink} target="_blank" rel="noopener noreferrer">{link.affiliateLink}</a>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
);


export default function AnalyticsPage() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -6),
    to: new Date(),
  });
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Explore your campaign performance.
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full sm:w-[300px] justify-start text-left font-normal",
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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Clicks & Conversions</CardTitle>
            <CardDescription>
              Performance over the selected period.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart data={clicksConversionsData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), 'MMM d')} />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="clicks"
                  stroke="var(--color-clicks)"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="conversions"
                  stroke="var(--color-conversions)"
                  strokeWidth={2}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue by Country</CardTitle>
            <CardDescription>
              Top countries by revenue generation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={revenueByCountryData} layout="vertical">
                <CartesianGrid horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="country" type="category" width={60} />
                <Tooltip
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar
                  dataKey="revenue"
                  layout="vertical"
                  fill="var(--color-revenue)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Link Performance</CardTitle>
          <CardDescription>
            Detailed breakdown of each affiliate link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isMobile ? <LinkPerformanceCards /> : <LinkPerformanceTable />}
        </CardContent>
      </Card>
    </div>
  );
}

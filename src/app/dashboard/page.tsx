"use client";

import { useAuth } from "@/providers/auth-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, MousePointerClick, TrendingUp, Zap } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const kpiData = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    title: "Total Clicks",
    value: "1,235,632",
    change: "+180.1% from last month",
    icon: MousePointerClick,
  },
  {
    title: "Conversion Rate",
    value: "12.5%",
    change: "+19% from last month",
    icon: TrendingUp,
  },
  {
    title: "Active Campaigns",
    value: "23",
    change: "+2 since last month",
    icon: Zap,
  },
];

const chartData = [
  { date: "2024-05-20", revenue: 186 },
  { date: "2024-05-21", revenue: 305 },
  { date: "2024-05-22", revenue: 237 },
  { date: "2024-05-23", revenue: 73 },
  { date: "2024-05-24", revenue: 209 },
  { date: "2024-05-25", revenue: 214 },
  { date: "2024-05-26", revenue: 350 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
};

const topLinks = [
  {
    name: "Amazon Summer Sale",
    link: "https://amzn.to/summer24",
    clicks: "5.2k",
    revenue: "$12,300",
    status: "Active",
  },
  {
    name: "Coursera Data Science",
    link: "https://coursera.pxf.io/ds-pro",
    clicks: "3.1k",
    revenue: "$8,750",
    status: "Active",
  },
  {
    name: "NordVPN 2-Year Plan",
    link: "https://nordvpn.sjv.io/2y-deal",
    clicks: "2.8k",
    revenue: "$6,200",
    status: "Paused",
  },
  {
    name: "Skillshare Premium",
    link: "https://skl.sh/premium-offer",
    clicks: "1.9k",
    revenue: "$4,100",
    status: "Active",
  },
  {
    name: "Old Winter Campaign",
    link: "https://amzn.to/winter23",
    clicks: "800",
    revenue: "$1,500",
    status: "Archived",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  const welcomeText = user?.isGuest ? "Welcome" : "Welcome back";
  const welcomeMessage = `${welcomeText}, ${user?.displayName || "User"} 👋`;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{welcomeMessage}</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Last 7 days revenue trend.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <AreaChart
                data={chartData}
                margin={{ left: -20, right: 10, top: 5, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-revenue)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-revenue)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `$${value}`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  dataKey="revenue"
                  type="natural"
                  fill="url(#colorRevenue)"
                  stroke="var(--color-revenue)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Performing Links</CardTitle>
            <CardDescription>
              Your most successful affiliate links.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topLinks.map((link, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="font-medium">{link.name}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        {link.link}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{link.revenue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

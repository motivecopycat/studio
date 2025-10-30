
"use client";

import * as React from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  PlusCircle,
  MoreHorizontal,
  Copy,
  Edit,
  Trash2,
  PauseCircle,
  PlayCircle,
  Search,
  FileDown,
  ArrowRight,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";


const linksData = [
  {
    name: "Amazon Summer Sale",
    link: "https://amzn.to/summer24",
    status: "Active",
    clicks: 5200,
    conversions: 650,
    epc: "$2.37",
    revenue: "$12,300",
    createdAt: "2024-05-01",
  },
  {
    name: "Coursera Data Science",
    link: "https://coursera.pxf.io/ds-pro",
    status: "Active",
    clicks: 3100,
    conversions: 420,
    epc: "$2.82",
    revenue: "$8,750",
    createdAt: "2024-04-15",
  },
  {
    name: "NordVPN 2-Year Plan",
    link: "https://nordvpn.sjv.io/2y-deal",
    status: "Paused",
    clicks: 2800,
    conversions: 350,
    epc: "$2.21",
    revenue: "$6,200",
    createdAt: "2024-03-20",
  },
  {
    name: "Skillshare Premium",
    link: "https://skl.sh/premium-offer",
    status: "Active",
    clicks: 1900,
    conversions: 240,
    epc: "$2.16",
    revenue: "$4,100",
    createdAt: "2024-03-01",
  },
  {
    name: "Old Winter Campaign",
    link: "https://amzn.to/winter23",
    status: "Archived",
    clicks: 800,
    conversions: 95,
    epc: "$1.88",
    revenue: "$1,500",
    createdAt: "2023-11-10",
  },
  {
    name: "New Tech Gadgets",
    link: "https://example.com/tech-gadgets",
    status: "Active",
    clicks: 4500,
    conversions: 580,
    epc: "$2.33",
    revenue: "$10,500",
    createdAt: "2024-05-12",
  },
  {
    name: "Fitness App Subscription",
    link: "https://example.com/fitness-app",
    status: "Active",
    clicks: 3800,
    conversions: 490,
    epc: "$2.50",
    revenue: "$9,500",
    createdAt: "2024-05-05",
  },
];

const getStatusVariant = (status: string) => {
    switch (status) {
        case "Active":
        return "default";
        case "Paused":
        return "secondary";
        case "Archived":
        return "outline";
        default:
        return "default";
    }
};

const LinkActions = ({ link }: { link: (typeof linksData)[0] }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
        </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
            <Copy className="mr-2 h-4 w-4" />
            Copy Link
        </DropdownMenuItem>
        <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {link.status !== 'Paused' && (
            <DropdownMenuItem>
                <PauseCircle className="mr-2 h-4 w-4" />
                Pause
            </DropdownMenuItem>
        )}
        {link.status === 'Paused' && (
            <DropdownMenuItem>
                <PlayCircle className="mr-2 h-4 w-4" />
                Activate
            </DropdownMenuItem>
        )}
        <DropdownMenuItem className="text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            Archive
        </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);

const LinksTable = ({ links }: { links: typeof linksData }) => (
    <Table>
        <TableHeader>
        <TableRow>
            <TableHead>Link Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Clicks</TableHead>
            <TableHead className="text-right">Conversions</TableHead>
            <TableHead className="text-right">EPC</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>
            <span className="sr-only">Actions</span>
            </TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
        {links.map((link) => (
            <TableRow key={link.name}>
            <TableCell className="font-medium">{link.name}</TableCell>
            <TableCell>
                <Badge variant={getStatusVariant(link.status)}>
                {link.status}
                </Badge>
            </TableCell>
            <TableCell className="text-right">{link.clicks.toLocaleString()}</TableCell>
            <TableCell className="text-right">{link.conversions.toLocaleString()}</TableCell>
            <TableCell className="text-right">{link.epc}</TableCell>
            <TableCell className="text-right">{link.revenue}</TableCell>
            <TableCell>{link.createdAt}</TableCell>
            <TableCell>
                <LinkActions link={link} />
            </TableCell>
            </TableRow>
        ))}
        </TableBody>
    </Table>
);

const LinkCards = ({ links }: { links: typeof linksData }) => (
    <div className="space-y-4">
        {links.map((link) => (
        <Card key={link.name}>
            <CardHeader>
                <CardTitle className="flex justify-between items-start">
                    <span className="font-medium pr-4">{link.name}</span>
                    <LinkActions link={link} />
                </CardTitle>
                <CardDescription>
                    <Badge variant={getStatusVariant(link.status)}>{link.status}</Badge>
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <div className="text-muted-foreground">Clicks</div>
                    <div>{link.clicks.toLocaleString()}</div>
                </div>
                <div>
                    <div className="text-muted-foreground">Conversions</div>
                    <div>{link.conversions.toLocaleString()}</div>
                </div>
                <div className="col-span-2">
                    <div className="text-muted-foreground">Affiliate Link</div>
                    <div className="truncate text-primary hover:underline">
                        <a href={link.link} target="_blank" rel="noopener noreferrer">{link.link}</a>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="text-muted-foreground">Created At</div>
                    <div>{link.createdAt}</div>
                </div>
            </CardContent>
             <CardFooter>
                 <Link
                    href="/dashboard/analytics"
                    className="w-full flex items-center justify-center text-sm font-medium text-primary hover:underline"
                    >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </CardFooter>
        </Card>
        ))}
    </div>
);


export default function LinksPage() {
    const isMobile = useIsMobile();
    const [searchTerm, setSearchTerm] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("all");

    const filteredLinks = linksData.filter(link => {
        const matchesSearch = link.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || link.status.toLowerCase() === statusFilter;
        return matchesSearch && matchesStatus;
    });
  
    return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Link Management</h1>
            <p className="text-muted-foreground">
                Manage and track all your affiliate links.
            </p>
        </div>

        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search links..."
                            className="pl-8 sm:w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" className="flex-1 sm:flex-initial">
                            <FileDown className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                        <Button className="flex-1 sm:flex-initial">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add New Link
                        </Button>
                    </div>
                </div>
                <Tabs defaultValue="all" className="w-full pt-4" onValueChange={setStatusFilter}>
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="paused">Paused</TabsTrigger>
                        <TabsTrigger value="archived">Archived</TabsTrigger>
                    </TabsList>
                </Tabs>
            </CardHeader>
            <CardContent>
                {isMobile ? <LinkCards links={filteredLinks} /> : <LinksTable links={filteredLinks} />}
            </CardContent>
        </Card>
    </div>
  );
}

    
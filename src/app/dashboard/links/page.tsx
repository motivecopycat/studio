
"use client";

import * as React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  PlusCircle,
  MoreHorizontal,
  Copy,
  Edit,
  Trash2,
  PauseCircle,
  PlayCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";


const linksData = [
  {
    id: "link1",
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
    id: "link2",
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
    id: "link3",
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
    id: "link4",
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
    id: "link5",
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
    id: "link6",
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
    id: "link7",
    name: "Fitness App Subscription",
    link: "https://example.com/fitness-app",
    status: "Active",
    clicks: 3800,
    conversions: 490,
    epc: "$2.50",
    revenue: "$9,500",
    createdAt: "2024-05-05",
  },
  {
    id: "link8",
    name: "Online Mattress Store",
    link: "https://example.com/mattress",
    status: "Active",
    clicks: 6200,
    conversions: 750,
    epc: "$3.10",
    revenue: "$19,220",
    createdAt: "2024-05-20",
  },
  {
    id: "link9",
    name: "Meal Kit Delivery Service",
    link: "https://example.com/mealkit",
    status: "Paused",
    clicks: 1500,
    conversions: 180,
    epc: "$2.90",
    revenue: "$4,350",
    createdAt: "2024-02-10",
  },
  {
    id: "link10",
    name: "Web Hosting Annual Plan",
    link: "https://example.com/webhost",
    status: "Active",
    clicks: 7100,
    conversions: 820,
    epc: "$2.75",
    revenue: "$19,525",
    createdAt: "2024-05-22",
  },
  {
    id: "link11",
    name: "E-book on Productivity",
    link: "https://example.com/ebook",
    status: "Archived",
    clicks: 500,
    conversions: 60,
    epc: "$1.50",
    revenue: "$750",
    createdAt: "2023-10-01",
  },
  {
    id: "link12",
    name: "Travel Booking Site",
    link: "https://example.com/travel",
    status: "Active",
    clicks: 9800,
    conversions: 1100,
    epc: "$3.50",
    revenue: "$34,300",
    createdAt: "2024-05-18",
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

const LinksTable = ({ 
    links,
    selectedLinks,
    onSelectAll,
    onSelectLink,
    selectionMode,
}: { 
    links: typeof linksData,
    selectedLinks: string[],
    onSelectAll: (checked: boolean) => void,
    onSelectLink: (linkId: string, checked: boolean) => void,
    selectionMode: boolean,
}) => {
    const isAllSelected = selectedLinks.length === links.length && links.length > 0;

    return (
        <Table>
            <TableHeader>
            <TableRow>
                {selectionMode && (
                  <TableHead padding="checkbox">
                      <Checkbox
                          checked={isAllSelected}
                          onCheckedChange={(checked) => onSelectAll(Boolean(checked))}
                          aria-label="Select all"
                      />
                  </TableHead>
                )}
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
                <TableRow key={link.id} data-state={selectedLinks.includes(link.id) && "selected"}>
                {selectionMode && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedLinks.includes(link.id)}
                      onCheckedChange={(checked) => onSelectLink(link.id, Boolean(checked))}
                      aria-label={`Select link ${link.name}`}
                    />
                  </TableCell>
                )}
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
    )
};

const LinkCards = ({ 
    links,
    selectedLinks,
    onSelectLink,
    selectionMode,
}: { 
    links: typeof linksData,
    selectedLinks: string[],
    onSelectLink: (linkId: string, checked: boolean) => void,
    selectionMode: boolean,
}) => (
    <div className="space-y-4">
        {links.map((link) => (
        <Card 
            key={link.id} 
            className={selectedLinks.includes(link.id) ? 'border-primary' : ''}
            onClick={() => {
                if (selectionMode) {
                    onSelectLink(link.id, !selectedLinks.includes(link.id));
                }
            }}
        >
            <CardHeader className="flex flex-row items-start justify-between">
                <div>
                    <CardTitle className="font-medium pr-4">{link.name}</CardTitle>
                    <CardDescription>
                        <Badge variant={getStatusVariant(link.status)}>{link.status}</Badge>
                    </CardDescription>
                </div>
                <LinkActions link={link} />
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <span className="text-muted-foreground">Clicks</span>
                        <span className="font-medium">{link.clicks.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-muted-foreground">Conversions</span>
                        <span className="font-medium">{link.conversions.toLocaleString()}</span>
                    </div>
                </div>
                <div>
                    <div className="text-muted-foreground">Affiliate Link</div>
                    <div className="truncate text-primary hover:underline">
                        <a href={link.link} target="_blank" rel="noopener noreferrer">{link.link}</a>
                    </div>
                </div>
            </CardContent>
        </Card>
        ))}
    </div>
);

const AddLinkSchema = z.object({
    name: z.string().min(1, { message: "Link name is required." }),
    url: z.string().url({ message: "Please enter a valid URL." }),
    category: z.enum(["product", "movie"], {
        required_error: "You need to select a category.",
    }),
});

type AddLinkValues = z.infer<typeof AddLinkSchema>;

const AddNewLinkDialog = ({ onLinkAdded }: { onLinkAdded: (newLink: any) => void }) => {
    const [open, setOpen] = React.useState(false);
    const { toast } = useToast();

    const form = useForm<AddLinkValues>({
        resolver: zodResolver(AddLinkSchema),
        defaultValues: {
            name: "",
            url: "",
        },
    });

    const onSubmit = (data: AddLinkValues) => {
        const newLink = {
            id: `link${Date.now()}`,
            name: data.name,
            link: data.url,
            status: "Active",
            clicks: 0,
            conversions: 0,
            epc: "$0.00",
            revenue: "$0.00",
            createdAt: new Date().toISOString().split("T")[0],
            category: data.category,
        };
        onLinkAdded(newLink);
        toast({
            title: "Link Created",
            description: `The link "${data.name}" has been successfully created.`,
        });
        form.reset();
        setOpen(false);
    };
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex-1 sm:flex-initial">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Link
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Link</DialogTitle>
                    <DialogDescription>
                        Create a new affiliate link to start tracking its performance.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Link Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Amazon Summer Sale" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Affiliate URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Button 
                                            type="button" 
                                            variant={field.value === 'product' ? 'default' : 'outline'}
                                            onClick={() => field.onChange('product')}
                                        >
                                            Product
                                        </Button>
                                        <Button 
                                            type="button" 
                                            variant={field.value === 'movie' ? 'default' : 'outline'}
                                            onClick={() => field.onChange('movie')}
                                        >
                                            Movie
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Create Link</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default function LinksPage() {
    const isMobile = useIsMobile();
    const [allLinks, setAllLinks] = React.useState(linksData);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [selectedLinks, setSelectedLinks] = React.useState<string[]>([]);
    const [selectionMode, setSelectionMode] = React.useState(false);

    const handleAddNewLink = (newLink: any) => {
        setAllLinks([newLink, ...allLinks]);
    };

    const filteredLinks = allLinks.filter(link => {
        const matchesSearch = link.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || link.status.toLowerCase() === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredLinks.length / itemsPerPage);
    const paginatedLinks = filteredLinks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedLinks(paginatedLinks.map(link => link.id));
        } else {
            setSelectedLinks([]);
        }
    };
    
    const handleSelectLink = (linkId: string, checked: boolean) => {
        if (checked) {
            setSelectedLinks(prev => [...prev, linkId]);
        } else {
            setSelectedLinks(prev => prev.filter(id => id !== linkId));
        }
    };

    React.useEffect(() => {
        if (!selectionMode) {
            setSelectedLinks([]);
        }
    }, [selectionMode]);

    React.useEffect(() => {
        setSelectedLinks([]);
    }, [currentPage, itemsPerPage, statusFilter, searchTerm]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }
  
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
                        {!selectionMode ? (
                            <Button variant="outline" className="flex-1 sm:flex-initial" onClick={() => setSelectionMode(true)}>
                                Select
                            </Button>
                        ) : (
                            <>
                                <Button variant="outline" className="flex-1 sm:flex-initial" onClick={() => setSelectionMode(false)}>
                                    Cancel
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="flex-1 sm:flex-initial" disabled={selectedLinks.length === 0}>
                                            Actions
                                            <ChevronDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>Activate Selected</DropdownMenuItem>
                                        <DropdownMenuItem>Pause Selected</DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-500">Archive Selected</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        )}
                         <AddNewLinkDialog onLinkAdded={handleAddNewLink} />
                    </div>
                </div>
                <Tabs defaultValue="all" className="w-full pt-4" onValueChange={(value) => { setStatusFilter(value); setCurrentPage(1); }}>
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="paused">Paused</TabsTrigger>
                        <TabsTrigger value="archived">Archived</TabsTrigger>
                    </TabsList>
                </Tabs>
            </CardHeader>
            <CardContent>
                {isMobile ? 
                    <LinkCards 
                        links={paginatedLinks}
                        selectedLinks={selectedLinks}
                        onSelectLink={handleSelectLink}
                        selectionMode={selectionMode}
                    /> : 
                    <LinksTable 
                        links={paginatedLinks}
                        selectedLinks={selectedLinks}
                        onSelectAll={handleSelectAll}
                        onSelectLink={handleSelectLink}
                        selectionMode={selectionMode}
                    />}
            </CardContent>
            <CardFooter>
                <div className="flex items-center justify-between w-full">
                    <div className="text-sm text-muted-foreground">
                        {selectedLinks.length > 0
                        ? `${selectedLinks.length} of ${paginatedLinks.length} selected`
                        : `Showing ${paginatedLinks.length} of ${filteredLinks.length} links`}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">Rows per page</p>
                            <Select
                                value={`${itemsPerPage}`}
                                onValueChange={(value) => {
                                setItemsPerPage(Number(value));
                                setCurrentPage(1);
                                }}
                            >
                                <SelectTrigger className="h-8 w-[70px]">
                                    <SelectValue placeholder={itemsPerPage} />
                                </SelectTrigger>
                                <SelectContent side="top">
                                {[10, 20, 50, 100].map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                    </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                            Page {currentPage} of {totalPages}
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <span className="sr-only">Go to previous page</span>
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <span className="sr-only">Go to next page</span>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    </div>
  );
}

    
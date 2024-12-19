import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from "@/components/ui/use-toast";
import { StatsCards } from "@/components/reports/StatsCards";
import { SearchInput } from "@/components/reports/SearchInput";
import { ReportTable } from "@/components/reports/ReportTable";

const reportData = {
  staff: [
    { id: 1, name: "John Doe", position: "Teller", department: "Operations", joinDate: "2023-01-15" },
    { id: 2, name: "Jane Smith", position: "Manager", department: "Administration", joinDate: "2022-06-20" },
  ],
  attendance: [
    { id: 1, name: "John Doe", date: "2024-03-20", status: "Present", timeIn: "09:00 AM", timeOut: "05:00 PM" },
    { id: 2, name: "Jane Smith", date: "2024-03-20", status: "Late", timeIn: "09:30 AM", timeOut: "05:00 PM" },
  ],
  transactions: [
    { id: 1, type: "Withdrawal", amount: "$5,000", date: "2024-03-20", status: "Completed" },
    { id: 2, type: "Deposit", amount: "$10,000", date: "2024-03-20", status: "Completed" },
  ],
  vault: [
    { id: 1, staffName: "John Doe", accessTime: "2024-03-20 09:30 AM", amount: "$50,000", purpose: "Daily Cash Withdrawal" },
    { id: 2, staffName: "Jane Smith", accessTime: "2024-03-20 02:15 PM", amount: "$75,000", purpose: "Cash Deposit" },
  ],
  users: [
    { id: 1, username: "johndoe", role: "Teller", lastLogin: "2024-03-20 09:00 AM", status: "Active" },
    { id: 2, username: "janesmith", role: "Manager", lastLogin: "2024-03-20 08:45 AM", status: "Active" },
  ],
};

const Reports = () => {
  const [reportType, setReportType] = useState("staff");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const { toast } = useToast();

  const itemsPerPage = 10;
  const totalPages = Math.ceil(reportData[reportType].length / itemsPerPage);

  const handleExport = (format) => {
    toast({
      title: "Export Started",
      description: `Exporting ${reportType} report as ${format.toUpperCase()}`,
    });
  };

  const getTableHeaders = () => {
    switch (reportType) {
      case "staff":
        return ["Name", "Position", "Department", "Join Date"];
      case "attendance":
        return ["Name", "Date", "Status", "Time In", "Time Out"];
      case "transactions":
        return ["Type", "Amount", "Date", "Status"];
      case "vault":
        return ["Staff Name", "Access Time", "Amount", "Purpose"];
      case "users":
        return ["Username", "Role", "Last Login", "Status"];
      default:
        return [];
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">Reports</h1>
        <p className="text-secondary-foreground">View and generate bank reports</p>
      </header>

      <StatsCards />

      <Card className="glass-card p-6">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex gap-4 flex-1">
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="staff">Staff Report</SelectItem>
                  <SelectItem value="attendance">Attendance Report</SelectItem>
                  <SelectItem value="transactions">Transaction Report</SelectItem>
                  <SelectItem value="vault">Vault Report</SelectItem>
                  <SelectItem value="users">User Report</SelectItem>
                </SelectContent>
              </Select>
              <SearchInput value={searchTerm} onChange={setSearchTerm} />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleExport("pdf")} variant="outline">
                Export PDF
              </Button>
              <Button onClick={() => handleExport("excel")} variant="outline">
                Export Excel
              </Button>
              <Button onClick={() => handleExport("csv")} variant="outline">
                Export CSV
              </Button>
              <Button onClick={() => handleExport("word")} variant="outline">
                Export Word
              </Button>
            </div>
          </div>

          <ReportTable 
            headers={getTableHeaders()} 
            data={reportData[reportType]}
            onSort={handleSort}
          />

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => setCurrentPage(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  aria-disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Card>
    </div>
  );
};

export default Reports;

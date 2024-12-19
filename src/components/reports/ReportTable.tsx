import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";

interface ReportTableProps {
  headers: string[];
  data: any[];
  onSort: (field: string) => void;
}

export const ReportTable = ({ headers, data, onSort }: ReportTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index} onClick={() => onSort(header.toLowerCase())}>
                <div className="flex items-center gap-2 cursor-pointer">
                  {header}
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              {Object.keys(item)
                .filter((key) => key !== "id")
                .map((key, index) => (
                  <TableCell key={index}>{item[key]}</TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
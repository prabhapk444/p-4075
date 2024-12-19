import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Activity, LogIn, LogOut, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for monitoring
const monitoringData = [
  { 
    id: 1, 
    name: "John Doe", 
    officeIn: "08:30 AM",
    officeOut: "05:30 PM",
    systemLogin: "08:35 AM",
    systemLogout: "05:25 PM",
    status: "active"
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    officeIn: "09:00 AM",
    officeOut: "-",
    systemLogin: "09:05 AM",
    systemLogout: "-",
    status: "active"
  },
];

const Monitoring = () => {
  const [activeUsers, setActiveUsers] = useState(15);
  const [totalLogins, setTotalLogins] = useState(25);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">Staff Monitoring</h1>
        <p className="text-secondary-foreground">Monitor staff office presence and system access</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Currently Active</p>
              <h2 className="text-2xl font-bold">{activeUsers}</h2>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <Activity className="h-4 w-4 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Logins Today</p>
              <h2 className="text-2xl font-bold">{totalLogins}</h2>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <LogIn className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Average Hours</p>
              <h2 className="text-2xl font-bold">8.5</h2>
            </div>
            <div className="p-2 bg-purple-100 rounded-full">
              <Clock className="h-4 w-4 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="glass-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Staff Name</TableHead>
              <TableHead>Office In</TableHead>
              <TableHead>Office Out</TableHead>
              <TableHead>System Login</TableHead>
              <TableHead>System Logout</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {monitoringData.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.name}</TableCell>
                <TableCell>{record.officeIn}</TableCell>
                <TableCell>{record.officeOut}</TableCell>
                <TableCell>{record.systemLogin}</TableCell>
                <TableCell>{record.systemLogout}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    record.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {record.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Monitoring;
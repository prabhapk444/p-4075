import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Lock, Shield, Key, Clock, History } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for vault access records
const vaultAccessRecords = [
  {
    id: 1,
    staffName: "John Doe",
    accessTime: "2024-03-20 09:30 AM",
    amount: "$50,000",
    purpose: "Daily Cash Withdrawal",
  },
  {
    id: 2,
    staffName: "Jane Smith",
    accessTime: "2024-03-20 02:15 PM",
    amount: "$75,000",
    purpose: "Cash Deposit",
  },
];

const Vault = () => {
  const [timeRemaining, setTimeRemaining] = useState("");

  // Calculate time remaining until bank closing (assuming 5 PM closing time)
  useEffect(() => {
    const updateTimeRemaining = () => {
      const now = new Date();
      const closing = new Date(now);
      closing.setHours(17, 0, 0); // Set to 5 PM

      if (now > closing) {
        closing.setDate(closing.getDate() + 1); // Move to next day if past closing
      }

      const diff = closing.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeRemaining(`${hours}h ${minutes}m`);
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">Vault</h1>
        <p className="text-secondary-foreground">Secure document storage and management</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Secure Documents</p>
              <h2 className="text-2xl font-bold">128</h2>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <Lock className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Access Level</p>
              <h2 className="text-2xl font-bold">Level 3</h2>
            </div>
            <div className="p-2 bg-yellow-100 rounded-full">
              <Key className="h-4 w-4 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Security Status</p>
              <h2 className="text-2xl font-bold">Active</h2>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <Shield className="h-4 w-4 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Time Until Closing</p>
              <h2 className="text-2xl font-bold">{timeRemaining}</h2>
            </div>
            <div className="p-2 bg-purple-100 rounded-full">
              <Clock className="h-4 w-4 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="glass-card">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <History className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Recent Vault Access</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Name</TableHead>
                <TableHead>Access Time</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Purpose</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vaultAccessRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.staffName}</TableCell>
                  <TableCell>{record.accessTime}</TableCell>
                  <TableCell>{record.amount}</TableCell>
                  <TableCell>{record.purpose}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Vault;
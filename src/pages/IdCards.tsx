import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Printer, RefreshCw, Download, QrCode } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const IdCards = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    department: "",
    position: "",
    joinDate: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerateCard = () => {
    toast({
      title: "ID Card Generated",
      description: "The ID card has been generated successfully.",
    });
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">ID Card Management</h1>
        <p className="text-secondary-foreground">Generate and manage staff identification cards</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Cards</p>
              <h2 className="text-2xl font-bold">98</h2>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <CreditCard className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Prints</p>
              <h2 className="text-2xl font-bold">5</h2>
            </div>
            <div className="p-2 bg-yellow-100 rounded-full">
              <Printer className="h-4 w-4 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Due for Renewal</p>
              <h2 className="text-2xl font-bold">12</h2>
            </div>
            <div className="p-2 bg-purple-100 rounded-full">
              <RefreshCw className="h-4 w-4 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass-card p-6">
          <h2 className="text-2xl font-semibold mb-6">Generate New ID Card</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input
                id="employeeId"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                placeholder="Enter employee ID"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="Enter department"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="Enter position"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="joinDate">Join Date</Label>
              <Input
                id="joinDate"
                name="joinDate"
                type="date"
                value={formData.joinDate}
                onChange={handleInputChange}
              />
            </div>

            <Button 
              className="w-full mt-4"
              onClick={handleGenerateCard}
            >
              <Download className="mr-2 h-4 w-4" />
              Generate ID Card
            </Button>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h2 className="text-2xl font-semibold mb-6">Preview</h2>
          <div className="aspect-[85.6/53.98] bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-lg shadow-lg p-6 relative overflow-hidden">
            {/* Bank Logo Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <CreditCard className="w-64 h-64" />
            </div>
            
            {/* Security Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4=')] opacity-20" />
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg tracking-tight">{formData.name || "Employee Name"}</h3>
                  <p className="text-sm text-muted-foreground font-medium">{formData.position || "Position"}</p>
                </div>
                <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center border-2 border-white/10">
                  <CreditCard className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <QrCode className="h-24 w-24 text-primary/20" />
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="text-muted-foreground font-medium">ID: </span>
                      <span className="font-mono">{formData.employeeId || "EMP-0000"}</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground font-medium">Dept: </span>
                      {formData.department || "Department"}
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground font-medium">Joined: </span>
                      {formData.joinDate || "YYYY-MM-DD"}
                    </p>
                  </div>
                </div>
                
                <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary rounded-full opacity-20" />
                
                <div className="flex justify-between items-end text-[10px] text-muted-foreground">
                  <span>Bank Management System</span>
                  <span>Valid until: {
                    formData.joinDate 
                      ? new Date(new Date(formData.joinDate).setFullYear(new Date(formData.joinDate).getFullYear() + 1)).toLocaleDateString()
                      : "YYYY-MM-DD"
                  }</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default IdCards;
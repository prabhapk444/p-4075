import { Card } from "@/components/ui/card";
import { Users, UserPlus, UserCheck } from "lucide-react";

const Staff = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">Staff Management</h1>
        <p className="text-secondary-foreground">Manage bank staff and employees</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Staff</p>
              <h2 className="text-2xl font-bold">124</h2>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">New Hires</p>
              <h2 className="text-2xl font-bold">8</h2>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <UserPlus className="h-4 w-4 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Today</p>
              <h2 className="text-2xl font-bold">98</h2>
            </div>
            <div className="p-2 bg-purple-100 rounded-full">
              <UserCheck className="h-4 w-4 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Staff;
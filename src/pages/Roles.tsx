import { Card } from "@/components/ui/card";
import { Shield, Users, Lock } from "lucide-react";

const Roles = () => {
  return (
    <div className="space-y-8">
      <header className="space-y-2 p-4 sm:p-6 md:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary">Role Management</h1>
        <p className="text-secondary-foreground">Manage staff roles and permissions</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6 md:p-8">
        <Card className="glass-card p-4 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Roles</p>
              <h2 className="text-xl sm:text-2xl font-bold">12</h2>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <Shield className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <h2 className="text-xl sm:text-2xl font-bold">86</h2>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <Users className="h-4 w-4 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Permission Sets</p>
              <h2 className="text-xl sm:text-2xl font-bold">24</h2>
            </div>
            <div className="p-2 bg-yellow-100 rounded-full">
              <Lock className="h-4 w-4 text-yellow-600" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Roles;
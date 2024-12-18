import { Card } from "@/components/ui/card";
import { Lock, Shield, Key } from "lucide-react";

const Vault = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">Vault</h1>
        <p className="text-secondary-foreground">Secure document storage and management</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
};

export default Vault;
import { Card } from "@/components/ui/card";
import { CreditCard, Printer, RefreshCw } from "lucide-react";

const IdCards = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">ID Card Management</h1>
        <p className="text-secondary-foreground">Manage staff identification cards</p>
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
    </div>
  );
};

export default IdCards;
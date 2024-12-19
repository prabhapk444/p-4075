import { Card } from "@/components/ui/card";
import { FileText, TrendingUp, Download } from "lucide-react";

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="glass-card p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Generated Reports</p>
            <h2 className="text-2xl font-bold">45</h2>
          </div>
          <div className="p-2 bg-blue-100 rounded-full">
            <FileText className="h-4 w-4 text-blue-600" />
          </div>
        </div>
      </Card>

      <Card className="glass-card p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Monthly Growth</p>
            <h2 className="text-2xl font-bold">+12.5%</h2>
          </div>
          <div className="p-2 bg-green-100 rounded-full">
            <TrendingUp className="h-4 w-4 text-green-600" />
          </div>
        </div>
      </Card>

      <Card className="glass-card p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Downloads</p>
            <h2 className="text-2xl font-bold">238</h2>
          </div>
          <div className="p-2 bg-purple-100 rounded-full">
            <Download className="h-4 w-4 text-purple-600" />
          </div>
        </div>
      </Card>
    </div>
  );
};
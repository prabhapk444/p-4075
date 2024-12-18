import { Card } from "@/components/ui/card";
import { Calendar, Clock, UserCheck } from "lucide-react";

const Attendance = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">Attendance</h1>
        <p className="text-secondary-foreground">Track and manage staff attendance</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Present Today</p>
              <h2 className="text-2xl font-bold">24/30</h2>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <UserCheck className="h-4 w-4 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Average Check-in</p>
              <h2 className="text-2xl font-bold">8:45 AM</h2>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Monthly Overview</p>
              <h2 className="text-2xl font-bold">96%</h2>
            </div>
            <div className="p-2 bg-purple-100 rounded-full">
              <Calendar className="h-4 w-4 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Attendance;
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, UserCheck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for staff attendance
const staffAttendance = [
  { id: 1, name: "John Doe", status: "present", checkIn: "08:30 AM" },
  { id: 2, name: "Jane Smith", status: "late", checkIn: "09:45 AM" },
  { id: 3, name: "Mike Johnson", status: "absent", checkIn: "-" },
  { id: 4, name: "Sarah Wilson", status: "leave", checkIn: "-" },
];

const Attendance = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState("day");

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-500";
      case "late":
        return "bg-yellow-500";
      case "absent":
        return "bg-red-500";
      case "leave":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-primary">Attendance</h1>
          <p className="text-secondary-foreground">Track and manage staff attendance</p>
        </div>
        <Select value={view} onValueChange={setView}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day</SelectItem>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
          </SelectContent>
        </Select>
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
              <CalendarIcon className="h-4 w-4 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="glass-card p-6 lg:col-span-3">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md"
          />
        </Card>

        <Card className="glass-card p-6">
          <h3 className="font-semibold mb-4">Staff Status</h3>
          <div className="space-y-4">
            {staffAttendance.map((staff) => (
              <div key={staff.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getStatusColor(staff.status)}>
                    {staff.status}
                  </Badge>
                  <span className="text-sm font-medium">{staff.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{staff.checkIn}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t">
            <h4 className="text-sm font-semibold mb-2">Legend</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs">Present</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-xs">Late</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-xs">Absent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-xs">Leave</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Attendance;
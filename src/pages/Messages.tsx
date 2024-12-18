import { Card } from "@/components/ui/card";
import { MessageSquare, Mail, Bell } from "lucide-react";

const Messages = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">Messages</h1>
        <p className="text-secondary-foreground">Internal communication system</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Unread Messages</p>
              <h2 className="text-2xl font-bold">12</h2>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <MessageSquare className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Emails</p>
              <h2 className="text-2xl font-bold">156</h2>
            </div>
            <div className="p-2 bg-purple-100 rounded-full">
              <Mail className="h-4 w-4 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Notifications</p>
              <h2 className="text-2xl font-bold">8</h2>
            </div>
            <div className="p-2 bg-yellow-100 rounded-full">
              <Bell className="h-4 w-4 text-yellow-600" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Messages;
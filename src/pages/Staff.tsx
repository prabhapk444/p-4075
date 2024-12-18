import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, UserPlus, UserCheck, Pencil, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface StaffMember {
  id: number;
  name: string;
  email: string;
  position: string;
  department: string;
}

const Staff = () => {
  const [staff, setStaff] = useState<StaffMember[]>([
    { id: 1, name: "John Doe", email: "john@bank.com", position: "Manager", department: "Operations" },
    { id: 2, name: "Jane Smith", email: "jane@bank.com", position: "Teller", department: "Front Office" },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStaff) {
      setStaff(staff.map(s => s.id === editingStaff.id ? { ...formData, id: editingStaff.id } : s));
      toast({ title: "Staff member updated successfully" });
    } else {
      setStaff([...staff, { ...formData, id: staff.length + 1 }]);
      toast({ title: "Staff member added successfully" });
    }
    setIsOpen(false);
    setEditingStaff(null);
    setFormData({ name: "", email: "", position: "", department: "" });
  };

  const handleEdit = (staffMember: StaffMember) => {
    setEditingStaff(staffMember);
    setFormData(staffMember);
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    setStaff(staff.filter(s => s.id !== id));
    toast({ title: "Staff member deleted successfully" });
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-primary">Staff Management</h1>
          <p className="text-secondary-foreground">Manage bank staff and employees</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingStaff ? "Edit Staff Member" : "Add New Staff Member"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Input
                  placeholder="Position"
                  value={formData.position}
                  onChange={e => setFormData({ ...formData, position: e.target.value })}
                  required
                />
              </div>
              <div>
                <Input
                  placeholder="Department"
                  value={formData.department}
                  onChange={e => setFormData({ ...formData, department: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingStaff ? "Update" : "Add"} Staff Member
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Staff</p>
              <h2 className="text-2xl font-bold">{staff.length}</h2>
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

      <Card className="glass-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.position}</TableCell>
                <TableCell>{member.department}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(member)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(member.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Staff;
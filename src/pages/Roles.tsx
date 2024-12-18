import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Users, Lock, Pencil, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
}

const Roles = () => {
  const [roles, setRoles] = useState<Role[]>([
    { 
      id: 1, 
      name: "Administrator", 
      description: "Full system access", 
      permissions: ["all"]
    },
    { 
      id: 2, 
      name: "Teller", 
      description: "Front desk operations", 
      permissions: ["transactions", "customer-service"]
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const roleData = {
      name: formData.name,
      description: formData.description,
      permissions: formData.permissions.split(",").map(p => p.trim()),
    };

    if (editingRole) {
      setRoles(roles.map(r => r.id === editingRole.id ? { ...roleData, id: editingRole.id } : r));
      toast({ title: "Role updated successfully" });
    } else {
      setRoles([...roles, { ...roleData, id: roles.length + 1 }]);
      toast({ title: "Role added successfully" });
    }
    setIsOpen(false);
    setEditingRole(null);
    setFormData({ name: "", description: "", permissions: "" });
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions.join(", "),
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    setRoles(roles.filter(r => r.id !== id));
    toast({ title: "Role deleted successfully" });
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center p-4 sm:p-6 md:p-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">Role Management</h1>
          <p className="text-secondary-foreground">Manage staff roles and permissions</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Shield className="mr-2 h-4 w-4" />
              Add Role
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingRole ? "Edit Role" : "Add New Role"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Role Name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Textarea
                  placeholder="Role Description"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <Input
                  placeholder="Permissions (comma-separated)"
                  value={formData.permissions}
                  onChange={e => setFormData({ ...formData, permissions: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingRole ? "Update" : "Add"} Role
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6 md:p-8">
        <Card className="glass-card p-4 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Roles</p>
              <h2 className="text-xl sm:text-2xl font-bold">{roles.length}</h2>
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

      <Card className="glass-card mx-4 sm:mx-6 md:mx-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="font-medium">{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>{role.permissions.join(", ")}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(role)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(role.id)}>
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

export default Roles;
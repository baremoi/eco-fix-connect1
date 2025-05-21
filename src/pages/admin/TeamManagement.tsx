
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Search, UserPlus, Edit2, Trash2 } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "tradesperson" | "admin";
  status: "active" | "inactive";
  joinDate: string;
}

export default function TeamManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "u1",
      name: "John Smith",
      email: "john@example.com",
      role: "tradesperson",
      status: "active",
      joinDate: "2024-04-18",
    },
    {
      id: "u2",
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "user",
      status: "active",
      joinDate: "2024-04-15",
    },
    {
      id: "u3",
      name: "Robert Davis",
      email: "robert@example.com",
      role: "user",
      status: "inactive",
      joinDate: "2024-04-10",
    },
    {
      id: "u4",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "tradesperson",
      status: "active",
      joinDate: "2024-04-05",
    },
    {
      id: "u5",
      name: "Michael Brown",
      email: "michael@example.com",
      role: "admin",
      status: "active",
      joinDate: "2024-03-28",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "user" as "user" | "tradesperson" | "admin",
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = () => {
    const id = `u${users.length + 1}`;
    const newUserData = {
      id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "active" as "active",
      joinDate: new Date().toISOString().split("T")[0],
    };

    setUsers([...users, newUserData]);
    toast.success("User added successfully");
    setIsUserDialogOpen(false);
    setNewUser({
      name: "",
      email: "",
      role: "user",
    });
  };

  const handleUpdateUser = () => {
    if (!selectedUser) return;

    setUsers(
      users.map((user) =>
        user.id === selectedUser.id ? selectedUser : user
      )
    );
    toast.success("User updated successfully");
    setIsUserDialogOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    
    setUsers(users.filter((user) => user.id !== selectedUser.id));
    toast.success("User deleted successfully");
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setIsUserDialogOpen(true);
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Team Management</h1>
        <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedUser ? "Edit User" : "Add New User"}</DialogTitle>
              <DialogDescription>
                {selectedUser
                  ? "Update the user details below."
                  : "Enter the details for the new user."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name">Name</label>
                <Input
                  id="name"
                  value={selectedUser ? selectedUser.name : newUser.name}
                  onChange={(e) =>
                    selectedUser
                      ? setSelectedUser({ ...selectedUser, name: e.target.value })
                      : setNewUser({ ...newUser, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={selectedUser ? selectedUser.email : newUser.email}
                  onChange={(e) =>
                    selectedUser
                      ? setSelectedUser({ ...selectedUser, email: e.target.value })
                      : setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="role">Role</label>
                <Select
                  value={selectedUser ? selectedUser.role : newUser.role}
                  onValueChange={(value: "user" | "tradesperson" | "admin") =>
                    selectedUser
                      ? setSelectedUser({ ...selectedUser, role: value })
                      : setNewUser({ ...newUser, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="tradesperson">Service Provider</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {selectedUser && (
                <div className="grid gap-2">
                  <label htmlFor="status">Status</label>
                  <Select
                    value={selectedUser.status}
                    onValueChange={(value: "active" | "inactive") =>
                      setSelectedUser({ ...selectedUser, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={selectedUser ? handleUpdateUser : handleAddUser}>
                {selectedUser ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.role === "admin"
                              ? "default"
                              : user.role === "tradesperson"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {user.role === "tradesperson"
                            ? "Service Provider"
                            : user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.status === "active" ? "success" : "destructive"}
                        >
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(user)}
                        >
                          <Edit2 className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteDialog(user)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

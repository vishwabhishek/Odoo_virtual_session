import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Search, Ban, Eye, UserCheck } from 'lucide-react';
import { useToast } from '../components/ui/toast';

const UserManagement = () => {
  const [search, setSearch] = useState('');
  const { showToast } = useToast();
  const users = [
    { username: 'Ethan Walker', email: 'ethan.walker@email.com', joinDate: '2023-01-15', status: 'Active' },
    { username: 'Olivia Hayes', email: 'olivia.hayes@email.com', joinDate: '2023-02-20', status: 'Active' },
    { username: 'Caleb Reed', email: 'caleb.reed@email.com', joinDate: '2023-03-10', status: 'Banned' },
  ];
  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );
  const handleBan = (user) => {
    showToast({ title: 'User Banned', description: `${user.username} has been banned.`, variant: 'destructive' });
  };
  const handleUnban = (user) => {
    showToast({ title: 'User Unbanned', description: `${user.username} has been unbanned.` });
  };
  const handleView = (user) => {
    showToast({ title: 'View Profile', description: `Viewing profile for ${user.username}` });
  };
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary mb-1">User Management</h2>
        <p className="text-muted-foreground">Manage users, ban/unban, and view profiles.</p>
      </div>
      <div className="max-w-xs mb-2 flex items-center gap-2">
        <input
          type="text"
          className="w-full px-3 py-2 border rounded bg-background text-foreground"
          placeholder="Search users..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search users"
        />
        <Search className="w-5 h-5 text-muted-foreground" />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'Banned' ? 'destructive' : 'default'}>{user.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {user.status === 'Banned' ? (
                          <Button size="sm" variant="default" onClick={() => handleUnban(user)}>
                            <UserCheck className="w-4 h-4 mr-1" />Unban
                          </Button>
                        ) : (
                          <Button size="sm" variant="destructive" onClick={() => handleBan(user)}>
                            <Ban className="w-4 h-4 mr-1" />Ban
                          </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={() => handleView(user)}>
                          <Eye className="w-4 h-4 mr-1" />View Profile
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;


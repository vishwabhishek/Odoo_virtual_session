import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Check, X } from 'lucide-react';
import { useToast } from '../components/ui/toast';

const SkillModeration = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [search, setSearch] = useState('');
  const { showToast } = useToast();

  const pendingSkills = [
    { skillTag: 'Data Analysis', submitter: 'Sophia Clark', description: 'Analyzing data sets to identify trends and patterns.' },
    { skillTag: 'Graphic Design', submitter: 'Ethan Carter', description: 'Creating visual concepts using computer software.' },
    { skillTag: 'Project Management', submitter: 'Olivia Bennett', description: 'Planning, organizing, and managing resources to bring about the successful completion of specific project goals and objectives.' },
    { skillTag: 'Digital Marketing', submitter: 'Liam Harper', description: 'Promoting products or services using digital channels.' },
    { skillTag: 'Web Development', submitter: 'Ava Foster', description: 'Building and maintaining websites.' },
  ];

  const allSkills = [...pendingSkills];

  const filteredSkills = (skills) =>
    skills.filter((s) =>
      s.skillTag.toLowerCase().includes(search.toLowerCase()) ||
      s.submitter.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
    );

  const handleApprove = (skill) => {
    showToast({ title: 'Skill Approved', description: `${skill.skillTag} by ${skill.submitter} approved!` });
  };
  const handleReject = (skill) => {
    showToast({ title: 'Skill Rejected', description: `${skill.skillTag} by ${skill.submitter} rejected.`, variant: 'destructive' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary mb-1">Skills Moderation</h2>
        <p className="text-muted-foreground">Review and moderate skill submissions from users.</p>
      </div>
      <div className="max-w-xs mb-2">
        <input
          type="text"
          className="w-full px-3 py-2 border rounded bg-background text-foreground"
          placeholder="Search skills..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search skills"
        />
      </div>
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Skills</TabsTrigger>
          <TabsTrigger value="all">All Skills</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Skills for Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Skill Tag</TableHead>
                      <TableHead>Submitter</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSkills(pendingSkills).map((skill, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{skill.skillTag}</TableCell>
                        <TableCell>{skill.submitter}</TableCell>
                        <TableCell className="max-w-md"><p className="truncate">{skill.description}</p></TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="default" onClick={() => handleApprove(skill)}>
                              <Check className="w-4 h-4 mr-1" />Approve
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleReject(skill)}>
                              <X className="w-4 h-4 mr-1" />Reject
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
        </TabsContent>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Skill Tag</TableHead>
                      <TableHead>Submitter</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSkills(allSkills).map((skill, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{skill.skillTag}</TableCell>
                        <TableCell>{skill.submitter}</TableCell>
                        <TableCell className="max-w-md"><p className="truncate">{skill.description}</p></TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="destructive" onClick={() => handleReject(skill)}>
                              <X className="w-4 h-4 mr-1" />Remove
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillModeration;

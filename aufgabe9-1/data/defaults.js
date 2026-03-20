export const users = [
  { id: '1', email: 'julian@notmy.mail', password: 'julian' },
  { id: '2', email: 'admin@notmy.mail', password: 'admin' },
];

export const tasks = [
  {
    id: crypto.randomUUID(),
    title: 'Test Task',
    description: 'yoyoy',
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 60000).toISOString(),
    completedAt: '',
  },
];

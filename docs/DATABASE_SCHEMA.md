# TaskFlow Database Schema

## Overview

TaskFlow uses a progressive data storage strategy:
- **Phase 1**: AsyncStorage (localStorage)
- **Phase 2**: SQLite for local persistence
- **Phase 3**: Firebase Firestore for real-time sync

## Collections / Tables

### Users
```typescript
users: {
  id: string (UUID)
  email: string
  displayName: string
  avatar?: string
  role: 'personal' | 'team' | 'admin'
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Tasks
```typescript
tasks: {
  id: string (UUID)
  userId: string (FK)
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in-progress' | 'review' | 'completed'
  dueDate?: timestamp
  reminderTime?: timestamp
  tags?: string[]
  estimatedHours?: number
  actualHours?: number
  createdAt: timestamp
  updatedAt: timestamp
  archivedAt?: timestamp
}
```

### Notes
```typescript
notes: {
  id: string (UUID)
  userId: string (FK)
  title: string
  content: string (rich text)
  category: 'personal' | 'work' | 'meeting' | 'ideas'
  color?: string
  isPinned: boolean
  tags?: string[]
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Calendar Events
```typescript
events: {
  id: string (UUID)
  userId: string (FK)
  title: string
  description?: string
  startDate: timestamp
  endDate: timestamp
  isAllDay: boolean
  location?: string
  reminders?: number[] (minutes before)
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Reminders
```typescript
reminders: {
  id: string (UUID)
  userId: string (FK)
  taskId?: string (FK)
  noteId?: string (FK)
  title: string
  description?: string
  dueDate: timestamp
  notificationTime: timestamp
  isCompleted: boolean
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Productivity Metrics
```typescript
metrics: {
  id: string (UUID)
  userId: string (FK)
  date: timestamp
  tasksCompleted: number
  tasksTotal: number
  hoursWorked: number
  focusSessionsCompleted: number
  notesCreated: number
}
```

## Relationships

```
Users
├── Tasks (1-N)
├── Notes (1-N)
├── Events (1-N)
├── Reminders (1-N)
└── Metrics (1-N)

Task
├── Reminders (1-N)
└── Tags (N-N)

Note
├── Tags (N-N)
└── Category (N-1)

Event
├── Reminders (1-N)
└── Attendees (N-N) [Phase 2]
```

## Indexes (SQLite)

```sql
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_events_user_id ON events(user_id);
CREATE INDEX idx_reminders_user_id ON reminders(user_id);
```

## Migration Strategy

### Phase 1 → Phase 2
- Export data from AsyncStorage
- Initialize SQLite database
- Import data with migrations
- Test data integrity

### Phase 2 → Phase 3
- Set up Firebase project
- Create Firestore collections
- Implement sync service
- Test real-time synchronization
- Handle offline scenarios

## Data Sync Strategy (Phase 2+)

1. **Local-First Approach**:
   - All changes saved locally first
   - UI updates immediately
   - Background sync to cloud

2. **Conflict Resolution**:
   - Last-write-wins for simple conflicts
   - Manual resolution UI for complex conflicts
   - Version tracking with timestamps

3. **Offline Support**:
   - Queue changes locally
   - Sync when connectivity restored
   - Handle edge cases
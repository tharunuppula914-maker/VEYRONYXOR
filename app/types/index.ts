// Authentication Types
export interface User {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Task Types
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'pending' | 'in-progress' | 'review' | 'completed';

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: Date;
  reminderTime?: Date;
  tags?: string[];
  estimatedHours?: number;
  actualHours?: number;
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: Date;
}

// Note Types
export type NoteCategory = 'personal' | 'work' | 'meeting' | 'ideas';

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  category: NoteCategory;
  color?: string;
  isPinned: boolean;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Calendar Event Types
export interface CalendarEvent {
  id: string;
  userId: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  isAllDay: boolean;
  location?: string;
  reminders?: number[];
  createdAt: Date;
  updatedAt: Date;
}

// Reminder Types
export interface Reminder {
  id: string;
  userId: string;
  taskId?: string;
  noteId?: string;
  title: string;
  description?: string;
  dueDate: Date;
  notificationTime: Date;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Analytics Types
export interface DailyProductivity {
  date: Date;
  tasksCompleted: number;
  tasksTotal: number;
  hoursWorked: number;
  completionRate: number;
}

export interface ProductivityStats {
  daily: DailyProductivity[];
  weekly: DailyProductivity[];
  monthly: DailyProductivity[];
  overallCompletionRate: number;
}

// Notification Types
export interface NotificationPayload {
  id: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  timestamp: Date;
}

// Theme Types
export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  text: string;
  textSecondary: string;
  background: string;
  card: string;
  border: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
}
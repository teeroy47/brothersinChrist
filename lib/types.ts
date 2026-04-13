export type Role = "member" | "group_leader" | "level_leader" | "admin";

export type LevelId = "level-1" | "level-2" | "level-3" | "level-4" | "level-5";
export type PostType = "Teaching" | "Testimony" | "Announcement" | "Question" | "Accountability Prompt" | "Devotion";
export type AttendanceStatus = "present" | "absent" | "excused" | "late";

export interface AuditFields {
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  status?: "active" | "inactive" | "draft" | "published" | "flagged";
}

export interface Profile extends AuditFields {
  fullName: string;
  firstName: string;
  email: string;
  phone: string;
  city: string;
  ageRange: string;
  church: string;
  occupation: string;
  maritalStatus: string;
  testimony?: string;
  spiritualGoals?: string[];
  fitnessGoals?: string[];
}

export interface User extends AuditFields {
  id: string;
  role: Role;
  levelId: LevelId;
  groupId: string;
  accountabilityPartnerId?: string;
  leaderIds: string[];
  profile: Profile;
  consistencyScore: number;
  recentActivity: string;
}

export interface Level extends AuditFields {
  id: LevelId;
  title: string;
  description: string;
  requirements: string[];
  expectations: string[];
  curriculum: string[];
  meetings: string[];
  growthMarkers: string[];
  leaderIds: string[];
}

export interface Group extends AuditFields {
  id: string;
  name: string;
  leaderId: string;
  memberIds: string[];
  nextMeeting: string;
  summary: string;
  prayerRequests: string[];
  encouragements: string[];
}

export interface Event extends AuditFields {
  id: string;
  title: string;
  when: string;
  category: "Monday Meeting" | "Thursday Meeting" | "Group Gathering" | "Special Session" | "Physical Event";
  audience: "all" | "level" | "group" | "leaders";
  groupId?: string;
  levelId?: LevelId;
  location: string;
}

export interface Post extends AuditFields {
  id: string;
  type: PostType;
  title: string;
  excerpt: string;
  body: string;
  authorId: string;
  pinned?: boolean;
  visibility: "all" | "leaders" | "level";
  levelId?: LevelId;
  tags: string[];
  commentsCount: number;
}

export interface CheckInQuestion {
  id: string;
  prompt: string;
  type: "boolean" | "rating" | "text";
}

export interface CheckInTemplate extends AuditFields {
  id: string;
  title: string;
  audience: "all" | "group" | "level";
  questions: CheckInQuestion[];
}

export interface CheckInSubmission extends AuditFields {
  id: string;
  userId: string;
  templateId: string;
  weekLabel: string;
  answers: Record<string, string | number | boolean>;
  flags: string[];
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  eventId: string;
  status: AttendanceStatus;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

export interface ProgressMetric {
  id: string;
  label: string;
  value: number;
  target: number;
  tone: "steady" | "warning" | "strong";
}

export interface LeaderReport extends AuditFields {
  id: string;
  title: string;
  summary: string;
  memberIdsNeedingFollowUp: string[];
  prayerNeeds: string[];
}

export interface NotificationItem extends AuditFields {
  id: string;
  title: string;
  body: string;
  audience: "all" | "leaders" | "member";
}

export interface SessionUser {
  id: string;
  name: string;
  role: Role;
}

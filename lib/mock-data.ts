import type {
  AttendanceRecord,
  CheckInSubmission,
  CheckInTemplate,
  Event,
  Group,
  LeaderReport,
  Level,
  NotificationItem,
  Post,
  ProgressMetric,
  Role,
  SessionUser,
  User
} from "@/lib/types";

const now = "2026-04-05T08:00:00.000Z";

export const levels: Level[] = [
  {
    id: "level-1",
    title: "Level 1: New Believers",
    description: "Foundations in prayer, Scripture, brotherhood, and personal surrender to Christ.",
    requirements: ["Attend weekly discipleship meeting", "Complete foundational devotion plan", "Submit weekly check-in"],
    expectations: ["Pray daily", "Read the Bible at least four times a week", "Stay connected to a leader"],
    curriculum: ["Identity in Christ", "Prayer habits", "Repentance and obedience"],
    meetings: ["Monday Foundations", "Thursday Prayer Circle"],
    growthMarkers: ["Consistent devotion", "Visible humility", "Reliable attendance"],
    leaderIds: ["u-2", "u-3"],
    createdAt: now,
    updatedAt: now,
    status: "active"
  },
  {
    id: "level-2",
    title: "Level 2: Rooted",
    description: "Growing into consistency, Scripture understanding, and disciplined living.",
    requirements: ["Maintain attendance", "Serve in one ministry area", "Complete Rooted teaching track"],
    expectations: ["Lead personal devotion rhythm", "Show accountability", "Practice bodily discipline"],
    curriculum: ["Spiritual discipline", "Renewing the mind", "Personal holiness"],
    meetings: ["Rooted Circle", "Thursday Prayer Circle"],
    growthMarkers: ["Consistency", "Serving heart", "Teachability"],
    leaderIds: ["u-3"],
    createdAt: now,
    updatedAt: now,
    status: "active"
  },
  {
    id: "level-3",
    title: "Level 3: Steady",
    description: "Stable discipleship marked by reliability, inner strength, and reproducible habits.",
    requirements: ["Disciple one younger brother", "Serve monthly", "Complete steady growth review"],
    expectations: ["Keep prayer journal", "Follow through on group commitments", "Model faithfulness"],
    curriculum: ["Stewardship", "Discipling men", "Emotional maturity"],
    meetings: ["Steady Men Forum"],
    growthMarkers: ["Dependability", "Brotherly care", "Emerging leadership"],
    leaderIds: ["u-4"],
    createdAt: now,
    updatedAt: now,
    status: "active"
  },
  {
    id: "level-4",
    title: "Level 4: Serving",
    description: "Men who serve, influence, and help carry the culture of the brotherhood.",
    requirements: ["Lead a prayer moment", "Track follow-up for others", "Complete serving module"],
    expectations: ["Model discipline", "Build unity", "Carry responsibility well"],
    curriculum: ["Servant leadership", "Conflict handling", "Kingdom responsibility"],
    meetings: ["Serving Huddle"],
    growthMarkers: ["Initiative", "Care for others", "Visible maturity"],
    leaderIds: ["u-4"],
    createdAt: now,
    updatedAt: now,
    status: "active"
  },
  {
    id: "level-5",
    title: "Level 5: Leaders",
    description: "Men entrusted with forming other men through oversight, prayer, and wise leadership.",
    requirements: ["Oversee a group or level", "Submit leader reports", "Mentor emerging leaders"],
    expectations: ["Disciple consistently", "Guard doctrine", "Shepherd with humility"],
    curriculum: ["Leadership theology", "Oversight systems", "Multiplication"],
    meetings: ["Leaders Council"],
    growthMarkers: ["Oversight", "Fruitfulness", "Multiplication"],
    leaderIds: ["u-4"],
    createdAt: now,
    updatedAt: now,
    status: "active"
  }
];

export const users: User[] = [
  {
    id: "u-1",
    role: "member",
    levelId: "level-2",
    groupId: "g-1",
    accountabilityPartnerId: "u-5",
    leaderIds: ["u-2", "u-3"],
    consistencyScore: 82,
    recentActivity: "Completed last week's check-in and attended Thursday prayer.",
    profile: {
      fullName: "Tawanda Moyo",
      firstName: "Tawanda",
      email: "tawanda@bic.app",
      phone: "+263 77 123 4567",
      city: "Harare",
      ageRange: "25-34",
      church: "Kingdom Harvest Fellowship",
      occupation: "Project Coordinator",
      maritalStatus: "Single",
      testimony: "Learning to live with daily discipline and Scripture-led decisions.",
      spiritualGoals: ["Build stronger prayer rhythm", "Memorise Scripture weekly"],
      fitnessGoals: ["Train three times a week"],
      createdAt: now,
      updatedAt: now,
      status: "active"
    },
    createdAt: now,
    updatedAt: now,
    status: "active"
  },
  {
    id: "u-2",
    role: "group_leader",
    levelId: "level-2",
    groupId: "g-1",
    leaderIds: ["u-4"],
    consistencyScore: 91,
    recentActivity: "Posted a group encouragement and reviewed struggling members.",
    profile: {
      fullName: "Simba Ndlovu",
      firstName: "Simba",
      email: "simba@bic.app",
      phone: "+263 77 222 1111",
      city: "Bulawayo",
      ageRange: "35-44",
      church: "Redeemed Men Fellowship",
      occupation: "Business Analyst",
      maritalStatus: "Married",
      createdAt: now,
      updatedAt: now,
      status: "active"
    },
    createdAt: now,
    updatedAt: now,
    status: "active"
  },
  {
    id: "u-3",
    role: "level_leader",
    levelId: "level-2",
    groupId: "g-2",
    leaderIds: ["u-4"],
    consistencyScore: 93,
    recentActivity: "Published a Rooted teaching and checked level engagement.",
    profile: {
      fullName: "Bongani Dube",
      firstName: "Bongani",
      email: "bongani@bic.app",
      phone: "+263 77 000 4545",
      city: "Harare",
      ageRange: "35-44",
      church: "Antioch Fellowship",
      occupation: "Operations Lead",
      maritalStatus: "Married",
      createdAt: now,
      updatedAt: now,
      status: "active"
    },
    createdAt: now,
    updatedAt: now,
    status: "active"
  },
  {
    id: "u-4",
    role: "admin",
    levelId: "level-5",
    groupId: "g-3",
    leaderIds: [],
    consistencyScore: 95,
    recentActivity: "Reviewed analytics and posted the monthly leadership brief.",
    profile: {
      fullName: "Pastor Tendai Chirwa",
      firstName: "Tendai",
      email: "tendai@bic.app",
      phone: "+263 77 333 9999",
      city: "Johannesburg",
      ageRange: "45-54",
      church: "Brothers In Christ Global",
      occupation: "Ministry Director",
      maritalStatus: "Married",
      createdAt: now,
      updatedAt: now,
      status: "active"
    },
    createdAt: now,
    updatedAt: now,
    status: "active"
  },
  {
    id: "u-5",
    role: "member",
    levelId: "level-2",
    groupId: "g-1",
    accountabilityPartnerId: "u-1",
    leaderIds: ["u-2", "u-3"],
    consistencyScore: 74,
    recentActivity: "Missed the Monday meeting but connected with his accountability partner.",
    profile: {
      fullName: "Keith Mlambo",
      firstName: "Keith",
      email: "keith@bic.app",
      phone: "+263 77 555 4040",
      city: "Gweru",
      ageRange: "18-24",
      church: "Grace House",
      occupation: "Student",
      maritalStatus: "Single",
      createdAt: now,
      updatedAt: now,
      status: "active"
    },
    createdAt: now,
    updatedAt: now,
    status: "active"
  }
];

export const groups: Group[] = [
  {
    id: "g-1",
    name: "Lionhearted Circle",
    leaderId: "u-2",
    memberIds: ["u-1", "u-2", "u-5"],
    nextMeeting: "2026-04-07T18:30:00.000Z",
    summary: "A close discipleship group focused on consistency, Scripture, and honest accountability.",
    prayerRequests: ["Strength for one brother facing job instability", "Healing for a family member"],
    encouragements: ["Stay faithful in the small disciplines.", "Grace and truth can shape strong men."],
    createdAt: now,
    updatedAt: now,
    status: "active"
  },
  {
    id: "g-2",
    name: "Steadfast Company",
    leaderId: "u-3",
    memberIds: ["u-3"],
    nextMeeting: "2026-04-08T19:00:00.000Z",
    summary: "Men being rooted in doctrine, prayer, and disciplined leadership at home and work.",
    prayerRequests: ["Wisdom for fathers and husbands"],
    encouragements: ["Lead from prayer before instruction."],
    createdAt: now,
    updatedAt: now,
    status: "active"
  },
  {
    id: "g-3",
    name: "Leaders Table",
    leaderId: "u-4",
    memberIds: ["u-4"],
    nextMeeting: "2026-04-10T05:45:00.000Z",
    summary: "Operational and spiritual oversight for the BIC brotherhood.",
    prayerRequests: ["Discernment for expansion"],
    encouragements: ["Steward men with patience and clarity."],
    createdAt: now,
    updatedAt: now,
    status: "active"
  }
];

export const events: Event[] = [
  {
    id: "e-1",
    title: "Monday Men of Prayer",
    when: "2026-04-06T17:30:00.000Z",
    category: "Monday Meeting",
    audience: "all",
    location: "Main Hall + Online",
    createdAt: now,
    updatedAt: now,
    status: "published"
  },
  {
    id: "e-2",
    title: "Lionhearted Weekly Group Check-In",
    when: "2026-04-07T18:30:00.000Z",
    category: "Group Gathering",
    audience: "group",
    groupId: "g-1",
    location: "WhatsApp call",
    createdAt: now,
    updatedAt: now,
    status: "published"
  },
  {
    id: "e-3",
    title: "Rooted Level Teaching Night",
    when: "2026-04-09T18:00:00.000Z",
    category: "Thursday Meeting",
    audience: "level",
    levelId: "level-2",
    location: "Community Chapel",
    createdAt: now,
    updatedAt: now,
    status: "published"
  }
];

export const posts: Post[] = [
  {
    id: "p-1",
    type: "Devotion",
    title: "Strength Before Sunrise",
    excerpt: "The hidden disciplines of prayer and Scripture form public strength.",
    body: "Rise before the noise. Sit before the Lord. The man who bows before God can stand before men with clean strength.",
    authorId: "u-3",
    pinned: true,
    visibility: "all",
    tags: ["devotion", "discipline"],
    commentsCount: 8,
    createdAt: now,
    updatedAt: now,
    status: "published"
  },
  {
    id: "p-2",
    type: "Teaching",
    title: "Rooted Men Read the Word Deeply",
    excerpt: "A level-specific teaching on building conviction through daily Scripture.",
    body: "The goal is not information alone. It is formed men, steadied by truth and obedience.",
    authorId: "u-3",
    visibility: "level",
    levelId: "level-2",
    tags: ["rooted", "scripture"],
    commentsCount: 3,
    createdAt: now,
    updatedAt: now,
    status: "published"
  },
  {
    id: "p-3",
    type: "Announcement",
    title: "Quarterly Brotherhood Prayer Gathering",
    excerpt: "All brothers are expected to attend the next all-night prayer gathering.",
    body: "Come prepared to pray, worship, and listen. This is a call to seek God together.",
    authorId: "u-4",
    visibility: "all",
    tags: ["event", "prayer"],
    commentsCount: 12,
    createdAt: now,
    updatedAt: now,
    status: "published"
  }
];

export const checkInTemplate: CheckInTemplate = {
  id: "template-1",
  title: "Weekly Discipleship Check-In",
  audience: "all",
  questions: [
    { id: "pray", prompt: "Did you pray consistently this week?", type: "boolean" },
    { id: "word", prompt: "Did you read the Bible?", type: "boolean" },
    { id: "wins", prompt: "What were your wins?", type: "text" },
    { id: "struggles", prompt: "What were your struggles?", type: "text" },
    { id: "meetings", prompt: "Did you attend meetings?", type: "boolean" },
    { id: "partner", prompt: "Did you connect with your accountability partner?", type: "boolean" },
    { id: "prayerNeed", prompt: "Is there anything you need prayer for?", type: "text" }
  ],
  createdAt: now,
  updatedAt: now,
  status: "active"
};

export const submissions: CheckInSubmission[] = [
  {
    id: "cs-1",
    userId: "u-1",
    templateId: "template-1",
    weekLabel: "Week of Mar 30",
    answers: {
      pray: true,
      word: true,
      wins: "Stayed consistent with morning prayer.",
      struggles: "Felt mentally tired midweek.",
      meetings: true,
      partner: true,
      prayerNeed: "Boldness at work."
    },
    flags: [],
    createdAt: now,
    updatedAt: now,
    status: "published"
  },
  {
    id: "cs-2",
    userId: "u-5",
    templateId: "template-1",
    weekLabel: "Week of Mar 30",
    answers: {
      pray: false,
      word: true,
      wins: "Reached out for help instead of isolating.",
      struggles: "Low motivation.",
      meetings: false,
      partner: true,
      prayerNeed: "Strength and consistency."
    },
    flags: ["Needs encouragement", "Missed meeting"],
    createdAt: now,
    updatedAt: now,
    status: "published"
  }
];

export const attendance: AttendanceRecord[] = [
  { id: "a-1", userId: "u-1", eventId: "e-1", status: "present", createdAt: now, updatedAt: now },
  { id: "a-2", userId: "u-5", eventId: "e-1", status: "absent", createdAt: now, updatedAt: now },
  { id: "a-3", userId: "u-1", eventId: "e-2", status: "present", createdAt: now, updatedAt: now },
  { id: "a-4", userId: "u-5", eventId: "e-2", status: "late", createdAt: now, updatedAt: now }
];

export const notifications: NotificationItem[] = [
  {
    id: "n-1",
    title: "Weekly check-in is open",
    body: "Submit your discipleship check-in before Thursday evening.",
    audience: "member",
    createdAt: now,
    updatedAt: now,
    status: "published"
  },
  {
    id: "n-2",
    title: "Leader follow-up queue updated",
    body: "Two brothers in Lionhearted Circle need encouragement this week.",
    audience: "leaders",
    createdAt: now,
    updatedAt: now,
    status: "published"
  }
];

export const leaderReports: LeaderReport[] = [
  {
    id: "lr-1",
    title: "Weekly follow-up summary",
    summary: "Attendance was steady overall, but one younger brother is drifting and needs direct contact.",
    memberIdsNeedingFollowUp: ["u-5"],
    prayerNeeds: ["Consistency", "Employment provision"],
    createdAt: now,
    updatedAt: now,
    status: "published"
  }
];

export function getProgressMetricsForUser(userId: string): ProgressMetric[] {
  if (userId === "u-5") {
    return [
      { id: "m-1", label: "Attendance", value: 6, target: 10, tone: "warning" },
      { id: "m-2", label: "Devotion", value: 7, target: 10, tone: "steady" },
      { id: "m-3", label: "Accountability", value: 8, target: 10, tone: "steady" },
      { id: "m-4", label: "Serving", value: 3, target: 10, tone: "warning" }
    ];
  }

  return [
    { id: "m-1", label: "Attendance", value: 8, target: 10, tone: "strong" },
    { id: "m-2", label: "Devotion", value: 9, target: 10, tone: "strong" },
    { id: "m-3", label: "Accountability", value: 8, target: 10, tone: "steady" },
    { id: "m-4", label: "Serving", value: 6, target: 10, tone: "steady" }
  ];
}

export function getUserById(userId: string) {
  return users.find((user) => user.id === userId);
}

export function getGroupById(groupId: string) {
  return groups.find((group) => group.id === groupId);
}

export function getLevelById(levelId: string) {
  return levels.find((level) => level.id === levelId);
}

export function getPostsForRole(role: Role, levelId: string) {
  return posts.filter((post) => {
    if (post.visibility === "all") {
      return true;
    }

    if (post.visibility === "leaders") {
      return role !== "member";
    }

    return post.levelId === levelId;
  });
}

export function getSessionOptions(): Array<SessionUser & { description: string }> {
  return [
    { id: "u-1", name: "Tawanda Moyo", role: "member", description: "Member experience" },
    { id: "u-2", name: "Simba Ndlovu", role: "group_leader", description: "Group leader workflow" },
    { id: "u-3", name: "Bongani Dube", role: "level_leader", description: "Level leader workflow" },
    { id: "u-4", name: "Pastor Tendai Chirwa", role: "admin", description: "Admin oversight" }
  ];
}

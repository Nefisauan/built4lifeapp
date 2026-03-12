// Alston Award (NCAA Educational Benefits) — requirements & progress
// Update `current` values and `deadline` as info comes in

export const alstonAward = {
  title: 'Alston Award',
  subtitle: 'NCAA Educational Benefits — Up to $5,980/year',
  deadline: '2026-04-01',
  description:
    'The Alston Award provides Division I student-athletes with additional education-related expenses beyond a full grant-in-aid.',

  requirements: [
    {
      id: 1,
      label: 'Cumulative GPA',
      description: 'Minimum 3.0 GPA required',
      target: 3.0,
      current: 0,        // ← update with real GPA
      unit: 'GPA',
      type: 'threshold', // meets/doesn't meet
      icon: '📚',
    },
    {
      id: 2,
      label: 'Built4Life Workshop Attendance',
      description: 'Attend required workshops',
      target: 4,
      current: 0,        // ← update with workshops attended
      unit: 'workshops',
      type: 'progress',
      icon: '🎯',
    },
    {
      id: 3,
      label: 'Community Service Hours',
      description: 'Minimum service hours completed',
      target: 20,
      current: 0,        // ← update with hours logged
      unit: 'hours',
      type: 'progress',
      icon: '🙏',
    },
    {
      id: 4,
      label: 'Career Development Event',
      description: 'Attend at least 1 career event',
      target: 1,
      current: 0,        // ← 0 or 1
      unit: 'event',
      type: 'progress',
      icon: '🤝',
    },
    {
      id: 5,
      label: 'Full-Time Enrollment',
      description: 'Must be enrolled full-time',
      target: 1,
      current: 1,        // ← 1 = yes, 0 = no
      unit: '',
      type: 'boolean',
      icon: '🏫',
    },
    {
      id: 6,
      label: 'Application Submitted',
      description: 'Submit award application by deadline',
      target: 1,
      current: 0,        // ← 1 when submitted
      unit: '',
      type: 'boolean',
      icon: '📝',
    },
  ],
}

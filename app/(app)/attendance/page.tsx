import { attendance, events, getUserById } from "@/lib/mock-data";

export default function AttendancePage() {
  return (
    <div className="stack">
      <div className="grid-2">
        <div className="card stack">
          <span className="eyebrow">Quick attendance</span>
          <h2 className="heading-md">Mark attendance with minimal friction</h2>
          {events.map((event) => (
            <div key={event.id} className="metric stack-sm">
              <strong>{event.title}</strong>
              <div className="row">
                <span className="pill">Present</span>
                <span className="pill">Absent</span>
                <span className="pill">Excused</span>
                <span className="pill">Late</span>
              </div>
            </div>
          ))}
        </div>
        <div className="card stack">
          <span className="eyebrow">History</span>
          <h2 className="heading-md">Attendance by member</h2>
          {attendance.map((record) => {
            const user = getUserById(record.userId);
            const event = events.find((item) => item.id === record.eventId);
            return (
              <div key={record.id} className="metric space-between">
                <div className="stack-sm" style={{ gap: 4 }}>
                  <strong>{user?.profile.fullName}</strong>
                  <span className="muted">{event?.title}</span>
                </div>
                <span className="pill" style={{ textTransform: "capitalize" }}>
                  {record.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

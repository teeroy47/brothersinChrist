export default function SettingsPage() {
  return (
    <div className="card stack">
      <span className="eyebrow">Notifications</span>
      <h2 className="heading-md">Basic preferences</h2>
      <label className="field">
        <span>Meeting reminders</span>
        <select defaultValue="enabled">
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
        </select>
      </label>
      <label className="field">
        <span>Leader follow-up alerts</span>
        <select defaultValue="enabled">
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
        </select>
      </label>
      <label className="field">
        <span>Accountability reminders</span>
        <select defaultValue="enabled">
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
        </select>
      </label>
    </div>
  );
}

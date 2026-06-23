"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SettingsPage() {
  const [meetings, setMeetings] = useState("enabled");
  const [followUps, setFollowUps] = useState("enabled");
  const [accountability, setAccountability] = useState("enabled");

  return (
    <div className="card stack">
      <span className="eyebrow">Notifications</span>
      <h2 className="heading-md">Basic preferences</h2>
      
      <div className="field">
        <span>Meeting reminders</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="dropdown-trigger-button" type="button">
              {meetings === "enabled" ? "Enabled" : "Disabled"}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={meetings} onValueChange={setMeetings}>
              <DropdownMenuRadioItem value="enabled">Enabled</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="disabled">Disabled</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="field">
        <span>Leader follow-up alerts</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="dropdown-trigger-button" type="button">
              {followUps === "enabled" ? "Enabled" : "Disabled"}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={followUps} onValueChange={setFollowUps}>
              <DropdownMenuRadioItem value="enabled">Enabled</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="disabled">Disabled</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="field">
        <span>Accountability reminders</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="dropdown-trigger-button" type="button">
              {accountability === "enabled" ? "Enabled" : "Disabled"}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={accountability} onValueChange={setAccountability}>
              <DropdownMenuRadioItem value="enabled">Enabled</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="disabled">Disabled</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

import React, { useState } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const hours = Array.from({ length: 17 }, (_, i) => `${7 + i}:00`);

export default function WeeklySchedule() {
  const [modal, setModal] = useState({
    open: false,
    day: "",
    hour: "",
    value: "",
    color: "#60a5fa", // Tailwind blue-400
  });

  const [schedule, setSchedule] = useState({});

  const openModal = (day, hour) => {
    const key = `${day}-${hour}`;
    const activity = schedule[key] || {};
    setModal({
      open: true,
      day,
      hour,
      value: activity.value || "",
      color: activity.color || "#60a5fa",
    });
  };

  const handleSave = () => {
    const key = `${modal.day}-${modal.hour}`;
    setSchedule({
      ...schedule,
      [key]: {
        value: modal.value,
        color: modal.color,
      },
    });
    setModal({ open: false, day: "", hour: "", value: "", color: "#60a5fa" });
  };

  return (
    <div className="p-4 overflow-x-auto">
      <div className="min-w-[1000px]">
        {/* Header Row */}
        <div className="grid grid-cols-8 gap-2 mb-2">
          <div></div>
          {days.map((day) => (
            <div key={day} className="text-center font-bold">
              {day}
            </div>
          ))}
        </div>

        {/* Schedule Rows */}
        <div className="space-y-2">
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-8 gap-2 items-center">
              <div className="text-sm text-gray-600">{hour}</div>
              {days.map((day) => {
                const key = `${day}-${hour}`;
                const activity = schedule[key];
                return (
                  <div
                    key={key}
                    style={{ backgroundColor: activity?.color || "#e0f2fe" }}
                    className="rounded-full h-16 flex items-center justify-between px-4 shadow text-sm text-gray-700 cursor-pointer hover:ring-2 hover:ring-blue-400"
                    onClick={() => openModal(day, hour)}
                  >
                    <span className="truncate">{activity?.value || "Click to add"}</span>
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-500"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-2">Edit Activity</h2>
            <p className="text-sm mb-4 text-gray-500">
              {modal.day}, {modal.hour}
            </p>
            <input
              type="text"
              value={modal.value}
              onChange={(e) => setModal({ ...modal, value: e.target.value })}
              className="w-full border px-3 py-2 rounded mb-4"
              placeholder="Enter activity"
            />
            <div className="flex items-center gap-3 mb-4">
              <label className="text-sm text-gray-600">Color:</label>
              <input
                type="color"
                value={modal.color}
                onChange={(e) => setModal({ ...modal, color: e.target.value })}
                className="w-10 h-6 border rounded"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setModal({ open: false, day: "", hour: "", value: "", color: "#60a5fa" })}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

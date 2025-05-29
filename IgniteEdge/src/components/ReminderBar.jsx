import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import Modal from "react-modal";
import "../styles/genz-modal.css";
import "./ReminderBar.css";

const ReminderBar = () => {
  const [date, setDate] = useState(new Date());
  const [reminders, setReminders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hideNotification, setHideNotification] = useState(false);

  const fetchReminders = async (selectedDate) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://igniteedge-1.onrender.com/api/reminders?date=${selectedDate.toISOString().slice(0, 10)}`,
        { withCredentials: true }
      );
      setReminders(res.data);
    } catch (err) {
      setError("Failed to load reminders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders(date);
  }, [date]);

  const handleAddReminder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post(
        "https://igniteedge-1.onrender.com/api/reminders",
        { message, date: date.toISOString().slice(0, 10) },
        { withCredentials: true }
      );
      setMessage("");
      setShowModal(false);
      fetchReminders(date);
    } catch (err) {
      setError("Failed to add reminder");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkDone = async (id) => {
    await axios.patch(`https://igniteedge-1.onrender.com/api/reminders/${id}`, {}, { withCredentials: true });
    fetchReminders(date);
  };

  // Show notification if today has reminders
  const todayStr = new Date().toISOString().slice(0, 10);
  const showNotification = reminders.some(r => !r.notified && r.date.slice(0, 10) === todayStr) && !hideNotification;

  return (
    <div className="reminderbar-outer-wrapper">
      <div className="genz-chart-card reminder-bar reminderbar-card">
        <div className="reminderbar-calendar-wrapper">
          <Calendar
            onChange={setDate}
            value={date}
            calendarType="iso8601"
          />
        </div>
        <div className="reminderbar-list-wrapper">
          <div className="reminderbar-header-row">
            <h3 className="reminderbar-title">Reminders for {date.toISOString().slice(0, 10)}</h3>
            <button className="genz-submit-btn reminderbar-add-btn" onClick={() => setShowModal(true)}>
              + Add Reminder
            </button>
          </div>
          {loading ? (
            <div className="reminderbar-loading">Loading...</div>
          ) : error ? (
            <div className="reminderbar-error">{error}</div>
          ) : reminders.length === 0 ? (
            <div className="reminderbar-empty">No reminders for this date.</div>
          ) : (
            <ul className="reminderbar-list">
              {reminders.map(rem => (
                <li key={rem._id} className={`reminderbar-list-item${rem.notified ? ' reminderbar-list-item-notified' : ' reminderbar-list-item-pending'}`}>
                  <span className="reminderbar-message">{rem.message}</span>
                  {!rem.notified && (
                    <button className="genz-cancel-btn reminderbar-done-btn" onClick={() => handleMarkDone(rem._id)}>Mark as done</button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Modal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          contentLabel="Add Reminder"
          className="genz-modal"
          overlayClassName="genz-modal-overlay"
        >
          <h2 className="genz-modal-title">Add Reminder</h2>
          <form onSubmit={handleAddReminder}>
            <label className="genz-label" htmlFor="reminder-message">Message</label>
            <input
              id="reminder-message"
              type="text"
              className="genz-input"
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
            />
            <div className="reminderbar-modal-btn-row">
              <button className="genz-submit-btn" type="submit" disabled={loading}>{loading ? "Adding..." : "Add"}</button>
              <button className="genz-cancel-btn" type="button" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </form>
        </Modal>
        {showNotification && (
          <div className="reminderbar-notification">
            <span>You have reminders for today!</span>
            <button onClick={() => setHideNotification(true)} className="reminderbar-notification-dismiss" title="Dismiss">×</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReminderBar; 
'use client';
import { useAxios } from "@/providers/AxiosProvider";
import { useState, useEffect } from "react";
import { ReminderCard } from "./ReminderCard";
import { ReminderUploadForm } from "./ReminderUploadForm";

export const ReminderHome = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const axios = useAxios();

  const fetchReminders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("/api/reminders/");
      console.log("Reminders API Response:", response.data);
      
      if (response.status === 200) {
       
        const sortedReminders = (response.data || []).sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
        setReminders(sortedReminders);
      } else {
        setError(`Failed to fetch reminders: ${response.statusText}`);
        console.error("Failed to fetch reminders:", response.statusText);
      }
    } catch (error) {
      setError(`Error fetching reminders: ${error.message}`);
      console.error("Error fetching reminders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, [axios]);

  // Timer effect for updating current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const onSubmit = async (submitData) => {
    try {
      setIsFormSubmitting(true);
      
      console.log("Submitting data:", submitData);
      
      const response = await axios.post("/api/reminders/", submitData);
      
      if (response.status === 200 || response.status === 201) {
        console.log("Reminder created successfully:", response.data);
        await fetchReminders(); 
      } else {
        console.error("Failed to create reminder:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating reminder:", error);
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const calculateRemainingTime = (reminder) => {
    const taskDate = new Date(reminder.start_date + 'T' + reminder.time);
    const diffMs = taskDate - currentTime;
    
    if (diffMs <= 0) return "Overdue";
    
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  // Detailed remaining time calculation for modal (includes seconds)
  const calculateDetailedRemainingTime = (reminder) => {
    const taskDate = new Date(reminder.start_date + 'T' + reminder.time);
    const diffMs = taskDate - currentTime;
    
    if (diffMs <= 0) return "Overdue";
    
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    
    const parts = [];
    if (days > 0) parts.push(`${days} D`);
    if (hours > 0) parts.push(`${hours} H`);
    if (minutes > 0) parts.push(`${minutes} M`);
    if (seconds > 0 || parts.length === 0) parts.push(`${seconds} s`);
    
    return parts.join(', ');
  };

  // Convert 24-hour time to 12-hour format
  const formatTo12Hour = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Convert 12-hour time to 24-hour format for API
  const formatTo24Hour = (time12) => {
    if (!time12) return '';
    // If it's already in 24-hour format, return as is
    if (!time12.includes('AM') && !time12.includes('PM')) return time12;
    
    const [time, period] = time12.split(' ');
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours);
    
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    
    return `${hour.toString().padStart(2, '0')}:${minutes}`;
  };

  const isReminderOverdue = (reminder) => {
    const taskDate = new Date(reminder.start_date + 'T' + reminder.time);
    return taskDate <= currentTime;
  };

  // function for getting local time zone gmt
const getGMTOffset = () => `GMT${(o => `${o < 0 ? '+' : '-'}${String(Math.floor(Math.abs(o) / 60)).padStart(2, '0')}:${String(Math.abs(o) % 60).padStart(2, '0')}`)(new Date().getTimezoneOffset())}`;

  // Filter out overdue reminders
  const activeReminders = reminders.filter(reminder => !isReminderOverdue(reminder));

  const openDetailModal = (reminder) => {
    setSelectedReminder(reminder);
    document.getElementById('reminder_detail_modal').showModal();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center text-white">
          <div className="flex space-x-2 mb-4">
            <div className="w-3 h-3 bg-[#0059FF] rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-[#0059FF] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-[#0059FF] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          <p className="text-gray-300">Loading reminders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
        <h3 className="text-red-400 font-semibold mb-2">Error Loading Reminders</h3>
        <p className="text-red-300 text-sm">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upload Form Component */}
      <ReminderUploadForm 
        onSubmit={onSubmit}
        isFormSubmitting={isFormSubmitting}
        formatTo24Hour={formatTo24Hour}
      />

      {/* Reminders List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Your Reminders</h2>
        
        {activeReminders.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeReminders.map((reminder) => (
              <ReminderCard
                key={reminder.id}
                reminder={reminder}
                onCardClick={openDetailModal}
                formatTo12Hour={formatTo12Hour}
                calculateRemainingTime={calculateRemainingTime}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Reminders Found</h3>
            <p className="text-gray-400">You don't have any reminders set up yet.</p>
          </div>
        )}
      </div>
      {/* Reminder Detail Modal */}
      <dialog id="reminder_detail_modal" className="modal">
        <div className="modal-box bg-[#272f3c] border border-gray-600">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">✕</button>
          </form>
          
          {selectedReminder && (
            <div>
              <h3 className="font-bold text-lg text-white mb-4">Reminder Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Task Name</label>
                  <p className="text-white text-lg font-medium">{selectedReminder.task_name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm">Repeat Type</label>
                    <p className="text-white capitalize">{selectedReminder.repeat_type}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Task Time</label>
                    <p className="text-white">{formatTo12Hour(selectedReminder.time)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm">Start Date</label>
                    <p className="text-white">{new Date(selectedReminder.start_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">End Date</label>
                    <p className="text-white">
                      {selectedReminder.end_date ? new Date(selectedReminder.end_date).toLocaleDateString() : 'No end date'}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-sm">Remaining Time</label>
                  <p className="text-blue-400 text-xl font-bold">{calculateDetailedRemainingTime(selectedReminder)}</p>
                  <p className="text-gray-400 text-xs mt-1">Until reminder time</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm">Status</label>
                    <p className={`font-medium ${selectedReminder.is_active ? 'text-green-400' : 'text-gray-400'}`}>
                      {selectedReminder.is_active ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Timezone</label>
                    <p className="text-white"> {Intl.DateTimeFormat().resolvedOptions().timeZone} - {getGMTOffset()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

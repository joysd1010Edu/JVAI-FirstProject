'use client';

export const ReminderCard = ({ reminder, onCardClick, formatTo12Hour, calculateRemainingTime }) => {
  return (
    <div 
      className="bg-[#272f3c] text-white p-4 rounded-lg border border-gray-600 hover:bg-[#313845] transition-colors cursor-pointer"
      onClick={() => onCardClick(reminder)}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold truncate flex-1">
          {reminder.task_name}
        </h3>
        <span className={`px-2 py-1 rounded text-xs ml-2 ${
          reminder.is_active 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-gray-500/20 text-gray-400'
        }`}>
          {reminder.is_active ? 'Active' : 'Inactive'}
        </span>
      </div>
      
      <div className="space-y-2 text-sm">
        <p className="text-gray-300">
          <span className="text-gray-400">Time:</span> {formatTo12Hour(reminder.time)}
        </p>
        <p className="text-gray-300">
          <span className="text-gray-400">Date:</span> {new Date(reminder.start_date).toLocaleDateString()}
        </p>
        <p className="text-gray-300">
          <span className="text-gray-400">Repeat:</span> {reminder.repeat_type}
        </p>
        <p className="text-blue-400 font-medium">
          {calculateRemainingTime(reminder)}
        </p>
      </div>
    </div>
  );
};

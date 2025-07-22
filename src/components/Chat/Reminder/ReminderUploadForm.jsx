'use client';
import { useForm } from "react-hook-form";

export const ReminderUploadForm = ({ onSubmit, isFormSubmitting, formatTo24Hour }) => {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      task_name: "",
      time: "",
      timezone: "UTC",
      repeat_type: "once",
      start_date: "",
      end_date: "",
    }
  });

  const watchRepeatType = watch("repeat_type");

  const handleFormSubmit = async (data) => {
    try {
      // Convert time to 24-hour format for API submission
      const submitData = {
        ...data,
        time: formatTo24Hour(data.time), // Convert to 24-hour format
        timezone: "UTC", // Always send as UTC
        end_date: data.repeat_type === "once" ? null : data.end_date || null
      };
      
      await onSubmit(submitData);
      reset();
      document.getElementById('create_reminder_modal').close();
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  return (
    <>
      {/* Create Reminder Form Section */}
      <div className="bg-[#272f3c] p-6 rounded-lg border border-gray-600">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Create New Reminder</h2>
          <button 
            className="bg-[#0059FF] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => document.getElementById('create_reminder_modal').showModal()}
          >
            Add Reminder
          </button>
        </div>
      </div>

      {/* Create Reminder Modal */}
      <dialog id="create_reminder_modal" className="modal">
        <div className="modal-box bg-[#272f3c] border border-gray-600">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">✕</button>
          </form>
          
          <h3 className="font-bold text-lg text-white mb-4">Create New Reminder</h3>
          
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <label className="block text-white mb-2">Task Name</label>
              <input 
                {...register("task_name", { required: "Task name is required" })}
                className="w-full p-3 rounded bg-[#1a1f2e] text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                placeholder="Enter task name..."
              />
              {errors.task_name && <p className="text-red-400 text-sm mt-1">{errors.task_name.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">Time</label>
                <input 
                  {...register("time", { required: "Time is required" })}
                  type="time"
                  className="w-full p-3 rounded bg-[#1a1f2e] text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
                {errors.time && <p className="text-red-400 text-sm mt-1">{errors.time.message}</p>}
              </div>

              <div>
                <label className="block text-white mb-2">Timezone</label>
                <input 
                  {...register("timezone")}
                  value="Local Time"
                  disabled
                  className="w-full p-3 rounded bg-[#1a1f2e] text-gray-400 border border-gray-600 cursor-not-allowed"
                  placeholder="Local Time"
                />
                <p className="text-xs text-gray-400 mt-1">Will be converted to UTC automatically</p>
              </div>
            </div>

            <div>
              <label className="block text-white mb-2">Repeat Type</label>
              <select 
                {...register("repeat_type")}
                className="w-full p-3 rounded bg-[#1a1f2e] text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="once">Once</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">Start Date</label>
                <input 
                  {...register("start_date", { required: "Start date is required" })}
                  type="date"
                  className="w-full p-3 rounded bg-[#1a1f2e] text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
                {errors.start_date && <p className="text-red-400 text-sm mt-1">{errors.start_date.message}</p>}
              </div>

              {watchRepeatType !== "once" && (
                <div>
                  <label className="block text-white mb-2">End Date (Optional)</label>
                  <input 
                    {...register("end_date")}
                    type="date"
                    className="w-full p-3 rounded bg-[#1a1f2e] text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-6">
              <button 
                type="submit"
                disabled={isFormSubmitting}
                className="flex-1 bg-[#0059FF] text-white p-3 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {isFormSubmitting ? "Creating..." : "Create Reminder"}
              </button>
              <button 
                type="button"
                onClick={() => document.getElementById('create_reminder_modal').close()}
                className="px-6 bg-gray-600 text-white p-3 rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

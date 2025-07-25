"use client";
import { useAxios } from "@/providers/AxiosProvider";
import { set } from "date-fns";
import { use, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const TaskHome = () => {
  const [activeTab, setActiveTab] = useState("gratitude");
  const [isLoading, setIsLoading] = useState(false);
  const [gratitudeEntries, setGratitudeEntries] = useState([]);

  const [taskCount, setTaskCount] = useState(0);
  const [gratitudeText, setGratitudeText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);

  // left column data states

  // Breathing exercise states
  const [breathingExercises, setBreathingExercises] = useState([]);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingTimeLeft, setBreathingTimeLeft] = useState(300); // 5 minutes in seconds
  const [breathingProgress, setBreathingProgress] = useState(0);
  const [breathingCompleted, setBreathingCompleted] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState("inhale");
  const [breathingCycle, setBreathingCycle] = useState(0);

  // Progress tracking states

  const [completedTasks, setCompletedTasks] = useState(0);

  const [streak, setStreak] = useState({});
  const [totalGratitudeEntries, setTotalGratitudeEntries] = useState(0);
  const [totalBreathingSessions, setTotalBreathingSessions] = useState(0);
  const [totalaffirmationEntries, setTotalAffirmationEntries] = useState(0);
  const axios = useAxios();

  const fetchStreakData = async () => {
    const response = await axios.get("/api/tasks/total-daily-tasks/");
    console.log("Streak data:", response.data);
    const today = new Date().toLocaleDateString("en-CA");
    // const today=new Date().toISOString().split('T')[0]
    const todayEntry = response.data.find((entry) => {
      const entryDate = new Date(entry.date).toISOString().split("T")[0];
      return entryDate === today;
    });
    console.log("Today's entry:", todayEntry);
    if (todayEntry) {
      let completed = 0;
      if (todayEntry.gratitude_completed) completed += 1;
      if (todayEntry.breathing_completed) completed += 1;
      if (todayEntry.affirmation_completed) completed += 1;
      console.log("Today's completed tasks:", completed);
      setCompletedTasks(completed);
    }
    const sortedData = [...response.data].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    // Ensure latest7 always has 7 items (pad with empty objects if needed)
    let latest7 = sortedData.slice(-7);
    if (latest7.length < 7) {
      const padCount = 7 - latest7.length;
      // Generate unique ids for empty objects using timestamp + index
      const emptyEntries = Array.from({ length: padCount }, (_, i) => ({
        __empty: true,
        id: `empty-${Date.now()}-${i}`,
      }));
      latest7 = emptyEntries.concat(latest7);
    }
    const streakArray = [];
    latest7.forEach((entry, idx) => {
      if (!entry || Object.keys(entry).length === 0 || entry.__empty) {
        streakArray.push({
          complete: false,
          id: entry?.id || `empty-${Date.now()}-${idx}`,
        });
      } else {
        const {
          gratitude_completed,
          breathing_completed,
          affirmation_completed,
        } = entry;
        streakArray.push({
          complete:
            !!gratitude_completed &&
            !!breathing_completed &&
            !!affirmation_completed,
          id: entry.id,
        });
      }
    });
    setStreak(streakArray);

    response.data.forEach((entry) => {
      if (entry.gratitude_completed) {
        setTotalGratitudeEntries(totalGratitudeEntries + 1);
        console.log("totalGratitudeEntries", totalGratitudeEntries);
      }
      if (entry.affirmation_completed)
        setTotalAffirmationEntries(totalaffirmationEntries + 1);
      setTotalBreathingSessions(
        totalBreathingSessions + entry.breathing_exercise_count
      );
    });
  };

  const fetchGratitudeEntries = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/tasks/gratitude/");
      setGratitudeEntries(response.data || []);

      // Fix date comparison - use proper date format
      const today = new Date();
      // console.log("today" ,today)
      const localToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const todayString = new Date().toLocaleDateString("en-CA");

      const todayEntry = response.data?.find((entry) => {
        // console.log("entry", entry)
        const entryDate = new Date(entry.date).toISOString().split("T")[0];
        return entryDate === todayString;
      });

      if (todayEntry) {
        setHasSubmittedToday(true);
      }
    } catch (error) {
      console.error("Error fetching gratitude entries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const startBreathingExercise = () => {
    setIsBreathingActive(true);
    setBreathingTimeLeft(300); // 5 minutes in seconds
    setBreathingProgress(0);
    setBreathingCompleted(false);
    setBreathingPhase("inhale");
    setBreathingCycle(0);
  };
  // ---------------------------------------------------------------------------------------------------------------------
  const completeBreathingExercise = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "/api/tasks/breathing-exercises/complete/",
        {
          completed: true,
        }
      );
      // console.log("Breathing exercise completed:", response.data);

      // Set completion states
      setBreathingCompleted(true);
      fetchStreakData();
    } catch (error) {
      console.error("Error completing breathing exercise:", error);
      // Still mark as completed locally even if API fails
      setBreathingCompleted(true);
      // setIsBreathingActive(false);
    } finally {
      setIsSubmitting(false);
      fetchStreakData();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getBreathingInstruction = () => {
    switch (breathingPhase) {
      case "inhale":
        return "Inhale";
      case "hold":
        return "Hold";
      case "exhale":
        return "Exhale";
      default:
        return "Breathe";
    }
  };

  const submitGratitudeEntry = async () => {
    if (!gratitudeText.trim() || hasSubmittedToday) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/tasks/gratitude/", {
        content: gratitudeText,
      });
      // console.log("Gratitude entry saved:", response.data);
      setGratitudeText("");
      setHasSubmittedToday(true);

      await fetchGratitudeEntries();
      fetchStreakData();
    } catch (error) {
      console.error("Error saving gratitude entry:", error);
    } finally {
      setIsSubmitting(false);
      fetchStreakData();
    }
  };

  useEffect(() => {
    fetchGratitudeEntries();
    fetchStreakData();
  }, []);

  // Breathing exercise timer to manage the breathing steps
  useEffect(() => {
    let interval;
    if (isBreathingActive && breathingTimeLeft > 0) {
      interval = setInterval(() => {
        setBreathingTimeLeft((prev) => {
          const newTime = prev - 1;
          const progress = ((300 - newTime) / 300) * 100; // Updated for 300 seconds
          setBreathingProgress(progress);

          return newTime;
        });

        // Update breathing cycle and step
        setBreathingCycle((prevCycle) => {
          const newCycle = (prevCycle + 1) % 12;

          // Update step based on cycle
          if (newCycle >= 0 && newCycle < 4) {
            setBreathingPhase("inhale");
          } else if (newCycle >= 4 && newCycle < 8) {
            setBreathingPhase("hold");
          } else {
            setBreathingPhase("exhale");
          }

          return newCycle;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBreathingActive, breathingTimeLeft]);

  const navigationTabs = [
    {
      id: "gratitude",
      label: "Gratitude",
      icon: "🙏",
      description: "Practice daily gratitude",
    },
    {
      id: "breathing",
      label: "Breathing Exercise",
      icon: "🌬️",
      description: "Mindful breathing techniques",
    },
    {
      id: "affirmation",
      label: "Affirmation",
      icon: "💭",
      description: "Positive self-affirmations",
    },
  ];

  // affirmation states
  const [affirmationText, setAffirmationText] = useState({});
  const [isSubmittingAffirmation, setIsSubmittingAffirmation] = useState(false);
  const [affirmationCompleted, setAffirmationCompleted] = useState(true);

  const fetchaffirmation = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/tasks/affirmations/today/");
      // console.log('Affirmation:', response.data);
      setAffirmationText(response.data || {});
    } catch (error) {
      console.error("Error fetching affirmation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAffirmationSubmit = async () => {
    setIsSubmittingAffirmation(true);
    try {
      const response = await axios.post("/api/tasks/affirmations/complete/", {
        completed: true,
        affirmation_id: affirmationText.id,
      });
      // console.log("Affirmation marked as read:", response.data);
      setAffirmationCompleted(true);

      setTaskCount((prevCount) => prevCount + 1);
      setAffirmationCompleted(false);
      fetchStreakData();
      Swal.fire({
        icon: "success",
        title: "Affirmation Completed!",
        text: "You have successfully marked today's affirmation as read.",
        confirmButtonColor: "#0059FF",
      });
    } catch (error) {
      console.error("Error marking affirmation as read:", error);
    } finally {
      setIsSubmittingAffirmation(false);
      setAffirmationCompleted(false);
      fetchStreakData();
    }
  };

  useEffect(() => {
    fetchaffirmation();
  }, [affirmationCompleted]);

  const renderContent = () => {
    switch (activeTab) {
      case "gratitude":
        return (
          <div className="space-y-4 h-full flex flex-col">
            <h3 className="text-xl font-semibold text-white mb-4">
              Daily Gratitude Practice
            </h3>

            {/* Input Section */}
            <div className="bg-[#1a1f2e] p-6 rounded-lg">
              {hasSubmittedToday ? (
                <div className="text-center">
                  <div className="text-4xl mb-4">✅</div>
                  <h4 className="text-green-400 font-medium mb-2">
                    Today's Gratitude Complete!
                  </h4>
                  <p className="text-gray-300 mb-4">
                    You've already shared your gratitude for today. Come back
                    tomorrow to continue your practice.
                  </p>
                  <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                    <p className="text-green-300 text-sm">
                      Consistency is key to developing a grateful mindset. Keep
                      up the great work!
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-gray-300 mb-4">
                    Take a moment to reflect on what you're grateful for today.
                  </p>
                  <textarea
                    value={gratitudeText}
                    onChange={(e) => setGratitudeText(e.target.value)}
                    className="w-full h-32 p-3 bg-[#272f3c] text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                    placeholder="Write what you're grateful for today..."
                  />
                  <button
                    onClick={submitGratitudeEntry}
                    disabled={isSubmitting || !gratitudeText.trim()}
                    className="mt-4 bg-[#0059FF] text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Saving..." : "Save Gratitude Entry"}
                  </button>
                </>
              )}
            </div>
          </div>
        );
      case "breathing":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">
              Breathing Exercise
            </h3>
            <div className="bg-[#1a1f2e] p-6 rounded-lg text-center">
              {!isBreathingActive ? (
                <>
                  <div className="mb-6">
                    <div className="w-32 h-32 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-4 relative">
                      <div className="w-20 h-20 bg-blue-500/40 rounded-full"></div>
                    </div>
                    <p className="text-gray-300 mb-4">
                      Ready for a 5-minute breathing session?
                    </p>
                    <p className="text-blue-400 text-lg">
                      Inhale for 4 seconds → Hold for 4 seconds → Exhale for 4
                      seconds
                    </p>
                  </div>
                  <button
                    onClick={startBreathingExercise}
                    className="bg-[#0059FF] text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Start Breathing Exercise
                  </button>
                </>
              ) : !breathingCompleted ? (
                <>
                  <div className="mb-6">
                    <div className="w-32 h-32 mx-auto relative mb-4">
                      {/* Background circle with pulse animation */}
                      <div
                        className={`w-32 h-32 rounded-full bg-blue-500/20 animate-pulse transition-all duration-1000 ${
                          breathingPhase === "inhale"
                            ? "scale-110"
                            : breathingPhase === "hold"
                            ? "scale-105"
                            : "scale-95"
                        }`}
                      ></div>
                      {/* Progress circle */}
                      <svg
                        className="w-32 h-32 absolute top-0 left-0 transform -rotate-90"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="transparent"
                          className="text-blue-500"
                          strokeDasharray={`${breathingProgress * 2.827} 282.7`}
                          style={{
                            transition: "stroke-dasharray 1s ease-in-out",
                          }}
                        />
                      </svg>
                      {/* Center content */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-white text-xl font-bold">
                            {formatTime(breathingTimeLeft)}
                          </div>
                          <div className="text-blue-400 text-sm">remaining</div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p
                        className={`text-2xl font-bold mb-2 transition-all duration-500 ${
                          breathingPhase === "inhale"
                            ? "text-green-400"
                            : breathingPhase === "hold"
                            ? "text-yellow-400"
                            : "text-blue-400"
                        }`}
                      >
                        {getBreathingInstruction()}
                      </p>
                      <div className="flex justify-center gap-1 mb-2">
                        {[1, 2, 3, 4].map((second) => (
                          <div
                            key={second}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              breathingCycle % 4 >= second - 1
                                ? breathingPhase === "inhale"
                                  ? "bg-green-400"
                                  : breathingPhase === "hold"
                                  ? "bg-yellow-400"
                                  : "bg-blue-400"
                                : "bg-gray-600"
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Follow the 4-4-4 breathing pattern
                    </p>
                  </div>

                  {/* Loading state during submission */}
                  {isSubmitting ? (
                    <div className="flex flex-col items-center">
                      <div className="flex space-x-2 mb-4">
                        <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce"></div>
                        <div
                          className="w-4 h-4 bg-green-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-4 h-4 bg-green-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <p className="text-green-400 font-medium">
                        Completing your session...
                      </p>
                    </div>
                  ) : (
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={completeBreathingExercise}
                        disabled={breathingTimeLeft > 0}
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Complete Task
                      </button>
                      <button
                        disabled={isSubmitting}
                        onClick={startBreathingExercise}
                        className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Start Over
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="text-6xl mb-4 animate-bounce">🎉</div>
                    <h4 className="text-green-400 font-bold text-2xl mb-3">
                      Congratulations!
                    </h4>
                    <p className="text-white font-medium text-lg mb-2">
                      Breathing Exercise Complete!
                    </p>
                    <p className="text-gray-300 mb-4">
                      Great job on completing your mindful breathing session.
                    </p>
                    <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/50 rounded-lg p-4 mb-4">
                      <p className="text-green-300 text-sm">
                        ✨ You've taken an important step for your mental
                        wellness. Regular breathing exercises help reduce
                        stress, improve focus, and enhance overall well-being.
                      </p>
                    </div>
                    <div className="flex justify-center gap-2 mb-4">
                      <span className="text-2xl">🧘‍♀️</span>
                      <span className="text-2xl">💚</span>
                      <span className="text-2xl">🌟</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setBreathingCompleted(false);

                      startBreathingExercise();
                    }}
                    className="bg-[#0059FF] text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Start Another Session
                  </button>
                </>
              )}
            </div>
          </div>
        );
      case "affirmation":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">
              Daily Affirmations
            </h3>
            <div className="bg-[#1a1f2e] p-6 rounded-lg">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">✨</div>
                <p className="text-blue-400 text-xl italic mb-4">
                  "
                  {affirmationText.text ||
                    "Believe in yourself and all that you are."}
                  "
                </p>
                <p className="text-gray-300 text-sm">
                  {" "}
                  A daily reminder to stay positive and focused.
                </p>
              </div>
              <div className="space-y-3">
                <button
                  disabled={affirmationCompleted}
                  onClick={() => {
                    fetchaffirmation();
                  }}
                  className="w-full disabled:opacity-50 disabled:cursor-not-allowed bg-[#0059FF] text-white py-3 rounded hover:bg-blue-600 transition-colors"
                >
                  Generate New Affirmation
                </button>
                <button
                  disabled={isSubmittingAffirmation}
                  onClick={handleAffirmationSubmit}
                  className="w-full bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded cursor-pointer hover:bg-green-700 transition-colors"
                >
                  {isSubmittingAffirmation ? "Submitting..." : "Mark as Read"}
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderBottomContent = () => {
    switch (activeTab) {
      case "gratitude":
        return (
          <div className="h-full flex flex-col">
            <h3 className="text-xl font-semibold text-white mb-4">
              Your Gratitude Entries
            </h3>

            {isLoading ? (
              <div className="flex items-center justify-center flex-1">
                <div className="text-center text-white">
                  <div className="flex space-x-2 mb-4">
                    <div className="w-3 h-3 bg-[#0059FF] rounded-full animate-bounce"></div>
                    <div
                      className="w-3 h-3 bg-[#0059FF] rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-3 h-3 bg-[#0059FF] rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <p className="text-gray-300">Loading entries...</p>
                </div>
              </div>
            ) : gratitudeEntries.length > 0 ? (
              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {gratitudeEntries.map((entry) => (
                  <div key={entry.id} className="bg-[#1a1f2e] p-4 rounded-lg">
                    <p className="text-white mb-2">{entry.content}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400">
                        {new Date(entry.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="text-gray-500">
                        {new Date(entry.created_at).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">🙏</div>
                  <h4 className="text-white font-medium mb-2">
                    No gratitude entries yet
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Start by writing what you're grateful for today!
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return (
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Coming Soon
            </h3>
            <p className="text-gray-400">
              This section will be available for {activeTab} activities.
            </p>
          </div>
        );
    }
  };

  return (
    <div className=" h-screen   p-6">
      {/* Header */}
      <div className=" max-w-7xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Wellness Tasks</h1>
          <p className="text-gray-400">
            Nurture your mind, body, and spirit with daily practices
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {navigationTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-[#0059FF] text-white shadow-lg shadow-blue-500/25"
                  : "bg-[#272f3c] text-gray-300 hover:bg-[#313845] hover:text-white"
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <div className="text-left">
                <div className="font-medium">{tab.label}</div>
                <div className="text-xs opacity-75">{tab.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* UI Layout */}
      <div className="max-w-7xl mx-auto mb-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Left Column */}
          <div className="lg:col-span-1">
            <div className="bg-[#272f3c] rounded-lg p-6 h-full border border-gray-600">
              <h2 className="text-xl font-semibold text-white mb-4">
                Progress Overview
              </h2>
              <div className="space-y-4">
                <div className="bg-[#1a1f2e] p-4 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Today's Tasks</span>
                    <span className="text-blue-400 font-bold">
                      {completedTasks || 0}/3
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(completedTasks / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-[#1a1f2e] p-4 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-400 font-bold">
                      Weekly Streak
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {streak.length > 0 &&
                      streak.map((day) => (
                        <div
                          key={day.id}
                          className={`w-6 h-6 rounded ${
                            day.complete ? "bg-green-500" : "bg-gray-600"
                          }`}
                        ></div>
                      ))}
                  </div>
                </div>

                <div className="bg-[#1a1f2e] p-4 rounded">
                  <h4 className="text-white font-medium mb-2">
                    Quick daily Stats
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Gratitude entries</span>
                      <span className="text-white">
                        {totalGratitudeEntries}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Breathing sessions</span>
                      <span className="text-white">
                        {totalBreathingSessions}
                      </span>
                      {console.log(
                        "totalBreathingSessions",
                        totalBreathingSessions
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">
                        Affirmations practiced
                      </span>
                      <span className="text-white">
                        {totalaffirmationEntries}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Two Rows */}
          <div className="lg:col-span-2 flex flex-col overflow-y-scroll gap-6">
            {/* Top Row */}
            <div className={activeTab === "breathing" ? "h-full" : "flex-1"}>
              <div className="bg-[#272f3c] rounded-lg p-6 h-full border border-gray-600">
                {renderContent()}
              </div>
            </div>

            {/* Bottom Row - Only show for non-breathing tabs */}
            {activeTab !== "breathing" && activeTab !== "affirmation" && (
              <div className="flex-1">
                <div className="bg-[#272f3c] rounded-lg p-6 h-full border border-gray-600">
                  {renderBottomContent()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

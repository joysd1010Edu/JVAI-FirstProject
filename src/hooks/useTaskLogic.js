"use client";
import { useState, useEffect } from "react";
import { useAxios } from "@/providers/AxiosProvider";
import Swal from "sweetalert2";

export const useTaskLogic = () => {
  const [activeTab, setActiveTab] = useState("gratitude");
  const [isLoading, setIsLoading] = useState(false);
  const [gratitudeEntries, setGratitudeEntries] = useState([]);
  const [gratitudeText, setGratitudeText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);

  // Breathing exercise states
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingTimeLeft, setBreathingTimeLeft] = useState(300);
  const [breathingProgress, setBreathingProgress] = useState(0);
  const [breathingCompleted, setBreathingCompleted] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState("inhale");
  const [breathingCycle, setBreathingCycle] = useState(0);

  // Progress tracking states
  const [completedTasks, setCompletedTasks] = useState(0);
  const [streak, setStreak] = useState([]);
  const [totalGratitudeEntries, setTotalGratitudeEntries] = useState(0);
  const [totalBreathingSessions, setTotalBreathingSessions] = useState(0);
  const [totalaffirmationEntries, setTotalAffirmationEntries] = useState(0);

  // Affirmation states
  const [affirmationText, setAffirmationText] = useState({});
  const [isSubmittingAffirmation, setIsSubmittingAffirmation] = useState(false);
  const [affirmationCompleted, setAffirmationCompleted] = useState(true);

  const axios = useAxios();

  const fetchStreakData = async () => {
    // console.log("Fetching streak data...");
    const response = await axios.get("/api/tasks/total-daily-tasks/");
    // console.log("Streak data:", response.data);
    const today = new Date().toLocaleDateString("en-CA");
    
    const todayEntry = response.data.find((entry) => {
      const entryDate = new Date(entry.date).toISOString().split("T")[0];
      return entryDate === today;
    });
    
    // console.log("Today's entry:", todayEntry);
    if (todayEntry) {
      let completed = 0;
      if (todayEntry.gratitude_completed) completed += 1;
      if (todayEntry.breathing_completed) completed += 1;
      if (todayEntry.affirmation_completed) completed += 1;
      // console.log("Today's completed tasks:", completed);
      setCompletedTasks(completed);
    }
    
    const sortedData = [...response.data].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    
    let latest7 = sortedData.slice(-7);
    if (latest7.length < 7) {
      const padCount = 7 - latest7.length;
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

      const today = new Date();
      const localToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const todayString = new Date().toLocaleDateString("en-CA");

      const todayEntry = response.data?.find((entry) => {
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

  const fetchaffirmation = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/tasks/affirmations/today/");
      setAffirmationText(response.data || {});
    } catch (error) {
      console.error("Error fetching affirmation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitGratitudeEntry = async () => {
    if (!gratitudeText.trim() || hasSubmittedToday) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/tasks/gratitude/", {
        content: gratitudeText,
      });
      setGratitudeText("");
      setHasSubmittedToday(true);
      fetchStreakData();
      await fetchGratitudeEntries();
    } catch (error) {
      console.error("Error saving gratitude entry:", error);
    } finally {
      setIsSubmitting(false);
      fetchStreakData();
    }
  };

  const startBreathingExercise = () => {
    setIsBreathingActive(true);
    setBreathingTimeLeft(300);
    setBreathingProgress(0);
    setBreathingCompleted(false);
    setBreathingPhase("inhale");
    setBreathingCycle(0);
  };

  const completeBreathingExercise = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "/api/tasks/breathing-exercises/complete/",
        {
          completed: true,
        }
      );
      setBreathingCompleted(true);
      fetchStreakData();
    } catch (error) {
      console.error("Error completing breathing exercise:", error);
      setBreathingCompleted(true);
    } finally {
      setIsSubmitting(false);
      fetchStreakData();
    }
  };

  const handleAffirmationSubmit = async () => {
    setIsSubmittingAffirmation(true);
    try {
      const response = await axios.post("/api/tasks/affirmations/complete/", {
        completed: true,
        affirmation_id: affirmationText.id,
      });
      setAffirmationCompleted(true);
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

  // Breathing exercise timer
  useEffect(() => {
    let interval;
    if (isBreathingActive && breathingTimeLeft > 0) {
      interval = setInterval(() => {
        setBreathingTimeLeft((prev) => {
          const newTime = prev - 1;
          const progress = ((300 - newTime) / 300) * 100;
          setBreathingProgress(progress);
          return newTime;
        });

        setBreathingCycle((prevCycle) => {
          const newCycle = (prevCycle + 1) % 12;
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

  useEffect(() => {
    fetchGratitudeEntries();
    fetchStreakData();
  }, [axios]);

  useEffect(() => {
    fetchaffirmation();
  }, [axios,affirmationCompleted]);

  return {
    // State
    activeTab,
    setActiveTab,
    isLoading,
    gratitudeEntries,
    gratitudeText,
    setGratitudeText,
    isSubmitting,
    hasSubmittedToday,
    isBreathingActive,
    breathingTimeLeft,
    breathingProgress,
    breathingCompleted,
    setBreathingCompleted,
    breathingPhase,
    breathingCycle,
    completedTasks,
    streak,
    totalGratitudeEntries,
    totalBreathingSessions,
    totalaffirmationEntries,
    affirmationText,
    isSubmittingAffirmation,
    affirmationCompleted,
    // Functions
    submitGratitudeEntry,
    startBreathingExercise,
    completeBreathingExercise,
    handleAffirmationSubmit,
    fetchaffirmation,
  };
};

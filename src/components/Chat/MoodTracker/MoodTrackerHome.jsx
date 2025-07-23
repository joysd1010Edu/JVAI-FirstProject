"use client";
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useAxios } from '@/providers/AxiosProvider';
import { 

  MdAdd
} from 'react-icons/md';
import { format, startOfDay, startOfWeek, startOfMonth, isWithinInterval } from 'date-fns';

export const MoodTrackerHome = () => {
  const [moodEntries, setMoodEntries] = useState([]);
  const [selectedMood, setSelectedMood] = useState('');
  const [moodNote, setMoodNote] = useState('');
  const [filterType, setFilterType] = useState('daily'); 
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [moodSummary, setMoodSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const axios = useAxios();

  const moodOptions = [
    { id: 'happy', label: 'Happy', color: 'bg-green-500', emoji: '😊' },
    { id: 'neutral', label: 'Neutral', color: 'bg-yellow-400', emoji: '😐' },
    { id: 'sad', label: 'Sad', color: 'bg-blue-400', emoji: '😢' },
    { id: 'angry', label: 'Angry', color: 'bg-red-500', emoji: '😠' },
    { id: 'anxious', label: 'Anxious', color: 'bg-purple-500', emoji: '😰' }
  ];

  
  // Fetch mood entries from API
  const fetchMoodEntries = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/mood-tracker/entries/');
      setMoodEntries(response.data);
    } catch (error) {
      console.error('Error fetching mood entries:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch mood summary statistics from API
  const fetchMoodSummary = async () => {
    try {
      setSummaryLoading(true);
      const response = await axios.get('/api/mood-tracker/summary/');
      setMoodSummary(response.data);
    } catch (error) {
      console.error('Error fetching mood summary:', error);
    } finally {
      setSummaryLoading(false);
    }
  };

  useEffect(() => {
    fetchMoodEntries();
    fetchMoodSummary();
  }, []);

  
  useEffect(() => {
    filterMoodEntries();
  }, [moodEntries, filterType]);

  
  const filterMoodEntries = () => {
    const now = new Date();
    let filteredData = [];

    if (filterType === 'daily') {
      const today = startOfDay(now);
      filteredData = moodEntries.filter(entry => {
        const entryDate = startOfDay(new Date(entry.date));
        return entryDate.getTime() === today.getTime();
      });
    } else if (filterType === 'weekly') {
      const weekStart = startOfWeek(now);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      filteredData = moodEntries.filter(entry => {
        const entryDate = new Date(entry.date);
        return isWithinInterval(entryDate, { start: weekStart, end: weekEnd });
      });
    } else if (filterType === 'monthly') {
      const monthStart = startOfMonth(now);
      const monthEnd = new Date(monthStart);
      monthEnd.setMonth(monthEnd.getMonth() + 1);
      monthEnd.setDate(monthEnd.getDate() - 1);
      filteredData = moodEntries.filter(entry => {
        const entryDate = new Date(entry.date);
        return isWithinInterval(entryDate, { start: monthStart, end: monthEnd });
      });
    }

    setFilteredEntries(filteredData.sort((a, b) => {
      const dateA = new Date(a.created_at || a.date);
      const dateB = new Date(b.created_at || b.date);
      return dateB.getTime() - dateA.getTime();
    }));
  };

 
  const getWeekDays = () => {
    const weekStart = startOfWeek(new Date());
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(day.getDate() + i);
      days.push(day);
    }
    return days;
  };

  
  const getMonthDays = () => {
    const monthStart = startOfMonth(new Date());
    const monthEnd = new Date(monthStart);
    monthEnd.setMonth(monthEnd.getMonth() + 1);
    monthEnd.setDate(0); // Last day of current month
    
    const days = [];
    for (let i = 1; i <= monthEnd.getDate(); i++) {
      const day = new Date(monthStart);
      day.setDate(i);
      days.push(day);
    }
    return days;
  };

  
  const getMoodForDate = (date) => {
    const dayStart = startOfDay(date);
    return moodEntries.find(entry => {
      const entryDate = startOfDay(new Date(entry.date));
      return entryDate.getTime() === dayStart.getTime();
    });
  };

  // Check if user has already logged mood today
  const hasTodaysMood = () => {
    const today = startOfDay(new Date());
    return moodEntries.some(entry => {
      const entryDate = startOfDay(new Date(entry.date));
      return entryDate.getTime() === today.getTime();
    });
  };

  // Handle mood submission
  const handleMoodSubmit = async () => {
    if (!selectedMood) {
      alert('Please select a mood');
      return;
    }

    // Check if mood already logged today
    if (hasTodaysMood()) {
      alert('You have already logged your mood for today. You can only log one mood per day.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const moodData = {
        mood: selectedMood,
        date: new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
      };

      const response = await axios.post('/api/mood-tracker/entries/', moodData);
      
      // Add the new entry to the current state immediately for UI update
      const newEntry = {
        id: response.data.id || Date.now(),
        mood: selectedMood,
        date: moodData.date,
        created_at: response.data.created_at || new Date().toISOString()
      };
      
      // Update mood entries state immediately
      const updatedEntries = [newEntry, ...moodEntries];
      setMoodEntries(updatedEntries);
      
      // Force update filtered entries immediately for current filter
      if (filterType === 'daily') {
        const today = startOfDay(new Date());
        const todayEntries = updatedEntries.filter(entry => {
          const entryDate = startOfDay(new Date(entry.date));
          return entryDate.getTime() === today.getTime();
        });
        setFilteredEntries(todayEntries);
      }

      // Refresh mood summary after successful submission
      await fetchMoodSummary();
      
      // Reset form
      setSelectedMood('');
      setMoodNote('');
      
      // Close modal
      document.getElementById('mood_modal').close();
      
    } catch (error) {
      console.error('Failed to save mood entry:', error);
      alert('Failed to save mood entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get mood option details
  const getMoodDetails = (moodId) => {
    return moodOptions.find(option => option.id === moodId);
  };

  // Get mood statistics
  const getMoodStats = () => {
    if (filteredEntries.length === 0) return null;

    const moodCounts = filteredEntries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {});

    const mostCommonMood = Object.entries(moodCounts).reduce((a, b) => 
      moodCounts[a[0]] > moodCounts[b[0]] ? a : b
    )[0];

    return {
      total: filteredEntries.length,
      mostCommon: mostCommonMood,
      distribution: moodCounts
    };
  };

 

  return (
    <div className="h-screen w-full overflow-y-scroll ">
      <div className="max-w-6xl mx-auto  min-h-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Mood Tracker
          </h1>
          <p className="text-lg text-white/70">
            Track your daily emotions and discover patterns in your mental wellness journey
          </p>
        </div>

        {/* Add Mood Button */}
        <div className="text-center mb-12">
          <button 
            className={`btn px-8 py-3 text-lg rounded-full flex items-center gap-2 mx-auto ${
              hasTodaysMood() 
                ? 'btn-disabled bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'btn-soft btn-info'
            }`}
            onClick={() => {
              if (!hasTodaysMood()) {
                document.getElementById('mood_modal').showModal();
              }
            }}
            disabled={hasTodaysMood()}
          >
            <MdAdd size={24} />
            {hasTodaysMood() ? 'Mood Already Logged Today' : 'Log Your Mood'}
          </button>
          
          {/* Modal for taking input of mood */}
          <dialog id="mood_modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box bg-[#1a2332] border-gray-600 text-white max-w-[500px]">
              <h3 className="font-bold text-2xl text-center text-white mb-6">How are you feeling?</h3>
              
              <div className="space-y-6 py-4">
                {/* Mood Selection */}
                <div>
                  <label className="text-lg font-semibold mb-4 block">Select your mood:</label>
                  <div className="grid grid-cols-2 gap-4">
                    {moodOptions.map((mood) => {
                      return (
                        <button
                          key={mood.id}
                          onClick={() => setSelectedMood(mood.id)}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                            selectedMood === mood.id
                              ? `${mood.color} border-white shadow-lg transform scale-105`
                              : 'bg-gray-700 border-gray-600 hover:border-gray-400'
                          }`}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <span className="text-4xl">{mood.emoji}</span>
                            <span className="text-sm font-medium text-white">{mood.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>                

                {/* Modal Actions */}
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn btn-outline mr-2">Cancel</button>
                  </form>
                  <button
                    onClick={handleMoodSubmit}
                    disabled={!selectedMood || isSubmitting}
                    className="btn btn-info disabled:btn-disabled"
                  >
                    {isSubmitting ? 'Saving...' : 'Save Mood Entry'}
                  </button>
                </div>
              </div>
            </div>
          </dialog>
        </div>

      
        {/* Data Display Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              Viewing - {filterType.charAt(0).toUpperCase() + filterType.slice(1)} Mood Data
            </h2>
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="select select-bordered bg-gray-700 text-white"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Daily View */}
          {filterType === 'daily' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">
                Today - {format(new Date(), 'PPPP')}
              </h3>
              {hasTodaysMood() ? (
                <div className="space-y-4">
                  {filteredEntries.map((entry) => {
                    const moodDetails = getMoodDetails(entry.mood);
                    return (
                      <div
                        key={entry.id}
                        className="bg-white/5 rounded-lg p-6 border border-white/10"
                      >
                        <div className="flex items-center gap-6">
                          <div className={`p-4 rounded-full ${moodDetails?.color}`}>
                            <span className="text-5xl">{moodDetails?.emoji}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-2xl font-bold text-white mb-2">{moodDetails?.label}</h4>
                            <div className="space-y-1">
                              <p className="text-lg text-white/90">
                                {format(new Date(entry.created_at), 'EEEE, MMMM do, yyyy')}
                              </p>
                              <p className="text-md text-white/70">
                                Logged at {format(new Date(entry.created_at), 'h:mm a')}
                              </p>
                            </div>
                            {entry.note && (
                              <p className="text-white/80 mt-3 italic bg-white/5 p-3 rounded-lg">"{entry.note}"</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="text-center py-6">
                    <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                      <span className="text-3xl mb-2 block">✨</span>
                      <h4 className="text-lg font-semibold text-white mb-1">Great job!</h4>
                      <p className="text-white/70 text-sm">You've logged your mood for today. Come back tomorrow!</p>
                    </div>
                  </div>
                </div>
              ) : filteredEntries.length === 0 ? (
                <div className="text-center py-12">
                  <span className="text-6xl mb-4 block">😐</span>
                  <h4 className="text-xl font-semibold text-white mb-2">No mood logged today</h4>
                  <p className="text-white/70">Start by logging your current mood above</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEntries.map((entry) => {
                    const moodDetails = getMoodDetails(entry.mood);
                    return (
                      <div
                        key={entry.id}
                        className="bg-white/5 rounded-lg p-4 border border-white/10"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-full ${moodDetails?.color}`}>
                            <span className="text-4xl">{moodDetails?.emoji}</span>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white">{moodDetails?.label}</h4>
                            <p className="text-sm text-white/70">
                              {format(new Date(entry.date), 'p')}
                            </p>
                           
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Weekly View */}
          {filterType === 'weekly' && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                This Week - {format(startOfWeek(new Date()), 'PPP')} to {format(new Date(startOfWeek(new Date()).getTime() + 6 * 24 * 60 * 60 * 1000), 'PPP')}
              </h3>
              <div className="grid grid-cols-7 gap-2">
                {getWeekDays().map((day) => {
                  const dayMood = getMoodForDate(day);
                  const moodDetails = dayMood ? getMoodDetails(dayMood.mood) : null;
                  const isToday = startOfDay(day).getTime() === startOfDay(new Date()).getTime();
                  
                  return (
                    <div
                      key={day.toISOString()}
                      className={`bg-white/5 rounded-lg p-4 text-center border ${
                        isToday ? 'border-blue-400 bg-blue-400/20' : 'border-white/10'
                      }`}
                    >
                      <div className="text-sm font-medium text-white mb-2">
                        {format(day, 'EEE')}
                      </div>
                      <div className="text-xs text-white/70 mb-2">
                        {format(day, 'MMM d')}
                      </div>
                      {moodDetails ? (
                        <div className={`w-8 h-8 rounded-full ${moodDetails.color} flex items-center justify-center mx-auto`}>
                          <span className="text-4xl">{moodDetails.emoji}</span>
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mx-auto">
                          <span className="text-xs text-gray-400">-</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Monthly View */}
          {filterType === 'monthly' && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {format(new Date(), 'MMMM yyyy')}
              </h3>
              <div className="grid grid-cols-7 gap-2">
                
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-white/70 font-semibold p-2">
                    {day}
                  </div>
                ))}
                
                {/* Calendar days */}
                {getMonthDays().map((day) => {
                  const dayMood = getMoodForDate(day);
                  const moodDetails = dayMood ? getMoodDetails(dayMood.mood) : null;
                  const isToday = startOfDay(day).getTime() === startOfDay(new Date()).getTime();
                  
                  return (
                    <div
                      key={day.toISOString()}
                      className={`bg-white/5 rounded-lg p-2 text-center border min-h-[60px] ${
                        isToday ? 'border-blue-400 bg-blue-400/20' : 'border-white/10'
                      }`}
                    >
                      <div className="text-sm font-medium text-white mb-1">
                        {format(day, 'd')}
                      </div>
                      {moodDetails ? (
                        <div className={`w-6 h-6 rounded-full ${moodDetails.color} flex items-center justify-center mx-auto`}>
                          <span className="text-3xl">{moodDetails.emoji}</span>
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-600/30 flex items-center justify-center mx-auto">
                          <span className="text-xs text-gray-400">-</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Mood Statistics Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              📊 Mood Statistics
            </h2>
            {summaryLoading && (
              <div className="loading loading-spinner loading-md text-white"></div>
            )}
          </div>

          {moodSummary ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Average Mood */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-center">
                  <div className="text-3xl mb-2">📈</div>
                  <h3 className="text-lg font-semibold text-white mb-1">Average Mood</h3>
                  <p className="text-white/80 text-md">{moodSummary.average_mood}</p>
                </div>
              </div>

              {/* Most Frequent Emotion */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-center">
                  {(() => {
                    const emotionDetails = getMoodDetails(moodSummary.most_frequent_emotion);
                    return (
                      <>
                        <div className="text-3xl mb-2">{emotionDetails?.emoji || '😊'}</div>
                        <h3 className="text-lg font-semibold text-white mb-1">Most Frequent</h3>
                        <p className="text-white/80 text-md capitalize">{moodSummary.most_frequent_emotion}</p>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Mood Distribution */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-center">
                  <div className="text-3xl mb-2">📊</div>
                  <h3 className="text-lg font-semibold text-white mb-3">Mood Distribution</h3>
                  <div className="space-y-2">
                    {Object.entries(moodSummary.mood_counts).map(([mood, count]) => {
                      const moodDetails = getMoodDetails(mood);
                      return (
                        <div key={mood} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{moodDetails?.emoji}</span>
                            <span className="text-white/80 capitalize">{mood}</span>
                          </div>
                          <span className="text-white font-semibold">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-white mb-2">No Statistics Available</h3>
              <p className="text-white/70">Start logging your moods to see statistics!</p>
            </div>
          )}
        </div>

      

      </div>
    </div>
  );
};
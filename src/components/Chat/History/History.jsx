"use client";
import { useAxios } from "@/providers/AxiosProvider";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";

export const History = () => {
  const axios = useAxios();
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("/api/therapy/sessions/");
        console.log(response.data);
        if (response.status === 200) {
          setHistoryData(response.data || []);
        } else {
          console.error("Failed to fetch history:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchHistory();
  }, []);
  const handleDeleteSession = async (sessionId) => {
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this chat session!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor:"#050714",
      confirmButtonText: "Yes, delete it!",
      background: "#091c7c",
      color: "#ffffff",
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        content: "custom-swal-content",
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`/api/therapy/sessions/${sessionId}/`);
          console.log(response.data);
          if (response.status === 200||response.status === 204) {
            // Remove the deleted session from the state
            setHistoryData((prev) => prev.filter((session) => session.id !== sessionId));
            
            // Show success message
            Swal.fire({
              title: "Deleted!",
              text: "Your chat session has been deleted.",
              icon: "success",
              background: "#091c7c",
              color: "#ffffff",
              confirmButtonColor: "#050714",
              customClass: {
                popup: "custom-swal-popup",
                title: "custom-swal-title",
                content: "custom-swal-content",
              }
            });
          } else {
            console.error("Failed to delete session:", response.statusText);
            // Show error message
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the session. Please try again.",
              icon: "error",
              background: "#091c7c",
              color: "#ffffff",
              confirmButtonColor: "#050714",
              customClass: {
                popup: "custom-swal-popup",
                title: "custom-swal-title",
                content: "custom-swal-content",
              }
            });
          }
        } catch (error) {
          console.error("Error deleting session:", error);
          // Show error message
          Swal.fire({
            title: "Error!",
            text: "Network error. Please check your connection and try again.",
            icon: "error",
            background: "#091c7c",
            color: "#ffffff",
            confirmButtonColor: "#050714",
            customClass: {
              popup: "custom-swal-popup",
              title: "custom-swal-title",
              content: "custom-swal-content",
            }
          });
        }
      }
    });
  }

  return (
    <div className="">
      {historyData.length > 0 ? (
        <div className="space-y-3">
          {historyData.map((session) => (
            <div
              key={session.id}
              className="px-5 py-2.5 text-white bg-[#272f3c] rounded-lg flex justify-between items-center ease-in-out hover:bg-[#07378f] duration-300 transition-colors"
            >
              <Link
                href={`/chat/${session.id}`}
                className="flex-1 cursor-pointer"
              >
                <span className="text-lg font-medium">
                  {session.title || `Session ${session.id}`}
                </span>
                <p className="text-sm text-gray-400 mt-1">
                  {session.createdAt ? new Date(session.createdAt).toLocaleDateString() : "No date"}
                </p>
              </Link>
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDeleteSession(session.id);
                }}
                className="text-white p-2 hover:bg-red-500/20 hover:text-red-300 rounded transition-all"
                title="Delete session"
              >
                <RiDeleteBin5Line className="text-white" size={20} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">No chat history available.</p>
      )}
    </div>
  );
};

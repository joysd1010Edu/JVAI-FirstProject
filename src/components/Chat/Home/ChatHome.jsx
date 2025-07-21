"use client";
import { Input } from "@/components/ui/input";
import { useAxios } from "@/providers/AxiosProvider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { MdArrowUpward, MdOutlineKeyboardVoice } from "react-icons/md";

const ChatHome = () => {
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: { message: "" },
  });
  const axios = useAxios();
  const router = useRouter();
  const [MessageData, setMessageData] = useState([]);
  const [hasMessages, setHasMessages] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessageId, setLoadingMessageId] = useState(null);
  const [isCreatingSession, setIsCreatingSession] = useState(false);

  const fadeInUpStyle = {
    animation: "fadeInUp 0.6s ease-out forwards",
  };
  const watchedMessage = watch("message");

  const onSubmit = async (data) => {
    if (!data.message.trim()) return;

    setHasMessages(true);
    setIsCreatingSession(true);
    
    // Add user message instantly
    const userMessageId = Date.now();
    setMessageData((prev) => [
      ...prev,
      {
        id: userMessageId,
        message: data.message,
        sender: "user",
        status: "success",
      },
    ]);

    // Add loading bot message
    const botMessageId = userMessageId + 1;
    setLoadingMessageId(botMessageId);
    setMessageData((prev) => [
      ...prev,
      {
        id: botMessageId,
        message: "",
        sender: "bot",
        status: "loading",
      },
    ]);

    reset();

    // Create new chat session and send first message
    try {
      const response = await axios.post("/api/therapy/chat/", {
        message: data.message,
      });

      // Check if session was created successfully
      if (response.status === 200 || response.status === 201) {
        const sessionId = response.data.session_id || response.data.sessionId;
        
        if (sessionId) {
          // Navigate to the new session page with a small delay to show the response
          setTimeout(() => {
            router.push(`/chat/${sessionId}`);
          }, 500);
          
          // Update bot message with response before navigation
          setMessageData((prev) =>
            prev.map((msg) =>
              msg.id === botMessageId
                ? {
                    ...msg,
                    message: response.data.response?.text || "Session created! Redirecting...",
                    status: "success",
                  }
                : msg
            )
          );
        } else {
          throw new Error("Session ID not received");
        }
      } else {
        setMessageData((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId
              ? {
                  ...msg,
                  message: "Error creating chat session",
                  status: "error",
                }
              : msg
          )
        );
      }
    } catch (error) {
      setMessageData((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? {
                ...msg,
                message: "Failed to create chat session. Please try again.",
                status: "error",
              }
            : msg
        )
      );
      console.error("Error creating chat session:", error);
    } finally {
      setLoadingMessageId(null);
      setIsCreatingSession(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>

      <main className="h-screen w-full flex flex-col relative overflow-hidden">
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out z-10 ${
            hasMessages
              ? "opacity-0 pointer-events-none transform translate-y-[-20px]"
              : "opacity-100 pointer-events-auto transform translate-y-0"
          }`}
        >
          <div className="text-center text-white">
            <div id="welcome-message">
              <h1 className="text-3xl font-bold text-[#0059FF]">
                Emothrive Your AI Therapist
              </h1>
              <p className="mt-4 text-[#F9F9F9] mb-6 text-2xl">
                I'm Emothrive, your AI Guide to Better Mental Health.
                <br />
                <span className="text-[#C5C5C5] text-xl">
                  What do you want to talk about?
                </span>
              </p>
            </div>
          </div>
        </div>

        <div
          className={`flex-1 transition-all pb-60 duration-1000 ease-in-out overflow-y-auto px-6 pt-6 ${
            hasMessages && MessageData.length > 0
              ? "opacity-100 transform translate-y-5"
              : "opacity-0 transform translate-y-10 pointer-events-none"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-4">
              {MessageData.length > 0 &&
                MessageData?.map((item) => (
                  <div
                    key={item.id}
                    className={`flex animate-fadeInUp ${
                      item.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs text-start lg:max-w-md px-4 py-2 rounded-lg ${
                        item.sender === "user"
                          ? "bg-[#0059FF] text-white ml-auto"
                          : "bg-[#FFFFFF1A] text-white mr-auto"
                      }`}
                    >
                      {item.status === "loading" ? (
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                          <span className="text-sm text-gray-300">
                            {isCreatingSession ? "Creating session..." : "Thinking..."}
                          </span>
                        </div>
                      ) : (
                        <p className="text-lg">{item.message}</p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div
          className={`transition-all  duration-500 ease-in-out z-10 ${
            hasMessages
              ? "-translate-x-1/2 -translate-y-1/3 z-50 absolute bottom-5 left-1/2 transform w-full px-6"
              : "relative bottom-60 px-6 mt-8"
          }  `}
        >
          <form
            className="lg:w-[920px] mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="relative w-full">
              <Input
                {...register("message")}
                className={`py-8 pr-20 text-white  w-full transition-all duration-500 ${
                  hasMessages
                    ? "bg-[#444a56]  backdrop-blur-md border border-white/20"
                    : "bg-[#FFFFFF33]"
                }`}
                type="text"
                placeholder="Start typing here..."
                onKeyPress={handleKeyPress}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4 text-2xl text-gray-800">
                <MdOutlineKeyboardVoice className="cursor-pointer text-white" />
                <MdArrowUpward
                  className="bg-gray-400 text-white rounded-sm p-1 cursor-pointer hover:bg-gray-300 transition-colors"
                  onClick={handleSubmit(onSubmit)}
                />
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default ChatHome;

"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdArrowUpward, MdOutlineKeyboardVoice } from "react-icons/md";

const ChatHome = () => {
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: { message: "" },
  });

  const [sampleData, setSampleData] = useState([]);
  const [hasMessages, setHasMessages] = useState(false);

  const fadeInUpStyle = {
    animation: "fadeInUp 0.6s ease-out forwards",
  };

  const MessageData = [
    { id: 1, message: "Hi", sender: "user" },
    { id: 2, message: "Hello! How can I assist you today?", sender: "bot" },

    {
      id: 5,
      message: `I need "Acceptance and Commitment Therapy" idea`,
      sender: "user",
    },
    {
      id: 4,
      message:
        "Sure! Acceptance and Commitment Therapy (ACT) is a form of psychotherapy that uses mindfulness and behavioral change strategies to help individuals accept their thoughts and feelings rather than fighting or feeling guilty for them.",
      sender: "bot",
    },
  ];

  const watchedMessage = watch("message");

  const onSubmit = (data) => {
    console.log("Input data:", data.message);

    setHasMessages(true);

    // Add user message
    const userMessage = {
      id: sampleData.length + 1,
      message: data.message,
      sender: "user",
    };
    setSampleData((prev) => [...prev, userMessage]);

    // Add bot response after a delay
    setTimeout(() => {
      // Find the next unused bot message from MessageData
      const usedBotMessages = sampleData.filter((msg) => msg.sender === "bot").map((msg) => msg.message);
      const nextBotMsg = MessageData.find(
        (msg) => msg.sender === "bot" && !usedBotMessages.includes(msg.message)
      );

      const botReply = nextBotMsg
        ? { ...nextBotMsg, id: sampleData.length + 2 }
        : {
            id: sampleData.length + 2,
            message: "I'm here to help! Tell me more.",
            sender: "bot",
          };

      setSampleData((prev) => [...prev, botReply]);
    }, 800);

    reset();
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
          className={`flex-1 transition-all duration-1000 ease-in-out overflow-y-auto px-6 pt-6 pb-24 ${
            hasMessages && sampleData.length > 0
              ? "opacity-100 transform translate-y-5"
              : "opacity-0 transform translate-y-10 pointer-events-none"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-4">
              {sampleData.length > 0 &&
                sampleData?.map((item) => (
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
                      <p className="text-lg">{item.message}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div
          className={`transition-all  duration-500 ease-in-out z-10 ${
            hasMessages
              ? "-translate-x-1/2 -translate-y-1/3 z-50 absolute bottom-20 left-1/2 transform w-full px-6"
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
                className={`py-8 pr-20 text-white w-full transition-all duration-500 ${
                  hasMessages
                    ? "bg-[#FFFFFF33]  backdrop-blur-md border border-white/20"
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

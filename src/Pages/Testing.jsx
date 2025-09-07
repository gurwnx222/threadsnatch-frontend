import { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

const Testing = () => {
  const [backgroundStyle, setBackgroundStyle] = useState("hero");

  const [showMenu, setshowMenu] = useState(false);
  const [isOpen, setisOpen] = useState(false);

  // For Real time
  // const currentTime = new Date();
  // const timeOnly = currentTime.toLocaleTimeString([], {
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   hour12: true,
  // });

  // state for mesage and inout
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); //array for all messages

  // Testinf bot logic
  const getBotResponse = (msg) => {
    const lowerMsg = msg.toLowerCase();

    // for links
    if  (/https:\/\/(?:www\.)?threads\.(?:net|com)\/\S+/.test(lowerMsg)) {
      return (
        "🔗 Thanks! We’ve detected your Threads link. Processing it now...\n" +
        "👉 [Click here to download](#)"
      );
    }

    if (lowerMsg.includes("download")) {
      return "📥 To download from Threads, just paste the post URL above and click download!";
    } else if (lowerMsg.includes("api")) {
      return "🧑‍💻 Our Threads API helps you fetch post content easily. View docs at: https://threadsnatch.com/api-docs";
    } else if (lowerMsg.includes("pricing")) {
      return "💰 Threadsnatch is free for basic use. For high-volume API access, check out our pricing page.";
    } else if (lowerMsg.includes("how to use")) {
      return "🛠️ 1. Paste any Threads link\n2. Click download\n3. Get images/videos instantly.\nYou can also try our API!";
    } else if (lowerMsg.includes("support")) {
      return "📩 Reach out to us anytime at support@threadsnatch.com";
    } else if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
      return "Hey there! 😊 How can I assist you today?";
    } else if (/(https:\/\/(www\.)?threads\.net\/[^\s]+)/.test(lowerMsg)) {
      return "🔗 Thanks! We’ve detected your Threads link. Processing it now...";
    } else {
      return "😕 Sorry, I didn’t get that. Try using the menu or typing what you need.";
    }
  };

  // Handler to send messages
  const handleSend = (customInput = null) => {
    const messageToSend = customInput !== null ? customInput : input;

    if (messageToSend.trim() === "") return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const userMessage = {
      sender: "user",
      text: messageToSend,
      time: time,
    };

    // Add user message
    setMessages((prev) => [...prev, userMessage]);

    // Add "typing..." indicator
    const typingMessage = {
      sender: "bot",
      text: "Typing...",
      time: time,
      isTyping: true, // 👈 flag for animation
    };

    setMessages((prev) => [...prev, typingMessage]);

    setTimeout(() => {
      const botResponse = {
        sender: "bot",
        text: getBotResponse(messageToSend),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };

      // Replace "Typing..." with real response
      setMessages((prev) => {
        const withoutTyping = prev.filter((msg) => !msg.isTyping);
        return [...withoutTyping, botResponse];
      });
    }, 700);

    setInput("");
  };

  // for referesh button
  const handleRefresh = () => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const greeting = {
      sender: "bot",
      text: "👋 Welcome to Threadsnatch! How can I help you today?",
      time: time,
      options: [
        "Download from Threads",
        "Get API Access",
        "Pricing",
        "How to Use",
        "Contact Support",
      ],
    };

    setMessages([greeting]);
  };

  // auto scrolling
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const greeting = {
      sender: "bot",
      text: "👋 Welcome to Threadsnatch! How can I help you today?",
      time: time,
      options: [
        "Download from Threads",
        "Get API Access",
        "Pricing",
        "How to Use",
        "Contact Support",
      ],
    };

    setMessages([greeting]);
  }, []);

  // for click on home options
  const handleHamburgerBtn = () => {
    setisOpen(false);
  };

  return (
    <div className="bg-gray-500 w-full h-screen font-montserrat">
      {/* Dynamic Background with smooth transition */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-cover bg-center z-0 transition-all duration-1000 ease-in-out ${
          backgroundStyle === "proof"
            ? "opacity-0"
            : "opacity-100 animate-moveBg"
        }`}
        style={{ backgroundImage: "url('/BG-img1.jpg')" }}
      ></div>

      {/* Lavender background for proof section */}
      <div
        className={`fixed top-0 left-0 w-full h-full z-0 transition-all duration-1000 ease-in-out ${
          backgroundStyle === "proof" ? "opacity-100 bg-[#e6e6fa]" : "opacity-0"
        }`}
      ></div>
      {!isOpen && (
        <div
          className="fixed top-[700px] right-14 cursor-pointer z-50"
          onClick={() => setisOpen(true)}
        >
          <div className="relative p-3 rounded-full bg-white  shadow-md outline outline-2 outline-[#55698b] hover:scale-105 transition duration-200">
            <FontAwesomeIcon
              icon={faMessage}
              beat
              size="lg"
              style={{ color: "#55698b" }}
            />

            {/*  Notification Dot */}
            <span className="absolute -top-0 -right-0 h-3 w-3 bg-red-500 rounded-full "></span>
          </div>
        </div>
      )}

      {/* Chatbot container */}
      {isOpen && (
        <section className="fixed  lg:w-[28%] w-80 h-[75%]  z-50 text-white rounded-xl float-right top-36 lg:right-10 right-6 bg-gradient-to-bl from-[#EFFAFD] to-[#8FB6C2] drop-shadow-[0.5px_0.5px_4px_#0095FF] font-montserrat">
          {/* Header of chatbot */}
          <div className="text-black flex justify-between px-4 text-2xl py-2 text-center">
            {/* Hamburger */}
            <button onClick={() => setshowMenu(!showMenu)}>☰</button>

            <span className="flex flex-row justify-center items-center gap-3 text-3xl">
              {/* referesh */}
              <button onClick={handleRefresh}>
                <svg
                  width="25px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.793 2.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L14.086 7H12.5C8.952 7 6 9.952 6 13.5S8.952 20 12.5 20s6.5-2.952 6.5-6.5a1 1 0 1 1 2 0c0 4.652-3.848 8.5-8.5 8.5S4 18.152 4 13.5 7.848 5 12.5 5h1.586l-1.293-1.293a1 1 0 0 1 0-1.414z"
                    fill="#0D0D0D"
                  />
                </svg>
              </button>
              {/* Minimize */}
              <button onClick={() => setisOpen(false)}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19"
                    stroke="#111928"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </span>
          </div>

          <hr className="border-gray-500" />

          {/* Blur Overlay */}
          {showMenu && (
            <div
              className="absolute top-0 left-0 w-full h-full backdrop-blur-sm  bg-black/30 z-10 rounded-xl"
              onClick={() => setshowMenu(false)}
            ></div>
          )}

          {/* Dropdown Menu  */}
          {showMenu && (
            <div className="absolute top-12 left-0 w-full z-20 px-4 py-2 bg-gray-300   text-black shadow-md rounded-b-xl">
              <button
              // pointing to homme page
                onClick={() => {window.location.href = "/";}}
                className="w-full text-left hover:bg-gray-100 px-2 py-1 rounded"
              >
                Home
              </button>
            </div>
          )}

          <div className="relative z-0">
            {/* Messages */}
            <div className="flex flex-col gap-1.5 text-sm  h-[470px] overflow-scroll-none overflow-x-hidden mb-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`px-4 flex flex-col gap-2 mt-4 ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div className="flex gap-1 text-[10px] text-[#535353]">
                    {msg.sender === "bot" && (
                      <img className="w-4" src="./favicon.svg" alt="Logo" />
                    )}
                    <span>{msg.sender === "bot" ? "TS" : "You"}</span>
                    <span>{msg.time}</span>
                  </div>

                  <div
                    className={`w-auto max-w-[75%] h-auto bg-[#D7D7D7] text-black rounded-xl p-2 ${
                      msg.sender === "bot"
                        ? "rounded-tl-none"
                        : "rounded-tr-none"
                    }`}
                  >
                    {msg.isTyping ? (
                      <div className="flex gap-1 items-end">
                        <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:.1s]"></span>
                        <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:.2s]"></span>
                        <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:.3s]"></span>
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>

                  {/* Render options if present */}
                  {msg.options && (
                    <div className="flex gap-2 flex-wrap mt-1">
                      {msg.options.map((option, index) => (
                        <button
                          key={index}
                          className="bg-[#0095FF] text-white text-xs px-3 py-1 rounded-lg hover:bg-[#0077cc]"
                          onClick={() => {
                            setTimeout(() => handleSend(option)); // slight delay so input state updates before send
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* invisible scroll target */}
              <div ref={messagesEndRef} />
            </div>

            {/* input and send box */}
            <div className="relative lg:top-0 top-10">
              <hr className="border-gray-500 relative" />

              <div className="flex gap-5 px-4 mt-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type Something..."
                  className="bg-transparent w-full outline-none font-medium text-black placeholder:text-gray-600"
                />
                <button onClick={handleSend}>
                  <img
                    src="svgviewer-png-output.png"
                    className=" text-right"
                    alt="send"
                  ></img>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/*Random text for testing  */}
      <div className="relative text-white top-[2000px]">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores
        quam natus est eum magni laborum voluptas consequatur minus molestias
        dolorem sequi cumque corrupti quae delectus sapiente sed odit odio
        maiores, omnis soluta veritatis veniam architecto hic impedit! Quos vero
        ipsum architecto optio eum commodi quae, quod amet ex excepturi quam
        modi a repellat. Deleniti, ad quam perspiciatis est libero adipisci
        minus ducimus rem nisi possimus eaque commodi doloribus porro qui illum
        ullam nam vitae. Magni ratione perspiciatis ducimus praesentium, harum
        consequatur atque dicta esse vero quo cupiditate veniam est saepe animi
        recusandae earum nihil laudantium, vel tempora natus, sit corrupti!
      </div>
    </div>
  );
};

export default Testing;

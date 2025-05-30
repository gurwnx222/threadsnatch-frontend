import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

export default function SubscribeModal({ onClose }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = axios.get(
        "https://ishpbouaa0.execute-api.us-east-1.amazonaws.com/"
      );
      console.log(response);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div className="fixed inset-0 bg-gray-950 bg-opacity-70 flex items-center justify-center z-50">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="bg-[#2C2C2E] text-white rounded-2xl m-4 p-6 w-[400px] relative shadow-lg"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
        >
          <IoMdClose />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">
          Unlock Unlimited Access – <br />
          Subscribe Now
        </h2>

        {/* Features List */}
        <ul className="space-y-2 mb-6 text-sm">
          <li className="flex items-start">
            {/* svg for all ticks */}
            <svg
              width="14"
              height="13"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-1 mr-2"
            >
              <path
                d="M12.9719 0.250885C12.7423 0.123271 12.4898 0.0421388 12.2288 0.0121228C11.9679 -0.0178931 11.7036 0.00379507 11.451 0.0759489C11.1984 0.148103 10.9625 0.269308 10.7567 0.432644C10.551 0.595979 10.3795 0.798243 10.2519 1.02789L6.53892 7.70989L4.41392 5.58489C4.22942 5.39386 4.00874 5.2415 3.76473 5.13668C3.52072 5.03186 3.25828 4.97669 2.99272 4.97438C2.72716 4.97208 2.4638 5.02268 2.21801 5.12324C1.97222 5.2238 1.74891 5.37231 1.56113 5.5601C1.37334 5.74788 1.22484 5.97118 1.12427 6.21698C1.02371 6.46277 0.97311 6.72613 0.975417 6.99169C0.977725 7.25725 1.0329 7.51969 1.13772 7.76369C1.24253 8.0077 1.3949 8.22839 1.58592 8.41289L5.58592 12.4129C5.96392 12.7919 6.47392 12.9999 6.99992 12.9999L7.27692 12.9799C7.58347 12.937 7.87588 12.8236 8.13114 12.6485C8.38639 12.4734 8.59753 12.2414 8.74792 11.9709L13.7479 2.97089C13.8756 2.74134 13.9568 2.48889 13.9869 2.22797C14.0169 1.96704 13.9953 1.70274 13.9233 1.45016C13.8512 1.19758 13.7301 0.961673 13.5669 0.755901C13.4036 0.550128 13.2015 0.378523 12.9719 0.250885Z"
                fill="#B3B3B3"
              />
            </svg>
            Unlimited credits for downloading media from threads
          </li>
          <li className="flex items-start">
            <svg
              width="14"
              height="13"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-1 mr-2"
            >
              <path
                d="M12.9719 0.250885C12.7423 0.123271 12.4898 0.0421388 12.2288 0.0121228C11.9679 -0.0178931 11.7036 0.00379507 11.451 0.0759489C11.1984 0.148103 10.9625 0.269308 10.7567 0.432644C10.551 0.595979 10.3795 0.798243 10.2519 1.02789L6.53892 7.70989L4.41392 5.58489C4.22942 5.39386 4.00874 5.2415 3.76473 5.13668C3.52072 5.03186 3.25828 4.97669 2.99272 4.97438C2.72716 4.97208 2.4638 5.02268 2.21801 5.12324C1.97222 5.2238 1.74891 5.37231 1.56113 5.5601C1.37334 5.74788 1.22484 5.97118 1.12427 6.21698C1.02371 6.46277 0.97311 6.72613 0.975417 6.99169C0.977725 7.25725 1.0329 7.51969 1.13772 7.76369C1.24253 8.0077 1.3949 8.22839 1.58592 8.41289L5.58592 12.4129C5.96392 12.7919 6.47392 12.9999 6.99992 12.9999L7.27692 12.9799C7.58347 12.937 7.87588 12.8236 8.13114 12.6485C8.38639 12.4734 8.59753 12.2414 8.74792 11.9709L13.7479 2.97089C13.8756 2.74134 13.9568 2.48889 13.9869 2.22797C14.0169 1.96704 13.9953 1.70274 13.9233 1.45016C13.8512 1.19758 13.7301 0.961673 13.5669 0.755901C13.4036 0.550128 13.2015 0.378523 12.9719 0.250885Z"
                fill="#B3B3B3"
              />
            </svg>
            Early updates to new features
          </li>
        </ul>

        {/* Email + Subscribe */}
        <div className="flex items-center border border-[#FFFFFF33] bg-[#2C2C2E] rounded-full px-4 py-2">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter Your Email"
            className="bg-transparent outline-none text-sm placeholder-gray-400 flex-1 text-white"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1 rounded-full ml-2 transition"
          >
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
}

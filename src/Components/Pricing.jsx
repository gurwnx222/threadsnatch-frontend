import React from 'react';
import { API_LINK } from '../utils/contants';

const plan = {
  title: "Pro",
  price: "$0",
  text: "Unlock 5000 free API calls and experience our lightning-fast, precision Meta Threads API completely free. Don't miss your chance to supercharge your applications—claim your free access today before this exclusive offer runs out!",
  features: [
    "Increased API call limits for expanding projects",
    "Priority support and faster processing times",
    "Optimized performance without overspending",
    "Powered by robust AWS Lambda scalability",
    "Enhanced scalability for intensive use cases"
  ],
};




const Pricing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 ">
      <div className="max-w-md w-full rounded-2xl shadow-lg p-6 text-center transition-transform duration-300 transform hover:scale-105 bg-[#1D1D1E] text-white">
        <div className='flex gap-4'>
          <h2 className="text-2xl font-bold mb-4">{plan.title}</h2> <span className='bg-[#1DA1F2] text-white text-xs h-4 rounded-2xl flex justify-center items-center p-3'>Popular</span>
        </div>
        <p className='text-2xl line-through text-[#9C8D8D] text-left'>$13.99/mo</p>
        <p className="text-3xl font-extrabold mb-6 text-left">{plan.price}/mo</p>
        <p className="text-base mb-6 text-justify text-[#9C8D8D]">{plan.text}</p> 


        <a href={API_LINK}
        target="__blank"><button
          className="px-4 py-2 rounded-xl text-xl bg-blue-600 text-white w-full mb-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label={`Get started with the ${plan.title} plan`}
        >Get Started
          
        </button></a>

        <ul className="space-y-2 text-left text-white">
          <div className="text-xl font-medium mb-2">What's Included:</div>
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start text-base">
              ✅ <span className="ml-2">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Pricing;

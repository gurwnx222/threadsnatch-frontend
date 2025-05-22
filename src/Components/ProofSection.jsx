import React from "react";
import CountUp from "./ui/count-up";
const ProofSection = () => {
  const stats = [
    {
      number: (
        <CountUp
          from={0}
          to={10}
          separator=","
          direction="up"
          duration={1}
          className="count-up-text"
        />
      ),
      label: "API Subscribers",
    },
    {
      number: (
        <CountUp
          from={50}
          to={500}
          separator=","
          direction="up"
          duration={1}
          className="count-up-text"
        />
      ),
      label: "Website Users",
      sublabel: "in 4 weeks",
    },
    {
      number: (
        <CountUp
          from={10}
          to={100}
          separator=","
          direction="up"
          duration={1}
          className="count-up-text"
        />
      ),
      label: "Website User",
      sublabel: "Experience",
    },
  ];

  return (
    <div className="relative z-10 w-full py-16 md:py-24 px-4 md:px-8 bg-gray-50 font-montserrat">
      <section
        id="proof-section"
        className="relative z-10 w-full py-16 md:py-24 px-4 md:px-8 bg-gray-50 font-montserrat"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-start text-left">
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-2">
                  {stat.number}
                  {/* Show plus icon for all except index 1 */}
                  {index !== 2 && (
                    <span className="ml-2 text-3xl text-gray-900 font-bold">
                      +
                    </span>
                  )}
                </div>
                <div className="text-gray-800">
                  <div className="text-lg md:text-xl font-medium">
                    {stat.label}
                  </div>
                  {stat.sublabel && (
                    <div className="text-lg md:text-xl font-medium">
                      {stat.sublabel}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="proof-section"
        className="relative z-10 w-full py-16 md:py-24 px-4 md:px-8 bg-gray-50 font-montserrat"
      >
        ss
      </section>
    </div>
  );
};

export default ProofSection;

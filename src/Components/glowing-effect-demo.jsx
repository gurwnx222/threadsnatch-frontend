import React from "react";
import { Zap, Plug, Shield, Target, Plus } from "lucide-react";
import { GlowingEffect } from "../Components/ui/glowing-effect";

export default function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Zap className="h-4 w-4 text-gray-900" />}
        title="Lightning-Fast Performance"
        description="4-Second Scraping (Slower Than Your Morning Coffee Sip) Outpace competitors stuck waiting on rate-limited APIs."
      />
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Target className="h-4 w-4 text-grey-900" />}
        title="Precision Accuracy"
        description="Every. Single. Link. Scraped with high precision so when you Miss data? We'll scrape it again"
      />
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Plug className="h-4 w-4 text-gray-900" />}
        title="Effortless Integration"
        description="Simply paste a meta threads post link and start scraping—our API fits right into your existing setup with zero hassle."
      />
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Shield className="h-4 w-4 text-gray-900" />}
        title="Unmatched Reliability"
        description="Trust our high success rate to consistently deliver every desired link, so you never miss a beat."
      />
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Plus className="h-4 w-4 text-gray-900" />}
        title="Scalable Solutions"
        description="From small projects to enterprise-level operations, our infrastructure scales with your growing data needs."
      />
    </ul>
  );
}

const GridItem = ({ area, icon, title, description }) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border border-slate-400 p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-gray-900 md:text-2xl/[1.875rem]">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-gray-700 md:text-base/[1.375rem] [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

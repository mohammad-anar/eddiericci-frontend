import { Card } from "@/components/ui/card";
import Image from "next/image";
import image1 from "@/assets/home/keyFeatureImage1.png";

const KeyFeatureSection = () => {
  return (
    <section className="bg-black py-12 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Key <span className="text-[#00ff00]">Features</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore what makes K10 the premier platform for football talent
            management and networking.
          </p>
        </div>

        {/* Feature 1 - Performance Analytics */}
        <div className="relative">
          <div className="relative h-64 sm:h-80 lg:h-[500px] bg-[#1a1a1a] rounded-lg border-transparent overflow-hidden">
            <Image
              src={image1}
              alt="Performance analytics"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full flex items-center justify-center flex-col bg-black/50 p-8 backdrop-blur-sm">
            <h4 className="text-3xl mb-5 font-bold text-white ">
              Performance Analytics
            </h4>
            <p className="text-sm text-gray-400 text-center max-w-4xl">
              Track player stats, match performance, and skill growth with
              detailed visual dashboards. Coaches and scouts can instantly
              compare players through dynamic metrics like speed, accuracy,
              stamina, and success rate, all powered by real-time data.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Star Search",
              description:
                "Discover emerging talents through advanced filtering and AI-powered recommendations.",
            },
            {
              title: "Elite School",
              description:
                "Access premium training programs and coaching from world-class professionals.",
            },
            {
              title: "Unified Profile",
              description:
                "Showcase your skills with a comprehensive player profile that scouts watch.",
            },
          ].map((feature, i) => (
            <Card
              key={i}
              className="bg-[#1a1a1a] border border-[#333333] p-6 space-y-4 hover:border-[#00ff00] transition"
            >
              <h4 className="text-lg font-bold text-white">{feature.title}</h4>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatureSection;

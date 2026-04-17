import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const MembershipPlanSection = () => {
  return (
    <section className="bg-black py-12 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 ">
      <div className="container space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white">
            Membership <span className="text-primary">Plans</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              name: "Player",
              price: "$19.99",
              features: [
                "Production of analysis materials",
                "Upload videos, photos, and game reports",
                "Exposure of your profile to licensed agents and professional clubs",
                "Transfer of your analysis materials to other clubs",
              ],
            },
            {
              name: "Coaches",
              price: "$39.99",
              features: [
                "Production of analysis materials",
                "Upload videos, photos, courses and certificates",
                "Exposure of your profile to licensed agents and professional clubs",
                "Transfer of your analysis materials to other clubs",
              ],
            },
            {
              name: "Football Agent",
              price: "$89.99",
              features: [
                "Access to all athlete and coach profiles on the platform",
                "Detailed analysis of athletes' materials",
                "Direct contact wth athletes' parents",
                "Faster and Moro objective pre-field analysis",
                "-Promotion of tryouts and events on the platform"
              ],
            },
            {
              name: "Professional Club",
              price: "$159.00",
              features: [
                "Access to all athlete and coach profiles on the platform",
                "Detailed analysis of athletes' materials",
                "Direct contact wth athletes' parents",
                "Faster and Moro objective analysis boforo sonding scouts to the field",
                "Display or club’s trials on the platform"
              ],
            },
            {
              name: "Grassroot Clubs",
              price: "$300.00",
              features: [
                "Production of analysis materials for up to 3 coaches and 30 players",
                "Upload videos, photos, and game reports",
                "Exposure of your club profile to licensed agents and professional clubs",
                "Display of your club’s trials of the platform",
                "Commission for each game report submitted by an athlete"
              ],
            },
          ].map((plan, i) => (
            <Card
              key={i}
              className="bg-cardBg border border-border p-6 space-y-6 flex flex-col hover:border-primary transition h-fit"
            >
              <div>
                <h4 className="text-xl lg:text-2xl text-center font-bold text-white">{plan.name}</h4>
                <div className="text-2xl lg:text-3xl font-bold text-white text-center mt-2">
                  {plan.price} <span className="text-gray-400 text-xl">/month</span>
                </div>
              </div>
              <ul className="space-y-2 flex-grow">
                {plan.features.map((feature, j) => (
                  <li
                    key={j}
                    className="text-sm text-gray-400 flex items-start"
                  >
                    <span className="text-primary mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant={"outline"} className="w-full bg-primary text-black rounded-full bg-transparent text-white cursor-pointer hover:bg-[#00dd00]">
                Choose Plan
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipPlanSection;

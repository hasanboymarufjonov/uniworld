import visaImg from "../assets/Visa&Travel Advice.png";
import applicationImg from "../assets/Applicaiton guidance.png";
import matchImg from "../assets/operator.jpg";

const AssistanceCards = () => {
  return (
    <div className="bg-primary">
      <div className="text-center">
        <h2 className="text-4xl pt-10">How UniWorld Can Help You</h2>
        <p className="text-base mt-1">
          Our team of advisors is ready to support you at every step of your
          study abroad journey.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 md:mx-32  py-10">
        <a class="flex flex-col" href="#">
          <img
            class="w-full h-[300px] object-cover"
            src={visaImg}
            alt="Image Description"
          />
          <div class="p-4 md:p-5">
            <h3 class="text-lg font-bold text-gray-800">
              Visa & Travel Advice{" "}
            </h3>
            <p class="mt-1 text-gray-500">
              Get help after application, all the way to your first day at
              university.
            </p>
          </div>
        </a>

        <a class="flex flex-col " href="#">
          <img
            class="w-full h-[300px] object-cover"
            src={matchImg}
            alt="Image Description"
          />
          <div class="p-4 md:p-5">
            <h3 class="text-lg font-bold text-gray-800">
              Application Guidance
            </h3>
            <p class="mt-1 text-gray-500">
              We'll get you to the right place to start your application.
            </p>
          </div>
        </a>
        <a class="flex flex-col" href="#">
          <img
            class="w-full h-[300px] object-cover"
            src={applicationImg}
            alt="Image Description"
          />
          <div class="p-4 md:p-5">
            <h3 class="text-lg font-bold text-gray-800">
              Find your best matches{" "}
            </h3>
            <p class="mt-1 text-gray-500">
              See programs that best match your eligibility and aspirations.
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default AssistanceCards;

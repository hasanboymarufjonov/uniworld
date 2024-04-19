import React from "react";

const Hero = () => {
  return (
    <div className="bg-primary">
      <div class="relative overflow-hidden">
        <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div class="max-w-7xl text-center mx-auto">
            <div class="mt-5 max-w-9xl">
              <h2 class="block text-4xl md:text-5xl lg:text-[88px] ">
                Find The
              </h2>
              <div class="flex justify-center items-center mt-8">
                <h2 class="block font-semibold text-4xl md:text-5xl lg:text-[88px] ml-2">
                  Right
                </h2>
                <img
                  src="https://www.easyuni.com/static/assets/img/webp/anime-hat.webp"
                  alt=""
                  className="w-12 md:w-16 lg:w-32 ml-4"
                />
                <h2 class="block font-semibold text-4xl md:text-5xl lg:text-[88px] ml-2">
                  University
                </h2>
              </div>
              <div class="lg:flex lg:justify-center items-center mt-8 ">
                <div className="flex">
                  <h2 class="block  text-4xl md:text-5xl lg:text-[88px] md:ml-2 ml-10">
                    For You{" "}
                  </h2>
                  <div className="flex">
                    {" "}
                    <img
                      src="https://www.easyuni.com/static/assets/img/anime-guy1.png"
                      alt=""
                      className="w-12 md:w-16 lg:w-24 ml-4"
                    />
                    <img
                      src="https://www.easyuni.com/static/assets/img/anime-guy2.png"
                      alt=""
                      className="w-12 md:w-16 lg:w-24 -ml-4"
                    />
                    <img
                      src="https://www.easyuni.com/static/assets/img/anime-guy3.png"
                      alt=""
                      className="w-12 md:w-16 lg:w-24 -ml-4"
                    />
                  </div>
                </div>
                <h2 class="block  text-4xl md:text-5xl lg:text-[88px] ml-2 md:mt-0 mt-8">
                  Worldwide
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

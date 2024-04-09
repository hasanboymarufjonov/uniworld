import React from "react";

const Hero = () => {
  return (
    <div className="bg-primary">
      <div class="relative overflow-hidden">
        <div
          aria-hidden="true"
          class="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
        >
          {/* <div class="bg-gradient-to-r from-violet-300/50 to-purple-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem] "></div>
          <div class="bg-gradient-to-tl from-blue-50 via-blue-100 to-blue-50 blur-3xl w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem] "></div> */}
        </div>

        <div class="relative z-10">
          <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            <div class="max-w-7xl text-center mx-auto">
              {/* <p class="inline-block text-sm font-medium bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500  ">
                Uniworld v1
              </p> */}

              <div class="mt-5 max-w-9xl">
                <h2 class="block   text-4xl md:text-5xl lg:text-[88px] ">
                  Find The
                </h2>
                <h2 class="block font-semibold  text-4xl md:text-5xl lg:text-[88px] mt-8">
                  Right 🎓 University{" "}
                </h2>
                <h2 class="block   text-4xl md:text-5xl lg:text-[88px] mt-8 ">
                  For You 🌎 in the World
                </h2>
              </div>

              {/* <div class="mt-5 max-w-3xl">
                <p class="text-lg text-gray-600 ">
                  Preline UI is an open-source set of prebuilt UI components,
                  ready-to-use examples and Figma design system based on the
                  utility-first Tailwind CSS framework.
                </p>
              </div> */}

              {/* <div class="mt-8 gap-3 flex justify-center">
                <a
                  class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none "
                  href="#"
                >
                  Get started
                  <svg
                    class="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </a>
                <a
                  class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none  "
                  href="#"
                >
                  <svg
                    class="flex-shrink-0 size-4"
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.875 18C8.531 18 9.875 16.656 9.875 15V12H6.875C5.219 12 3.875 13.344 3.875 15C3.875 16.656 5.219 18 6.875 18Z"
                      fill="#0ACF83"
                    ></path>
                    <path
                      d="M3.875 9C3.875 7.344 5.219 6 6.875 6H9.875V12H6.875C5.219 12 3.875 10.656 3.875 9Z"
                      fill="#A259FF"
                    ></path>
                    <path
                      d="M3.875 3C3.875 1.344 5.219 0 6.875 0H9.875V6H6.875C5.219 6 3.875 4.656 3.875 3Z"
                      fill="#F24E1E"
                    ></path>
                    <path
                      d="M9.87501 0H12.875C14.531 0 15.875 1.344 15.875 3C15.875 4.656 14.531 6 12.875 6H9.87501V0Z"
                      fill="#FF7262"
                    ></path>
                    <path
                      d="M15.875 9C15.875 10.656 14.531 12 12.875 12C11.219 12 9.87501 10.656 9.87501 9C9.87501 7.344 11.219 6 12.875 6C14.531 6 15.875 7.344 15.875 9Z"
                      fill="#1ABCFE"
                    ></path>
                  </svg>
                  Preline Figma
                </a>
              </div> */}
            </div>
          </div>
        </div>

        {/* <div class="mt-10 relative max-w-5xl mx-auto mb-10 px-4">
          <div class="w-full object-cover h-96 sm:h-[480px] bg-[url('https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1981&q=80')] bg-no-repeat bg-center bg-cover rounded-xl"></div>

          <div class="absolute inset-0 size-full">
            <div class="flex flex-col justify-center items-center size-full">
              <a
                class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                <svg
                  class="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Play the overview
              </a>
            </div>
          </div>

          <div class="absolute bottom-12 -start-20 -z-[1] size-48 bg-gradient-to-b from-orange-500 to-white p-px rounded-lg dark:to-slate-900">
            <div class="bg-white size-48 rounded-lg dark:bg-slate-900"></div>
          </div>

          <div class="absolute -top-12 -end-20 -z-[1] size-48 bg-gradient-to-t from-blue-600 to-cyan-400 p-px rounded-full">
            <div class="bg-white size-48 rounded-full dark:bg-slate-900"></div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Hero;

// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// const slides = [
//   {
//     title: "Plant a Tree, Plant Hope",
//     description: "Join our mission to create a greener world",
//     image: "/images/img1.jpg",
//   },
//   {
//     title: "Every Tree Counts",
//     description: "Make a difference with every sapling you plant",
//     image: "/images/img2.jpg",
//   },
//   {
//     title: "Green Future, Bright Future",
//     description: "Investing in nature is investing in our future",
//     image: "/images/img3.jpg",
//   },
// ];

// const CurvedSlider = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="relative w-full h-[700px] md:h-[500px] lg:h-[600px] overflow-hidden">
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentSlide}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.5 }}
//           className="absolute inset-0"
//           style={{
//             // clipPath:
//             //   "polygon(0 0, 100% 0, 100% 70%, 95% 75%, 90% 72%, 85% 76%, 80% 73%, 75% 77%, 70% 74%, 65% 78%, 60% 75%, 55% 79%, 50% 76%, 45% 80%, 40% 77%, 35% 81%, 30% 78%, 25% 82%, 20% 79%, 15% 83%, 10% 80%, 5% 84%, 0 80%)",
//             // clipPath:
//             //   "polygon(0 0, 100% 0, 100% 70%, 95% 75%, 90% 72%, 85% 76%, 80% 73%, 75% 77%, 70% 74%, 65% 78%, 60% 75%, 55% 79%, 50% 76%, 45% 79%, 40% 76%, 35% 75%, 30% 78%, 25% 76%, 20% 72%, 15% 76%, 10% 73%, 5% 75%, 0 70%)",
//             clipPath:
//               "polygon(0 0, 100% 0, 100% 70%, 95% 75%, 90% 73%, 85% 76%, 80% 74%, 75% 77%, 70% 74%, 65% 78%, 60% 76%, 55% 79%, 50% 77%, 45% 80%, 40% 76%, 35% 79%, 30% 75%, 25% 78%, 20% 76%, 15% 79%, 10% 75%, 5% 78%, 0 70%)",
//           }}
//         >
//           <Image
//             src={slides[currentSlide].image}
//             alt={slides[currentSlide].title}
//             layout="fill"
//             objectFit="cover"
//             quality={100}
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-40" />
//         </motion.div>
//       </AnimatePresence>
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="text-center text-white z-10 px-4">
//           <motion.h2
//             key={`title-${currentSlide}`}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.5 }}
//             className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
//           >
//             {slides[currentSlide].title}
//           </motion.h2>
//           <motion.p
//             key={`desc-${currentSlide}`}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="text-lg md:text-xl lg:text-2xl"
//           >
//             {slides[currentSlide].description}
//           </motion.p>
//         </div>
//       </div>
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`w-3 h-3 rounded-full ${
//               index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
//             }`}
//             onClick={() => setCurrentSlide(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CurvedSlider;

// // ملاحظات:
// // خاصية clipPath تُستخدم لتحديد الشكل  أشكال معقدة (مثل الدوائر، الأشكال غير المنتظمة، إلخ)
// // ---------
// // clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)";
// //*  شكل مثلث
// // -----------
// // clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 100%)";
// //*قوس
// // ------------
// // clipPath: "polygon(0 0, 100% 0, 100% 70%, 80% 90%, 20% 90%, 0 70%)";
// // ------
// // clipPath: "circle(50% at 50% 50%)";
// //* دائري
// //-------
// // clipPath: "ellipse(50% 30% at 50% 50%)";
// //*بيضاوي

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Plant a Tree, Plant Hope",
    description: "Join our mission to create a greener world",
    image: "/images/img1.jpg",
  },
  {
    title: "Every Tree Counts",
    description: "Make a difference with every sapling you plant",
    image: "/images/img2.jpg",
  },
  {
    title: "Green Future, Bright Future",
    description: "Investing in nature is investing in our future",
    image: "/images/img3.jpg",
  },
];

const CurvedSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[500px] lg:h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 shadow-lg" // Add shadow class here
          // style={{
          //   clipPath:
          //     "polygon(0 0, 100% 0, 100% 70%, 100% 80%, 90% 73%, 87% 80%, 80% 74%, 75% 77%, 70% 74%, 65% 78%, 60% 76%, 55% 79%, 50% 77%, 45% 80%, 40% 76%, 35% 79%, 30% 75%, 25% 78%, 20% 76%, 15% 79%, 10% 75%, 5% 78%, 0 80%)",
          // }}
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white z-10 px-4">
          <motion.h2
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            {slides[currentSlide].title}
          </motion.h2>
          <motion.p
            key={`desc-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl"
          >
            {slides[currentSlide].description}
          </motion.p>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CurvedSlider;

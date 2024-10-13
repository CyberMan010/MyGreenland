// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { Canvas } from "@react-three/fiber";
// import Earth from "./Earth";

// const HeroSection = () => {
//   return (
//     <section className="h-screen relative overflow-hidden bg-white">
//       <div className="absolute inset-0">
//         <Canvas>
//           <ambientLight intensity={0.5} />
//           <pointLight position={[10, 10, 10]} />
//           <Earth />
//         </Canvas>
//       </div>
//       <div className="relative z-10 h-full flex items-center justify-center text-white">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.5 }}
//           className="text-center"
//         >
//           <h1 className="text-7xl font-bold mb-6">Green Hope</h1>
//           <p className="text-2xl mb-8">
//             Together we plant a greener future for our planet
//           </p>
//           <motion.button
//             whileHover={{
//               scale: 1.05,
//               boxShadow: "0 0 25px rgba(0,255,0,0.5)",
//             }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-xl transition duration-300"
//           >
//             Join the Green Mission
//           </motion.button>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;


"use client";

import React from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import Earth from "./Earth";
import { ArrowRight } from "lucide-react";

const EarthSection = () => {
  return (
    <section className="min-h-screen bg-white flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left side: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 mb-10 lg:mb-0 pr-0 lg:pr-10"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-green-800 leading-tight">
              Nurture the Earth,
              <br />
              Grow the Future
            </h1>
            <p className="text-lg mb-8 text-gray-600 leading-relaxed">
              Rise up and be a catalyst for change—join us in the exhilarating
              journey of agriculture, where your passion can ignite a
              revolution, sowing seeds of hope and nurturing a thriving,
              sustainable world for generations to come!
            </p>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(85,183,107,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#55B76B] hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 flex items-center"
            >
              Join the Green Mission
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Right side: Earth */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 h-[400px] lg:h-[600px]"
          >
            <Canvas>
              <ambientLight intensity={1.0} /> {/* Increased intensity */}
              <pointLight position={[10, 10, 10]} intensity={2.0} />{" "}
              {/* Increased intensity */}
              <Earth />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EarthSection;
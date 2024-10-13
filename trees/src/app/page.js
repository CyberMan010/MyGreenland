// import Image from "next/image";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-green-50 text-green-900 font-sans">
//       <header className="p-4 bg-green-800 text-white">
//         <nav className="flex justify-between items-center max-w-6xl mx-auto">
//           <Link href="/" className="text-2xl font-bold">TreeVerse</Link>
//           <div className="space-x-4">
//             <Link href="/login" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
//               Log In
//             </Link>
//             <Link href="/signup" className="bg-white hover:bg-green-100 text-green-800 font-bold py-2 px-4 rounded transition-colors duration-300">
//               Sign Up
//             </Link>
//           </div>
//         </nav>
//       </header>

//       <main className="flex flex-col items-center justify-center p-8 text-center">
//         <h2 className="text-4xl font-bold mb-4">Discover the World of Trees</h2>
//         <p className="text-xl mb-8 max-w-2xl">
//           Explore, learn, and connect with nature's giants. Join our community of tree enthusiasts today!
//         </p>
//         <Image
//           src="/tree-illustration.svg"
//           alt="Tree illustration"
//           width={300}
//           height={300}
//           className="mb-8"
//         />
//         <div className="flex gap-4 flex-col sm:flex-row">
//           <a
//             className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300"
//             href="#explore"
//           >
//             Start Exploring
//           </a>
//           <a
//             className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold py-3 px-6 rounded-full transition-colors duration-300"
//             href="#learn"
//           >
//             Learn More
//           </a>
//         </div>
//       </main>

//       <footer className="bg-green-800 text-white py-4">
//         <div className="flex justify-center space-x-6">
//           <a href="#about" className="hover:underline">About Us</a>
//           <a href="#contact" className="hover:underline">Contact</a>
//           <a href="#privacy" className="hover:underline">Privacy Policy</a>
//         </div>
//       </footer>
//     </div>
//   );
// }

import CurvedSlider from "../components/HomeComponents/CurvedSlider";
import EarthSection from "../components/HomeComponents/EarthSection";
import ShopFeaturesSection from "../components/HomeComponents/ShopFeaturesSection";
import FeatureCards from "../components/HomeComponents/FeatureCards";
import FAQ from "../components/HomeComponents/FAQ";
import ShopSection from "../components/HomeComponents/ShopSection";




export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <CurvedSlider />
      <FeatureCards />
      <EarthSection />
      <FAQ />
      <ShopFeaturesSection />
      <ShopSection />
      
    </main>
  );
}

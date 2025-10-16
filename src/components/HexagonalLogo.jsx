const HexagonalLogo = () => {
  return (
    <div className="relative group cursor-pointer">
      <div className={`w-12 h-13 relative flex items-center justify-center 
                     transition-transform duration-300 ease-out 
                     group-hover:translate-x-1 group-hover:translate-y-1"`}>
        
        {/* Shadow that appears on hover */}
        <div className={`absolute inset-0 transition-all duration-300 opacity-0 
                       group-hover:opacity-100 group-hover:shadow-[5px_5px_15px_rgba(0,0,0,0.3)]`}
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
          }}>
        </div>

        {/* Hexagon Border Container */}
        <div className="absolute inset-0">
          <div className="w-full h-full relative">
            {/* Animated Border */}
            {/* <div className="absolute inset-0 w-full h-full transition-all duration-500"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                background: 'conic-gradient(from 0deg at 50% 50%, #3b82f6, #8b5cf6, #3b82f6)',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }}>
              <div className="w-full h-full bg-white dark:bg-gray-900 m-[1.5px]"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                }}>
              </div>
            </div> */}

            {/* Static Border */}
            {/* <div className={`absolute inset-0 w-full h-full border-2 border-gray-300 dark:border-gray-600 transition-colors duration-300 group-hover:border-transparent`}
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                background: 'conic-gradient(from 0deg at 50% 50%, #3b82f6, #8b5cf6, #3b82f6)',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 2s ease infinite'
              }}>
            </div> */}
              <svg 
                className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out 
                          `}
                viewBox="0 0 100 116"
                preserveAspectRatio="none"
              >
                <path
                  d="M50 2 L93 29 L93 87 L50 114 L7 87 L7 29 Z"
                  fill="none"
                  stroke="#63b3ed"
                  strokeWidth="3"
                />
              </svg>

            {/* Animated Gradient Border - Visible on hover */}
            <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                background: '#3b82f6',
                backgroundSize: '300% 300%',
                animation: 'gradientShift 2s ease infinite'
              }}>
              <div className="w-full h-full bg-white dark:bg-gray-900 m-[1.5px]"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                }}>
              </div>
            </div>
          </div>
        </div>

        {/* Letter N */}
        <div className="relative z-10">
          <span className={`text-lg font-bold text-gray-700 dark:text-blue-400
                          transition-all duration-0 
                          group-hover:text-transparent group-hover:bg-[#64ffda] group-hover:bg-clip-text`}>
            N
          </span>
        </div>

      </div>

      {/* Add this to your global CSS or Tailwind config */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default HexagonalLogo;





// Here's a completely different style with a modern, clean look

// const HexagonalLogo = () => {
//   return (
//     <div className="relative group cursor-pointer">
//       <div className="w-12 h-13 relative">
        
//         {/* Main Hexagon Shape */}
//         <svg 
//           className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out 
//                      group-hover:translate-x-2 group-hover:translate-y-1
//                      `}
//           viewBox="0 0 100 116"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M50 2 L93 29 L93 87 L50 114 L7 87 L7 29 Z"
//             fill="none"
//             stroke="#63b3ed"
//             strokeWidth="2"
//           />
//         </svg>

//         {/* Animated Border #0a192f */}
//         <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:shadow-[8px_8px_20px_rgba(100,255,218,0.3)]
//                       transition-all duration-500 delay-100`}
//           style={{
//             clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
//             background: '#0a192f',
//             backgroundSize: '400% 400%',
//             animation: 'gradientFlow 3s ease infinite'
//           }}>
//           <div className="w-full h-full bg-transparent m-[2px]"
//             style={{
//               clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)'
//             }}>
//           </div>
//         </div>

//         <svg 
//           className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out 
//                     `}
//           viewBox="0 0 100 116"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M50 2 L93 29 L93 87 L50 114 L7 87 L7 29 Z"
//             fill="none"
//             stroke="#63b3ed"
//             strokeWidth="3"
//           />
//         </svg>

//         <div className="absolute inset-0 flex items-center justify-center">
//           <span className={`text-xl font-bold text-slate-700 dark:text-blue-400
//                          transition-all duration-500 group-hover:scale-110 
//                          group-hover:text-transparent group-hover:bg-gradient-to-r 
//                          group-hover:from-[#64ffda] group-hover:to-[#64ffaa]
//                          group-hover:bg-clip-text`}>
//             N
//           </span>
//         </div>

//       </div>

//       <style jsx>{`
//         @keyframes gradientFlow {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HexagonalLogo;


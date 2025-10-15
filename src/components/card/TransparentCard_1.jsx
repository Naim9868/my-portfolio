// components/TransparentCard.jsx
export default function TransparentCard({ 
  children,
  title,
  subtitle,
  className = "",
  variant = "default", // "default", "dark", "colored"
  blur = true,
  padding = "p-6",
  borderRadius = "rounded-xl",
  hoverEffect = true
}) {
  const variants = {
    default: "bg-white/10 border-white/20",
    dark: "bg-black/20 border-white/10",
    colored: "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-white/30"
  };

  return (
    <div className={`
      ${variants[variant]}
      ${blur ? 'backdrop-blur-md' : ''}
      border
      ${borderRadius}
      ${padding}
      shadow-lg
      ${hoverEffect ? 'transition-all duration-300 hover:scale-105 hover:shadow-xl' : ''}
      ${className}
    `}>
      {title && (
        <div className="mb-4">
          <h3 className="text-white text-xl font-bold">{title}</h3>
          {subtitle && <p className="text-white/60 text-sm mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}










<div className="min-h-screen ">
            {/* Grid container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              
              {/* Card 1 - Basic */}
              <TransparentCard title="Basic Card" subtitle="Simple transparent card">
                <p className="text-white/80">This is a basic transparent card with glass effect.</p>
                <button className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded transition-colors">
                  Learn More
                </button>
              </TransparentCard>

              {/* Card 2 - Dark Variant */}
              <TransparentCard 
                title="Dark Variant" 
                variant="dark" 
                borderRadius="rounded-2xl"
              >
                <p className="text-white/80">This card uses the dark variant with rounded corners.</p>
                <div className="flex space-x-3 mt-4">
                  <span className="px-3 py-1 bg-red-500/50 rounded-full text-white text-sm">Tag 1</span>
                  <span className="px-3 py-1 bg-blue-500/50 rounded-full text-white text-sm">Tag 2</span>
                </div>
              </TransparentCard>

              {/* Card 3 - Colored Gradient */}
              <TransparentCard 
                title="Gradient Card" 
                variant="colored" 
                blur={false}
                hoverEffect={true}
              >
                <p className="text-white/80">This card has a colored gradient background without blur.</p>
                <div className="mt-4 p-3 bg-black/20 rounded">
                  <code className="text-white/60 text-sm">console.log("Hello World");</code>
                </div>
              </TransparentCard>

              {/* Card 4 - Statistics Card */}
              <TransparentCard className="text-center">
                <div className="text-3xl font-bold text-white mb-2">42</div>
                <div className="text-white/60">Completed Projects</div>
                <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                  <div className="bg-green-400 h-2 rounded-full w-3/4"></div>
                </div>
              </TransparentCard>

              {/* Card 5 - Profile Card */}
              <TransparentCard className="text-center">
                <img 
                  src="/api/placeholder/80/80" 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-white/30"
                />
                <h3 className="text-white font-bold">John Doe</h3>
                <p className="text-white/60 text-sm">Web Developer</p>
                <div className="flex justify-center space-x-4 mt-4">
                  <button className="text-white/80 hover:text-white">📧</button>
                  <button className="text-white/80 hover:text-white">💼</button>
                  <button className="text-white/80 hover:text-white">🔗</button>
                </div>
              </TransparentCard>

              {/* Card 6 - Action Card */}
              <TransparentCard>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-white font-bold">Settings</h3>
                  <span className="px-2 py-1 bg-yellow-500/50 text-yellow-200 text-xs rounded">New</span>
                </div>
                <p className="text-white/80 text-sm mb-4">Manage your account settings and preferences.</p>
                <div className="flex space-x-3">
                  <button className="flex-1 px-3 py-2 bg-white/20 hover:bg-white/30 text-white rounded text-sm transition-colors">
                    Edit
                  </button>
                  <button className="flex-1 px-3 py-2 bg-red-500/50 hover:bg-red-500/60 text-white rounded text-sm transition-colors">
                    Delete
                  </button>
                </div>
              </TransparentCard>

            </div>
          </div>
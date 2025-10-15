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
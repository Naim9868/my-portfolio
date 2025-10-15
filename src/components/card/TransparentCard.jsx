// components/TransparentCard.jsx
export default function TransparentCard({ 
  children, 
  className = "",
  blur = true,
  padding = "p-6",
  borderRadius = "rounded-lg"
}) {
  return (
    <div className={`
      bg-white/10 
      ${blur ? 'backdrop-blur-md' : ''}
      border border-white/20 
      ${borderRadius}
      ${padding}
      shadow-lg
      ${className}
    `}>
      {children}
    </div>
  );
}
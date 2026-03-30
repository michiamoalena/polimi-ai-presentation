const AnimatedBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-orange-400/30 to-pink-500/20 blur-3xl animate-float-slow" />
    <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-violet-500/25 to-fuchsia-500/15 blur-3xl animate-float-medium" />
    <div className="absolute -bottom-40 right-1/3 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-pink-400/20 to-orange-400/15 blur-3xl animate-float-fast" />
  </div>
);

export default AnimatedBackground;

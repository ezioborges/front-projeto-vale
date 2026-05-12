export default function BackgroundBlobs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute top-0 -left-4 h-72 w-72 rounded-full bg-purple-300 mix-blend-multiply opacity-30 blur-2xl animate-blob" />
      <div className="absolute top-0 -right-4 h-72 w-72 rounded-full bg-yellow-300 mix-blend-multiply opacity-30 blur-2xl animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 h-72 w-72 rounded-full bg-pink-300 mix-blend-multiply opacity-30 blur-2xl animate-blob animation-delay-4000" />
    </div>
  );
}

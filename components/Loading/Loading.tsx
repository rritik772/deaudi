export default function Loading() {
  return (
    <span className="flex items-center px-4 py-2">
      <svg className="animate-spin w-5 text-white" fill="none" viewBox="0 0 24 24">
        <circle className="" cx="12" cy="12" r="10" strokeWidth="4"></circle>
        <path className="text-yellow-500" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
  );
}

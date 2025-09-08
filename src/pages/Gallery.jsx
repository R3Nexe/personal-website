import { useEffect, useState } from "react";

export default function Gallery() {
  return (
    <div className="mt-[20vh] columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-10">
      <div className="animate-pulse bg-white/10 rounded-lg w-full h-[200vh]" />
    </div>
  );
}

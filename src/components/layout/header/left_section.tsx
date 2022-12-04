import Link from "next/link";
import * as React from "react";

const LeftSection = () => {
  return (
    <div className="grid gap-4 content-center">
      <nav className="flex ml-6 space-x-4">
        <a
          href="/dashboard"
          className="px-3 py-2 hover:underline"
        >
          Journal
        </a>
        <a
          href="/team"
          className="px-3 py-2 hover:underline"
        >
          FAQ
        </a> 
      </nav>
    </div>
  );
};

export default LeftSection;

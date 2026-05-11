import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2">
      <div></div>
      {children}
    </div>
  );
}

"use client";
import { useEffect, useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Load the app
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/app.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "/app.js";
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  return <div className="wrap" id="app" ref={containerRef}></div>;
}

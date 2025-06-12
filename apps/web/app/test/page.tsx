"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTimeline() {
  const containerRef = useRef(null);
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%", // trigger when top of container hits 75% viewport
        end: "bottom 25%",
        toggleActions: "play none none reverse",
        markers: false, // set to true for debugging
      },
    });

    timeline
      .from(box1Ref.current, { y: 100, opacity: 0, duration: 0.5 })
      .from(box2Ref.current, { y: 100, opacity: 0, duration: 0.5 }, "-=0.3")
      .from(box3Ref.current, { y: 100, opacity: 0, duration: 0.5 }, "-=0.3");
  }, []);

  return (
    <div style={{ height: "150vh", paddingTop: "100vh" }}>
      <div ref={containerRef}>
        <div ref={box1Ref} style={boxStyle("#e74c3c")} className="bg-red-100">
          Box 1
        </div>
        <div ref={box2Ref} className="bg-green-100" style={boxStyle("#2ecc71")}>
          Box 2
        </div>
        <div ref={box3Ref} style={boxStyle("#3498db")}>
          Box 3
        </div>
      </div>
    </div>
  );
}

const boxStyle = (bgColor: string) => ({
  width: "200px",
  height: "200px",
  backgroundColor: bgColor,
  margin: "20px auto",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "20px",
});

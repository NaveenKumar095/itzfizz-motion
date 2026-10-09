"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { StatCard } from "./StatCard";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "3.2s", label: "0—100 KM/H", detail: "Instant response" },
  { value: "650", label: "MAX POWER", detail: "Horsepower" },
  { value: "315", label: "TOP SPEED", detail: "KM / H" },
  { value: "4WD", label: "DRIVE SYSTEM", detail: "Precision control" }
];

const LETTERS = "WELCOME ITZ FIZZ.".split("");

export function HeroSection() {
  const root = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const car = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro
      .from(".hero-eyebrow", { y: 12, opacity: 0, duration: 0.55 })
      .from(".headline-line", { y: 28, opacity: 0, duration: 0.72, stagger: 0.1 }, "-=0.24")
      .from(".hero-copy", { y: 12, opacity: 0, duration: 0.5 }, "-=0.35")
      .from(".car-wrap", { y: 18, opacity: 0, duration: 0.8 }, "-=0.4");

    const mm = gsap.matchMedia();
    mm.add({ desktop: "(min-width: 900px)", tablet: "(min-width: 600px) and (max-width: 899px)", mobile: "(max-width: 599px)" }, (context) => {
      const conditions = context.conditions as { desktop?: boolean; tablet?: boolean; mobile?: boolean };
      const travelRatio = conditions.desktop ? 0.48 : conditions.tablet ? 0.3 : 0.16;
      const scrollDistance = conditions.mobile ? "+=850" : "+=1150";
      const getTravel = () => {
        if (!scene.current || !car.current) return 0;
        const available = scene.current.clientWidth - car.current.clientWidth;
        return Math.max(0, available * travelRatio);
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: scrollDistance,
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      timeline
        .to(".headline-letter", { color: "#d6ff3f", stagger: 0.025, duration: 0.32 }, 0)
        .to(car.current, { x: getTravel, ease: "none", duration: 1 }, 0)
        .to(".motion-trail", { scaleX: 1, ease: "none", duration: 1 }, 0)
        .to(".scene-index", { opacity: 1, x: 0, duration: 0.28 }, 0.16)
        .to(".stat-card", { opacity: 1, y: 0, stagger: 0.11, duration: 0.35, ease: "power2.out" }, 0.48);
    });

    return () => mm.revert();
  }, { scope: root });

  return (
    <section ref={root} className="hero" aria-label="ITZ FIZZ motion experience">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="ITZ FIZZ home">FIZZ<sup>®</sup></a>
        <p>MOTION / EXPERIENCE 001</p>
      </header>
      <div className="hero-inner" id="top">
        <div className="copy-area">
          <p className="hero-eyebrow"><span />ENGINEERED TO MOVE</p>
          <h1 aria-label="Welcome Itz Fizz.">
            <span className="headline-line">WELCOME</span>
            <span className="headline-line headline-fizz">{LETTERS.slice(8).map((letter, i) => <span className="headline-letter" aria-hidden="true" key={`${letter}-${i}`}>{letter === "." ? <b>{letter}</b> : letter}</span>)}</span>
          </h1>
          <p className="hero-copy">An experience in motion.<br />Scroll to explore.</p>
        </div>
        <div ref={scene} className="scene" aria-label="Silver performance coupe driving along a motion trail">
          <p className="scene-index">01 / THE FIRST MOVE</p>
          <div className="road"><span className="motion-trail" /></div>
          <div ref={car} className="car-wrap"><Image src="/images/car.png" alt="Silver performance sports coupe with lime brake calipers" width={2048} height={768} priority sizes="(max-width: 599px) 94vw, (max-width: 899px) 82vw, 70vw" onLoad={() => ScrollTrigger.refresh()} /></div>
        </div>
        <div className="stats-grid" aria-label="Performance statistics">{stats.map((stat) => <StatCard key={stat.label} {...stat} />)}</div>
      </div>
      <p className="scroll-cue">SCROLL TO ACCELERATE <span>↓</span></p>
    </section>
  );
}

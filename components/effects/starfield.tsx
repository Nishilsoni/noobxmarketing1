"use client";

import * as React from "react";

type Star = {
  x: number;
  y: number;
  z: number; // depth 0..1 → parallax + size
  r: number;
  tw: number; // twinkle phase
  tws: number; // twinkle speed
};

/** Lightweight canvas starfield with twinkle + subtle mouse parallax.
 *  Caps density, respects reduced motion, and pauses when off-screen. */
export function Starfield({ density = 0.00014 }: { density?: number }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;
    let running = true;

    function build() {
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(Math.floor(width * height * density), 280);
      stars = Array.from({ length: count }, () => {
        const z = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          r: z * 1.4 + 0.3,
          tw: Math.random() * Math.PI * 2,
          tws: 0.6 + Math.random() * 1.4,
        };
      });
    }

    const palette = ["#ffffff", "#b6c0d9", "#4dfff5", "#60a5fa"];
    function color(i: number) {
      return palette[i % palette.length];
    }

    let last = performance.now();
    function frame(now: number) {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      ctx!.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        if (!reduce) s.tw += s.tws * dt;
        const twinkle = reduce ? 0.8 : 0.55 + Math.sin(s.tw) * 0.45;
        const px = s.x + mouse.x * s.z * 22;
        const py = s.y + mouse.y * s.z * 22;
        ctx!.globalAlpha = Math.max(0, twinkle) * (0.4 + s.z * 0.6);
        ctx!.beginPath();
        ctx!.arc(px, py, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = color(i);
        ctx!.fill();
        // bright cores get a soft glow
        if (s.z > 0.82) {
          ctx!.globalAlpha *= 0.35;
          ctx!.beginPath();
          ctx!.arc(px, py, s.r * 3.5, 0, Math.PI * 2);
          ctx!.fillStyle = color(i);
          ctx!.fill();
        }
      }
      ctx!.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }

    function onMouse(e: MouseEvent) {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running) {
          last = performance.now();
          raf = requestAnimationFrame(frame);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );

    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 150);
    }

    build();
    io.observe(canvas);
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", onResize);
    if (!reduce) window.addEventListener("mousemove", onMouse, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}

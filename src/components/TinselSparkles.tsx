import React, { useEffect, useRef } from "react";

interface SparkleParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  angularSpeed: number;
  opacity: number;
  maxOpacity: number;
  color: string;
  isTinselStrand: boolean;
  length?: number;
}

export const TinselSparkles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const colors = [
      "#ffffff", // pure silver white
      "#e2e8f0", // metallic silver
      "#cbd5e1", // soft platinum
      "#94a3b8", // deep chrome
      "#fef08a", // soft gold highlight
      "#e5b869", // champagne gold
    ];

    const particleCount = Math.min(window.innerWidth < 768 ? 45 : 90, 100);
    const particles: SparkleParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isTinsel = Math.random() > 0.65;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 1,
        speedY: Math.random() * 0.45 + 0.15,
        speedX: (Math.random() - 0.5) * 0.35,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.03,
        opacity: Math.random() * 0.8 + 0.2,
        maxOpacity: Math.random() * 0.7 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        isTinselStrand: isTinsel,
        length: isTinsel ? Math.random() * 8 + 4 : undefined,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.angle) * 0.3 + p.speedX;
        p.angle += p.angularSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.opacity * (0.6 + Math.sin(p.angle * 2) * 0.4);

        if (p.isTinselStrand && p.length) {
          // Draw metallic shimmering tinsel strand
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size * 0.7;
          ctx.beginPath();
          ctx.moveTo(-p.length / 2, 0);
          ctx.lineTo(p.length / 2, 0);
          ctx.stroke();
        } else {
          // Draw glowing silver sparkle / diamond star
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();

          // 4-point star flare
          if (p.size > 2) {
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(-p.size * 2, 0);
            ctx.lineTo(p.size * 2, 0);
            ctx.moveTo(0, -p.size * 2);
            ctx.lineTo(0, p.size * 2);
            ctx.stroke();
          }
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-70"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

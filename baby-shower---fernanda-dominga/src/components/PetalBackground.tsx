import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  shape: 'rose' | 'leaf' | 'sparkle';
}

export const PetalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const petals: Petal[] = [];
    const petalColors = [
      'rgba(244, 182, 194, ', // soft blush pink
      'rgba(235, 148, 169, ', // dusty rose
      'rgba(251, 207, 218, ', // pale pink
      'rgba(216, 112, 147, ', // deeper rose
      'rgba(182, 205, 180, ', // sage eucalyptus green
    ];

    const count = Math.min(28, Math.floor(window.innerWidth / 45));

    for (let i = 0; i < count; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 10 + 6,
        speedY: Math.random() * 0.8 + 0.4,
        speedX: Math.sin(Math.random() * Math.PI) * 0.6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.2,
        opacity: Math.random() * 0.5 + 0.25,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        shape: Math.random() > 0.85 ? 'leaf' : Math.random() > 0.95 ? 'sparkle' : 'rose',
      });
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.shape === 'sparkle') {
        ctx.fillStyle = `rgba(245, 200, 120, ${p.opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return;
      }

      ctx.fillStyle = `${p.color}${p.opacity})`;
      ctx.beginPath();

      if (p.shape === 'leaf') {
        // Eucalyptus leaf shape
        ctx.ellipse(0, 0, p.size * 0.4, p.size * 0.9, 0, 0, Math.PI * 2);
      } else {
        // Delicate curved rose petal
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.6, p.size * 0.9, p.size * 0.4, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.4, -p.size * 0.8, -p.size * 0.6, 0, -p.size);
      }
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.5 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) {
          p.x = -20;
        } else if (p.x < -20) {
          p.x = width + 20;
        }

        drawPetal(p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      aria-hidden="true"
    />
  );
};

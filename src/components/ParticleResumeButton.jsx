import React, { useRef, useEffect } from 'react';
import { FileText } from 'lucide-react';
import BorderBeam from './BorderBeam';
import './ParticleResumeButton.css';

export default function ParticleResumeButton({
  href = "/resume.pdf",
  download = "M_Vishnu_Vardhan_Reddy_Resume.pdf",
  className = ""
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId;
    let W = (canvas.width = container.offsetWidth);
    let H = (canvas.height = container.offsetHeight);
    let XO = W / 2;
    let YO = H / 2;

    const NUM_PARTICLES = 50;
    const MAX_Z = 2;
    const MAX_R = 2.2;
    const Z_SPD = 1.8;
    const PARTICLES = [];

    class Vector {
      constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
      }

      add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
      }

      scale(n) {
        this.x *= n;
        this.y *= n;
        this.z *= n;
      }
    }

    function to2d(v) {
      const X_COORD = v.x - XO;
      const Y_COORD = v.y - YO;
      const PX = X_COORD / (v.z || 0.001);
      const PY = Y_COORD / (v.z || 0.001);
      return [PX + XO, PY + YO];
    }

    class Particle {
      constructor(x, y, z) {
        this.pos = new Vector(x, y, z);
        this.vel = new Vector(0, 0, -Z_SPD);
        this.vel.scale(0.01);
        this.fill = "rgba(255, 255, 255, 0.75)";
        this.stroke = "rgba(200, 168, 233, 0.5)";
      }

      update() {
        this.pos.add(this.vel);
      }

      render() {
        const PIXEL = to2d(this.pos);
        const X = PIXEL[0];
        const Y = PIXEL[1];
        const R = Math.max(0.3, ((MAX_Z - this.pos.z) / MAX_Z) * MAX_R);

        if (X < 0 || X > W || Y < 0 || Y > H || this.pos.z <= 0.05) {
          this.pos.x = Math.random() * W;
          this.pos.y = Math.random() * H;
          this.pos.z = MAX_Z;
        }

        this.update();
        ctx.beginPath();
        ctx.fillStyle = this.fill;
        ctx.strokeStyle = this.stroke;
        ctx.arc(X, Y, R, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
      }
    }

    const initParticles = () => {
      PARTICLES.length = 0;
      for (let i = 0; i < NUM_PARTICLES; i++) {
        const X = Math.random() * W;
        const Y = Math.random() * H;
        const Z = Math.random() * MAX_Z;
        PARTICLES.push(new Particle(X, Y, Z));
      }
    };

    const handleResize = () => {
      if (!container) return;
      W = canvas.width = container.offsetWidth;
      H = canvas.height = container.offsetHeight;
      XO = W / 2;
      YO = H / 2;
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    initParticles();

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < PARTICLES.length; i++) {
        PARTICLES[i].render();
      }
      animFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <a
      ref={containerRef}
      href={href}
      download={download}
      className={`particle-resume-btn ${className}`}
      aria-label="Download Resume"
    >
      <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
      <span className="particle-btn-content">
        <FileText size={18} />
        <span>Download Resume</span>
      </span>
      <BorderBeam
        duration={4}
        borderWidth={1.8}
        colorFrom="#C8A8E9"
        colorTo="#F6BCBA"
      />
    </a>
  );
}

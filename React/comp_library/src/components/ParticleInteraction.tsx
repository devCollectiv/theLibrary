import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

export interface ParticleInteractionProps {
  /**
   * Width of the container in pixels
   */
  width?: number;
  /**
   * Height of the container in pixels
   */
  height?: number;
  /**
   * Number of particles to display
   */
  particleCount?: number;
  /**
   * Base color of particles
   */
  baseColor?: string;
  /**
   * Accent color for interactions
   */
  accentColor?: string;
  /**
   * Size of particles in pixels
   */
  particleSize?: number;
  /**
   * Maximum speed of particles
   */
  maxSpeed?: number;
  /**
   * Radius of interaction with mouse
   */
  interactionRadius?: number;
  /**
   * Type of interaction behavior
   */
  interactionType?: 'attract' | 'repel' | 'swirl' | 'connect';
  /**
   * Strength of the interaction (1-10)
   */
  interactionStrength?: number;
  /**
   * Whether particles should connect with lines
   */
  connectParticles?: boolean;
  /**
   * Maximum distance for particle connections
   */
  connectionDistance?: number;
  /**
   * Whether to show a trail effect
   */
  trailEffect?: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  originalX: number;
  originalY: number;
  opacity: number;
}

const ParticleInteraction: React.FC<ParticleInteractionProps> = ({
  width = 500,
  height = 300,
  particleCount = 80,
  baseColor = '#3182CE',
  accentColor = '#E53E3E',
  particleSize = 3,
  maxSpeed = 1,
  interactionRadius = 100,
  interactionType = 'attract',
  interactionStrength = 5,
  connectParticles = true,
  connectionDistance = 100,
  trailEffect = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const strengthFactor = interactionStrength / 10;

  // Initialize particles
  useEffect(() => {
    const initialParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      initialParticles.push({
        x,
        y,
        size: Math.random() * particleSize + particleSize / 2,
        color: baseColor,
        vx: (Math.random() - 0.5) * maxSpeed,
        vy: (Math.random() - 0.5) * maxSpeed,
        originalX: x,
        originalY: y,
        opacity: Math.random() * 0.5 + 0.5,
      });
    }
    setParticles(initialParticles);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [width, height, particleCount, baseColor, particleSize, maxSpeed]);

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition(null);
  };

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Apply trail effect
      if (trailEffect) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);
      }

      const updatedParticles = [...particles];

      // Draw connections between particles
      if (connectParticles) {
        ctx.strokeStyle = `${baseColor}40`; // Semi-transparent
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < updatedParticles.length; i++) {
          for (let j = i + 1; j < updatedParticles.length; j++) {
            const dx = updatedParticles[i].x - updatedParticles[j].x;
            const dy = updatedParticles[i].y - updatedParticles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
              const opacity = 1 - distance / connectionDistance;
              ctx.strokeStyle = `${baseColor}${Math.floor(opacity * 40).toString(16).padStart(2, '0')}`;
              ctx.beginPath();
              ctx.moveTo(updatedParticles[i].x, updatedParticles[i].y);
              ctx.lineTo(updatedParticles[j].x, updatedParticles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < updatedParticles.length; i++) {
        const p = updatedParticles[i];
        
        // Apply mouse interaction if mouse is over canvas
        if (mousePosition) {
          const dx = mousePosition.x - p.x;
          const dy = mousePosition.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < interactionRadius) {
            const force = (1 - distance / interactionRadius) * strengthFactor;
            
            switch (interactionType) {
              case 'attract':
                p.vx += dx * 0.01 * force;
                p.vy += dy * 0.01 * force;
                p.color = accentColor;
                break;
              case 'repel':
                p.vx -= dx * 0.02 * force;
                p.vy -= dy * 0.02 * force;
                p.color = accentColor;
                break;
              case 'swirl':
                p.vx += dy * 0.01 * force;
                p.vy -= dx * 0.01 * force;
                p.color = accentColor;
                break;
              case 'connect':
                // Just change color, connections are handled separately
                p.color = accentColor;
                break;
            }
          } else {
            // Return to original color when not interacting
            p.color = baseColor;
            
            // Gradually return to original position
            p.vx += (p.originalX - p.x) * 0.01;
            p.vy += (p.originalY - p.y) * 0.01;
          }
        } else {
          // No mouse interaction, return to original position
          p.color = baseColor;
          p.vx += (p.originalX - p.x) * 0.01;
          p.vy += (p.originalY - p.y) * 0.01;
        }
        
        // Apply velocity with damping
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        
        // Keep particles within bounds
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
        
        // Draw the particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      }
      
      setParticles(updatedParticles);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particles, mousePosition, width, height, baseColor, accentColor, interactionRadius, 
      interactionType, strengthFactor, connectParticles, connectionDistance, trailEffect]);

  return (
    <Box 
      width={`${width}px`} 
      height={`${height}px`} 
      borderRadius="md" 
      overflow="hidden"
      position="relative"
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          display: 'block',
          background: trailEffect ? 'black' : 'transparent',
          cursor: 'pointer'
        }}
      />
    </Box>
  );
};

export default ParticleInteraction;

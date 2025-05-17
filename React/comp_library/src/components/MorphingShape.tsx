import { Box } from '@chakra-ui/react';
import React, { useEffect, useState, useRef } from 'react';

export interface MorphingShapeProps {
  /**
   * Width of the container in pixels
   */
  width?: number;
  /**
   * Height of the container in pixels
   */
  height?: number;
  /**
   * Array of SVG paths to morph between
   */
  paths?: string[];
  /**
   * Primary color of the shape
   */
  color?: string;
  /**
   * Secondary color for gradient
   */
  secondaryColor?: string;
  /**
   * Duration of each morph in seconds
   */
  morphDuration?: number;
  /**
   * Delay between morphs in seconds
   */
  morphDelay?: number;
  /**
   * Whether to loop through the paths
   */
  loop?: boolean;
  /**
   * Whether to use a gradient fill
   */
  useGradient?: boolean;
  /**
   * Whether to add a glow effect
   */
  glow?: boolean;
  /**
   * Intensity of the glow (0-1)
   */
  glowIntensity?: number;
  /**
   * Whether to rotate the shape
   */
  rotate?: boolean;
  /**
   * Rotation speed in degrees per second
   */
  rotationSpeed?: number;
  /**
   * Whether to pulse the shape
   */
  pulse?: boolean;
  /**
   * Whether to morph on hover instead of automatically
   */
  morphOnHover?: boolean;
}

// Default SVG paths for different shapes
const defaultPaths = [
  // Circle
  'M50,10 A40,40 0 1,0 50,90 A40,40 0 1,0 50,10 Z',
  // Square
  'M10,10 L90,10 L90,90 L10,90 Z',
  // Triangle
  'M50,10 L90,90 L10,90 Z',
  // Star
  'M50,10 L61,39 L92,39 L67,59 L77,90 L50,70 L23,90 L33,59 L8,39 L39,39 Z',
  // Hexagon
  'M50,10 L85,30 L85,70 L50,90 L15,70 L15,30 Z',
];

// Function to interpolate between two paths
const interpolatePath = (startPath: string, endPath: string, progress: number): string => {
  // Simple implementation - assumes paths have same number of commands and points
  const startPoints = startPath.match(/[A-Z][^A-Z]*/g) || [];
  const endPoints = endPath.match(/[A-Z][^A-Z]*/g) || [];
  
  // If paths have different structures, return the end path
  if (startPoints.length !== endPoints.length) {
    return progress >= 1 ? endPath : startPath;
  }
  
  return startPoints.map((startCmd, i) => {
    const endCmd = endPoints[i];
    const startType = startCmd.charAt(0);
    const endType = endCmd.charAt(0);
    
    // If command types don't match, use end command when progress is over 0.5
    if (startType !== endType) {
      return progress >= 0.5 ? endCmd : startCmd;
    }
    
    // Extract numbers from commands
    const startNums = startCmd.substring(1).trim().split(/[ ,]+/).map(Number);
    const endNums = endCmd.substring(1).trim().split(/[ ,]+/).map(Number);
    
    // Interpolate each number
    const interpolatedNums = startNums.map((num, j) => {
      if (j < endNums.length) {
        return num + (endNums[j] - num) * progress;
      }
      return num;
    });
    
    return startType + interpolatedNums.join(' ');
  }).join(' ');
};

const MorphingShape: React.FC<MorphingShapeProps> = ({
  width = 200,
  height = 200,
  paths = defaultPaths,
  color = '#3182CE',
  secondaryColor = '#805AD5',
  morphDuration = 2,
  morphDelay = 1,
  loop = true,
  useGradient = true,
  glow = false,
  glowIntensity = 0.5,
  rotate = false,
  rotationSpeed = 10,
  pulse = false,
  morphOnHover = false,
}) => {
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [nextPathIndex, setNextPathIndex] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const animationRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  const gradientId = `morphGradient-${Math.random().toString(36).substring(2, 9)}`;
  
  // Handle morphing animation
  useEffect(() => {
    if (morphOnHover && !isHovering) {
      return;
    }
    
    const updateAnimation = (timestamp: number) => {
      if (!lastUpdateTimeRef.current) {
        lastUpdateTimeRef.current = timestamp;
      }
      
      const deltaTime = timestamp - lastUpdateTimeRef.current;
      lastUpdateTimeRef.current = timestamp;
      
      // Update progress
      let newProgress = progress + (deltaTime / (morphDuration * 1000));
      
      // Handle completion of morph
      if (newProgress >= 1) {
        newProgress = 0;
        
        // Move to next shape
        setCurrentPathIndex(nextPathIndex);
        setNextPathIndex((nextPathIndex + 1) % paths.length);
        
        // If not looping and we've reached the end, stop
        if (!loop && nextPathIndex === 0) {
          return;
        }
      }
      
      setProgress(newProgress);
      
      // Update rotation if enabled
      if (rotate) {
        setRotation((prev) => (prev + (rotationSpeed * deltaTime / 1000)) % 360);
      }
      
      // Update pulse if enabled
      if (pulse) {
        const pulseProgress = (Math.sin(timestamp / 500) + 1) / 20 + 0.95;
        setScale(pulseProgress);
      }
      
      animationRef.current = requestAnimationFrame(updateAnimation);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(updateAnimation);
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    progress, currentPathIndex, nextPathIndex, paths, morphDuration, 
    loop, rotate, rotationSpeed, pulse, morphOnHover, isHovering
  ]);
  
  // Handle delay between morphs
  useEffect(() => {
    if (progress === 0 && currentPathIndex !== nextPathIndex) {
      const delayTimeout = setTimeout(() => {
        lastUpdateTimeRef.current = 0; // Reset time tracking
      }, morphDelay * 1000);
      
      return () => clearTimeout(delayTimeout);
    }
  }, [progress, currentPathIndex, nextPathIndex, morphDelay]);
  
  // Interpolate between current and next path
  const currentPath = paths[currentPathIndex] || defaultPaths[0];
  const nextPath = paths[nextPathIndex] || defaultPaths[1];
  const interpolatedPath = interpolatePath(currentPath, nextPath, progress);
  
  // Handle hover state
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  
  return (
    <Box
      width={`${width}px`}
      height={`${height}px`}
      position="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      cursor="pointer"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        {useGradient && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor={secondaryColor} />
            </linearGradient>
          </defs>
        )}
        <path
          d={interpolatedPath}
          fill={useGradient ? `url(#${gradientId})` : color}
          transform={`translate(50 50) rotate(${rotation}) scale(${scale}) translate(-50 -50)`}
          style={{
            transition: 'all 0.3s ease-in-out',
            filter: glow ? `drop-shadow(0 0 ${glowIntensity * 10}px ${color})` : 'none',
          }}
        />
      </svg>
    </Box>
  );
};

export default MorphingShape;

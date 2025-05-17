import { Box, keyframes } from '@chakra-ui/react';
import React from 'react';

export interface PulsatingCircleProps {
  /**
   * Base size of the circle in pixels
   */
  size?: number;
  /**
   * Primary color of the circle
   */
  color?: string;
  /**
   * Secondary color for gradient effect
   */
  secondaryColor?: string;
  /**
   * Duration of one pulse cycle in seconds
   */
  pulseDuration?: number;
  /**
   * Maximum scale the circle will grow to
   */
  maxScale?: number;
  /**
   * Number of pulse rings to show
   */
  pulseCount?: number;
  /**
   * Whether to show a glow effect
   */
  glow?: boolean;
  /**
   * Intensity of the glow (0-1)
   */
  glowIntensity?: number;
  /**
   * Whether to show content inside the circle
   */
  children?: React.ReactNode;
}

const PulsatingCircle: React.FC<PulsatingCircleProps> = ({
  size = 100,
  color = '#3182CE',
  secondaryColor,
  pulseDuration = 2,
  maxScale = 1.5,
  pulseCount = 3,
  glow = true,
  glowIntensity = 0.5,
  children,
}) => {
  // Use the secondary color or create a lighter version of the primary color
  const secondColor = secondaryColor || `${color}88`;
  
  // Create the pulse animation
  const pulse = keyframes`
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    50% {
      transform: scale(${maxScale});
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  `;

  // Create the main circle animation (subtle breathing effect)
  const breathe = keyframes`
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  `;

  // Generate pulse rings
  const pulseRings = pulseCount && color && secondColor && Array.from({ length: pulseCount }).map((_, index) => {
    const delay = (index * pulseDuration) / pulseCount;
    
    return (
      <Box
        key={index}
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        borderRadius="50%"
        bgGradient={`radial(${color}, ${secondColor})`}
        opacity="0.8"
        animation={`${pulse} ${pulseDuration}s infinite ease-out ${delay}s`}
        zIndex="1"
      />
    );
  });

  return (
    <Box
      position="relative"
      width={`${size}px`}
      height={`${size}px`}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {/* Pulse rings */}
      {pulseRings}
      
      {/* Main circle */}
      <Box
        position="relative"
        width="100%"
        height="100%"
        borderRadius="50%"
        bgGradient={`radial(${secondColor}, ${color})`}
        animation={`${breathe} ${pulseDuration * 1.5}s infinite ease-in-out`}
        boxShadow={glow ? `0 0 ${size / 5}px ${glowIntensity * 10}px ${color}` : 'none'}
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex="2"
        _hover={{
          transform: 'scale(1.1)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PulsatingCircle;

import { Box, keyframes } from '@chakra-ui/react';
import React, { useMemo } from 'react';

export interface FloatingBubblesProps {
  /**
   * Number of bubbles to display
   */
  bubbleCount?: number;
  /**
   * Colors for the bubbles (will be used in sequence)
   */
  colors?: string[];
  /**
   * Width of the container in pixels
   */
  width?: number;
  /**
   * Height of the container in pixels
   */
  height?: number;
  /**
   * Minimum size of bubbles in pixels
   */
  minSize?: number;
  /**
   * Maximum size of bubbles in pixels
   */
  maxSize?: number;
  /**
   * Minimum animation duration in seconds
   */
  minDuration?: number;
  /**
   * Maximum animation duration in seconds
   */
  maxDuration?: number;
  /**
   * Opacity of the bubbles (0-1)
   */
  opacity?: number;
}

const FloatingBubbles: React.FC<FloatingBubblesProps> = ({
  bubbleCount = 15,
  colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3'],
  width = 300,
  height = 400,
  minSize = 10,
  maxSize = 50,
  minDuration = 8,
  maxDuration = 20,
  opacity = 0.7,
}) => {
  // Generate random bubbles
  const bubbles = useMemo(() => {
    return Array.from({ length: bubbleCount }).map((_, index) => {
      const size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
      const posX = Math.floor(Math.random() * (width - size));
      const delay = Math.random() * 5; // Random delay for start
      const duration = Math.random() * (maxDuration - minDuration) + minDuration;
      const color = colors[index % colors.length];

      // Create unique keyframe for each bubble with slight horizontal movement
      const floatUp = keyframes`
        0% {
          transform: translate(0, ${height}px);
        }
        50% {
          transform: translate(${Math.random() * 20 - 10}px, ${height / 2}px);
        }
        100% {
          transform: translate(${Math.random() * 40 - 20}px, -${size}px);
        }
      `;

      return {
        id: index,
        size,
        posX,
        color,
        delay,
        duration,
        animation: `${floatUp} ${duration}s ease-in-out ${delay}s infinite`,
      };
    });
  }, [bubbleCount, colors, width, height, minSize, maxSize, minDuration, maxDuration]);

  return (
    <Box position="relative" width={`${width}px`} height={`${height}px`} overflow="hidden">
      {bubbles.map((bubble) => (
        <Box
          key={bubble.id}
          position="absolute"
          left={`${bubble.posX}px`}
          bottom={`-${bubble.size}px`}
          width={`${bubble.size}px`}
          height={`${bubble.size}px`}
          borderRadius="50%"
          backgroundColor={bubble.color}
          opacity={opacity}
          animation={bubble.animation}
          transition="transform 0.3s ease-in-out"
          _hover={{
            transform: 'scale(1.2)',
          }}
        />
      ))}
    </Box>
  );
};

export default FloatingBubbles;

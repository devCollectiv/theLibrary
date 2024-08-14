import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

interface SpinningPolygonProps {
  polygonSides: number;
  color: string | string[];
  size?: number;
}

const SpinningPolygon: React.FC<SpinningPolygonProps> = ({ polygonSides, color, size = 100 }) => {
  const [rotation, setRotation] = useState(0);
  const polygonRef = useRef<SVGPolygonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setRotation(scrollPercentage * 360);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (polygonRef.current) {
      const points = [];
      for (let i = 0; i < polygonSides; i++) {
        const angle = (i / polygonSides) * 2 * Math.PI;
        const x = size / 2 + (size / 2 - 10) * Math.cos(angle);
        const y = size / 2 + (size / 2 - 10) * Math.sin(angle);
        points.push(`${x},${y}`);
      }
      polygonRef.current.setAttribute('points', points.join(' '));
    }
  }, [polygonSides, size]);

  const getFill = () => {
    if (Array.isArray(color)) {
      if (color.length === 1) return color[0];
      const gradientId = `gradient-${polygonSides}`;
      return `url(#${gradientId})`;
    }
    return color;
  };

  return (
    <Box width={`${size}px`} height={`${size}px`}>
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
        {Array.isArray(color) && color.length > 1 && (
          <defs>
            <linearGradient id={`gradient-${polygonSides}`}>
              {color.map((c, index) => (
                <stop key={index} offset={`${(index / (color.length - 1)) * 100}%`} stopColor={c} />
              ))}
            </linearGradient>
          </defs>
        )}
        <polygon
          ref={polygonRef}
          fill={getFill()}
          transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
        />
      </svg>
    </Box>
  );
};

export default SpinningPolygon;
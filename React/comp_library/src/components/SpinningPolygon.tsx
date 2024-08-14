import { Box } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';

type Color = string;

type PolygonSides = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface SpinningPolygonProps {
  polygonSides: PolygonSides;
  color: Color | readonly Color[];
  size?: number;
}

const usePolygonPoints = (sides: PolygonSides, size: number): string => {
  return useMemo(() => {
    const points: Array<[number, number]> = [];
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * 2 * Math.PI;
      const x = size / 2 + (size / 2 - 10) * Math.cos(angle);
      const y = size / 2 + (size / 2 - 10) * Math.sin(angle);
      points.push([x, y]);
    }
    return points.map(([x, y]) => `${x},${y}`).join(' ');
  }, [sides, size]);
};

const useScrollRotation = (): number => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setRotation(scrollPercentage * 360);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return rotation;
};

const SpinningPolygon: React.FC<SpinningPolygonProps> = ({ polygonSides, color, size = 100 }) => {
  const rotation = useScrollRotation();
  const points = usePolygonPoints(polygonSides, size);

  const getFill = (): string => {
    if (Array.isArray(color)) {
      if (color.length === 1) return color[0];
      const gradientId = `gradient-${polygonSides}`;
      return `url(#${gradientId})`;
    }
    return color as string;
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
          points={points}
          fill={getFill()}
          transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
        />
      </svg>
    </Box>
  );
};

export default SpinningPolygon;
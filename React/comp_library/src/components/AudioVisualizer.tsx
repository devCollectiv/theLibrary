import { Box, Button, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

export interface AudioVisualizerProps {
  /**
   * Width of the visualizer in pixels
   */
  width?: number;
  /**
   * Height of the visualizer in pixels
   */
  height?: number;
  /**
   * Type of visualization
   */
  visualizationType?: 'bars' | 'wave' | 'circular' | 'particles';
  /**
   * Primary color of the visualization
   */
  color?: string;
  /**
   * Secondary color for gradient effects
   */
  secondaryColor?: string;
  /**
   * Whether to use a gradient effect
   */
  useGradient?: boolean;
  /**
   * Number of bars/elements in the visualization
   */
  barCount?: number;
  /**
   * Whether to use a simulated audio input (no microphone)
   */
  simulateAudio?: boolean;
  /**
   * Frequency of the simulated audio wave (Hz)
   */
  simulationFrequency?: number;
  /**
   * Amplitude of the simulated audio wave (0-1)
   */
  simulationAmplitude?: number;
  /**
   * Whether to show audio controls
   */
  showControls?: boolean;
  /**
   * Whether to mirror the visualization
   */
  mirror?: boolean;
  /**
   * Whether to smooth the visualization
   */
  smooth?: boolean;
  /**
   * Sensitivity of the visualization (0-1)
   */
  sensitivity?: number;
  /**
   * Whether to use a glow effect
   */
  glow?: boolean;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  width = 500,
  height = 200,
  visualizationType = 'bars',
  color = '#3182CE',
  secondaryColor = '#805AD5',
  useGradient = true,
  barCount = 64,
  simulateAudio = true,
  simulationFrequency = 0.05,
  simulationAmplitude = 0.7,
  showControls = true,
  mirror = true,
  smooth = true,
  sensitivity = 0.8,
  glow = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [volume, setVolume] = useState(simulationAmplitude);
  const [frequency, setFrequency] = useState(simulationFrequency);
  const timeRef = useRef<number>(0);
  const gradientId = `audioGradient-${Math.random().toString(36).substring(2, 9)}`;

  // Initialize audio context and analyzer
  useEffect(() => {
    if (!simulateAudio) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = barCount * 2;
      
      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);
    } else {
      // For simulation, create a data array of the appropriate size
      dataArrayRef.current = new Uint8Array(barCount);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, [barCount, simulateAudio]);

  // Start/stop microphone input
  const toggleMicrophone = async () => {
    if (isListening) {
      // Stop listening
      if (sourceRef.current) {
        sourceRef.current.disconnect();
        sourceRef.current = null;
      }
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      setIsListening(false);
    } else {
      // Start listening
      try {
        if (!simulateAudio) {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          
          if (audioContextRef.current && analyserRef.current) {
            sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
            sourceRef.current.connect(analyserRef.current);
          }
        }
        
        setIsListening(true);
        animationRef.current = requestAnimationFrame(visualize);
      } catch (err) {
        console.error('Error accessing microphone:', err);
      }
    }
  };

  // Generate simulated audio data
  const generateSimulatedData = (time: number) => {
    if (!dataArrayRef.current) return;
    
    const data = dataArrayRef.current;
    
    for (let i = 0; i < data.length; i++) {
      // Create a mix of sine waves at different frequencies for a more interesting pattern
      const normalizedIndex = i / data.length;
      const value = Math.sin(time * frequency + normalizedIndex * 10) * 0.5 + 0.5;
      const value2 = Math.sin(time * frequency * 0.5 + normalizedIndex * 5) * 0.5 + 0.5;
      const value3 = Math.sin(time * frequency * 0.25 + normalizedIndex * 20) * 0.5 + 0.5;
      
      // Combine waves and apply volume/sensitivity
      const combinedValue = (value * 0.6 + value2 * 0.3 + value3 * 0.1) * volume * sensitivity;
      
      // Scale to 0-255 range for Uint8Array
      data[i] = Math.floor(combinedValue * 255);
    }
  };

  // Draw bars visualization
  const drawBars = (ctx: CanvasRenderingContext2D, data: Uint8Array) => {
    const barWidth = width / barCount;
    const heightMultiplier = height / 255;
    
    ctx.clearRect(0, 0, width, height);
    
    // Create gradient if needed
    let fillStyle: string | CanvasGradient = color;
    if (useGradient) {
      const gradient = ctx.createLinearGradient(0, height, 0, 0);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, secondaryColor);
      fillStyle = gradient;
    }
    
    for (let i = 0; i < barCount; i++) {
      const barHeight = data[i] * heightMultiplier;
      
      // Apply smoothing if enabled
      let x = i * barWidth;
      let y = height - barHeight;
      
      ctx.fillStyle = fillStyle;
      
      // Draw bar
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth - 1, barHeight, [2, 2, 0, 0]);
      ctx.fill();
      
      // Draw mirrored bar if enabled
      if (mirror) {
        ctx.beginPath();
        ctx.roundRect(x, 0, barWidth - 1, barHeight * 0.7, [0, 0, 2, 2]);
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    
    // Add glow effect if enabled
    if (glow) {
      ctx.shadowBlur = 15;
      ctx.shadowColor = color;
      ctx.globalCompositeOperation = 'source-over';
      
      for (let i = 0; i < barCount; i++) {
        const barHeight = data[i] * heightMultiplier * 0.7;
        const x = i * barWidth;
        const y = height - barHeight;
        
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth - 1, barHeight, [2, 2, 0, 0]);
        ctx.fill();
      }
      
      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = 'source-over';
    }
  };

  // Draw wave visualization
  const drawWave = (ctx: CanvasRenderingContext2D, data: Uint8Array) => {
    ctx.clearRect(0, 0, width, height);
    
    // Create gradient if needed
    let strokeStyle: string | CanvasGradient = color;
    if (useGradient) {
      const gradient = ctx.createLinearGradient(0, height, 0, 0);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, secondaryColor);
      strokeStyle = gradient;
    }
    
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = 2;
    
    // Draw wave
    ctx.beginPath();
    
    const sliceWidth = width / barCount;
    let x = 0;
    
    for (let i = 0; i < barCount; i++) {
      const v = data[i] / 128.0;
      const y = (v * height) / 2;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      
      x += sliceWidth;
    }
    
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    
    // Add glow effect if enabled
    if (glow) {
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
    
    // Draw mirrored wave if enabled
    if (mirror) {
      ctx.beginPath();
      x = 0;
      
      for (let i = 0; i < barCount; i++) {
        const v = data[i] / 128.0;
        const y = height - (v * height) / 2;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        
        x += sliceWidth;
      }
      
      ctx.lineTo(width, height / 2);
      ctx.globalAlpha = 0.5;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  };

  // Draw circular visualization
  const drawCircular = (ctx: CanvasRenderingContext2D, data: Uint8Array) => {
    ctx.clearRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;
    
    // Create gradient if needed
    let strokeStyle: string | CanvasGradient = color;
    if (useGradient) {
      const gradient = ctx.createRadialGradient(centerX, centerY, radius / 2, centerX, centerY, radius * 1.5);
      gradient.addColorStop(0, secondaryColor);
      gradient.addColorStop(1, color);
      strokeStyle = gradient;
    }
    
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = 2;
    
    // Draw circular visualization
    ctx.beginPath();
    
    for (let i = 0; i < barCount; i++) {
      const amplitude = data[i] / 255;
      const angle = (i / barCount) * Math.PI * 2;
      const adjustedRadius = radius + amplitude * radius * sensitivity;
      
      const x = centerX + Math.cos(angle) * adjustedRadius;
      const y = centerY + Math.sin(angle) * adjustedRadius;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        if (smooth) {
          // Use quadratic curves for smoother appearance
          const prevAngle = ((i - 1) / barCount) * Math.PI * 2;
          const prevAmplitude = data[i - 1] / 255;
          const prevRadius = radius + prevAmplitude * radius * sensitivity;
          
          const prevX = centerX + Math.cos(prevAngle) * prevRadius;
          const prevY = centerY + Math.sin(prevAngle) * prevRadius;
          
          const cpX = (prevX + x) / 2;
          const cpY = (prevY + y) / 2;
          
          ctx.quadraticCurveTo(cpX, cpY, x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
    }
    
    ctx.closePath();
    ctx.stroke();
    
    // Add glow effect if enabled
    if (glow) {
      ctx.shadowBlur = 15;
      ctx.shadowColor = color;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
    
    // Add inner circle
    if (mirror) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius / 2, 0, Math.PI * 2);
      ctx.globalAlpha = 0.3;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  };

  // Draw particles visualization
  const drawParticles = (ctx: CanvasRenderingContext2D, data: Uint8Array) => {
    ctx.clearRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    const baseRadius = Math.min(width, height) / 4;
    
    // Create gradient if needed
    let fillStyle: string | CanvasGradient = color;
    if (useGradient) {
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseRadius * 2);
      gradient.addColorStop(0, secondaryColor);
      gradient.addColorStop(1, color);
      fillStyle = gradient;
    }
    
    ctx.fillStyle = fillStyle;
    
    // Draw particles
    for (let i = 0; i < barCount; i++) {
      const amplitude = data[i] / 255;
      const angle = (i / barCount) * Math.PI * 2;
      const distance = baseRadius + amplitude * baseRadius * sensitivity;
      
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      // Particle size based on amplitude
      const particleSize = 2 + amplitude * 8;
      
      ctx.beginPath();
      ctx.arc(x, y, particleSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Add glow effect if enabled
      if (glow) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      
      // Add connecting lines if mirror is enabled
      if (mirror && i > 0) {
        const prevAngle = ((i - 1) / barCount) * Math.PI * 2;
        const prevAmplitude = data[i - 1] / 255;
        const prevDistance = baseRadius + prevAmplitude * baseRadius * sensitivity;
        
        const prevX = centerX + Math.cos(prevAngle) * prevDistance;
        const prevY = centerY + Math.sin(prevAngle) * prevDistance;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(prevX, prevY);
        ctx.globalAlpha = 0.3;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  };

  // Main visualization function
  const visualize = (timestamp: number) => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx || !dataArrayRef.current) return;
    
    // Get audio data
    if (simulateAudio) {
      timeRef.current = timestamp / 1000; // Convert to seconds
      generateSimulatedData(timeRef.current);
    } else if (analyserRef.current) {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    }
    
    // Draw visualization based on selected type
    switch (visualizationType) {
      case 'bars':
        drawBars(ctx, dataArrayRef.current);
        break;
      case 'wave':
        drawWave(ctx, dataArrayRef.current);
        break;
      case 'circular':
        drawCircular(ctx, dataArrayRef.current);
        break;
      case 'particles':
        drawParticles(ctx, dataArrayRef.current);
        break;
    }
    
    // Continue animation
    animationRef.current = requestAnimationFrame(visualize);
  };

  // Handle volume change
  const handleVolumeChange = (value: number) => {
    setVolume(value);
    setSimulationAmplitude(value);
  };

  // Handle frequency change
  const handleFrequencyChange = (value: number) => {
    setFrequency(value);
    setSimulationFrequency(value);
  };

  return (
    <Box width={`${width}px`}>
      <Box
        width={`${width}px`}
        height={`${height}px`}
        borderRadius="md"
        overflow="hidden"
        bg="blackAlpha.100"
        position="relative"
      >
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={{ display: 'block' }}
        />
        
        <svg width="0" height="0">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor={secondaryColor} />
            </linearGradient>
          </defs>
        </svg>
      </Box>
      
      {showControls && (
        <Flex mt={4} direction="column" gap={2}>
          <Button
            onClick={toggleMicrophone}
            colorScheme={isListening ? 'red' : 'blue'}
            size="sm"
          >
            {isListening ? 'Stop' : 'Start'} Visualization
          </Button>
          
          {simulateAudio && (
            <>
              <Flex align="center" gap={2}>
                <Box minWidth="80px">Volume:</Box>
                <Slider
                  value={volume}
                  onChange={handleVolumeChange}
                  min={0.1}
                  max={1}
                  step={0.05}
                  colorScheme="blue"
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Flex>
              
              <Flex align="center" gap={2}>
                <Box minWidth="80px">Speed:</Box>
                <Slider
                  value={frequency}
                  onChange={handleFrequencyChange}
                  min={0.01}
                  max={0.2}
                  step={0.01}
                  colorScheme="blue"
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Flex>
            </>
          )}
        </Flex>
      )}
    </Box>
  );
};

export default AudioVisualizer;

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock canvas methods
const mockContext = {
  clearRect: jest.fn(),
  beginPath: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  stroke: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  rect: jest.fn(),
  createLinearGradient: jest.fn(() => ({
    addColorStop: jest.fn()
  })),
  createRadialGradient: jest.fn(() => ({
    addColorStop: jest.fn()
  })),
  fillRect: jest.fn(),
  strokeStyle: '',
  fillStyle: '',
  lineWidth: 0,
  shadowBlur: 0,
  shadowColor: '',
  globalAlpha: 1,
  globalCompositeOperation: 'source-over',
  closePath: jest.fn(),
  quadraticCurveTo: jest.fn(),
};

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn(callback => {
  callback(0);
  return 0;
});

// Mock cancelAnimationFrame
global.cancelAnimationFrame = jest.fn();

// Mock AudioContext and related audio APIs
class MockAnalyser {
  frequencyBinCount = 128;
  fftSize = 256;

  getByteFrequencyData = jest.fn((array) => {
    // Fill with random data
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  });
}

class MockAudioContext {
  createAnalyser = jest.fn(() => new MockAnalyser());
  createMediaStreamSource = jest.fn(() => ({
    connect: jest.fn()
  }));
  close = jest.fn();
  state = 'running';
}

// Mock getContext
HTMLCanvasElement.prototype.getContext = jest.fn(() => mockContext);

// Mock AudioContext
(window as any).AudioContext = MockAudioContext;
(window as any).webkitAudioContext = MockAudioContext;

// Mock getBoundingClientRect
HTMLCanvasElement.prototype.getBoundingClientRect = jest.fn(() => ({
  left: 0,
  top: 0,
  width: 500,
  height: 300,
  x: 0,
  y: 0,
  right: 500,
  bottom: 300,
  toJSON: jest.fn()
}));

// Mock getUserMedia
Object.defineProperty(global.navigator, 'mediaDevices', {
  value: {
    getUserMedia: jest.fn(() => Promise.resolve('mock stream')),
  },
  writable: true,
});

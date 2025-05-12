import { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Point {
  x: number;
  y: number;
}

interface GraphProps {
  point1: Point;
  point2: Point;
  xToInterpolate: number;
  interpolatedY: number | null;
  onUpdatePoint1?: (x: number, y: number) => void;
  onUpdatePoint2?: (x: number, y: number) => void;
  onUpdateXToInterpolate?: (x: number) => void;
}

export default function Graph({ 
  point1, 
  point2, 
  xToInterpolate, 
  interpolatedY,
  onUpdatePoint1,
  onUpdatePoint2,
  onUpdateXToInterpolate
}: GraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // State for drag operations
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragTarget, setDragTarget] = useState<'point1' | 'point2' | 'interpolate' | null>(null);
  
  // Variables to track coordinate mapping
  const mapXRef = useRef<(x: number) => number>(() => 0);
  const mapYRef = useRef<(y: number) => number>(() => 0);
  const inverseMapXRef = useRef<(x: number) => number>(() => 0);
  const inverseMapYRef = useRef<(y: number) => number>(() => 0);
  
  // Function to snap values to integer or .25/.50 increments
  const snapToIncrement = (value: number): number => {
    // Calculate how far we are from the nearest 0.25 increment
    const remainder = value % 0.25;
    
    // Snap to the nearest 0.25 increment
    if (remainder < 0.125) {
      return Math.floor(value / 0.25) * 0.25;
    } else {
      return Math.ceil(value / 0.25) * 0.25;
    }
  };

  // Function to draw the graph
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    
    if (!canvas || !container) return;
    
    // Set canvas dimensions
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate range for graph
    const padding = 30; // Padding from the edges
    const x1 = point1.x;
    const y1 = point1.y;
    const x2 = point2.x;
    const y2 = point2.y;
    const x = xToInterpolate;
    const y = interpolatedY !== null ? interpolatedY : 0;
    
    // Calculate bounds with some margin
    const xMin = Math.min(x1, x2, x) - 2;
    const xMax = Math.max(x1, x2, x) + 2;
    const yValues = [y1, y2];
    if (interpolatedY !== null) yValues.push(y);
    const yMin = Math.min(...yValues) - 2;
    const yMax = Math.max(...yValues) + 2;
    
    // Functions to map coordinates
    const mapX = (xVal: number) => 
      padding + (xVal - xMin) * (canvas.width - 2 * padding) / (xMax - xMin);
    
    const mapY = (yVal: number) => 
      canvas.height - (padding + (yVal - yMin) * (canvas.height - 2 * padding) / (yMax - yMin));
    
    // Inverse mapping functions (canvas coordinates to graph coordinates)
    const inverseMapX = (canvasX: number) =>
      xMin + (canvasX - padding) * (xMax - xMin) / (canvas.width - 2 * padding);
    
    const inverseMapY = (canvasY: number) =>
      yMin + (canvas.height - canvasY - padding) * (yMax - yMin) / (canvas.height - 2 * padding);
    
    // Store mapping functions in refs for event handlers
    mapXRef.current = mapX;
    mapYRef.current = mapY;
    inverseMapXRef.current = inverseMapX;
    inverseMapYRef.current = inverseMapY;
    
    // Draw grid
    drawGrid(ctx, xMin, xMax, yMin, yMax, padding, mapX, mapY);
    
    // Draw axes
    drawAxes(ctx, xMin, xMax, yMin, yMax, padding, mapX, mapY);
    
    // Draw interpolation line
    if (x1 !== x2) {
      drawLine(ctx, x1, y1, x2, y2, mapX, mapY, '#2196F3', 2);
    }
    
    // Draw points
    drawPoint(ctx, x1, y1, mapX, mapY, '#2196F3');
    drawPoint(ctx, x2, y2, mapX, mapY, '#2196F3');
    
    // Draw interpolated point and dashed lines
    if (interpolatedY !== null) {
      drawPoint(ctx, x, y, mapX, mapY, '#FF4081');
      
      // Draw dashed lines to axes
      drawDashedLine(
        ctx,
        padding, 
        mapY(y), 
        mapX(x), 
        mapY(y), 
        '#FF4081'
      );
      
      drawDashedLine(
        ctx,
        mapX(x), 
        mapY(y), 
        mapX(x), 
        canvas.height - padding, 
        '#FF4081'
      );
    }
  }, [point1, point2, xToInterpolate, interpolatedY]);

  // Function to check if the mouse is near a point
  const isNearPoint = (mouseX: number, mouseY: number, pointX: number, pointY: number): boolean => {
    const mapX = mapXRef.current;
    const mapY = mapYRef.current;
    const canvasPointX = mapX(pointX);
    const canvasPointY = mapY(pointY);
    
    // Calculate distance between mouse and point
    const distance = Math.sqrt(
      Math.pow(mouseX - canvasPointX, 2) + 
      Math.pow(mouseY - canvasPointY, 2)
    );
    
    // Consider the point "hit" if the mouse is within 10 pixels
    return distance <= 10;
  };
  
  // Mouse event handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Nested helper function for snapping values
    const snapToGridValue = (value: number): number => {
      // Calculate how far we are from the nearest 0.25 increment
      const remainder = value % 0.25;
      
      // Snap to the nearest 0.25 increment
      if (remainder < 0.125) {
        return Math.floor(value / 0.25) * 0.25;
      } else {
        return Math.ceil(value / 0.25) * 0.25;
      }
    };
    
    const handleMouseDown = (e: MouseEvent) => {
      if (!onUpdatePoint1 && !onUpdatePoint2 && !onUpdateXToInterpolate) return;
      
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Check if the user clicked on a draggable point
      if (isNearPoint(mouseX, mouseY, point1.x, point1.y) && onUpdatePoint1) {
        setIsDragging(true);
        setDragTarget('point1');
      } else if (isNearPoint(mouseX, mouseY, point2.x, point2.y) && onUpdatePoint2) {
        setIsDragging(true);
        setDragTarget('point2');
      } else if (interpolatedY !== null && isNearPoint(mouseX, mouseY, xToInterpolate, interpolatedY) && onUpdateXToInterpolate) {
        setIsDragging(true);
        setDragTarget('interpolate');
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !dragTarget) return;
      
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const inverseMapX = inverseMapXRef.current;
      const inverseMapY = inverseMapYRef.current;
      
      // Convert canvas coordinates to graph coordinates
      let graphX = inverseMapX(mouseX);
      let graphY = inverseMapY(mouseY);
      
      // Snap to integer or .25/.50 increments
      graphX = snapToGridValue(graphX);
      graphY = snapToGridValue(graphY);
      
      // Update the appropriate point based on the drag target
      if (dragTarget === 'point1' && onUpdatePoint1) {
        onUpdatePoint1(graphX, graphY);
      } else if (dragTarget === 'point2' && onUpdatePoint2) {
        onUpdatePoint2(graphX, graphY);
      } else if (dragTarget === 'interpolate' && onUpdateXToInterpolate) {
        onUpdateXToInterpolate(graphX);
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      setDragTarget(null);
    };
    
    // Add event listeners
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Remove event listeners when component unmounts
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [point1, point2, xToInterpolate, interpolatedY, isDragging, dragTarget, onUpdatePoint1, onUpdatePoint2, onUpdateXToInterpolate]);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      
      if (!canvas || !container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      // Re-render the graph
      const event = new Event('resize');
      window.dispatchEvent(event);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Visualization / Visualisation</h2>
        <div 
          ref={containerRef} 
          className="relative h-64 md:h-80 border border-gray-300 bg-white rounded-md"
          style={{ 
            cursor: isDragging ? 'grabbing' : (
              dragTarget ? 'grabbing' : 'default'
            ) 
          }}
        >
          <canvas 
            ref={canvasRef} 
            className="w-full h-full"
            style={{ 
              cursor: (onUpdatePoint1 || onUpdatePoint2 || onUpdateXToInterpolate) ? 'pointer' : 'default' 
            }}
          ></canvas>
          {(onUpdatePoint1 || onUpdatePoint2 || onUpdateXToInterpolate) && (
            <div className="absolute bottom-2 right-2 bg-white/80 text-xs text-gray-600 py-1 px-2 rounded">
              <span>Tip: Click and drag points to move them</span>
            </div>
          )}
        </div>
        <div className="flex justify-between mt-3 text-sm text-gray-600">
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-primary rounded-full mr-1"></span> 
            <span>Interpolation line</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-secondary rounded-full mr-1"></span>
            <span>Interpolated point</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper functions for drawing on the canvas
function drawGrid(
  ctx: CanvasRenderingContext2D, 
  xMin: number, 
  xMax: number, 
  yMin: number, 
  yMax: number, 
  padding: number,
  mapX: (x: number) => number,
  mapY: (y: number) => number
) {
  ctx.strokeStyle = '#EEEEEE';
  ctx.lineWidth = 1;
  
  // Draw horizontal grid lines
  for (let y = Math.floor(yMin); y <= Math.ceil(yMax); y++) {
    const canvasY = mapY(y);
    ctx.beginPath();
    ctx.moveTo(padding, canvasY);
    ctx.lineTo(ctx.canvas.width - padding, canvasY);
    ctx.stroke();
    
    // Label
    ctx.fillStyle = '#666666';
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(y.toString(), padding - 5, canvasY + 3);
  }
  
  // Draw vertical grid lines
  for (let x = Math.floor(xMin); x <= Math.ceil(xMax); x++) {
    const canvasX = mapX(x);
    ctx.beginPath();
    ctx.moveTo(canvasX, padding);
    ctx.lineTo(canvasX, ctx.canvas.height - padding);
    ctx.stroke();
    
    // Label
    ctx.fillStyle = '#666666';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(x.toString(), canvasX, ctx.canvas.height - padding + 15);
  }
}

function drawAxes(
  ctx: CanvasRenderingContext2D, 
  xMin: number, 
  xMax: number, 
  yMin: number, 
  yMax: number, 
  padding: number,
  mapX: (x: number) => number,
  mapY: (y: number) => number
) {
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  
  // X-axis (if visible)
  if (yMin <= 0 && yMax >= 0) {
    const axisY = mapY(0);
    ctx.beginPath();
    ctx.moveTo(padding, axisY);
    ctx.lineTo(ctx.canvas.width - padding, axisY);
    ctx.stroke();
  }
  
  // Y-axis (if visible)
  if (xMin <= 0 && xMax >= 0) {
    const axisX = mapX(0);
    ctx.beginPath();
    ctx.moveTo(axisX, padding);
    ctx.lineTo(axisX, ctx.canvas.height - padding);
    ctx.stroke();
  }
}

function drawLine(
  ctx: CanvasRenderingContext2D, 
  x1: number, 
  y1: number, 
  x2: number, 
  y2: number, 
  mapX: (x: number) => number,
  mapY: (y: number) => number,
  color = '#2196F3', 
  width = 2
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(mapX(x1), mapY(y1));
  ctx.lineTo(mapX(x2), mapY(y2));
  ctx.stroke();
}

function drawDashedLine(
  ctx: CanvasRenderingContext2D, 
  x1: number, 
  y1: number, 
  x2: number, 
  y2: number, 
  color: string
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 3]);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawPoint(
  ctx: CanvasRenderingContext2D, 
  x: number, 
  y: number, 
  mapX: (x: number) => number,
  mapY: (y: number) => number,
  color: string
) {
  const radius = 6;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(
    mapX(x), 
    mapY(y), 
    radius, 
    0, 
    2 * Math.PI
  );
  ctx.fill();
  
  // White center
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(
    mapX(x), 
    mapY(y), 
    radius / 2, 
    0, 
    2 * Math.PI
  );
  ctx.fill();
}

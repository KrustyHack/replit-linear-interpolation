import { useRef, useEffect } from "react";
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
}

export default function Graph({ point1, point2, xToInterpolate, interpolatedY }: GraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
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
        >
          <canvas ref={canvasRef} className="w-full h-full"></canvas>
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

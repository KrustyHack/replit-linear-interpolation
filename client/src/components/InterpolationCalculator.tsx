import { useState, useEffect } from "react";
import InputForm from "./InputForm";
import Graph from "./Graph";
import FormulaCard from "./FormulaCard";

// Define the type for points and interpolation data
interface Point {
  x: number;
  y: number;
}

interface InterpolationData {
  point1: Point;
  point2: Point;
  xToInterpolate: number;
  interpolatedY: number | null;
  error: string | null;
}

export default function InterpolationCalculator() {
  // Initialize with default values
  const [data, setData] = useState<InterpolationData>({
    point1: { x: 0, y: 0 },
    point2: { x: 10, y: 5 },
    xToInterpolate: 5,
    interpolatedY: null,
    error: null
  });

  // Calculate interpolation whenever inputs change
  useEffect(() => {
    calculateInterpolation();
  }, [data.point1, data.point2, data.xToInterpolate]);

  const calculateInterpolation = () => {
    const { point1, point2, xToInterpolate } = data;
    
    // Check for division by zero (when x1 = x2)
    if (point1.x === point2.x) {
      setData(prev => ({
        ...prev,
        interpolatedY: null,
        error: "Error: x₁ = x₂ (division by zero)"
      }));
      return;
    }
    
    // Calculate interpolated value using the formula: y = y1 + ((x - x1) * (y2 - y1)) / (x2 - x1)
    const interpolatedY = point1.y + 
      ((xToInterpolate - point1.x) * (point2.y - point1.y)) / 
      (point2.x - point1.x);
    
    setData(prev => ({
      ...prev,
      interpolatedY,
      error: null
    }));
  };

  const updatePoint1 = (x: number, y: number) => {
    setData(prev => ({
      ...prev,
      point1: { x, y }
    }));
  };

  const updatePoint2 = (x: number, y: number) => {
    setData(prev => ({
      ...prev,
      point2: { x, y }
    }));
  };

  const updateXToInterpolate = (x: number) => {
    setData(prev => ({
      ...prev,
      xToInterpolate: x
    }));
  };

  const resetForm = () => {
    setData({
      point1: { x: 0, y: 0 },
      point2: { x: 10, y: 5 },
      xToInterpolate: 5,
      interpolatedY: 2.5,
      error: null
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Linear Interpolation Calculator</h1>
        <p className="text-xl text-gray-600">Calculateur d'interpolation linéaire</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Input Form */}
        <InputForm 
          point1={data.point1}
          point2={data.point2}
          xToInterpolate={data.xToInterpolate}
          interpolatedY={data.interpolatedY}
          error={data.error}
          onUpdatePoint1={updatePoint1}
          onUpdatePoint2={updatePoint2}
          onUpdateXToInterpolate={updateXToInterpolate}
          onReset={resetForm}
          onCalculate={calculateInterpolation}
        />

        {/* Right Column: Visualization and Formula */}
        <div className="flex flex-col space-y-6">
          <Graph 
            point1={data.point1}
            point2={data.point2}
            xToInterpolate={data.xToInterpolate}
            interpolatedY={data.interpolatedY}
            onUpdatePoint1={updatePoint1}
            onUpdatePoint2={updatePoint2}
            onUpdateXToInterpolate={updateXToInterpolate}
          />
          
          <FormulaCard />
        </div>
      </div>
    </div>
  );
}

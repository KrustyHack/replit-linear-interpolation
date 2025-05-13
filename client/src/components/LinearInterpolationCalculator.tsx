import React, { useState } from 'react';

interface FormValues {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  x: string;
  y: string;
  interpolationType: 'findY' | 'findX';
}

const LinearInterpolationCalculator: React.FC = () => {
  const [values, setValues] = useState<FormValues>({
    x1: '',
    y1: '',
    x2: '',
    y2: '',
    x: '',
    y: '',
    interpolationType: 'findY'
  });

  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const interpolationType = e.target.value as 'findY' | 'findX';
    setValues(prev => ({ ...prev, interpolationType, x: '', y: '' }));
    setResult(null);
    setError(null);
  };

  const calculateInterpolation = () => {
    const { x1, y1, x2, y2, x, y, interpolationType } = values;
    
    // Validate inputs
    const numX1 = parseFloat(x1);
    const numY1 = parseFloat(y1);
    const numX2 = parseFloat(x2);
    const numY2 = parseFloat(y2);
    
    if (isNaN(numX1) || isNaN(numY1) || isNaN(numX2) || isNaN(numY2)) {
      setError('Please enter valid numbers for all known points');
      return;
    }
    
    if (numX1 === numX2) {
      setError('The x-values of the two points cannot be identical');
      return;
    }

    try {
      if (interpolationType === 'findY') {
        const numX = parseFloat(x);
        if (isNaN(numX)) {
          setError('Please enter a valid x-value to interpolate');
          return;
        }

        // Calculate y using linear interpolation formula
        const interpolatedY = numY1 + ((numX - numX1) * (numY2 - numY1)) / (numX2 - numX1);
        setResult(parseFloat(interpolatedY.toFixed(6)));
      } else {
        const numY = parseFloat(y);
        if (isNaN(numY)) {
          setError('Please enter a valid y-value to interpolate');
          return;
        }

        if (numY1 === numY2) {
          setError('The y-values of the two points cannot be identical for x interpolation');
          return;
        }

        // Calculate x using rearranged linear interpolation formula
        const interpolatedX = numX1 + ((numY - numY1) * (numX2 - numX1)) / (numY2 - numY1);
        setResult(parseFloat(interpolatedX.toFixed(6)));
      }
    } catch (err) {
      setError('An error occurred during calculation');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <label className="block mb-2 font-medium text-gray-700">Interpolation Type:</label>
        <select
          name="interpolationType"
          value={values.interpolationType}
          onChange={handleTypeChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="findY">Find Y-value (given X)</option>
          <option value="findX">Find X-value (given Y)</option>
        </select>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-medium mb-4">First Point</h3>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block mb-1 text-gray-700">X₁:</label>
              <input
                type="number"
                name="x1"
                value={values.x1}
                onChange={handleChange}
                placeholder="Enter x₁"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 text-gray-700">Y₁:</label>
              <input
                type="number"
                name="y1"
                value={values.y1}
                onChange={handleChange}
                placeholder="Enter y₁"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Second Point</h3>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block mb-1 text-gray-700">X₂:</label>
              <input
                type="number"
                name="x2"
                value={values.x2}
                onChange={handleChange}
                placeholder="Enter x₂"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 text-gray-700">Y₂:</label>
              <input
                type="number"
                name="y2"
                value={values.y2}
                onChange={handleChange}
                placeholder="Enter y₂"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Value to Interpolate</h3>
        {values.interpolationType === 'findY' ? (
          <div className="w-full md:w-1/3">
            <label className="block mb-1 text-gray-700">X:</label>
            <input
              type="number"
              name="x"
              value={values.x}
              onChange={handleChange}
              placeholder="Enter x value"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        ) : (
          <div className="w-full md:w-1/3">
            <label className="block mb-1 text-gray-700">Y:</label>
            <input
              type="number"
              name="y"
              value={values.y}
              onChange={handleChange}
              placeholder="Enter y value"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        )}
      </div>
      
      <button
        onClick={calculateInterpolation}
        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
      >
        Calculate
      </button>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {result !== null && (
        <div className="mt-8">
          <h3 className="text-xl font-medium mb-2">Result:</h3>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-lg">
              {values.interpolationType === 'findY' 
                ? `y = ${result}` 
                : `x = ${result}`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinearInterpolationCalculator; 
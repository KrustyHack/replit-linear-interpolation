import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

declare global {
  interface Window {
    katex: any;
  }
}

export default function FormulaCard() {
  const formulaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Check if KaTeX is loaded
    const renderFormula = () => {
      if (window.katex && formulaRef.current) {
        const formulaText = `y = y_1 + \\frac{(x - x_1)(y_2 - y_1)}{(x_2 - x_1)}`;
        window.katex.render(formulaText, formulaRef.current);
      } else {
        // If KaTeX is not yet loaded, try again shortly
        setTimeout(renderFormula, 100);
      }
    };
    
    renderFormula();
  }, []);
  
  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-3">Formula / Formule</h2>
        <div className="flex items-center justify-center bg-gray-50 p-4 rounded-lg">
          <div ref={formulaRef} className="text-lg"></div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Explanation / Explication</h3>
          <p className="text-gray-700">
            Linear interpolation finds a value that falls proportionally between two known points. The formula calculates a y-value for a given x-value on a straight line between the two points.
          </p>
          <p className="text-gray-700 mt-2">
            L'interpolation linéaire trouve une valeur qui se situe proportionnellement entre deux points connus. La formule calcule une valeur y pour une valeur x donnée sur une ligne droite entre les deux points.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

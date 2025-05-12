import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Point {
  x: number;
  y: number;
}

interface InputFormProps {
  point1: Point;
  point2: Point;
  xToInterpolate: number;
  interpolatedY: number | null;
  error: string | null;
  onUpdatePoint1: (x: number, y: number) => void;
  onUpdatePoint2: (x: number, y: number) => void;
  onUpdateXToInterpolate: (x: number) => void;
  onReset: () => void;
  onCalculate: () => void;
}

export default function InputForm({
  point1,
  point2,
  xToInterpolate,
  interpolatedY,
  error,
  onUpdatePoint1,
  onUpdatePoint2,
  onUpdateXToInterpolate,
  onReset,
  onCalculate,
}: InputFormProps) {
  // Helper function to handle number input changes
  const handleNumberInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (value: number) => void
  ) => {
    const value = e.target.value === "" ? 0 : parseFloat(e.target.value);
    setter(value);
  };

  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Input Values / Valeurs d'entrée</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Point 1 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Point 1</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="x1" className="block text-sm font-medium mb-1">x₁</Label>
                <Input
                  type="number"
                  id="x1"
                  value={point1.x}
                  onChange={(e) => 
                    handleNumberInputChange(e, (value) => 
                      onUpdatePoint1(value, point1.y)
                    )
                  }
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="y1" className="block text-sm font-medium mb-1">y₁</Label>
                <Input
                  type="number"
                  id="y1"
                  value={point1.y}
                  onChange={(e) => 
                    handleNumberInputChange(e, (value) => 
                      onUpdatePoint1(point1.x, value)
                    )
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>
          
          {/* Point 2 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Point 2</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="x2" className="block text-sm font-medium mb-1">x₂</Label>
                <Input
                  type="number"
                  id="x2"
                  value={point2.x}
                  onChange={(e) => 
                    handleNumberInputChange(e, (value) => 
                      onUpdatePoint2(value, point2.y)
                    )
                  }
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="y2" className="block text-sm font-medium mb-1">y₂</Label>
                <Input
                  type="number"
                  id="y2"
                  value={point2.y}
                  onChange={(e) => 
                    handleNumberInputChange(e, (value) => 
                      onUpdatePoint2(point2.x, value)
                    )
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* X value to interpolate */}
        <div className="mb-6">
          <Label htmlFor="xToInterpolate" className="block text-lg font-medium mb-2">
            X value to interpolate / Valeur X à interpoler
          </Label>
          <Input
            type="number"
            id="xToInterpolate"
            value={xToInterpolate}
            onChange={(e) => 
              handleNumberInputChange(e, onUpdateXToInterpolate)
            }
            className="w-full text-lg py-6"
          />
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-4 mb-6">
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90"
            onClick={onCalculate}
          >
            <span className="material-icons mr-1">calculate</span>
            Calculate / Calculer
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={onReset}
          >
            <span className="material-icons mr-1">refresh</span>
            Reset / Réinitialiser
          </Button>
        </div>
        
        {/* Result Display */}
        <div className={`bg-accent-light border border-accent rounded-lg p-4 ${error ? 'border-destructive bg-destructive/10' : ''}`}>
          <h3 className={`text-lg font-medium mb-2 ${error ? 'text-destructive' : 'text-accent'}`}>
            Result / Résultat
          </h3>
          <div className="flex items-baseline">
            {error ? (
              <span className="text-xl font-semibold text-destructive">{error}</span>
            ) : (
              <>
                <span className="text-2xl font-semibold mr-2">y = </span>
                <span className="text-3xl font-bold">
                  {interpolatedY !== null ? interpolatedY.toFixed(3) : '...'}
                </span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

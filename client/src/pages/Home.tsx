import InterpolationCalculator from "@/components/InterpolationCalculator";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary">Linear Interpolation Calculator</h1>
        <p className="text-xl text-gray-600">A precise tool for estimating values between known data points</p>
      </header>

      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">What is Linear Interpolation?</h2>
            <p className="mb-4">
              Linear interpolation is a mathematical method used to find values between two known data points on a line. 
              It's a fundamental technique for curve fitting that assumes a linear relationship between points.
            </p>
            <p className="mb-4">
              This method is widely used in mathematics, engineering, computer graphics, data analysis, and various 
              scientific fields to estimate intermediate values when only discrete data points are available.
            </p>
            <p>
              Our calculator provides a simple and accurate way to perform linear interpolation calculations for your 
              projects and research needs.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">How to Use the Calculator</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Enter the coordinates of the first known point (x₁, y₁)</li>
              <li>Enter the coordinates of the second known point (x₂, y₂)</li>
              <li>Input either the x-value or y-value you want to interpolate</li>
              <li>Click the "Calculate" button to get your result</li>
              <li>The calculator will display the interpolated value</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Try Our Linear Interpolation Calculator</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <InterpolationCalculator />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">The Mathematics Behind Linear Interpolation</h2>
        <p className="mb-4">
          Linear interpolation works by finding a straight line that passes through two known points, then using that line to estimate values in between. 
          The formula for linear interpolation is:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg text-center my-6">
          <p className="font-mono text-lg">y = y₁ + ((x - x₁) × (y₂ - y₁)) ÷ (x₂ - x₁)</p>
        </div>
        <p className="mb-4">
          Where (x₁, y₁) and (x₂, y₂) are the coordinates of the two known points, and x is the input value for which you want to find the corresponding y value.
        </p>
        <p>
          This equation represents the weighted average of the two known y-values, with the weights determined by the position of x relative to x₁ and x₂.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Applications of Linear Interpolation</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-medium mb-2">Engineering & Science</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Estimating equipment performance under varying conditions</li>
              <li>Determining intermediate values in experimental data</li>
              <li>Calculating fluid properties at specific temperatures</li>
              <li>Approximating values in thermodynamic tables</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Computer Graphics & Data Visualization</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Creating smooth transitions between color values</li>
              <li>Generating intermediate frames in animations</li>
              <li>Scaling and resizing images</li>
              <li>Filling gaps in incomplete data sets</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Why Use Our Calculator?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-5 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Accuracy</h3>
            <p>Our calculator uses precise mathematical formulas to ensure accurate results for your interpolation needs.</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Speed</h3>
            <p>Get instant results without the need for manual calculations or complex spreadsheet formulas.</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Simplicity</h3>
            <p>User-friendly interface designed for both students and professionals with clear instructions.</p>
          </div>
        </div>
      </section>

      <footer className="text-center text-gray-600 mt-12">
        <p>© {new Date().getFullYear()} Linear Interpolation Calculator. All rights reserved.</p>
      </footer>
    </div>
  );
}

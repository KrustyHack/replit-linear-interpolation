import InterpolationCalculator from "@/components/InterpolationCalculator";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">What is Linear Interpolation?</h2>
            <p className="mb-4">
              <b>Linear interpolation</b> is a mathematical method used to find values between two known data points on a line. 
              It's a fundamental technique for <b>curve fitting</b> that assumes a <b>linear relationship</b> between points.
            </p>
            <p className="mb-4">
              This method is widely used in <b>mathematics</b>, <b>engineering</b>, <b>computer graphics</b>, <b>data analysis</b>, and various 
              scientific fields to <b>estimate intermediate values</b> when only discrete data points are available.
            </p>
            <p>
              Our calculator provides a <b>simple and accurate</b> way to perform linear interpolation calculations for your 
              projects and research needs.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">How to Use the Calculator</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Enter the coordinates of the <b>first known point</b> (x₁, y₁)</li>
              <li>Enter the coordinates of the <b>second known point</b> (x₂, y₂)</li>
              <li>Input either the <b>x-value</b> or <b>y-value</b> you want to interpolate</li>
              <li>Click the <b>"Calculate"</b> button to get your result</li>
              <li>The calculator will display the <b>interpolated value</b></li>
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
          Linear interpolation works by finding a <b>straight line</b> that passes through two known points, then using that line to <b>estimate values in between</b>. 
          The formula for linear interpolation is:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg text-center my-6">
          <p className="font-mono text-lg"><b>y = y₁ + ((x - x₁) × (y₂ - y₁)) ÷ (x₂ - x₁)</b></p>
        </div>
        <p className="mb-4">
          Where <b>(x₁, y₁)</b> and <b>(x₂, y₂)</b> are the coordinates of the two known points, and <b>x</b> is the input value for which you want to find the corresponding <b>y value</b>.
        </p>
        <p>
          This equation represents the <b>weighted average</b> of the two known y-values, with the weights determined by the position of x relative to x₁ and x₂.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Applications of Linear Interpolation</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-medium mb-2">Engineering & Science</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Estimating <b>equipment performance</b> under varying conditions</li>
              <li>Determining <b>intermediate values</b> in experimental data</li>
              <li>Calculating <b>fluid properties</b> at specific temperatures</li>
              <li>Approximating values in <b>thermodynamic tables</b></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Computer Graphics & Data Visualization</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Creating <b>smooth transitions</b> between color values</li>
              <li>Generating <b>intermediate frames</b> in animations</li>
              <li><b>Scaling and resizing</b> images</li>
              <li>Filling gaps in <b>incomplete data sets</b></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Why Use Our Calculator?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-5 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Accuracy</h3>
            <p>Our calculator uses <b>precise mathematical formulas</b> to ensure accurate results for your interpolation needs.</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Speed</h3>
            <p>Get <b>instant results</b> without the need for manual calculations or complex spreadsheet formulas.</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Simplicity</h3>
            <p><b>User-friendly interface</b> designed for both students and professionals with clear instructions.</p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-2">What is interpolation?</h3>
            <p><b>Interpolation</b> is a method of finding new data points within the range of a known set of points. It's essential in <b>scientific research</b>, <b>engineering</b>, and <b>data analysis</b> for estimating values between measured data points.</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Which interpolation method should I choose?</h3>
            <p>The best method depends on your specific needs:</p>
            <ul className="list-disc list-inside mt-2">
              <li><b>Linear interpolation</b> is ideal for simple data or when you need a straightforward approach</li>
              <li><b>Polynomial interpolation</b> works well for smooth curves with few data points</li>
              <li><b>Cubic spline interpolation</b> is best for creating smooth curves that pass through all points while avoiding oscillations</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-2">What's the difference between interpolation and extrapolation?</h3>
            <p><b>Interpolation</b> estimates values <b>between</b> known data points, while <b>extrapolation</b> predicts values <b>outside</b> the range of known data. Extrapolation is generally less reliable since it involves more uncertainty.</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-2">How accurate are the calculations?</h3>
            <p>Our calculator performs calculations with <b>full floating-point precision</b> and displays results rounded to <b>4 decimal places</b>. The accuracy ultimately depends on your chosen interpolation method and the quality of your input data.</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Can I save or share my calculations?</h3>
            <p><b>Yes!</b> The calculator automatically saves your recent calculations in your browser's <b>local storage</b>. You can also <b>export results to CSV</b> format for further analysis or sharing with colleagues.</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Why might I get unexpected results?</h3>
            <p>Unusual results may occur due to:</p>
            <ul className="list-disc list-inside mt-2">
              <li><b>Duplicate x-coordinates</b></li>
              <li>Points <b>not arranged in order</b> of x-coordinates</li>
              <li>Using <b>too few points</b> for your chosen method</li>
              <li>Data <b>not suitable</b> for the selected interpolation approach</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-2">How is interpolation used in engineering?</h3>
            <p>Engineers use interpolation for various applications, including:</p>
            <ul className="list-disc list-inside mt-2">
              <li><b>Structural analysis</b> to determine stress at specific points</li>
              <li><b>Signal processing</b> to reconstruct continuous signals</li>
              <li><b>Control systems</b> to generate smooth control curves</li>
              <li><b>Computational fluid dynamics</b> to calculate values between grid points</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="text-center text-gray-600 mt-12">
        <p>© {new Date().getFullYear()} <b>Linear Interpolation Calculator</b>. All rights reserved.</p>
      </footer>
    </div>
  );
}

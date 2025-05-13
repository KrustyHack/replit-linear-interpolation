import { useState } from "react";

// Table of Contents interface for navigation
interface TocItem {
  id: string;
  title: string;
  subItems?: TocItem[];
}

export default function Tutorial() {
  // Table of contents structure
  const tocItems: TocItem[] = [
    { id: "troubleshooting", title: "Troubleshooting" },
    { id: "how-to-use", title: "How to Use the Calculator" },
    { id: "input-format", title: "Input Format" },
    { 
      id: "example-calculations", 
      title: "Example Calculations",
      subItems: [
        { id: "linear-example", title: "Linear Interpolation" },
        { id: "polynomial-example", title: "Polynomial Interpolation" }
      ]
    },
    { 
      id: "derivations", 
      title: "Mathematical Derivations",
      subItems: [
        { id: "linear-derivation", title: "Linear Interpolation" },
        { id: "polynomial-derivation", title: "Polynomial Interpolation" },
        { id: "cubic-spline-derivation", title: "Cubic Spline Interpolation" }
      ]
    }
  ];

  const [activeSection, setActiveSection] = useState<string>("troubleshooting");

  // Function to scroll to a section
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary">
          Interpolation Calculator Help
        </h1>
        <p className="text-xl text-gray-600">
          Learn how to use the calculator, troubleshoot issues, and understand the mathematical principles behind interpolation.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="lg:w-1/4 shrink-0">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Quick Navigation</h2>
            <nav>
              <ul className="space-y-2">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left py-2 px-3 rounded-md transition-colors ${
                        activeSection === item.id
                          ? "bg-primary text-white"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      {item.title}
                    </button>
                    {item.subItems && (
                      <ul className="pl-4 mt-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.id}>
                            <button
                              onClick={() => scrollToSection(subItem.id)}
                              className={`block w-full text-left py-1 px-3 rounded-md text-sm transition-colors ${
                                activeSection === subItem.id
                                  ? "bg-primary/80 text-white"
                                  : "hover:bg-gray-200"
                              }`}
                            >
                              {subItem.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:w-3/4">
          {/* Troubleshooting Section */}
          <section id="troubleshooting" className="mb-16 scroll-mt-4">
            <h2 className="text-3xl font-bold mb-6 text-primary border-b pb-2">Troubleshooting</h2>
            <p className="mb-4">
              If you're experiencing issues with the calculator, here are some common problems and solutions:
            </p>

            <div className="space-y-6">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-2">JavaScript Issues</h3>
                <p>
                  The calculator is implemented in JavaScript. If you do not have JavaScript enabled in your browser, the form will not work.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-2">Input Requirements</h3>
                <p>
                  The x input values must be unique. No duplicate x values are allowed as this would create an ambiguous function.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-2">Minimum Points</h3>
                <p>
                  Linear interpolation requires at least 2 points. Cubic spline interpolation requires at least 3 points.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-2">Calculation Range</h3>
                <p>
                  For the best results, interpolate within the range of your data points. Extrapolating beyond your data can lead to unpredictable results, especially with higher-order methods.
                </p>
              </div>
            </div>
          </section>

          {/* How to Use Section */}
          <section id="how-to-use" className="mb-16 scroll-mt-4">
            <h2 className="text-3xl font-bold mb-6 text-primary border-b pb-2">How to Use the Calculator</h2>
            
            <ol className="space-y-6 mb-8">
              <li className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-2">1. Enter Your Data Points</h3>
                <p>
                  Add at least two data points by entering x and y values. Each point must have unique x coordinates.
                </p>
              </li>

              <li className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-2">2. Select an Interpolation Method</h3>
                <p>
                  Choose from linear, polynomial, or cubic spline interpolation based on your needs.
                </p>
              </li>

              <li className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-2">3. Specify a Point to Interpolate (Optional)</h3>
                <p>
                  Enter an x-value where you want to calculate the interpolated y-value.
                </p>
              </li>

              <li className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-2">4. Click the Calculate Button</h3>
                <p>
                  The results will show the interpolated value, a graph of your data, and step-by-step calculations.
                </p>
              </li>
            </ol>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Tip: Choosing the Right Method</h3>
              <ul className="list-disc list-inside space-y-2 text-blue-900">
                <li><strong>Linear:</strong> Simple and fast, best for roughly linear data.</li>
                <li><strong>Polynomial:</strong> Creates a smooth curve through all points, but may oscillate wildly with many points.</li>
                <li><strong>Cubic Spline:</strong> Provides the best balance between smoothness and stability.</li>
              </ul>
            </div>
          </section>

          {/* Input Format Section */}
          <section id="input-format" className="mb-16 scroll-mt-4">
            <h2 className="text-3xl font-bold mb-6 text-primary border-b pb-2">Input Format</h2>
            <p className="mb-6">
              The calculator accepts numeric input for both x and y values. Here are the formatting requirements:
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left font-semibold">Format</th>
                    <th className="py-3 px-4 text-left font-semibold">Accepted</th>
                    <th className="py-3 px-4 text-left font-semibold">Not Accepted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4">Integers</td>
                    <td className="py-3 px-4">1, 2, 42, -5</td>
                    <td className="py-3 px-4">-</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Decimals</td>
                    <td className="py-3 px-4">1.5, 3.14, -0.5</td>
                    <td className="py-3 px-4">1,5 (use period, not comma)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Scientific</td>
                    <td className="py-3 px-4">1e3, 2.5e-2</td>
                    <td className="py-3 px-4">1^3, 2.5*10^-2</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Special</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">π, e, √2, fractions</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <h3 className="text-xl font-semibold mb-3">CSV Import Format</h3>
              <p className="mb-3">
                When importing data from CSV, ensure your file has two columns with the first column for x-values and the second for y-values. Headers are optional.
              </p>
              <pre className="bg-gray-50 p-4 rounded overflow-x-auto text-sm">
                x,y{"\n"}
                1,2.5{"\n"}
                2,3.7{"\n"}
                3,4.2
              </pre>
            </div>
          </section>

          {/* Example Calculations Section */}
          <section id="example-calculations" className="mb-16 scroll-mt-4">
            <h2 className="text-3xl font-bold mb-6 text-primary border-b pb-2">Example Calculations</h2>
            
            <section id="linear-example" className="mb-8 scroll-mt-4">
              <h3 className="text-2xl font-semibold mb-4">Linear Interpolation Example</h3>
              <p className="mb-3">Given points:</p>
              <p className="mb-4 pl-4 font-mono">(1, 3) and (4, 9)</p>
              
              <p className="mb-3">Interpolate at x = 2.5:</p>
              <ol className="list-decimal list-inside space-y-2 pl-4 mb-4">
                <li>Calculate slope: m = (9 - 3) / (4 - 1) = 6 / 3 = 2</li>
                <li>Find y-intercept: b = 3 - 2 × 1 = 1</li>
                <li>Linear equation: y = 2x + 1</li>
                <li>Evaluate at x = 2.5: y = 2 × 2.5 + 1 = 6</li>
              </ol>
              
              <p className="font-semibold">Result: The interpolated value at x = 2.5 is y = 6</p>
            </section>
            
            <section id="polynomial-example" className="mb-8 scroll-mt-4">
              <h3 className="text-2xl font-semibold mb-4">Polynomial Interpolation Example</h3>
              <p className="mb-3">Given points:</p>
              <p className="mb-4 pl-4 font-mono">(0, 1), (1, 3), and (2, -1)</p>
              
              <p className="mb-3">For a quadratic polynomial:</p>
              <p className="mb-3 pl-4">Using the Lagrange formula, we get:</p>
              
              <div className="pl-4 mb-4">
                <p className="mb-2 font-mono text-sm">
                  P(x) = 1×[(x-1)(x-2)]/[(0-1)(0-2)] + 3×[(x-0)(x-2)]/[(1-0)(1-2)] + (-1)×[(x-0)(x-1)]/[(2-0)(2-1)]
                </p>
                
                <p className="mb-2">Which simplifies to:</p>
                
                <p className="font-mono">P(x) = -2x² + 4x + 1</p>
              </div>
              
              <p className="font-semibold">Result: The interpolating polynomial is y = -2x² + 4x + 1</p>
            </section>
          </section>

          {/* Mathematical Derivations Section */}
          <section id="derivations" className="mb-16 scroll-mt-4">
            <h2 className="text-3xl font-bold mb-6 text-primary border-b pb-2">Mathematical Derivations</h2>
            
            <section id="linear-derivation" className="mb-10 scroll-mt-4">
              <h3 className="text-2xl font-semibold mb-4">Linear Interpolation Derivation</h3>
              <p className="mb-4">
                A straight line through two points (x₁, y₁) and (x₂, y₂) can be expressed by the equation:
              </p>
              
              <div className="bg-gray-50 p-4 rounded-md text-center mb-6">
                <p className="font-mono text-lg mb-0">y = y₁ + (y₂ - y₁)/(x₂ - x₁) × (x - x₁)</p>
              </div>
              
              <p className="mb-4">To verify this works, we can substitute x = x₁ and x = x₂ into the equation:</p>
              
              <div className="pl-4 mb-6 space-y-2">
                <p>When x = x₁: y = y₁ + (y₂ - y₁)/(x₂ - x₁) × (x₁ - x₁) = y₁ + 0 = y₁ ✓</p>
                <p>When x = x₂: y = y₁ + (y₂ - y₁)/(x₂ - x₁) × (x₂ - x₁) = y₁ + (y₂ - y₁) = y₂ ✓</p>
              </div>
              
              <p className="mb-4">
                This formula is essentially the point-slope form of a line, where the slope is (y₂ - y₁)/(x₂ - x₁).
              </p>
              
              <p className="mb-4">
                The formula can be rewritten in slope-intercept form (y = mx + b) as:
              </p>
              
              <div className="bg-gray-50 p-4 rounded-md text-center mb-6">
                <p className="font-mono text-lg mb-0">
                  y = (y₂ - y₁)/(x₂ - x₁) × x + [y₁ - (y₂ - y₁)/(x₂ - x₁) × x₁]
                </p>
              </div>
              
              <p>
                This is the mathematical foundation of linear interpolation, which estimates the value of y at a given x by drawing a straight line between the two nearest known points.
              </p>
            </section>
            
            <section id="polynomial-derivation" className="mb-10 scroll-mt-4">
              <h3 className="text-2xl font-semibold mb-4">Polynomial Interpolation Derivation</h3>
              <p className="mb-4">
                Polynomial interpolation uses the Lagrange formula to find a polynomial that passes through all given points. For n points, we get an (n-1) degree polynomial.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-md text-center mb-6">
                <p className="font-mono text-lg mb-2">P(x) = Σ y_i × L_i(x)</p>
                <p className="font-mono text-sm">where L_i(x) = Π (x - x_j) / (x_i - x_j) for j ≠ i</p>
              </div>
              
              <p className="mb-4">
                For example, with three points (x₁, y₁), (x₂, y₂), and (x₃, y₃), the Lagrange basis polynomials are:
              </p>
              
              <div className="pl-4 mb-6 space-y-3">
                <p className="font-mono">L₁(x) = [(x - x₂)(x - x₃)] / [(x₁ - x₂)(x₁ - x₃)]</p>
                <p className="font-mono">L₂(x) = [(x - x₁)(x - x₃)] / [(x₂ - x₁)(x₂ - x₃)]</p>
                <p className="font-mono">L₃(x) = [(x - x₁)(x - x₂)] / [(x₃ - x₁)(x₃ - x₂)]</p>
              </div>
              
              <p className="mb-4">The interpolating polynomial is then:</p>
              
              <div className="bg-gray-50 p-4 rounded-md text-center mb-6">
                <p className="font-mono text-lg">P(x) = y₁ × L₁(x) + y₂ × L₂(x) + y₃ × L₃(x)</p>
              </div>
              
              <p className="mb-4">
                This polynomial has the property that P(xᵢ) = yᵢ for each point (xᵢ, yᵢ), ensuring it passes through all the given points.
              </p>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                <h4 className="font-semibold mb-2">Important Note</h4>
                <p>
                  While polynomial interpolation creates a smooth curve through all points, it can lead to wild oscillations with many points (Runge's phenomenon). For most practical applications with many points, cubic spline interpolation is often preferred.
                </p>
              </div>
            </section>
            
            <section id="cubic-spline-derivation" className="scroll-mt-4">
              <h3 className="text-2xl font-semibold mb-4">Cubic Spline Interpolation Derivation</h3>
              <p className="mb-4">
                Cubic spline interpolation uses piecewise cubic polynomials to create a smooth curve. For each interval [xᵢ, xᵢ₊₁], we define a cubic function:
              </p>
              
              <div className="bg-gray-50 p-4 rounded-md text-center mb-6">
                <p className="font-mono text-lg">Sᵢ(x) = aᵢ(x - xᵢ)³ + bᵢ(x - xᵢ)² + cᵢ(x - xᵢ) + dᵢ</p>
              </div>
              
              <p className="mb-4">These cubic functions must satisfy the following conditions:</p>
              
              <ol className="list-decimal list-inside space-y-4 mb-6">
                <li>
                  <p className="font-semibold inline">The spline must pass through all data points:</p>
                  <p className="pl-6 font-mono mt-1">Sᵢ(xᵢ) = yᵢ and Sᵢ(xᵢ₊₁) = yᵢ₊₁</p>
                </li>
                
                <li>
                  <p className="font-semibold inline">Adjacent splines must have matching first derivatives at interior points:</p>
                  <p className="pl-6 font-mono mt-1">S'ᵢ₋₁(xᵢ) = S'ᵢ(xᵢ)</p>
                </li>
                
                <li>
                  <p className="font-semibold inline">Adjacent splines must have matching second derivatives at interior points:</p>
                  <p className="pl-6 font-mono mt-1">S''ᵢ₋₁(xᵢ) = S''ᵢ(xᵢ)</p>
                </li>
                
                <li>
                  <p className="font-semibold inline">Natural boundary conditions (for natural cubic splines):</p>
                  <p className="pl-6 font-mono mt-1">S''₁(x₁) = S''ₙ₋₁(xₙ) = 0</p>
                </li>
              </ol>
              
              <p className="mb-6">
                These conditions create a system of equations that can be solved to find the coefficients aᵢ, bᵢ, cᵢ, and dᵢ for each segment.
              </p>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold mb-3">Advantages of Cubic Splines</h4>
                <p className="mb-3">
                  Cubic splines provide a good balance between smoothness and stability. They ensure continuity in the function and its first and second derivatives, which makes them ideal for many scientific and engineering applications.
                </p>
                <p>
                  For computational efficiency, cubic splines are often calculated using a tridiagonal matrix algorithm, which provides a fast solution to the system of equations.
                </p>
              </div>
            </section>
          </section>
        </main>
      </div>
    </div>
  );
} 
import React from 'react';

// Debunk E=mc^2: Mass-energy equivalence explained with common misconceptions addressed
const DebunkEmc2: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Debunking E = mc²</h1>
      <p className="mb-6 text-gray-700">
        The equation E = mc² is one of the most famous in physics, but it’s often
        misunderstood. This page clarifies what it really means, what it doesn’t,
        and why it matters in everyday physics.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">What E = mc² actually expresses</h2>
        <p className="text-gray-700">In special relativity, the total energy of a particle is</p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>
            E² = (pc)² + (m c²)², which combines rest energy and momentum energy.
          </li>
          <li>
            The rest energy is E₀ = m c², where m is the invariant (rest) mass.
          </li>
          <li>
            The total energy is E = γ m c², where γ is the Lorentz factor. At rest (v = 0), γ = 1 and E = E₀.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Rest mass vs. energy gained from motion</h2>
        <p className="text-gray-700 mb-2">
          Rest mass m is an invariant property of a particle. It does not change simply because the particle is moving faster.
        </p>
        <p className="text-gray-700 mb-2">
          As an object speeds up, its total energy increases through kinetic energy. The energy you gain from motion contributes to E, but the rest mass remains the same.
        </p>
        <p className="text-gray-700">
          The often-discussed idea of "relativistic mass" is an older way to describe this, but modern physics prefers to keep a constant rest mass and describe the energy increase via γ.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Common misconceptions and clarifications</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            Misconception: Mass increases with speed. Correction: The invariant mass (rest mass) stays constant; total energy grows with velocity via γ m c².
          </li>
          <li>
            Misconception: E = mc² means you can freely convert any energy into mass. Correction: Mass-energy equivalence allows conversion, but mass-energy conservation requires accounting for momentum and other factors; conversion is tiny in everyday processes and occurs in high-energy contexts (e.g., particle physics, nuclear reactions).
          </li>
          <li>
            Misconception: E=mc² applies only to energy from motion. Correction: It applies to all forms of energy, including binding energy, internal energy, and rest energy, which can be transformed into mass and vice versa under certain conditions.
          </li>
          <li>
            Misconception: Mass is conserved separately from energy. Correction: In relativity, mass and energy are not separately conserved in all interactions; the conserved quantity is the energy-momentum four-vector, and the invariant mass is a frame-independent property of a system.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">A simple sense-making example</h2>
        <p className="text-gray-700">
          Consider a body of mass m at rest. Its rest energy is E₀ = m c². If we could fully convert that mass into energy, we would release E₀ joules. Conversely, energy can be used to create mass in particle production. For a gram-scale mass, E₀ is enormous (about 9×10¹³ joules, roughly the energy of tens of megatons of TNT).
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Bottom line</h2>
        <p className="text-gray-700">
          E = mc² is not a statement about objects getting heavier as they move. It encodes the deep link between mass and energy: mass is a form of energy, and energy is a form of mass. The speed of light sets the scale, and the invariant mass is the key quantity physicists use today.
        </p>
      </section>
    </main>
  );
};

export default DebunkEmc2;

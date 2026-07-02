import React from "react";
import Section from "../components/Section";
import EVMCalculator from "../EVMCalculator";

export default function CalculatorSection({ theme }) {
  return (
    <Section
      id="calculadora"
      theme={theme}
      icon="🎛️"
      kicker="Práctica"
      title="Calculadora interactiva"
      subtitle="Cambia los valores del proyecto y observa cómo se recalculan las variaciones, los índices y la Curva S en tiempo real."
    >
      <EVMCalculator />
    </Section>
  );
}

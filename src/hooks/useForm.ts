"use client";

import { useCallback, useState } from "react";

export default function useForm(initialStep = 0) {
  const [step, setStep] = useState(initialStep);

  const nextStep = useCallback(() => setStep((current) => current + 1), []);
  const previousStep = useCallback(
    () => setStep((current) => Math.max(0, current - 1)),
    [],
  );

  return {
    step,
    setStep,
    nextStep,
    previousStep,
  };
}

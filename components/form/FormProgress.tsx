import React from 'react';
import { Progress } from "@/components/ui/progress";

const FormProgress = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="px-4 py-5 sm:p-6">
      <Progress value={progress} className="w-full" />
      <p className="mt-2 text-sm text-gray-500">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
};

export default FormProgress;
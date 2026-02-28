import { CheckCircle } from "lucide-react";
import type { ComponentType } from "react";

interface Step {
  id: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
}

interface StepProgressProps {
  steps: readonly Step[];
  currentStep: number;
}

export function StepProgress({ steps, currentStep }: StepProgressProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex items-center justify-between min-w-max sm:min-w-0 px-1">
        {steps.map((stepItem, index) => {
          const isActive = currentStep === index;
          const isCompleted = currentStep > index;
          const Icon = stepItem.icon;

          return (
            <div key={stepItem.id} className="flex items-center">
              {/* Step node */}
              <div className="flex flex-col items-center gap-2">
                {/* Circle + icon */}
                <div
                  className={`
                    flex items-center justify-center
                    shrink-0
                    w-10 h-10 sm:w-12 sm:h-12
                    rounded-full
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-blue-500 shadow-lg shadow-blue-500/50 outline outline-blue-400/40 "
                        : isCompleted
                          ? "bg-emerald-500/15 border border-emerald-500/40"
                          : "bg-slate-700/60 border border-slate-600/40"
                    }
                  `}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Icon
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        isActive ? "text-white" : "text-slate-500"
                      }`}
                    />
                  )}
                </div>

                {/* Label */}
                <span
                  className={`
                    hidden sm:block text-xs font-medium text-center whitespace-nowrap
                    transition-colors duration-300
                    ${isActive ? "text-blue-300 font-semibold" : isCompleted ? "text-emerald-400/80" : "text-slate-600"}
                  `}
                >
                  {stepItem.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

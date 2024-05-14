import { CheckIcon } from "lucide-react";

const steps = [
  { id: "01", name: "Basic Info", href: "#", status: "complete" },
  { id: "02", name: "Category Info", href: "#", status: "current" },
  { id: "03", name: "Variations", href: "#", status: "current" },
  { id: "04", name: "Combinations", href: "#", status: "current" },
  { id: "04", name: "Images", href: "#", status: "upcoming" },
  { id: "05", name: "Preview", href: "#", status: "upcoming" },
];

export default function Stepper({ steps, goTo }: any) {
  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
      >
        {steps.map((step: any, stepIdx: number) => (
          <li key={step.name} className="relative md:flex md:flex-1">
            {step.status === "completed" ? (
              <a
                href={step.href}
                className="group flex w-full items-center cursor-pointer"
                onClick={() => {
                  goTo(stepIdx);
                }}
              >
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-600 group-hover:bg-green-800">
                    <CheckIcon
                      className="h-4 w-4 text-white"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="ml-4 text-sm font-medium">{step.name}</span>
                </span>
              </a>
            ) : step.status === "current" ? (
              <a
                href={step.href}
                className="flex items-center px-6 py-4 text-sm font-medium cursor-pointer"
                aria-current="step"
                onClick={() => {
                  goTo(stepIdx);
                }}
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-green-600">
                  <span className="text-green-600">{stepIdx + 1}</span>
                </span>
                <span className="ml-4 text-sm font-medium text-green-600">
                  {step.name}
                </span>
              </a>
            ) : (
              <a
                href={step.href}
                className="group flex items-center cursor-pointer"
              >
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                    <span className="text-gray-500">
                      {stepIdx + 1}
                    </span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-500">
                    {step.name}
                  </span>
                </span>
              </a>
            )}

            {stepIdx !== steps.length - 1 ? (
              <>
                {/* Arrow separator for lg screens and up */}
                <div
                  className="absolute right-0 top-0 hidden h-full w-5 md:block"
                  aria-hidden="true"
                >
                  <svg
                    className="h-full w-full text-gray-300"
                    viewBox="0 0 22 80"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      vectorEffect="non-scaling-stroke"
                      stroke="currentcolor"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

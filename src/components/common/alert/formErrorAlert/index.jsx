import { AlertCircle } from "lucide-react";

import { Typography } from "@shadcnComponent/typography";

function FormErrorAlert({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div
      role="alert"
      className="mb-3 animate-in fade-in slide-in-from-top-1 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 duration-200"
    >
      <AlertCircle
        size={16}
        strokeWidth={2.2}
        className="mt-0.5 shrink-0 text-red-500"
      />
      <Typography variant="caption" className="text-red-700">
        {message}
      </Typography>
    </div>
  );
}

export default FormErrorAlert;

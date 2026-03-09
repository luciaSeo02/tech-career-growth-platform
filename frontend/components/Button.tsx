"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default function Button({ label, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      style={{ padding: 10, width: "100%", cursor: "pointer" }}
    >
      {label}
    </button>
  );
}

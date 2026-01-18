import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const Card = ({ children, className }) => (
    <div className={cn("bg-white rounded-xl shadow-sm border border-slate-100", className)}>
        {children}
    </div>
);

export const Badge = ({ children, variant = "default" }) => {
    const variants = {
        default: "bg-slate-100 text-slate-700",
        success: "bg-green-100 text-green-700",
        warning: "bg-amber-100 text-amber-700",
        danger: "bg-red-100 text-red-700",
        brand: "bg-red-50 text-red-600",
    };

    return (
        <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", variants[variant])}>
            {children}
        </span>
    );
};

export const Button = ({ children, variant = "primary", className, ...props }) => {
    const variants = {
        primary: "bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-900/10",
        secondary: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50",
        outline: "border-2 border-red-600 text-red-600 hover:bg-red-50",
        ghost: "text-slate-500 hover:text-slate-900 hover:bg-slate-100",
    };

    return (
        <button
            className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2", variants[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
};

export const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            {...props}
        />
    )
})
Input.displayName = "Input"

export const Label = React.forwardRef(({ className, ...props }, ref) => (
    <label
        ref={ref}
        className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700",
            className
        )}
        {...props}
    />
))
Label.displayName = "Label"

export const Select = React.forwardRef(({ className, children, ...props }, ref) => (
    <div className="relative">
        <select
            className={cn(
                "flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 appearance-none",
                className
            )}
            ref={ref}
            {...props}
        >
            {children}
        </select>
    </div>
))
Select.displayName = "Select"

export const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b border-slate-100">
                    <h3 className="font-semibold text-lg text-slate-900">{title}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

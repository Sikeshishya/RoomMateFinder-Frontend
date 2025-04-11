
import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
}

interface CardDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className = '', children }: CardProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children }: CardHeaderProps) {
  return (
    <div className={`p-4 md:p-5 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ className = '', children }: CardTitleProps) {
  return (
    <h3 className={`text-xl font-semibold text-gray-900 ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ className = '', children }: CardDescriptionProps) {
  return (
    <p className={`mt-1 text-gray-500 ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({ className = '', children }: CardContentProps) {
  return (
    <div className={`p-4 md:p-5 pt-0 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ className = '', children }: CardFooterProps) {
  return (
    <div className={`p-4 md:p-5 bg-gray-50 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

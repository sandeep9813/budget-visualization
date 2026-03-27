import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface GovCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'highlight' | 'stats';
}

const GovCard: React.FC<GovCardProps> = ({
  title,
  description,
  children,
  className,
  variant = 'default'
}) => {
  return (
    <Card className={cn(
      'gov-card',
      variant === 'highlight' && 'border-l-4 border-l-primary',
      variant === 'stats' && 'bg-gradient-to-br from-card to-muted/20',
      className
    )}>
      <CardHeader>
        <CardTitle className="gov-heading text-lg">{title}</CardTitle>
        {description && (
          <CardDescription className="gov-subheading">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default GovCard;
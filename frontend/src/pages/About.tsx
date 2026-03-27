import React from 'react';
import GovCard from '@/components/shared/GovCard';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Target, 
  Database, 
  Building2, 
  Users, 
  Award,
  Globe,
  Shield,
  CheckCircle
} from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Target,
      title: 'Transparency',
      description: 'Providing clear and accessible budget information to all citizens'
    },
    {
      icon: Database,
      title: 'Accurate Data',
      description: 'Real-time updates from official government sources'
    },
    {
      icon: Users,
      title: 'Citizen Engagement',
      description: 'Enabling public participation in budget discussions'
    },
    {
      icon: Shield,
      title: 'Accountability',
      description: 'Ensuring responsible use of public resources'
    }
  ];

  const dataSources = [
    {
      name: 'Ministry of Finance',
      description: 'Official budget documents and financial statements',
      frequency: 'Updated quarterly'
    },
    {
      name: 'Office of the Auditor General',
      description: 'Audit reports and expenditure reviews',
      frequency: 'Updated annually'
    },
    {
      name: 'Provincial Governments',
      description: 'Provincial budget allocations and expenditures',
      frequency: 'Updated monthly'
    },
    {
      name: 'National Planning Commission',
      description: 'Development planning and project allocations',
      frequency: 'Updated quarterly'
    }
  ];

  const achievements = [
    {
      title: '50,000+',
      subtitle: 'Active Users',
      description: 'Citizens actively using the portal for budget information'
    },
    {
      title: '99.9%',
      subtitle: 'Data Accuracy',
      description: 'Verified accuracy rate for all published budget data'
    },
    {
      title: '24/7',
      subtitle: 'Availability',
      description: 'Round-the-clock access to budget information'
    },
    {
      title: '1,000+',
      subtitle: 'Feedback Received',
      description: 'Citizen feedback helping improve transparency'
    }
  ];

  const team = [
    {
      name: 'Ministry of Finance',
      role: 'Lead Agency',
      description: 'Overall coordination and data provision'
    },
    {
      name: 'Department of Information Technology',
      role: 'Technical Partner',
      description: 'Portal development and maintenance'
    },
    {
      name: 'Office of the Auditor General',
      role: 'Quality Assurance',
      description: 'Data verification and audit oversight'
    },
    {
      name: 'Civil Society Organizations',
      role: 'Advisory Support',
      description: 'Guidance on transparency best practices'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative">
  {/* Background Box */}
  <div className="absolute inset-0">
    <div className="h-64 w-full bg-red-700 relative">
      {/* Blue border resembling Nepali flag */}
      <div className="absolute inset-0 border-8 border-blue-800"></div>
    </div>
  </div>

  {/* Content on top */}
  <div className="relative">
  {/* Background Box with gradient */}
  <div className="absolute inset-0">
    <div className="h-72 w-full bg-gradient-to-r from-red-600 via-red-700 to-blue-800"></div>
  </div>

  {/* Content on top */}
  <div className="relative z-10 flex flex-col items-center justify-center h-64 text-center px-4">
    <div className="flex justify-center mb-6">
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
        <Building2 className="w-10 h-10 text-primary" />
      </div>
    </div>
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
      About Us
    </h1>
    <p className="text-xl text-white/90">
      Building transparency and accountability in public finance management
    </p>
  </div>
</div>

</div>


      <div className="container mx-auto px-4 py-12">
        {/* Mission Section */}
        <GovCard title="Our Mission" variant="highlight" className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg gov-body mb-6">
                Our mission is to make government budget data transparent, accessible, and understandable to all citizens.
              </p>
              <p className="gov-body">
                This portal serves as a bridge between the government and citizens, ensuring that 
                public financial information is not only available but also understandable and 
                actionable for all stakeholders.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-muted/20">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </GovCard>

        {/* Achievements */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold gov-heading text-center mb-8">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="gov-card text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {achievement.title}
                  </div>
                  <div className="text-lg font-semibold mb-2">
                    {achievement.subtitle}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Data Sources */}
        <GovCard title="Data Sources" variant="highlight" className="mb-12">
          <p className="gov-body mb-6">
            The portal collects and updates data from the following official sources:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataSources.map((source, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Database className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{source.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{source.description}</p>
                    <div className="flex items-center text-xs text-gov-success">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {source.frequency}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GovCard>

        {/* Team & Credits */}
        <GovCard title="Ministry & Credits">
          <p className="gov-body mb-6">
            Key teams and agencies supporting this portal:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.map((member, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{member.name}</h4>
                    <p className="text-sm text-primary font-medium mb-1">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GovCard>

        {/* Technical Information */}
        <div className="mt-12 text-center">
          <div className="bg-muted/20 rounded-lg p-8">
            <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4">Open Government Initiative</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This portal is part of Nepal's commitment to the Open Government Partnership, 
              promoting transparency, citizen engagement, and accountability in governance. 
              All data published here follows international standards for open government data.
            </p>
            <div className="flex justify-center items-center mt-6 space-x-6">
              <div className="flex items-center text-sm text-muted-foreground">
                <Award className="w-4 h-4 mr-2" />
                ISO 27001 Certified
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Shield className="w-4 h-4 mr-2" />
                HTTPS Secured
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 mr-2" />
                WCAG 2.1 Compliant
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

import React, { useState } from 'react';
import GovCard from '@/components/shared/GovCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Building2,
  Globe,
  Facebook,
  Twitter,
  Send,
  MessageSquare,
  User,
  FileText,
  Youtube,
  Linkedin,
  Instagram
} from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: 'Singha Durbar, Kathmandu, Nepal',
      action: 'View on Map',
      link: 'https://maps.google.com/?q=Singha+Durbar,Kathmandu,Nepal'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+977-1-4211327',
      action: 'Call Now',
      link: 'tel:+977-1-4211327'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@mof.gov.np',
      action: 'Send Email',
      link: 'mailto:info@mof.gov.np'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      content: 'Sun-Fri: 10:00 AM - 5:00 PM',
      action: null,
      link: null
    }
  ];

  const departments = [
    {
      name: 'Office of the Finance Minister',
      head: 'Hon\'ble Deputy Prime Minister and Finance Minister Mr. Bishnu Prasad Paudel',
      phone: '+977-1-4211327',
      email: 'minister@mof.gov.np',
      responsibilities: 'Overall policy direction and ministerial oversight',
      photo: '/images/leadership/minister-paudel.jpg'
    },
    {
      name: 'Finance Secretariat',
      head: 'Finance Secretary Mr. Ghanshyam Upadhyaya',
      phone: '+977-1-4211328',
      email: 'finance.secretary@mof.gov.np',
      responsibilities: 'Budget formulation, allocation, and financial policy coordination',
      photo: '/images/leadership/secretary-upadhyaya.jpg'
    },
    {
      name: 'Revenue Administration',
      head: 'Secretary (Revenue) Mr. Dinesh Kumar Ghimire',
      phone: '+977-1-4211329',
      email: 'revenue.secretary@mof.gov.np',
      responsibilities: 'Tax policy, revenue collection, and customs administration',
      photo: '/images/leadership/secretary-ghimire.jpg'
    },
    {
      name: 'Financial Comptroller General Office',
      head: 'Financial Comptroller General Shovakant Poudel',
      phone: '+977-1-4211330',
      email: 'fcgo@mof.gov.np',
      responsibilities: 'Government accounting, financial reporting, and audit oversight',
      photo: '/images/leadership/fcgo-poudel.jpg'
    }
  ];

  const socialLinks = [
    {
      name: 'Ministry Website',
      url: 'https://mof.gov.np',
      icon: Globe,
      description: 'Official ministry website with latest updates'
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/MoFNepal',
      icon: Facebook,
      description: 'Follow us on Facebook for updates'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/MoFNepal',
      icon: Twitter,
      description: 'Follow us on Twitter for announcements'
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@MoFNepal',
      icon: Youtube,
      description: 'Watch budget speeches and press conferences'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/mof-nepal',
      icon: Linkedin,
      description: 'Connect with us on LinkedIn'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/mof_nepal',
      icon: Instagram,
      description: 'Follow us on Instagram for visual updates'
    }
  ];

  const quickLinks = [
    {
      name: 'Budget Speech 2024-25',
      url: 'https://mof.gov.np/en/budget-speech-2024-25',
      description: 'Official budget speech by the Finance Minister'
    },
    {
      name: 'Annual Financial Statement',
      url: 'https://mof.gov.np/en/annual-financial-statement',
      description: 'Comprehensive financial report of the government'
    },
    {
      name: 'Public Debt Report',
      url: 'https://mof.gov.np/en/public-debt-report',
      description: 'Current status of public debt and liabilities'
    },
    {
      name: 'Economic Survey',
      url: 'https://mof.gov.np/en/economic-survey',
      description: 'Annual economic survey and analysis'
    },
    {
      name: 'Budget Implementation Guidelines',
      url: 'https://mof.gov.np/en/budget-guidelines',
      description: 'Guidelines for budget implementation and monitoring'
    },
    {
      name: 'Citizen Charter',
      url: 'https://mof.gov.np/en/citizen-charter',
      description: 'Service standards and citizen rights'
    },
    {
      name: 'Fiscal Policy',
      url: 'https://mof.gov.np/en/fiscal-policy',
      description: 'Current fiscal policy and framework'
    },
    {
      name: 'Revenue Statistics',
      url: 'https://mof.gov.np/en/revenue-statistics',
      description: 'Tax collection and revenue statistics'
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header with gradient */}
      <div className="h-64 w-full bg-gradient-to-r from-red-600 via-red-700 to-blue-800 flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Building2 className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Building transparency and accountability in public finance management
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Contact Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="gov-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                        <p className="text-muted-foreground mb-3">{info.content}</p>
                        {info.action && info.link && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={info.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {info.action}
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Map */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Location</h2>
            <GovCard title="Ministry of Finance Location" variant="highlight">
              <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="text-muted-foreground">Interactive Map</p>
                  <p className="text-sm text-muted-foreground">Singha Durbar, Kathmandu</p>
                  <Button variant="outline" size="sm" className="mt-2" asChild>
                    <a href="https://maps.google.com/?q=Singha+Durbar,Kathmandu,Nepal" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open in Google Maps
                    </a>
                  </Button>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Landmark:</strong> Near Singha Durbar Plaza</p>
                <p><strong>Postal Code:</strong> 44600</p>
                <p><strong>GPS Coordinates:</strong> 27.6947° N, 85.3181° E</p>
              </div>
            </GovCard>
          </div>
        </div>

        {/* Contact Form */}
        <GovCard title="Send us a Message" variant="highlight" className="mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Enter message subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Enter your message here..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="pl-10 min-h-[120px]"
                />
              </div>
            </div>
            <Button type="submit" className="w-full md:w-auto">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>
        </GovCard>

        {/* Department Contacts */}
        <GovCard title="Department Contact Directory" className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="p-6 border border-border rounded-lg hover:border-primary/20 transition-colors bg-card">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={dept.photo}
                      alt={`${dept.head}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to a placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `
                          <div class="w-full h-full bg-primary/10 flex items-center justify-center">
                            <Building2 class="w-6 h-6 text-primary" />
                          </div>
                        `;
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">{dept.name}</h4>
                    <p className="text-sm text-primary font-medium leading-tight">{dept.head}</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                    <a href={`tel:${dept.phone}`} className="hover:text-primary transition-colors">
                      {dept.phone}
                    </a>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                    <a href={`mailto:${dept.email}`} className="hover:text-primary transition-colors">
                      {dept.email}
                    </a>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed">{dept.responsibilities}</p>
                </div>
              </div>
            ))}
          </div>
        </GovCard>

        {/* Quick Links */}
        <GovCard title="Quick Links" variant="highlight">
          <div className="space-y-3">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/20 transition-colors border border-transparent hover:border-primary/20 group"
              >
                <div className="flex-1">
                  <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {link.name}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {link.description}
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </GovCard>

        {/* Social Links */}
        <GovCard title="Connect With Us" variant="highlight" className="mt-6">
          <div className="space-y-4">
            {socialLinks.map((social, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/20 transition-colors">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <social.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{social.name}</h4>
                  <p className="text-sm text-muted-foreground">{social.description}</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href={social.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </GovCard>
      </div>
    </div>
  );
};

export default Contact;

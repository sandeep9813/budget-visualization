import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Send, Filter, User, Star, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Types for feedback data
interface Feedback {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  rating: number;
  category: string;
  status: string;
  priority: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface FeedbackStats {
  total: number;
  avgRating: number;
  pending: number;
  resolved: number;
  categoryDistribution: Array<{ _id: string; count: number }>;
  ratingDistribution: Array<{ _id: number; count: number }>;
  recentFeedbacks: number;
}

const Feedback = () => {
  const { toast } = useToast();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [stats, setStats] = useState<FeedbackStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const [newFeedback, setNewFeedback] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    rating: 5,
    category: "general",
    isAnonymous: false,
    tags: [] as string[]
  });

  const categories = ["general", "budget", "service", "technical", "suggestion", "complaint"];
  const statuses = ["pending", "in-progress", "resolved", "closed"];

  // Fetch feedbacks from backend
  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/feedbacks?limit=50&sortBy=createdAt&sortOrder=desc');
      const data = await response.json();

      if (data.success) {
        setFeedbacks(data.data);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch feedbacks",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      toast({
        title: "Error",
        description: "Failed to connect to server",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics from backend
  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/feedbacks/stats');
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Submit feedback to backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newFeedback.name || !newFeedback.email || !newFeedback.subject || !newFeedback.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch('http://localhost:3001/api/feedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFeedback)
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Feedback Submitted",
          description: "Thank you for your valuable feedback. It will be reviewed by our team.",
          variant: "default"
        });

        // Reset form
        setNewFeedback({
          name: "",
          email: "",
          subject: "",
          message: "",
          rating: 5,
          category: "general",
          isAnonymous: false,
          tags: []
        });

        // Refresh data
        fetchFeedbacks();
        fetchStats();
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to submit feedback",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchFeedbacks();
    fetchStats();
  }, []);

  // Filter feedbacks
  const filteredFeedbacks = feedbacks.filter(feedback => {
    const categoryMatch = filterCategory === "all" || feedback.category === filterCategory;
    const statusMatch = filterStatus === "all" || feedback.status === filterStatus;
    return categoryMatch && statusMatch;
  });

  // Render star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Citizen Feedback Portal
          </h1>
          <p className="text-lg text-muted-foreground">
            Share your thoughts on budget allocations and help improve government spending
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Feedback Form */}
          <Card className="bg-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-semibold text-foreground">
                <Send className="h-5 w-5 text-primary" />
                Submit Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Name *
                    </label>
                    <Input
                      placeholder="Your name"
                      value={newFeedback.name}
                      onChange={(e) => setNewFeedback(prev => ({ ...prev, name: e.target.value }))}
                      disabled={newFeedback.isAnonymous}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email *
                    </label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={newFeedback.email}
                      onChange={(e) => setNewFeedback(prev => ({ ...prev, email: e.target.value }))}
                      disabled={newFeedback.isAnonymous}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Subject *
                    </label>
                    <Input
                      placeholder="Brief subject of your feedback"
                      value={newFeedback.subject}
                      onChange={(e) => setNewFeedback(prev => ({ ...prev, subject: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Category
                    </label>
                    <Select value={newFeedback.category} onValueChange={(value) =>
                      setNewFeedback(prev => ({ ...prev, category: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Rating *
                  </label>
                  <div className="flex items-center gap-2">
                    {renderStars(newFeedback.rating)}
                    <span className="text-sm text-muted-foreground ml-2">
                      {newFeedback.rating}/5
                    </span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setNewFeedback(prev => ({ ...prev, rating }))}
                        className="p-1 hover:bg-muted rounded"
                      >
                        <Star
                          className={`h-5 w-5 ${rating <= newFeedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Your Feedback *
                  </label>
                  <Textarea
                    placeholder="Share your thoughts on budget allocation, suggest improvements, or report issues..."
                    value={newFeedback.message}
                    onChange={(e) => setNewFeedback(prev => ({ ...prev, message: e.target.value }))}
                    className="min-h-32"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-light"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recent Feedback */}
          <Card className="bg-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-semibold text-foreground">
                <MessageSquare className="h-5 w-5 text-primary" />
                Recent Feedback
              </CardTitle>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All status</SelectItem>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="ml-2">Loading feedbacks...</span>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredFeedbacks.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No feedbacks found
                    </div>
                  ) : (
                    filteredFeedbacks.map((feedback) => (
                      <div key={feedback._id} className="p-4 border border-border rounded-lg bg-muted/50">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-foreground">
                              {feedback.name}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {feedback.category}
                            </Badge>
                            <Badge
                              variant={feedback.status === 'resolved' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {feedback.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            {renderStars(feedback.rating)}
                          </div>
                        </div>

                        <h4 className="font-medium text-sm mb-1">{feedback.subject}</h4>
                        <p className="text-sm text-foreground mb-2">{feedback.message}</p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            {feedback.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card className="bg-gradient-to-r from-primary/10 to-primary-light/10 border-primary/20">
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-primary">{stats?.total || 0}</p>
              <p className="text-sm text-muted-foreground">Total Feedback</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-accent/10 to-accent-light/10 border-accent/20">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-accent">
                {stats?.avgRating ? stats.avgRating.toFixed(1) : '0.0'}
              </p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-warning/10 to-warning/20 border-warning/20">
            <CardContent className="p-6 text-center">
              <Filter className="h-8 w-8 text-warning mx-auto mb-2" />
              <p className="text-2xl font-bold text-warning">{stats?.pending || 0}</p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500/10 to-green-600/20 border-green-500/20">
            <CardContent className="p-6 text-center">
              <ThumbsUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-500">{stats?.resolved || 0}</p>
              <p className="text-sm text-muted-foreground">Resolved</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
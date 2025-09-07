import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Download, 
  Plus, 
  CheckCircle, 
  XCircle, 
  Clock,
  DollarSign,
  Calendar,
  AlertCircle,
  Shield,
  Star,
  Users,
  Zap,
  Crown,
  TrendingUp,
  Receipt,
  Settings
} from 'lucide-react';

export default function BillingPage() {
  const currentPlan = {
    name: 'Professional',
    price: '$99',
    period: 'month',
    features: [
      'Up to 10 active campaigns',
      '50 influencer connections',
      'Advanced analytics',
      'Priority support',
      'Custom branding'
    ],
    usage: {
      campaigns: 7,
      campaignsLimit: 10,
      influencers: 32,
      influencersLimit: 50,
      storage: '2.3GB',
      storageLimit: '10GB'
    }
  };

  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: 'month',
      description: 'Perfect for small brands getting started',
      features: [
        'Up to 3 active campaigns',
        '10 influencer connections',
        'Basic analytics',
        'Email support',
        'Standard templates'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '$99',
      period: 'month',
      description: 'Ideal for growing businesses',
      features: [
        'Up to 10 active campaigns',
        '50 influencer connections',
        'Advanced analytics',
        'Priority support',
        'Custom branding'
      ],
      popular: true,
      current: true
    },
    {
      name: 'Enterprise',
      price: '$299',
      period: 'month',
      description: 'For large organizations',
      features: [
        'Unlimited campaigns',
        'Unlimited influencer connections',
        'Advanced analytics & reporting',
        'Dedicated account manager',
        'White-label solution',
        'API access'
      ],
      popular: false
    }
  ];

  const invoices = [
    {
      id: 'INV-2024-001',
      date: '2024-01-01',
      amount: '$99.00',
      status: 'paid',
      description: 'Professional Plan - January 2024'
    },
    {
      id: 'INV-2023-012',
      date: '2023-12-01',
      amount: '$99.00',
      status: 'paid',
      description: 'Professional Plan - December 2023'
    },
    {
      id: 'INV-2023-011',
      date: '2023-11-01',
      amount: '$99.00',
      status: 'paid',
      description: 'Professional Plan - November 2023'
    },
    {
      id: 'INV-2023-010',
      date: '2023-10-01',
      amount: '$99.00',
      status: 'paid',
      description: 'Professional Plan - October 2023'
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'card',
      last4: '5555',
      brand: 'Mastercard',
      expiry: '08/26',
      isDefault: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
          <p className="text-gray-600">Manage your subscription and payment methods</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Download Invoice
        </Button>
      </div>

      {/* Current Plan Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Current Plan</h2>
            <p className="text-gray-600">You're currently on the {currentPlan.name} plan</p>
          </div>
          <Badge className="bg-blue-100 text-blue-800">
            <Crown className="h-3 w-3 mr-1" />
            Active
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold text-gray-900">{currentPlan.price}</span>
              <span className="text-gray-600">/{currentPlan.period}</span>
            </div>
            <p className="text-sm text-gray-600">Next billing date: February 1, 2024</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-2">Usage This Month</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Campaigns</span>
                <span className="font-medium">{currentPlan.usage.campaigns}/{currentPlan.usage.campaignsLimit}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(currentPlan.usage.campaigns / currentPlan.usage.campaignsLimit) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-2">Quick Actions</h3>
            <div className="space-y-2">
              <Button size="sm" variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Manage Plan
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Usage Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">$1,287</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Campaigns</p>
                  <p className="text-2xl font-bold text-gray-900">7</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Zap className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Influencer Connections</p>
                  <p className="text-2xl font-bold text-gray-900">32</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Payment successful</p>
                  <p className="text-xs text-gray-600">January 1, 2024 - $99.00</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New campaign created</p>
                  <p className="text-xs text-gray-600">December 28, 2023 - Summer Fashion 2024</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Star className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Influencer connected</p>
                  <p className="text-xs text-gray-600">December 25, 2023 - Sarah Johnson</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.name} className={`p-6 ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
                {plan.popular && (
                  <div className="text-center mb-4">
                    <Badge className="bg-blue-100 text-blue-800">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full" 
                  variant={plan.current ? "outline" : plan.popular ? "default" : "outline"}
                  disabled={plan.current}
                >
                  {plan.current ? 'Current Plan' : 'Upgrade'}
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Invoice History</h3>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Receipt className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{invoice.id}</h4>
                      <p className="text-sm text-gray-600">{invoice.description}</p>
                      <p className="text-xs text-gray-500">{new Date(invoice.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{invoice.amount}</p>
                      <Badge className={getStatusColor(invoice.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(invoice.status)}
                          {invoice.status}
                        </div>
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Payment Methods</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </div>
            
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900">{method.brand} •••• {method.last4}</h4>
                        {method.isDefault && (
                          <Badge className="bg-blue-100 text-blue-800">Default</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">Expires {method.expiry}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!method.isDefault && (
                      <Button size="sm" variant="outline">Set as Default</Button>
                    )}
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Billing Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" defaultValue="AI Influencer Platform" />
              </div>
              <div>
                <Label htmlFor="email">Billing Email</Label>
                <Input id="email" type="email" defaultValue="billing@example.com" />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Business St" />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" defaultValue="San Francisco" />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" defaultValue="CA" />
              </div>
              <div>
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" defaultValue="94105" />
              </div>
            </div>
            <div className="mt-4">
              <Button>Update Billing Information</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

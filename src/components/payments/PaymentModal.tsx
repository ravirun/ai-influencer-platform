'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  X, 
  CreditCard, 
  CheckCircle, 
  AlertCircle,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  campaignId?: string;
  onSuccess?: (paymentIntentId: string) => void;
}

export function PaymentModal({ isOpen, onClose, amount, campaignId, onSuccess }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          campaignId,
          userId: 'current_user' // TODO: Get from auth context
        }),
      });

      const { clientSecret, paymentIntentId } = await response.json();

      if (!clientSecret) {
        throw new Error('Failed to create payment intent');
      }

      // Initialize Stripe
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      // Confirm payment
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: 'if_required'
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent?.status === 'succeeded') {
        setSuccess(true);
        onSuccess?.(paymentIntent.id);
        
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setSuccess(false);
        }, 2000);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Complete Payment</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Successful!</h3>
              <p className="text-gray-600">Your campaign has been activated.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Payment Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Payment Summary</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Campaign Budget</span>
                  <span className="font-semibold text-gray-900">₹{amount.toLocaleString()}</span>
                </div>
                {campaignId && (
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-600">Campaign ID</span>
                    <span className="text-sm text-gray-500">{campaignId}</span>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Payment Method</Label>
                <div className="mt-2 p-3 border border-gray-300 rounded-lg flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">Card ending in •••• 4242</span>
                  <span className="text-xs text-gray-500 ml-auto">Test Mode</span>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pay ₹{amount.toLocaleString()}
                    </>
                  )}
                </Button>
              </div>

              {/* Test Mode Notice */}
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  This is a test payment. Use card 4242 4242 4242 4242 for testing.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

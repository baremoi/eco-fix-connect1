
import { toast } from "sonner";
import { PaymentDetails } from "./bookingService";

// Mock payment service
export const paymentService = {
  processPayment: async (paymentDetails: PaymentDetails): Promise<{ success: boolean, transactionId?: string, error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Validate card details (basic validation for demonstration)
    if (!paymentDetails.cardNumber || paymentDetails.cardNumber.length < 15) {
      return { success: false, error: "Invalid card number" };
    }
    
    if (!paymentDetails.expiryDate || !paymentDetails.expiryDate.includes('/')) {
      return { success: false, error: "Invalid expiry date" };
    }
    
    if (!paymentDetails.cvv || paymentDetails.cvv.length < 3) {
      return { success: false, error: "Invalid CVV" };
    }
    
    // Simulate payment processing with 90% success rate
    const isSuccessful = Math.random() < 0.9;
    
    if (isSuccessful) {
      return {
        success: true,
        transactionId: `tx-${Math.random().toString(36).substring(2, 12)}`
      };
    } else {
      // Simulate various payment errors
      const errorMessages = [
        "Insufficient funds",
        "Card declined by issuer",
        "Payment network error",
        "Card expired"
      ];
      const errorIndex = Math.floor(Math.random() * errorMessages.length);
      return {
        success: false,
        error: errorMessages[errorIndex]
      };
    }
  },
  
  validateCardNumber: (cardNumber: string): boolean => {
    // Basic validation - in production, use a proper validation library
    return cardNumber.replace(/\s/g, '').length >= 15;
  },
  
  formatCardNumber: (cardNumber: string): string => {
    // Format card number for display (e.g., **** **** **** 1234)
    const lastFour = cardNumber.slice(-4);
    return `**** **** **** ${lastFour}`;
  },
  
  getCardType: (cardNumber: string): string => {
    // Identify card type based on first digits
    const firstDigit = cardNumber.charAt(0);
    const firstTwoDigits = parseInt(cardNumber.substring(0, 2), 10);
    
    if (firstDigit === '4') return 'Visa';
    if (firstDigit === '5') return 'MasterCard';
    if (firstDigit === '3' && (cardNumber.charAt(1) === '4' || cardNumber.charAt(1) === '7')) return 'American Express';
    if (firstTwoDigits >= 51 && firstTwoDigits <= 55) return 'MasterCard';
    return 'Unknown';
  }
};

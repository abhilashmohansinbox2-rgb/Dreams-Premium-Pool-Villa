export interface PricingConfig {
  baseWeekdayRate: number; // default 14000
  weekendSurge: number; // default 1000
  extraGuestRate: number; // default 1000 per night per guest over 8
  gasDailyFee: number; // default 300
  kitchenCleaningFee: number; // default 1500
  securityDeposit: number; // default 5000
  gstRate: number; // default 0.18 (18%)
}

export const DEFAULT_PRICING: PricingConfig = {
  baseWeekdayRate: 14000,
  weekendSurge: 1000,
  extraGuestRate: 1000,
  gasDailyFee: 300,
  kitchenCleaningFee: 1500,
  securityDeposit: 5000,
  gstRate: 0.18,
};

export interface StayCalculationInput {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  adultsCount: number; // default 8
  childrenCount?: number; // default 0 (<= 6 yrs free)
  includeKitchen?: boolean; // full cooking addon
  includeBbq?: boolean; // private poolside BBQ (default 4500)
  includeGas?: boolean;
  customConfig?: Partial<PricingConfig>;
}

export interface StayCalculationResult {
  totalNights: number;
  weekdayNights: number;
  weekendNights: number;
  baseStayTotal: number;
  weekendSurgeTotal: number;
  extraGuestsTotal: number;
  extraGuestCount: number;
  addonsTotal: number;
  gasFeeTotal: number;
  cleaningFeeTotal: number;
  subtotal: number;
  gstAmount: number;
  grandTotal: number;
  refundableDeposit: number;
  effectiveNightlyAverage: number;
  estimatedOtaPrice: number; // ~15% higher on Airbnb/MMT
  directSavings: number;
}

export function isWeekendNight(date: Date): boolean {
  // Friday (5), Saturday (6), and Sunday (0) nights count as weekend in villa hospitality
  const day = date.getDay();
  return day === 5 || day === 6 || day === 0;
}

export function parseDateSafe(dateStr: string): Date {
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  }
  return new Date(dateStr);
}

export function calculateStay(input: StayCalculationInput): StayCalculationResult {
  const config = { ...DEFAULT_PRICING, ...(input.customConfig || {}) };
  const start = parseDateSafe(input.startDate);
  const end = parseDateSafe(input.endDate);

  const diffTime = Math.max(0, end.getTime() - start.getTime());
  const totalNights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));

  let weekdayNights = 0;
  let weekendNights = 0;

  for (let i = 0; i < totalNights; i++) {
    const currentNight = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    if (isWeekendNight(currentNight)) {
      weekendNights++;
    } else {
      weekdayNights++;
    }
  }

  const baseStayTotal = totalNights * config.baseWeekdayRate;
  const weekendSurgeTotal = weekendNights * config.weekendSurge;

  // Extra adults over base capacity of 8
  const adults = Math.max(1, input.adultsCount || 8);
  const extraGuestCount = Math.max(0, adults - 8);
  const extraGuestsTotal = extraGuestCount * config.extraGuestRate * totalNights;

  // Add-ons
  let addonsTotal = 0;
  let gasFeeTotal = 0;
  let cleaningFeeTotal = 0;

  if (input.includeKitchen) {
    // ₹2500 flat extensive kitchen access addon
    addonsTotal += 2500;
    cleaningFeeTotal = config.kitchenCleaningFee;
  }
  if (input.includeBbq) {
    addonsTotal += 4500;
  }
  if (input.includeGas) {
    gasFeeTotal = config.gasDailyFee * totalNights;
    addonsTotal += gasFeeTotal;
  }

  const subtotal = baseStayTotal + weekendSurgeTotal + extraGuestsTotal + addonsTotal;
  const gstAmount = Math.round(subtotal * config.gstRate);
  const grandTotal = subtotal + gstAmount;

  const effectiveNightlyAverage = Math.round(subtotal / totalNights);
  // OTA platforms (Airbnb/MMT) charge ~15% to 18% extra in commission and platform fee
  const estimatedOtaPrice = Math.round((subtotal * 1.16) + gstAmount);
  const directSavings = Math.max(0, estimatedOtaPrice - grandTotal);

  return {
    totalNights,
    weekdayNights,
    weekendNights,
    baseStayTotal,
    weekendSurgeTotal,
    extraGuestsTotal,
    extraGuestCount,
    addonsTotal,
    gasFeeTotal,
    cleaningFeeTotal,
    subtotal,
    gstAmount,
    grandTotal,
    refundableDeposit: config.securityDeposit,
    effectiveNightlyAverage,
    estimatedOtaPrice,
    directSavings,
  };
}

export function formatINR(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}

export function formatDateLabel(dateStr: string): string {
  const d = parseDateSafe(dateStr);
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

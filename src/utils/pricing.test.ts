import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateStay,
  formatINR,
  isWeekendNight,
  DEFAULT_PRICING,
} from './pricing.ts';

test('isWeekendNight correctly identifies Friday, Saturday, and Sunday', () => {
  // 2025-10-10 is Friday
  assert.equal(isWeekendNight(new Date(2025, 9, 10)), true);
  // 2025-10-11 is Saturday
  assert.equal(isWeekendNight(new Date(2025, 9, 11)), true);
  // 2025-10-12 is Sunday
  assert.equal(isWeekendNight(new Date(2025, 9, 12)), true);
  // 2025-10-13 is Monday
  assert.equal(isWeekendNight(new Date(2025, 9, 13)), false);
  // 2025-10-14 is Tuesday
  assert.equal(isWeekendNight(new Date(2025, 9, 14)), false);
});

test('calculateStay computes accurate total for 3 nights with base 8 adults', () => {
  // Tuesday 2025-10-14 to Friday 2025-10-17 = 3 nights (Tue, Wed, Thu = 3 weekdays, 0 weekend)
  const result = calculateStay({
    startDate: '2025-10-14',
    endDate: '2025-10-17',
    adultsCount: 8,
  });

  assert.equal(result.totalNights, 3);
  assert.equal(result.weekdayNights, 3);
  assert.equal(result.weekendNights, 0);
  assert.equal(result.baseStayTotal, 3 * DEFAULT_PRICING.baseWeekdayRate); // 42,000
  assert.equal(result.weekendSurgeTotal, 0);
  assert.equal(result.extraGuestsTotal, 0);
  assert.equal(result.subtotal, 42000);
  assert.equal(result.gstAmount, Math.round(42000 * 0.18)); // 7,560
  assert.equal(result.grandTotal, 42000 + 7560); // 49,560
  assert.equal(result.refundableDeposit, 5000);
});

test('calculateStay adds weekend surge and extra guests correctly', () => {
  // Friday 2025-10-17 to Monday 2025-10-20 = 3 nights (Fri, Sat, Sun = 3 weekend nights)
  // 10 adults = 2 extra guests over base 8
  const result = calculateStay({
    startDate: '2025-10-17',
    endDate: '2025-10-20',
    adultsCount: 10,
    includeKitchen: true,
  });

  assert.equal(result.totalNights, 3);
  assert.equal(result.weekendNights, 3);
  assert.equal(result.weekdayNights, 0);
  assert.equal(result.baseStayTotal, 42000);
  assert.equal(result.weekendSurgeTotal, 3 * 1000); // 3,000
  assert.equal(result.extraGuestCount, 2);
  assert.equal(result.extraGuestsTotal, 2 * 1000 * 3); // 6,000
  assert.equal(result.addonsTotal, 2500); // kitchen addon
  assert.equal(result.subtotal, 42000 + 3000 + 6000 + 2500); // 53,500
});

test('formatINR formats currency strings cleanly with rupee symbol', () => {
  assert.equal(formatINR(14000), '₹14,000');
  assert.equal(formatINR(52400), '₹52,400');
});

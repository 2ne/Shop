# Donation Slider Component Documentation

## Overview
The donation slider allows users to contribute an optional donation via percentage-based slider or fixed amount input. The slider dynamically adjusts its maximum range when users enter large fixed amounts.

## Core Concepts

### Two Input Modes
1. **Percentage Mode** (default): User selects a percentage (0-20% by default)
   - Donation = `basketTotal × percentage / 100`
   - Slider snaps to 5% increments (0%, 5%, 10%, 15%, 20%)

2. **Fixed Amount Mode**: User enters a specific £ amount
   - Donation = exact amount entered
   - Slider position reflects what percentage that amount represents

### Dynamic Maximum Range
- **Default max**: 20%
- **Expands automatically** when fixed amount exceeds 20% of basket total
- **Maximum cap**: 200% (prevents crashes from extremely large values)
- **Rounded up** to nearest 5% increment (e.g., 156% → 160% max)

## State Management

### Key State Variables
- `percentage`: Current slider value (0-20% default, expands up to 200%)
- `lastPercentage`: Stores percentage when switching to fixed mode (for slider position)
- `donationType`: `"percentage"` or `"fixed"`
- `fixedAmount`: String value of custom amount input
- `dynamicMax`: Current maximum slider value (starts at 20, expands as needed)
- `showFixedAmountInput`: Controls visibility of custom amount input field

### Donation Calculation
```javascript
if (donationType === "fixed") {
  donationAmount = parseFloat(fixedAmount) || 0;
} else {
  donationAmount = (basketTotal × percentage) / 100;
}
```

## User Interactions

### Using the Slider (Percentage Mode)
1. User drags slider handle
2. `handlePercentageChange()` updates `percentage` state
3. Donation recalculates: `basketTotal × percentage / 100`
4. Tooltip shows: `"X% (£Y.YY)"`

### Entering Fixed Amount
1. User clicks "Enter custom amount" → input appears and auto-focuses
2. User types amount → `handleFixedAmountChange()` fires
3. **Percentage calculation**: `(fixedAmount / basketTotal) × 100`
4. **If > 20%**: 
   - `dynamicMax` expands to accommodate (rounded up to nearest 5%, max 200%)
   - `lastPercentage` set to calculated percentage (capped at 200%)
5. **If ≤ 20%**: 
   - `dynamicMax` stays at 20
   - `lastPercentage` rounded to nearest 5% step
6. Slider handle moves to show percentage position
7. Tooltip shows: `"X% (£Y.YY)"` or `"200%+ (£Y.YY)"` if exceeds 200%

### Switching Back to Slider
1. User moves slider while in fixed mode
2. **Complete reset**:
   - `donationType` → `"percentage"`
   - `fixedAmount` → `""`
   - `dynamicMax` → `20`
   - `percentage` → `10` (default)
   - `showFixedAmountInput` → `false`
   - Input field hidden

## Slider Behavior

### Marks (Visual Indicators)
- Always shows **exactly 5 marks**: min, max, and 3 equally spaced between
- Examples:
  - Max 20%: `0%, 5%, 10%, 15%, 20%`
  - Max 200%: `0%, 50%, 100%, 150%, 200%`

### Step Size
- **≤ 20% max**: Step = `5` (snaps to 5% increments)
- **> 20% max**: Step = `dynamicMax / 100` (smoother movement for large ranges)

### Tooltip Display
- Shows above slider handle
- **Percentage mode**: `"X% (£Y.YY)"`
- **Fixed mode**: 
  - Normal: `"X.X% (£Y.YY)"`
  - Exceeds 200%: `"200%+ (£Y.YY)"`
  - Zero: `"0% (£0.00)"`

## Edge Cases Handled

1. **Very large values** (e.g., 9999): Capped at 200%, shows "200%+"
2. **Zero input**: Tooltip shows "0% (£0.00)", slider at 0%
3. **Empty input**: Switches back to percentage mode
4. **Invalid input**: Filtered by regex, only allows numbers and decimal point
5. **State sync**: `useEffect` ensures `lastPercentage` never exceeds `dynamicMax`

## Key Functions

### `handlePercentageChange(value)`
- Updates `percentage` and `lastPercentage`
- Sets `donationType` to `"percentage"`
- Clears `fixedAmount`
- Resets `dynamicMax` to 20

### `handleFixedAmountChange(e)`
- Validates input (numbers/decimal only)
- Calculates percentage from amount
- Expands `dynamicMax` if needed (up to 200%)
- Updates `lastPercentage` for slider position
- Handles zero and invalid values

### `onChange` (Slider)
- If in fixed mode: Complete reset to default state
- If in percentage mode: Normal slider update

## Visual Feedback

- **Slider track**: Fills proportionally to show selected percentage
- **Slider handle**: Positioned at current percentage
- **Tooltip**: Follows handle, shows percentage and amount
- **Marks**: Visual dots at key percentages (always 5 total)


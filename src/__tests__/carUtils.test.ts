import { describe, it, expect } from "vitest";
import { applyDiscount, calculateTax, calculateTotal, CartItem, } from "../cartUtils";

describe("applyDiscount", () => {
  it("applies a percentage discount to a price", () => {
    expect(applyDiscount(100, 10)).toBe(90);
  });
});

describe("calculateTax", () => {
  it("calculates tax on a price", () => {
    expect(calculateTax(100, 8.5)).toBeCloseTo(8.5, 2);
  });

  it("returns 0 tax on a price", () => {
    expect(calculateTax(50, 0)).toBe(0);
  });

  it("handles decimal prices correctly", () => {
    expect(calculateTax(19.99, 10)).toBeCloseTo(2.0, 2);
  });

  it("returns 0 tax when item is tax-exempt", () => {
    expect(calculateTax(100, 8.5, true)).toBe(0);
  });

  it("throws an error for negative prices", () => {
    expect(() => calculateTax(-10, 8.5)).toThrow("Price cannot be negative");
  });

  it("throws an error for negative tax rates", () => {
    expect(() => calculateTax(100, -5)).toThrow("Tax rate cannot be negative");
  });

});

describe("applyDiscount", () => {
  it("applies a percentage discount to a price", () => {
    expect(applyDiscount(100,10)).toBe(90);
  });

  it("returns the original prices when discount is 0%", () => {
    expect(applyDiscount(50,0)).toBe(50);
  });

  it("return 0 when discount is 100%", () => {
    expect(applyDiscount(75,100)).toBe(0);
  });

  it("handles decimal prices correctly", () => {
    expect(applyDiscount(19.99,10)).toBeCloseTo(17.99, 2);
  });

  it("throws an error for negative prices", () => {
    expect(() => applyDiscount(-10, 10)).toThrow("Price cannot be negative");
  });

  it("throws an error for negative discount percentages", () => {
    expect(() => applyDiscount(100,-5)).toThrow("Discount cannot be negative");
  });

  it("throws an error for discount greater than 100%", () => {
    expect(() => applyDiscount(100, 150)).toThrow("Discount cannot exceed 100%");
  });

  describe("calculateTotal", () => { 
    //TODO: Add at least 6 test cases
    //Consider: single item, multiple items, discounts, tax-exempt items,
    // empty cart, mixed tax-ecempt and taxable items

    it("calculates totals for a single item", () => {
      // TODO: Write this test
      // cartItem[price, quantity, isTaxExempt]
      // calculateTotal(cartItem, discountPercent, taxRate)
      const single_item : CartItem[] = [{price: 10, quantity: 1, isTaxExempt: false}];
      const discount_percent: number = 10;
      const tax_rate: number = 10;

      const result = calculateTotal(single_item, discount_percent, tax_rate)
      expect(result.total).toBeCloseTo(10, 0.5);
    });

    it("calculates totals for multiple items", () => {
      // TODO: Write this test
      const multiple_items : CartItem[] = [{price: 10, quantity: 1, isTaxExempt: false}, {price: 10, quantity: 1, isTaxExempt: false}];
      const discount_percent: number = 10;
      const tax_rate: number = 10;

      const result = calculateTotal(multiple_items, discount_percent, tax_rate)
      expect(result.total).toBe(19.8);
    });

    it("applies discount before calculating tax", () => {
      // TODO: Write this test
      const single_item : CartItem[] = [{price: 100, quantity: 1, isTaxExempt: false}];
      const discount_percent: number = 10;
      const tax_rate: number = 10;

      const result = calculateTotal(single_item, discount_percent, tax_rate)
      
      expect(result.tax).toBe(9);
    });

    it("excludes tax-exempt items from tax calculation", () => {
      // TODO: Write this test
      const multiple_items : CartItem[] = [{price: 10, quantity: 1, isTaxExempt: true}, {price: 10, quantity: 1, isTaxExempt: true}];
      const discount_percent: number = 10;
      const tax_rate: number = 10;

      const result = calculateTotal(multiple_items, discount_percent, tax_rate)
      expect(result.tax).toBe(0);
    });

    it("returns 0 for all values if CartItem is empty", () => {
      // TODO: Write this test
      const no_item : CartItem[] = [];
      const discount_percent: number = 10;
      const tax_rate: number = 10;

      const result = calculateTotal(no_item, discount_percent, tax_rate)
      expect(result.total).toBe(0);
      expect(result.subtotal).toBe(0);
      expect(result.discount).toBe(0);
      expect(result.tax).toBe(0);
    });

    it("accepts a mix of taxexempt and non tax exempt items", () => {
      // TODO: Write this test
      const multiple_items : CartItem[] = [{price: 10, quantity: 1, isTaxExempt: true}, {price: 10, quantity: 1, isTaxExempt: false}];
      const discount_percent: number = 10;
      const tax_rate: number = 10;

      const result = calculateTotal(multiple_items, discount_percent, tax_rate)
      expect(result.total).toBe(18.9);
    });


  })
});
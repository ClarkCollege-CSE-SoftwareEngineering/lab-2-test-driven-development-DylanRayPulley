export function applyDiscount(price: number, discountPercent: number): number {
  
  if (price < 0) {
    throw new Error("Price cannot be negative");
  }
  if (discountPercent < 0){
    throw new Error("Discount cannot be negative");
  }
  if (discountPercent > 100){
    throw new Error("Discount cannot exceed 100%");
  }
  

  const discountMultiplier = 1 - discountPercent / 100;
  return price * discountMultiplier;
}

export function calculateTax(
  price: number,
  taxRate: number,
  isTaxExempt: boolean = false
) : number {
  if (price < 0) {
    throw new Error("Price cannot be negative")
  }
  if (taxRate < 0) {
    throw new Error("Tax rate cannot be negative")
  }

  if (isTaxExempt){
    return 0;
  }

  const tax = price * (taxRate / 100);
  return Math.round(tax * 100) / 100;
}

export interface CartItem {
  price: number;
  quantity: number;
  isTaxExempt?: boolean;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
}

export function calculateTotal(
  items: CartItem[],
  discountPercent: number = 0,
  taxRate: number = 0
): CartTotals {
  // TODO: Implement this function using TDD
  //Remember write each test first, see it fail, then make it pass
  let subtotal = 0;
  let discount = 0;
  let tax = 0;
  let total = 0;

  let taxable_price = 0;
  if (items.length != 0){
    for (const item of items) {
      //subtotal must be returned
      subtotal += item.price * item.quantity;
      
      if (discountPercent > 0) {
        //discount must be returned
        taxable_price = applyDiscount(item.price, discountPercent);
        discount += taxable_price;
      }
      
      //tax must be returned
      tax += calculateTax(taxable_price, taxRate, item.isTaxExempt);
    }

    const total_discount = subtotal - discount; 

    //total must be returned
    total = subtotal - total_discount + tax;
  }

  return {
    subtotal,
    discount,
    tax,
    total,
  };
}
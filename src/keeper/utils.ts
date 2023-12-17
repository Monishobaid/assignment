const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
  
export const toCurrency = (value: number) => formatter.format(value);
  
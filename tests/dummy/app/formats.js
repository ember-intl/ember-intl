const hhmmss = {
  hour:   'numeric',
  minute: 'numeric',
  second: 'numeric'
};

export default {
  date: {
    hhmmss: hhmmss
  },
  time: {
    hhmmss: hhmmss
  },
  number: {
    EUR: { style: 'currency', currency: 'EUR' },
    USD: { style: 'currency', currency: 'USD' },
    JPY: { style: 'currency', currency: 'JPY' },
    currency: {
      style: 'currency',
      minimumFractionDigits: 2
    }
  }
};

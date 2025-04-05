import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions=[{
  id:'1',
 deliveryDays:7,
 priceCents:0,  
},
{
  id:'2',
 deliveryDays:3,
 priceCents:499,  
},
{
  id:'3',
 deliveryDays:1,
 priceCents:999,
}];
export function calclateDeliveryDate(deliveryOptionId) {
  const deliveryOption = deliveryOptions.find(option => option.id == deliveryOptionId);
  if (!deliveryOption) return null;
  
  const todayDate = dayjs();
  let deliveryDate = todayDate;
  let daysToAdd = deliveryOption.deliveryDays;
  
  while (daysToAdd > 0) {
    deliveryDate = deliveryDate.add(1, 'day');
    // Skip Saturday (6) and Sunday (0)
    if (deliveryDate.day() !== 0 && deliveryDate.day() !== 6) {
      daysToAdd--;
    }
  }
  
  return deliveryDate.format('dddd, MMMM D');
}
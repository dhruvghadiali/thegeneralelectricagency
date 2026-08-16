export const monthlyPerformance = [
  { month: "Jan", sales: 184, completed: 142, pending: 42 },
  { month: "Feb", sales: 210, completed: 168, pending: 42 },
  { month: "Mar", sales: 196, completed: 161, pending: 35 },
  { month: "Apr", sales: 242, completed: 201, pending: 41 },
  { month: "May", sales: 270, completed: 221, pending: 49 },
  { month: "Jun", sales: 298, completed: 250, pending: 48 },
  { month: "Jul", sales: 326, completed: 279, pending: 47 },
  { month: "Aug", sales: 354, completed: 302, pending: 52 },
  { month: "Sep", sales: 341, completed: 293, pending: 48 },
  { month: "Oct", sales: 382, completed: 326, pending: 56 },
  { month: "Nov", sales: 406, completed: 349, pending: 57 },
  { month: "Dec", sales: 438, completed: 378, pending: 60 },
];

export const inventory = [
  { product: "CG Power 7.5 HP Motor", sku: "CG-MTR-075", category: "Motors", stock: 48, reorder: 18, value: "₹8.64L" },
  { product: "Premium Helical Gearbox", sku: "PT-GBX-120", category: "Gearboxes", stock: 12, reorder: 15, value: "₹5.28L" },
  { product: "KEG 3 Phase Motor", sku: "KEG-MTR-030", category: "Motors", stock: 27, reorder: 12, value: "₹3.51L" },
  { product: "CG Openwell Pump", sku: "CG-PMP-OW5", category: "Pumps", stock: 9, reorder: 14, value: "₹2.16L" },
  { product: "L&T Control Panel", sku: "LT-CP-440", category: "Electricals", stock: 34, reorder: 10, value: "₹4.76L" },
];

export const damagedInventory = [
  { product: "CG Mini Pump", sku: "CG-PMP-MN2", quantity: 4, reason: "Transit damage", reported: "05 Aug 2026" },
  { product: "Premium Gearbox", sku: "PT-GBX-090", quantity: 2, reason: "Seal leakage", reported: "02 Aug 2026" },
  { product: "Copper Cable 6mm", sku: "CBL-CU-006", quantity: 7, reason: "Outer insulation", reported: "29 Jul 2026" },
];

export const topCompanies = [
  { name: "Reliance Industries", orders: 86, amount: "₹18.4L", share: 88 },
  { name: "Apex Engineering", orders: 64, amount: "₹14.2L", share: 68 },
  { name: "Shreeji Textiles", orders: 51, amount: "₹10.8L", share: 52 },
  { name: "Orbit Pumps", orders: 38, amount: "₹8.6L", share: 41 },
];

export const paymentAlerts = [
  {
    id: "PAY-1048",
    company: "CG Power",
    relationship: "Dealer / Supplier",
    direction: "payable",
    amount: "₹8.40L",
    dueDate: "12 Aug 2026",
    timing: "Due in 4 days",
    status: "due-soon",
  },
  {
    id: "REC-2081",
    company: "Reliance Industries",
    relationship: "Client",
    direction: "receivable",
    amount: "₹12.75L",
    dueDate: "03 Aug 2026",
    timing: "Overdue by 5 days",
    status: "overdue",
  },
  {
    id: "PAY-1052",
    company: "Premium Transmission",
    relationship: "Dealer / Supplier",
    direction: "payable",
    amount: "₹4.25L",
    dueDate: "18 Aug 2026",
    timing: "Due in 10 days",
    status: "scheduled",
  },
  {
    id: "REC-2087",
    company: "Apex Engineering",
    relationship: "Client",
    direction: "receivable",
    amount: "₹6.80L",
    dueDate: "10 Aug 2026",
    timing: "Due in 2 days",
    status: "due-soon",
  },
];

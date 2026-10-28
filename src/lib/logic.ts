export type Menu = {
  id: number;
  name: string;
  price: number;
  category: string;
  spicy: boolean;
  emoji: string;
};

// เมนูที่ราคาไม่เกินงบ
export const filterByBudget = (menus: Menu[], budget: number): Menu[] =>
  menus.filter((m) => m.price <= budget);

// เรียงราคาน้อย → มาก (ไม่แก้ array เดิม)
export const sortByPrice = (menus: Menu[]): Menu[] =>
  [...menus].sort((a, b) => a.price - b.price);

// ML7: ค้นหาจากชื่อ (ไม่สนตัวพิมพ์เล็ก-ใหญ่) — คำค้นว่าง = ไม่กรอง
export const searchByName = (menus: Menu[], keyword: string): Menu[] => {
  const k = keyword.trim().toLowerCase();
  if (k === "") return menus;
  return menus.filter((m) => m.name.toLowerCase().includes(k));
};

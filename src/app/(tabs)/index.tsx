import { useState } from "react";
import { Link, router } from "expo-router";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import MenuCard from "../../components/MenuCard";
import { filterByBudget, searchByName, sortByPrice } from "../../lib/logic";
import { useMenus } from "../../lib/MenuContext";
import { COLORS, SPACING } from "../../lib/theme";

export default function Home() {
  const { menus } = useMenus();
  const [budget, setBudget] = useState(60);
  const [keyword, setKeyword] = useState("");
  const inBudget = filterByBudget(menus, budget);
  const result = sortByPrice(searchByName(inBudget, keyword));

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="🔍 ค้นหาเมนู เช่น ข้าว"
        value={keyword}
        onChangeText={setKeyword}
      />

      <View style={styles.budgetRow}>
        <Pressable style={styles.btn} onPress={() => setBudget(budget - 10)}>
          <Text style={styles.btnText}>-10</Text>
        </Pressable>
        <Text style={styles.budget}>งบ {budget} บาท</Text>
        <Pressable style={styles.btn} onPress={() => setBudget(budget + 10)}>
          <Text style={styles.btnText}>+10</Text>
        </Pressable>
      </View>

      <Link href="/about" style={styles.link}>
        เกี่ยวกับแอป →
      </Link>
      <Text style={styles.count}>พบ {result.length} เมนู</Text>

      <FlatList
        data={result}
        keyExtractor={(m) => String(m.id)}
        renderItem={({ item }) => (
          <MenuCard
            menu={item}
            onPress={() => router.push(`/menu/${item.id}`)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>ไม่มีเมนูในงบนี้</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
    backgroundColor: COLORS.bg,
  },
  search: {
    minHeight: 44,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    fontSize: 16,
  },
  budgetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  btn: {
    minWidth: 56,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  btnText: { color: "white", fontWeight: "bold", fontSize: 16 },
  budget: { fontSize: 18, fontWeight: "bold", color: COLORS.text },
  link: {
    color: COLORS.primary,
    fontWeight: "bold",
    marginBottom: SPACING.md,
  },
  count: { color: COLORS.muted, marginBottom: SPACING.sm },
  empty: {
    textAlign: "center",
    color: COLORS.muted,
    marginTop: SPACING.lg,
  },
});

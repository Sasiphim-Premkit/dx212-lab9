import { Stack, router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useMenus } from "../../lib/MenuContext";
import { COLORS, SPACING } from "../../lib/theme";

export default function MenuDetail() {
  const { menus } = useMenus();
  const { id } = useLocalSearchParams<{ id: string }>();
  const menu = menus.find((m) => m.id === Number(id));

  if (!menu) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "ไม่พบเมนู" }} />
        <Text style={styles.name}>ไม่พบเมนูนี้ (id: {id})</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: menu.name }} />
      <Text style={styles.emoji}>{menu.emoji}</Text>
      <Text style={styles.name}>{menu.name}</Text>
      <Text style={styles.price}>{menu.price} บาท</Text>

      <View style={styles.tags}>
        <Text style={styles.tag}>{menu.category}</Text>
        {menu.spicy && <Text style={styles.tag}>เผ็ด 🌶️</Text>}
      </View>

      <Pressable style={styles.btn} onPress={() => router.back()}>
        <Text style={styles.btnText}>← กลับ</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: SPACING.lg,
    gap: SPACING.sm,
    backgroundColor: COLORS.bg,
  },
  emoji: { fontSize: 72, marginTop: SPACING.lg },
  name: { fontSize: 24, fontWeight: "bold", color: COLORS.text, textAlign: "center" },
  price: { fontSize: 20, fontWeight: "bold", color: COLORS.primary },
  tags: { flexDirection: "row", gap: SPACING.sm, marginTop: SPACING.sm },
  tag: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.muted,
    overflow: "hidden",
  },
  btn: {
    minWidth: 120,
    minHeight: 44,
    marginTop: SPACING.lg,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  btnText: { color: "white", fontWeight: "bold", fontSize: 16 },
});

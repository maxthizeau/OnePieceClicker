export type TItemKey = "logPose" | "demonFruit" | "healFood" | "cola" | "dendenmushi"

export interface TItem {
  itemKey: TItemKey
  icon: string
  title: string
  description: string
  price: number
  quantity: number
  end?: number
}

export const defaultItemsList: TItem[] = [
  { icon: "images/icons/logPoseIcon.png", title: "Log Pose", description: "Use it to enter dungeon", itemKey: "logPose", price: 2500, quantity: 0 },
  { icon: "images/icons/foodIcon.png", title: "Heal Food", description: "Use it to heal your crew members", itemKey: "healFood", price: 3000, quantity: 0 },
  { icon: "images/icons/colaIcon.png", title: "Cola", description: "Use it to...", itemKey: "cola", price: 50000, quantity: 0 },
  {
    icon: "images/icons/demonFruitIcon.png",
    title: "Demon Fruit",
    description: "Consume to gain `Boost Crew Power of 20% for 30 seconds`",
    itemKey: "demonFruit",
    price: 150000,
    quantity: 0,
  },
  {
    icon: "images/icons/dendenmushiIcon.png",
    title: "Den den Mushi",
    description: "Consume to gain `Boost your chance to loot vivre card of 20% for 30 seconds`",
    itemKey: "dendenmushi",
    price: 50000,
    quantity: 0,
  },
  {
    icon: "images/icons/winIcon.png",
    title: "To Find",
    description: "Consume to gain `To find`",
    itemKey: "dendenmushi",
    price: 50000,
    quantity: 0,
  },
]

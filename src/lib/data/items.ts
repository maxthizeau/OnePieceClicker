export type TItemKey = "logPose" | "demonFruit" | "healFood" | "cola" | "dendenmushi" | "berryboost"

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
  { icon: "images/icons/logPoseIcon.png", title: "Log Pose", description: "Very useful to enter in a dungeon", itemKey: "logPose", price: 50000, quantity: 0 },
  {
    icon: "images/icons/foodIcon.png",
    title: "Heal Food",
    description: "Heal your all your crew members of $_VALUE_$ after defeating an enemy",
    itemKey: "healFood",
    price: 100000,
    quantity: 0,
  },
  { icon: "images/icons/colaIcon.png", title: "Cola", description: "Boost XP of 20% for 30 seconds", itemKey: "cola", price: 250000, quantity: 0 },
  {
    icon: "images/icons/demonFruitIcon.png",
    title: "Demon Fruit",
    description: "Boost Crew Power and Click Power of 20% for 30 seconds",
    itemKey: "demonFruit",
    price: 250000,
    quantity: 0,
  },
  {
    icon: "images/icons/dendenmushiIcon.png",
    title: "Den den Mushi",
    description: "Boost your chance to loot vivre card of 20% for 30 seconds",
    itemKey: "dendenmushi",
    price: 500000,
    quantity: 0,
  },
  {
    icon: "images/icons/winIcon.png",
    title: "Berry Boost",
    description: "Earn 20% more berries when defeating enemies for 30 seconds",
    itemKey: "berryboost",
    price: 500000,
    quantity: 0,
  },
]

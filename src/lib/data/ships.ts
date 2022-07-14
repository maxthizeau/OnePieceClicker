import { EShipEffect, IShip } from "../types"

export const ships: IShip[] = [
  // Unlock by default
  {
    id: 0,
    name: "Dinghy",
    thumb: "ship_0001",
    effect: [EShipEffect.CLICK_POWER],
    value: 10,
  },

  // Unlocked By Zone End : 0
  {
    id: 1,
    name: "Merry Go",
    thumb: "ship_0002",
    effect: [EShipEffect.CREW_POWER, EShipEffect.CLICK_POWER],
    value: 15,
  },

  // Unlocked By Zone End : 1
  {
    id: 2,
    name: "Navy Ship",
    thumb: "ship_0003",
    effect: [EShipEffect.LOOT_CHANCE, EShipEffect.XP_GAIN],
    value: 15,
  },

  // Unlocked By Zone End : 3
  {
    id: 3,
    name: "Baratie",
    thumb: "ship_0004",
    effect: [EShipEffect.CREW_POWER, EShipEffect.XP_GAIN],
    value: 20,
  },

  // Unlocked By Goal id : 62
  {
    id: 4,
    name: "Coffin Boat",
    thumb: "ship_0005",
    effect: [EShipEffect.CAPTAIN_BOOST],
    value: 30,
  },

  // Unlocked By Goal id : 99
  {
    id: 5,
    name: "Miss Love Duck",
    thumb: "ship_0006",
    effect: [EShipEffect.MINE_ENERGY],
    value: 20,
  },

  // Unlocked By Zone End : 6
  {
    id: 6,
    name: "Going Merry - Flying Model",
    thumb: "ship_0007",
    effect: [EShipEffect.LOOT_CHANCE, EShipEffect.CAPTAIN_BOOST],
    value: 30,
  },

  // Unlocked By Goal id : 63
  {
    id: 7,
    name: "Moby Dick",
    thumb: "ship_0008",
    effect: [EShipEffect.CREW_POWER, EShipEffect.CLICK_POWER, EShipEffect.ITEM_DURATION],
    value: 40,
  },

  // Unlocked By Goal id : 64
  {
    id: 8,
    name: "Big Top",
    thumb: "ship_0009",
    effect: [EShipEffect.CREW_POWER, EShipEffect.LOOT_CHANCE],
    value: 35,
  },

  // Unlocked By Goal id : 65
  {
    id: 9,
    name: "Bezan Black",
    thumb: "ship_0010",
    effect: [EShipEffect.LOOT_CHANCE],
    value: 40,
  },

  // Unlocked By Goal id : 66
  {
    id: 10,
    name: "Aokiji's Bike",
    thumb: "ship_0011",
    effect: [EShipEffect.XP_GAIN],
    value: 40,
  },

  // Unlocked By Goal id : 67
  {
    id: 11,
    name: "Striker",
    thumb: "ship_0012",

    effect: [EShipEffect.CAPTAIN_BOOST],
    value: 40,
  },

  // Unlocked By Goal id : 100
  {
    id: 12,
    name: "Dreadnaught Sabre",
    thumb: "ship_0014",
    effect: [EShipEffect.MINE_ENERGY, EShipEffect.MINE_DOUBLELOOT_CHANCE],
    value: 40,
  },

  // Unlocked By Zone End : 13
  {
    id: 13,
    name: "Thousand Sunny",
    thumb: "ship_0013",
    effect: [EShipEffect.CREW_POWER, EShipEffect.CLICK_POWER, EShipEffect.LOOT_CHANCE],
    value: 50,
  },

  // Unlocked By Goal id : 68
  {
    id: 14,
    name: "Kuja Pirate Ship",
    thumb: "ship_0015",
    effect: [EShipEffect.CLICK_POWER, EShipEffect.XP_GAIN],
    value: 40,
  },

  // Unlocked By Goal id :69
  {
    id: 15,
    name: "Ark Maxim",
    thumb: "ship_0016",
    effect: [EShipEffect.LOOT_CHANCE, EShipEffect.XP_GAIN],
    value: 50,
  },

  // Unlocked By Goal id : 70
  {
    id: 16,
    name: "Red Force",
    thumb: "ship_0017",
    effect: [EShipEffect.CREW_POWER, EShipEffect.XP_GAIN],
    value: 50,
  },

  // Unlocked By Clear Zone ID : 15
  {
    id: 17,
    name: "Thousand Sunny - 2nd Anniversary Model",
    thumb: "ship_0018",
    effect: [EShipEffect.CREW_POWER, EShipEffect.LOOT_CHANCE, EShipEffect.CAPTAIN_BOOST],
    value: 60,
  },

  // Unlocked By Goal id : 71
  {
    id: 18,
    name: "Sun Pirates Ship",
    thumb: "ship_0019",
    effect: [EShipEffect.CREW_POWER, EShipEffect.CLICK_POWER, EShipEffect.LOOT_CHANCE, EShipEffect.ITEM_DURATION],
    value: 60,
  },

  // Unlocked By Goal id : 101
  {
    id: 19,
    name: "Donquixote Pirates Ship",
    thumb: "ship_0020",
    effect: [EShipEffect.CLICK_POWER, EShipEffect.LOOT_CHANCE, EShipEffect.MINE_ENERGY],

    value: 60,
  },

  // Unlocked By Goal id : 72
  {
    id: 20,
    name: "Rocketman",
    thumb: "ship_0021",
    effect: [EShipEffect.CREW_POWER],
    value: 60,
  },

  // Unlocked By Goal id : 73
  {
    id: 21,
    name: "Moby Dick - Paramount War Version",
    thumb: "ship_0022",

    effect: [EShipEffect.LOOT_CHANCE, EShipEffect.XP_GAIN, EShipEffect.BERRY],
    value: 60,
  },

  // Unlocked By Goal id : 102
  {
    id: 22,
    name: "Garp's Battleship",
    thumb: "ship_0023",
    effect: [EShipEffect.MINE_ENERGY, EShipEffect.MINE_DOUBLELOOT_CHANCE],
    value: 50,
  },

  // Unlocked By Goal id : 74
  {
    id: 23,
    name: "Polar Tang",
    thumb: "ship_0024",
    effect: [EShipEffect.CAPTAIN_BOOST, EShipEffect.ITEM_DURATION],
    value: 60,
  },
  // Unlocked By Goal id : 75
  {
    id: 24,
    name: "Big Top - Grand Line Feast",
    thumb: "ship_0025",

    effect: [EShipEffect.CLICK_POWER],
    value: 65,
  },
  // Unlocked By Goal id : 76
  {
    id: 25,
    name: "Thousand Sunny - Coated Vessel",
    thumb: "ship_0026",
    effect: [EShipEffect.CREW_POWER, EShipEffect.CLICK_POWER, EShipEffect.LOOT_CHANCE],
    value: 70,
  },
  // Unlocked By Goal id : 90
  {
    id: 26,
    name: "Kizaru's Cannonball",
    thumb: "ship_0027",
    effect: [EShipEffect.MINE_DOUBLELOOT_CHANCE],
    value: 70,
  },

  // Unlocked By Goal id : 77
  {
    id: 27,
    name: "Mister Luffy Go",
    thumb: "ship_0028",
    effect: [EShipEffect.CAPTAIN_BOOST, EShipEffect.BERRY],
    value: 65,
  },

  // Unlocked By Goal id : 103
  {
    id: 28,
    name: "Thriller Bark",
    thumb: "ship_0029",
    effect: [EShipEffect.CAPTAIN_BOOST, EShipEffect.MINE_ENERGY, EShipEffect.MINE_DOUBLELOOT_CHANCE],
    value: 70,
  },

  // Unlocked By Goal id : 78
  {
    id: 29,
    name: "Karasumaru Ship",
    thumb: "ship_0030",
    effect: [EShipEffect.LOOT_CHANCE],
    value: 65,
  },

  // Unlocked By Clear Zone ID : 22
  {
    id: 30,
    name: "Thousand Sunny - Special Anniversary Model",
    thumb: "ship_0032",

    effect: [EShipEffect.CREW_POWER, EShipEffect.CLICK_POWER, EShipEffect.LOOT_CHANCE, EShipEffect.BERRY],
    value: 80,
  },

  // Unlocked By Goal id : 93
  {
    id: 31,
    name: "Flying Dutchman",
    thumb: "ship_0033",
    effect: [EShipEffect.MINE_DOUBLELOOT_CHANCE],
    value: 65,
  },

  // Unlocked By Clear zone id : 19
  {
    id: 32,
    name: "Marshal D. Teach Pirate Ship",
    thumb: "ship_0034",
    effect: [EShipEffect.BERRY],
    value: 100,
  },

  // Unlocked By Goal id : 104
  {
    id: 33,
    name: "Blackbirds",
    thumb: "ship_0035",
    effect: [EShipEffect.ITEM_DURATION, EShipEffect.MINE_ENERGY],
    value: 80,
  },

  // Unlocked By Goal id : 106
  {
    id: 34,
    name: "Zunisha (Zunesha|Zou)",
    thumb: "ship_0036",
    effect: [EShipEffect.MINE_ENERGY, EShipEffect.MINE_DOUBLELOOT_CHANCE],
    value: 80,
  },

  // Unlocked By Goal id : 80
  {
    id: 35,
    name: "Laboon",
    thumb: "ship_0038",
    effect: [EShipEffect.CREW_POWER, EShipEffect.XP_GAIN],
    value: 75,
  },

  // Unlocked By Goal id : 93
  {
    id: 36,
    name: "Sexy Foxy",
    thumb: "ship_0037",
    effect: [EShipEffect.MINE_DOUBLELOOT_CHANCE, EShipEffect.MINE_ENERGY],
    value: 80,
  },

  // Unlocked By Goal id : 81
  {
    id: 37,
    name: "Thousand Sunny - 4th Anniversary Model",
    thumb: "ship_0039",
    effect: [EShipEffect.CREW_POWER, EShipEffect.CLICK_POWER, EShipEffect.LOOT_CHANCE],
    value: 90,
  },

  // Unlocked By Goal id : 82
  {
    id: 38,
    name: "Nostra Castello",
    thumb: "ship_0040",
    effect: [EShipEffect.CLICK_POWER, EShipEffect.TRAINING_SPEED],
    value: 80,
  },

  // Unlocked By Clear zone id : 24
  {
    id: 39,
    name: "Queen Mama Chanter",
    thumb: "ship_0041",
    effect: [EShipEffect.CAPTAIN_BOOST],
    value: 100,
  },

  // Unlocked By Goal id : 83
  {
    id: 40,
    name: "Germa 66",
    thumb: "ship_0042",
    effect: [EShipEffect.CAPTAIN_BOOST, EShipEffect.CREW_POWER],
    value: 90,
  },

  // Unlocked By Goal id : 84
  {
    id: 41,
    name: "Going Merry - 5th Anniversary Model",
    thumb: "ship_0043",
    effect: [EShipEffect.CREW_POWER, EShipEffect.CLICK_POWER],
    value: 90,
  },

  // Unlocked By Goal id : 95
  {
    id: 42,
    name: "Hoe",
    thumb: "ship_0044",
    effect: [EShipEffect.LOOT_CHANCE, EShipEffect.MINE_DOUBLELOOT_CHANCE],
    value: 100,
  },

  // Unlocked By Goal id : 85
  {
    id: 43,
    name: "Megalo",
    thumb: "ship_0045",
    effect: [EShipEffect.ITEM_DURATION],
    value: 100,
  },

  // Unlocked By Goal id : 86
  {
    id: 44,
    name: "Thousand Sunny - Flying Model",
    thumb: "ship_0046",
    effect: [EShipEffect.CREW_POWER, EShipEffect.ITEM_DURATION],
    value: 120,
  },

  // Unlocked By Goal id : 108
  {
    id: 45,
    name: "Piece of Spadille",
    thumb: "ship_0047",
    effect: [EShipEffect.MINE_DOUBLELOOT_CHANCE, EShipEffect.MINE_ENERGY],
    value: 100,
  },

  // Unlocked By Goal id : 87
  {
    id: 46,
    name: "Giant Koi",
    thumb: "ship_0048",
    effect: [EShipEffect.XP_GAIN, EShipEffect.TRAINING_SPEED],
    value: 120,
  },

  // Unlocked By Goal id : 88
  {
    id: 47,
    name: "Grudge Dolph",
    thumb: "ship_0049",
    effect: [EShipEffect.LOOT_CHANCE, EShipEffect.XP_GAIN, EShipEffect.CAPTAIN_BOOST],
    value: 120,
  },

  // Unlocked By Clear Zone Id :25
  {
    id: 48,
    name: "Merry Go Goodbye",
    thumb: "ship_0050",
    effect: [EShipEffect.CREW_POWER, EShipEffect.CLICK_POWER],
    value: 110,
  },

  // Unlocked By Goal id :97
  {
    id: 49,
    name: "Shark Superb",
    thumb: "ship_0051",
    effect: [EShipEffect.MINE_ENERGY, EShipEffect.MINE_DOUBLELOOT_CHANCE],
    value: 120,
  },
]

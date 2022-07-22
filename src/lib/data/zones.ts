export type TZone = {
  id: number
  location: string
  bosses: string[] // units id
  freeMembers: string[] // units id
  freeBoat: number[] // boat id
  poneglyphDungeon: boolean
  maxHP: number
  dungeonCost: number
}

export const zones: TZone[] = [
  {
    id: 0,
    location: "Shells Town",
    bosses: ["0029", "0030"], // Lady Alvida
    freeMembers: ["0005"], // Roronoa Zoro
    freeBoat: [1], // Vogue Merry
    poneglyphDungeon: false,
    maxHP: 10,
    dungeonCost: 1,
  },
  {
    id: 1,
    location: "Orange Town",
    bosses: ["0038", "0039"], // Buggy
    freeMembers: [],
    freeBoat: [2],
    poneglyphDungeon: false,
    maxHP: 50,
    dungeonCost: 1,
  },
  {
    id: 2,
    location: "Syrup Village",
    bosses: ["0045", "0046"], // Kuro
    freeMembers: ["0014"], // Usopp
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 300,
    dungeonCost: 2,
  },
  {
    id: 3,
    location: "Baratie",
    bosses: ["0057", "0058", "0226"], // Don Krieg / Mihawk
    freeMembers: ["0017"], // Sanji
    freeBoat: [3],
    poneglyphDungeon: false,
    maxHP: 1000,
    dungeonCost: 3,
  },
  {
    id: 4,
    location: "Arlong Park",
    bosses: ["0065", "0066"], // Arlong
    freeMembers: ["0009"], // Nami
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 3700,
    dungeonCost: 5,
  },
  {
    id: 5,
    location: "Loguetown",
    bosses: ["0069", "0070"], // Smoker
    freeMembers: [],
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 13000,
    dungeonCost: 6,
  },
  {
    id: 6,
    location: "Reverse Mountain",
    bosses: ["0213"], // Laboon
    freeMembers: ["0214"], // Laboon
    freeBoat: [6],
    poneglyphDungeon: false,
    maxHP: 46000,
    dungeonCost: 7,
  },
  {
    id: 7,
    location: "Whiskey Peak",
    bosses: ["0199", "0200", "0201", "0202"], // Mr. 5 & Miss Valentine
    freeMembers: ["0072"], // Vivi
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 150000,
    dungeonCost: 8,
  },
  {
    id: 8,
    location: "Little Garden",
    bosses: ["0203", "0204", "1490"], // Mr 3 / Mr 5
    freeMembers: [],
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 260000,
    dungeonCost: 9,
  },
  {
    id: 9,
    location: "Drum Island",
    bosses: ["0326", "0327"], // Wapol
    freeMembers: ["0022"], // Chopper
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 420000,
    dungeonCost: 10,
  },
  {
    id: 10,
    location: "Arabasta",
    bosses: ["0383", "0384"], // Crocodile
    freeMembers: ["0209"], // Robin
    freeBoat: [],
    poneglyphDungeon: true,
    maxHP: 780000,
    dungeonCost: 12,
  },
  {
    id: 11,
    location: "Skypiea",
    bosses: ["0545"], // Eneru
    freeMembers: ["0712"], // Ganfor
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 1200000,
    dungeonCost: 15,
  },
  {
    id: 12,
    location: "Long Ring Long Land",
    bosses: ["0568", "0569", "0574"], // Foxy / Aokiji
    freeMembers: [],
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 1600000,
    dungeonCost: 17,
  },
  {
    id: 13,
    location: "Water Seven",
    bosses: ["0723", "0867"], // T-Bone / Usopp
    freeMembers: ["0336"], // Franky
    freeBoat: [13], // Thousand Sunny
    poneglyphDungeon: false,
    maxHP: 1800000,
    dungeonCost: 20,
  },
  {
    id: 14,
    location: "Enies Lobby",
    bosses: ["0321", "0632", "0323", "0630", "0317", "0728"], //Lucci / Kaku / Kalifa
    freeMembers: ["0016", "0527"], // Sniper King + Big Chopper
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 2200000,
    dungeonCost: 25,
  },
  {
    id: 15,
    location: "Thriller Bark",
    bosses: ["0411", "0413", "2754"], // Kuma / Moria / Oars
    freeMembers: ["0423", "3453"], // Brook / Perona
    freeBoat: [17],
    poneglyphDungeon: false,
    maxHP: 3000000,
    dungeonCost: 30,
  },
  {
    id: 16,
    location: "Sabaody Archipelago",
    bosses: ["0974", "0835"], // Sentomaru / Bartholomew Kuma
    freeMembers: [],
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 3800000,
    dungeonCost: 35,
  },
  {
    id: 17,
    location: "Amazon Lily",
    bosses: ["1056", "1057", "1058"], // Bacura / Boa Marigold / Boa Sandersonia
    freeMembers: ["1218"], // Boa Hancock
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 7500000,
    dungeonCost: 40,
  },
  {
    id: 18,
    location: "Impel Down",
    bosses: ["1158", "0446"], //Magellan / Barbe Noire
    freeMembers: ["1304"], // Mr 3
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 10000000,
    dungeonCost: 48,
  },
  {
    id: 19,
    location: "Marineford",
    bosses: ["0458", "1297", "1668", "1227"], // Sengoku / Akainu / Aokiji / Mihawk
    freeMembers: ["0366", "0668"], // Rayleight / Sabo
    freeBoat: [32],
    poneglyphDungeon: false,
    maxHP: 12500000,
    dungeonCost: 56,
  },
  {
    id: 20,
    location: "Fish-Man Island",
    bosses: ["1501", "1559", "1505"], // Caribou / Hyouzou / Hody Jones
    freeMembers: ["1474", "0409"], // Jinbe / Neptune
    freeBoat: [],
    poneglyphDungeon: true,
    maxHP: 20000000,
    dungeonCost: 62,
  },
  {
    id: 21,
    location: "Punk Hazard",
    bosses: ["0837", "0839"], // César Clown  / Vergo
    freeMembers: ["0307"], // Law
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 27500000,
    dungeonCost: 70,
  },
  {
    id: 22,
    location: "Dressrosa",
    bosses: ["0417", "0932", "0998", "0875"], // Doflamingo / Pica / Diamante / Trébol
    freeMembers: ["1122", "1034"], //Cavendish / Bartolomeo
    freeBoat: [30],
    poneglyphDungeon: false,
    maxHP: 35000000,
    dungeonCost: 80,
  },
  {
    id: 23,
    location: "Zou",
    bosses: ["2174"], //Jack
    freeMembers: ["1578"], // Momonosuke
    freeBoat: [],
    poneglyphDungeon: true,
    maxHP: 42500000,
    dungeonCost: 90,
  },
  {
    id: 24,
    location: "Whole Cake Island",
    bosses: ["2112", "2119", "2109"], // Katakuri / Bobbin / Big Mom
    freeMembers: ["1655", "1833", "1835", "1837", "1839", "1831", "1814"], // Famille Vinsmoke + Carrot
    freeBoat: [39],
    poneglyphDungeon: false,
    maxHP: 49500000,
    dungeonCost: 100,
  },
  {
    id: 25,
    location: "Wano Kuni",
    bosses: ["3375", "3138", "2386"], // King / Queen / Kaido
    freeMembers: ["0649", "0966", "3553"], // Marco / Kidd / Oden
    freeBoat: [48],
    poneglyphDungeon: true,
    maxHP: 55500000,
    dungeonCost: 125,
  },
  {
    id: 26,
    location: "New World #1",
    bosses: ["3118"],
    freeMembers: [],
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 60500000,
    dungeonCost: 150,
  },
  {
    id: 27,
    location: "New World #2",
    bosses: ["3592"],
    freeMembers: [],
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 70500000,
    dungeonCost: 200,
  },
  {
    id: 28,
    location: "New World #3",
    bosses: ["2681"],
    freeMembers: [],
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 80500000,
    dungeonCost: 250,
  },
  {
    id: 29,
    location: "New World #4",
    bosses: ["3550"],
    freeMembers: [],
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 100500000,
    dungeonCost: 500,
  },
]

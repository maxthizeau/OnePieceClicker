export type TZone = {
  id: number
  location: string
  bosses: string[] // units id
  freeMembers: string[] // units id
  freeBoat: number[] // boat id
  poneglyphDungeon: boolean
  maxHP: number
  dungeonCost: number
  mapCoordonates: { x: number; y: number }
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
    mapCoordonates: { x: 2830, y: 50 },
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
    mapCoordonates: { x: 2590, y: 270 },
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
    mapCoordonates: { x: 2337, y: 400 },
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
    mapCoordonates: { x: 1973, y: 730 },
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
    mapCoordonates: { x: 1795, y: 550 },
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
    mapCoordonates: { x: 1612, y: 930 },
  },
  {
    id: 6,
    location: "Reverse Mountain",
    bosses: ["0213"], // Laboon
    freeMembers: ["0214"], // Laboon
    freeBoat: [6],
    poneglyphDungeon: false,
    maxHP: 46000,
    dungeonCost: 8,
    mapCoordonates: { x: 1353, y: 1107 },
  },
  {
    id: 7,
    location: "Whiskey Peak",
    bosses: ["0199", "0200", "0201", "0202"], // Mr. 5 & Miss Valentine
    freeMembers: ["0072"], // Vivi
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 150000,
    dungeonCost: 10,
    mapCoordonates: { x: 1580, y: 1144 },
  },
  {
    id: 8,
    location: "Little Garden",
    bosses: ["0203", "0204", "1490"], // Mr 3 / Mr 5
    freeMembers: [],
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 260000,
    dungeonCost: 15,
    mapCoordonates: { x: 1740, y: 1124 },
  },
  {
    id: 9,
    location: "Drum Island",
    bosses: ["0326", "0327"], // Wapol
    freeMembers: ["0022"], // Chopper
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 420000,
    dungeonCost: 20,
    mapCoordonates: { x: 1914, y: 1091 },
  },
  {
    id: 10,
    location: "Arabasta",
    bosses: ["0383", "0384"], // Crocodile
    freeMembers: ["0209"], // Robin
    freeBoat: [],
    poneglyphDungeon: true,
    maxHP: 780000,
    dungeonCost: 30,
    mapCoordonates: { x: 2078, y: 1114 },
  },
  {
    id: 11,
    location: "Skypiea",
    bosses: ["0545"], // Eneru
    freeMembers: ["0712"], // Ganfor
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 1200000,
    dungeonCost: 40,
    mapCoordonates: { x: 2323, y: 1151 },
  },
  {
    id: 12,
    location: "Long Ring Long Land",
    bosses: ["0568", "0569", "0574"], // Foxy / Aokiji
    freeMembers: [],
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 1600000,
    dungeonCost: 50,
    mapCoordonates: { x: 2483, y: 1107 },
  },
  {
    id: 13,
    location: "Water Seven",
    bosses: ["0723", "0867"], // T-Bone / Usopp
    freeMembers: ["0336"], // Franky
    freeBoat: [13], // Thousand Sunny
    poneglyphDungeon: false,
    maxHP: 1800000,
    dungeonCost: 65,
    mapCoordonates: { x: 2722, y: 1121 },
  },
  {
    id: 14,
    location: "Enies Lobby",
    bosses: ["0321", "0632", "0323", "0630", "0317", "0728"], //Lucci / Kaku / Kalifa
    freeMembers: ["0016", "0527"], // Sniper King + Big Chopper
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 2200000,
    dungeonCost: 80,
    mapCoordonates: { x: 2997, y: 1167 },
  },
  {
    id: 15,
    location: "Thriller Bark",
    bosses: ["0411", "0413", "2754"], // Kuma / Moria / Oars
    freeMembers: ["0423", "3453"], // Brook / Perona
    freeBoat: [17],
    poneglyphDungeon: false,
    maxHP: 3000000,
    dungeonCost: 100,
    mapCoordonates: { x: 2934, y: 1041 },
  },
  {
    id: 16,
    location: "Sabaody Archipelago",
    bosses: ["0974", "0835"], // Sentomaru / Bartholomew Kuma
    freeMembers: [],
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 3800000,
    dungeonCost: 130,
    mapCoordonates: { x: 3137, y: 1144 },
  },
  {
    id: 17,
    location: "Amazon Lily",
    bosses: ["1056", "1057", "1058"], // Bacura / Boa Marigold / Boa Sandersonia
    freeMembers: ["1218"], // Boa Hancock
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 7500000,
    dungeonCost: 160,
    mapCoordonates: { x: 2870, y: 1267 },
  },
  {
    id: 18,
    location: "Impel Down",
    bosses: ["1158", "0446"], //Magellan / Barbe Noire
    freeMembers: ["1304"], // Mr 3
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 10000000,
    dungeonCost: 200,
    mapCoordonates: { x: 3007, y: 1267 },
  },
  {
    id: 19,
    location: "Marineford",
    bosses: ["0458", "1297", "1668", "1227"], // Sengoku / Akainu / Aokiji / Mihawk
    freeMembers: ["0366", "0668"], // Rayleight / Sabo
    freeBoat: [32],
    poneglyphDungeon: false,
    maxHP: 12500000,
    dungeonCost: 250,
    mapCoordonates: { x: 30, y: 1094 },
  },
  {
    id: 20,
    location: "Fish-Man Island",
    bosses: ["1501", "1559", "1505"], // Caribou / Hyouzou / Hody Jones
    freeMembers: ["1474", "0409"], // Jinbe / Neptune
    freeBoat: [],
    poneglyphDungeon: true,
    maxHP: 20000000,
    dungeonCost: 300,
    mapCoordonates: { x: 61, y: 1244 },
  },
  {
    id: 21,
    location: "Punk Hazard",
    bosses: ["0837", "0839"], // César Clown  / Vergo
    freeMembers: ["0307"], // Law
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 27500000,
    dungeonCost: 350,
    mapCoordonates: { x: 131, y: 1087 },
  },
  {
    id: 22,
    location: "Dressrosa",
    bosses: ["0417", "0932", "0998", "0875"], // Doflamingo / Pica / Diamante / Trébol
    freeMembers: ["1122", "1034"], //Cavendish / Bartolomeo
    freeBoat: [30],
    poneglyphDungeon: false,
    maxHP: 35000000,
    dungeonCost: 425,
    mapCoordonates: { x: 320, y: 1095 },
  },
  {
    id: 23,
    location: "Zou",
    bosses: ["2174"], //Jack
    freeMembers: ["1578"], // Momonosuke
    freeBoat: [],
    poneglyphDungeon: true,
    maxHP: 42500000,
    dungeonCost: 500,
    mapCoordonates: { x: 497, y: 1124 },
  },
  {
    id: 24,
    location: "Whole Cake Island",
    bosses: ["2112", "2119", "2109"], // Katakuri / Bobbin / Big Mom
    freeMembers: ["1655", "1833", "1835", "1837", "1839", "1831", "1814"], // Famille Vinsmoke + Carrot
    freeBoat: [39],
    poneglyphDungeon: false,
    maxHP: 49500000,
    dungeonCost: 600,
    mapCoordonates: { x: 610, y: 1068 },
  },
  {
    id: 25,
    location: "Wano Kuni",
    bosses: ["3375", "3138", "2386"], // King / Queen / Kaido
    freeMembers: ["0649", "0966", "3553"], // Marco / Kidd / Oden
    freeBoat: [48],
    poneglyphDungeon: true,
    maxHP: 55500000,
    dungeonCost: 700,
    mapCoordonates: { x: 792, y: 1068 },
  },
  {
    id: 26,
    location: "New World #1",
    bosses: ["3118"],
    freeMembers: [],
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 60500000,
    dungeonCost: 800,
    mapCoordonates: { x: 875, y: 1347 },
  },
  {
    id: 27,
    location: "New World #2",
    bosses: ["3592"],
    freeMembers: [],
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 70500000,
    dungeonCost: 950,
    mapCoordonates: { x: 958, y: 1104 },
  },
  {
    id: 28,
    location: "New World #3",
    bosses: ["2681"],
    freeMembers: [],
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 80500000,
    dungeonCost: 1100,
    mapCoordonates: { x: 1051, y: 1151 },
  },
  {
    id: 29,
    location: "New World #4",
    bosses: ["3550"],
    freeMembers: [],
    freeBoat: [],
    poneglyphDungeon: false,
    maxHP: 100500000,
    dungeonCost: 1300,
    mapCoordonates: { x: 1237, y: 1656 },
  },
]

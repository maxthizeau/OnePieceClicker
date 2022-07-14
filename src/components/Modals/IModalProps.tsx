export interface IModalProps {
  visible: boolean
  setVisible: (arg: boolean) => void
  type: TModalType
}

export type TModalType = "map" | "cards" | "fleet" | "upgrades" | "shop" | "boat" | "zone" | "mine" | "training" | "goals"

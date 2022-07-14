import { FC, useState } from "react"
import { ActionButton, FilterButton, ModalSubtitle, SearchInput, TableFilters } from "../ModalStyles"
import Table, { TColumn } from "../../Global/Table"
import Piratedex from "./PirateDex/Piratedex"

const ZoneModalContent: FC = () => {
  return (
    <>
      {/* <ModalSubtitle>All members you recruited in your fleet. You can add them to your crew whenever you want.</ModalSubtitle> */}
      <Piratedex />
    </>
  )
}

export default ZoneModalContent

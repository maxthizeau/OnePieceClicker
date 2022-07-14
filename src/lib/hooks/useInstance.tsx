import { useReactiveVar } from "@apollo/client"
import { FC, useEffect, useState } from "react"
import { instanceVar } from "../cache"
import { TZone } from "../data/zones"
import { EInstance } from "../enums"
import { ActionEnum, useGameState } from "./GameContext"
import useItems from "./useItems"
import { ELogType, useLogs } from "./useLogs"

const useInstance = () => {
  const gameState = useGameState()
  // const [instance, setInstance] = useState<EInstance>(gameState.state.instance)
  const instance = gameState.state.instance

  // useEffect(() => {
  //   console.log("UseEffect")
  //   const keyOf = instanceString as keyof typeof EInstance
  //   const newInstance: EInstance = EInstance[keyOf]
  //   setInstance(newInstance)
  // }, [instanceString])

  const changeInstance = (newInstance: EInstance) => {
    gameState.dispatch({
      type: ActionEnum.ChangeInstance,
      payload: {
        instance: newInstance,
      },
    })
    // console.log("New instance ! : ", EInstance[newInstance])
    // instanceVar(EInstance[newInstance])
    // sessionStorage.setItem("instance", EInstance[newInstance])
    // setInstance(newInstance)
  }

  return { instance, changeInstance } as const
}

export default useInstance

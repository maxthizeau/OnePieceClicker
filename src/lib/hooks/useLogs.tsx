import { title } from "process"
import { useState } from "react"
import { NotificationContent, Store } from "react-notifications-component"

export enum ELogType {
  Clicker,
  Mine,
  VivreCard,
  Fleet,
  Crew,
}

interface ILog {
  logTypes: ELogType[]
  type?: "default" | "success" | "info" | "warning"
  notification: boolean
  title?: string
  message?: string
  content?: NotificationContent
}

const useLogs = () => {
  const [logs, setLogs] = useState<ILog[]>([])

  function addLog(log: ILog) {
    if (log.notification) {
      Store.addNotification({
        title: log.title,
        message: log.message,
        content: log.content,
        type: log.type, // 'default', 'success', 'info', 'warning'
        container: "top-left", // where to position the notifications
        animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
        animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
        dismiss: {
          duration: 3000,
        },
      })
    }
    // setLogs([...logs, log])
    setLogs([])
  }

  return { logs, addLog } as const
}

export default useLogs

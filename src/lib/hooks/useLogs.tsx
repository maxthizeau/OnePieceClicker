import { createContext, useContext, useState } from "react"
import { NotificationContent, Store } from "react-notifications-component"

/* 
 This context is ready to store logs and provide an history to the user, 
 but not implemented yet.
 Actually, it only push corner notifications when a new log occurs
*/

export enum ELogType {
  Clicker,
  Mine,
  VivreCard,
  Fleet,
  Crew,
}

interface ILog {
  id: string
  logTypes: ELogType[]
  type?: "default" | "success" | "info" | "warning"
  notification: boolean
  title?: string
  message?: string
  content?: NotificationContent
  showed?: boolean
}

interface ILogContextProps {
  logs: ILog[]
  addInLog: (log: ILog) => boolean
}

type LogProviderProps = { children: React.ReactNode }

export const LogsContext = createContext<ILogContextProps | undefined>(undefined)
const numberOfLogsStored = 100

function LogsProvider({ children }: LogProviderProps) {
  const [logs, setLogs] = useState<ILog[]>([])

  const addInLog = (log: ILog): boolean => {
    // Prevent twice the same log
    const exists = logs.find((x) => x.id == log.id)
    if (!exists) {
      const logsCopy: ILog[] = logs.length > numberOfLogsStored ? [...logs.slice(1), log] : [...logs, log]
      setLogs(logsCopy)
      return true
    }
    return false
  }
  const value = { logs, addInLog }

  return <LogsContext.Provider value={value}>{children}</LogsContext.Provider>
}

const useLogs = () => {
  const context = useContext(LogsContext)
  if (context === undefined) {
    throw new Error("useLogs must be used within a LogsProvider")
  }

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
          duration: 4000,
        },
      })
    }
  }

  const logs = context.logs

  return { logs, addLog } as const
}

// export useLogs
export { LogsProvider, useLogs }

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'europa2027:completed-tasks'

function loadCompleted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

export function useCompletedTasks() {
  const [completed, setCompleted] = useState(loadCompleted)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]))
  }, [completed])

  const toggle = useCallback((taskId) => {
    setCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(taskId)) next.delete(taskId)
      else next.add(taskId)
      return next
    })
  }, [])

  const isCompleted = useCallback((taskId) => completed.has(taskId), [completed])

  return { isCompleted, toggle }
}

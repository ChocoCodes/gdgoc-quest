import { QuestBoard, QuestVerification } from "./components/components"
import { useQuestBank, type Quest } from "./hooks/hooks"
import { useState, useEffect } from "react"

function App() {
  const { userQuest, verifyAndCompleteQuest, resetQuest } = useQuestBank()
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [showDevPanel, setShowDevPanel] = useState(false)

  const handleQuestClick = (quest: Quest) => {
    if (quest.completed) return
    setSelectedQuest(quest)
    setIsModalVisible(true)
  }

  const handleVerification = (questId: string, passcode: string): boolean => {
    return verifyAndCompleteQuest(questId, passcode)
  }

  const handleCloseModal = () => {
    setIsModalVisible(false)
    setSelectedQuest(null)
  }

  const handleDevReset = () => {
    resetQuest()
    setIsModalVisible(false)
    setSelectedQuest(null)
    setShowDevPanel(false)
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        e.preventDefault()
        setShowDevPanel(!showDevPanel)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [showDevPanel])

  return (
    <main className="min-h-screen w-full bg-[url('/ui/background.png')] bg-no-repeat bg-cover bg-center bg-fixed">
      <div className="min-h-screen w-full bg-gradient-to-b from-black/15 via-black/5 to-black/15 flex items-center justify-center py-8">
        <QuestBoard quest={userQuest} onQuestClick={handleQuestClick} />

        {isModalVisible && selectedQuest && (
          <QuestVerification quest={selectedQuest} onVerify={handleVerification} onClose={handleCloseModal} />
        )}

        {showDevPanel && (
          <div className="fixed top-4 right-4 bg-black/90 text-white p-4 rounded-lg border border-amber-600 z-50">
            <h3 className="font-bold mb-2">Developer Panel</h3>
            <p className="text-sm mb-3">Quest ID: {userQuest?.id}</p>
            <p className="text-sm mb-3">Passcode: {userQuest?.passcode}</p>
            <p className="text-sm mb-3">Status: {userQuest?.completed ? "Completed" : "Pending"}</p>
            <div className="flex gap-2">
              <button onClick={handleDevReset} className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm">
                Reset Quest
              </button>
              <button
                onClick={() => setShowDevPanel(false)}
                className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-sm"
              >
                Close
              </button>
            </div>
            <p className="text-xs mt-2 opacity-70">Press Ctrl+Shift+D to toggle</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default App

"use client"

import { QuestBoard, QuestVerification } from "./components/components"
import { useQuestBank, type Quest } from "./hooks/hooks"
import { useState } from "react"

function App() {
  const { userQuests, verifyAndCompleteQuest, getTotalPoints } = useQuestBank()
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

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

  return (
    <main className="min-h-screen w-full bg-[url('/ui/background.png')] bg-no-repeat bg-cover bg-center bg-fixed">
      {/* Optimized background overlay for better contrast */}
      <div className="min-h-screen w-full bg-gradient-to-b from-black/15 via-black/5 to-black/15 flex items-center justify-center py-8">
        <QuestBoard quests={userQuests} onQuestClick={handleQuestClick} totalPoints={getTotalPoints()} />

        {isModalVisible && selectedQuest && (
          <QuestVerification quest={selectedQuest} onVerify={handleVerification} onClose={handleCloseModal} />
        )}
      </div>
    </main>
  )
}

export default App

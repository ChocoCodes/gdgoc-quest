import { useState, useEffect } from "react"

const QUEST_POOL = [
  "Recite ye Sacred Scroll of Sir La Salle's Mission and Vision.",
  "Seek and deliver seven enchanted stones from the College Plaza, with moving portrait (video) as proof of thy feat.",
  "Reveal the last whispers of thy search scroll (student account search history).",
  "Chant the cursed rune known as the Backwards Alphabet, without flaw.",
  "Name the many relics of the Digital Kingdom of Google, all that yet breathe and function.",
  "Unveil a hidden gift or talent, long concealed from the realm.",
  "Don the mantle of a noble officer and proclaim the glory of GDG to a wandering soul.",
  "Lift thy comrade upon thy back, and carry them hence (piggyback ride).",
  "Speak the sacred Preamble, word for word, as passed down through generations.",
  "Prove thy vigor with twenty jumps of the jack or twenty pushings of the earth.",
  "Perform the acrobatic spin of valor, known among peasants as the Cartwheel.",
  "Ascend and seize the Star of Fortune, the Grand Prize of legend. (Gemini star cut out)",
  "Spit a bard's verse, a rap bar to please the crowd and awaken the muses.",
  "Stride with style and pride, showcasing thy finest Runwalk of the realm.",
  "Uncover the Rune that was Lost, the Missing Letter, and claim the Grand Prize foretold. (Go_gle)",
]

const NUM_TASKS = 3

const useRandomTasks = () => {
  const [generatedTasks, setGeneratedTasks] = useState<string[]>([])
  const [availableTasks, setAvailableTasks] = useState<string[]>([])

  const selectRandomTasks = (excludeCompleted: string[] = []) => {
    const available = QUEST_POOL.filter((task) => !excludeCompleted.includes(task))
    const selected: string[] = []

    while (selected.length < NUM_TASKS && available.length > 0) {
      const randomIndex = Math.floor(Math.random() * available.length)
      const selectedTask = available[randomIndex]
      selected.push(selectedTask)
      available.splice(randomIndex, 1)
    }

    setGeneratedTasks(selected)
    setAvailableTasks(available)
    return selected
  }

  const regenerateTasks = (completedTasks: string[] = []) => {
    return selectRandomTasks(completedTasks)
  }

  useEffect(() => {
    selectRandomTasks()
  }, [])

  return {
    generatedTasks,
    availableTasks,
    setGeneratedTasks,
    selectRandomTasks,
    regenerateTasks,
  }
}

export { useRandomTasks }

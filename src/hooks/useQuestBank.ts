import { useState, useEffect } from "react"

export interface Quest {
  id: string
  title: string
  description: string
  difficulty: "Novice" | "Adept" | "Master"
  passcode: string
  category: "Physical" | "Mental" | "Social" | "Creative" | "Knowledge"
  points: number
  completed: boolean
  completedAt?: Date
}

const QUEST_DESCRIPTIONS = [
  "Recite ye Sacred Scroll of Sir La Salle's Mission and Vision.",
  "Seek and deliver seven enchanted stones from the College Plaza, with moving portrait (video) as proof of thy feat.",
  "Reveal the last whispers of thy search scroll (student account search history).",
  "Chant the cursed rune known as the Backwards Alphabet, without flaw.",
  "Name the many relics of the Digital Kingdom of Google, all that yet breathe and function.",
  "Unveil a hidden gift or talent, long concealed from the realm",
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

const QUEST_BANK: Omit<Quest, "completed" | "completedAt">[] = [
  {
    id: "q001",
    title: "The Sacred Recitation",
    description: QUEST_DESCRIPTIONS[0],
    difficulty: "Novice",
    passcode: "LASALLE",
    category: "Knowledge",
    points: 15,
  },
  {
    id: "q002",
    title: "The Seven Stone Quest",
    description: QUEST_DESCRIPTIONS[1],
    difficulty: "Master",
    passcode: "STONES7",
    category: "Physical",
    points: 35,
  },
  {
    id: "q003",
    title: "The Scroll of Searches",
    description: QUEST_DESCRIPTIONS[2],
    difficulty: "Novice",
    passcode: "SEARCH",
    category: "Knowledge",
    points: 10,
  },
  {
    id: "q004",
    title: "The Backwards Incantation",
    description: QUEST_DESCRIPTIONS[3],
    difficulty: "Adept",
    passcode: "ZYXWVU",
    category: "Mental",
    points: 20,
  },
  {
    id: "q005",
    title: "The Digital Relics",
    description: QUEST_DESCRIPTIONS[4],
    difficulty: "Master",
    passcode: "GOOGLE",
    category: "Knowledge",
    points: 30,
  },
  {
    id: "q006",
    title: "The Hidden Talent",
    description: QUEST_DESCRIPTIONS[5],
    difficulty: "Adept",
    passcode: "TALENT",
    category: "Creative",
    points: 25,
  },
  {
    id: "q007",
    title: "The Herald's Proclamation",
    description: QUEST_DESCRIPTIONS[6],
    difficulty: "Master",
    passcode: "HERALD",
    category: "Social",
    points: 40,
  },
  {
    id: "q008",
    title: "The Burden Bearer",
    description: QUEST_DESCRIPTIONS[7],
    difficulty: "Adept",
    passcode: "CARRY",
    category: "Physical",
    points: 20,
  },
  {
    id: "q009",
    title: "The Sacred Preamble",
    description: QUEST_DESCRIPTIONS[8],
    difficulty: "Novice",
    passcode: "PREAMBLE",
    category: "Knowledge",
    points: 15,
  },
  {
    id: "q010",
    title: "The Trial of Vigor",
    description: QUEST_DESCRIPTIONS[9],
    difficulty: "Novice",
    passcode: "VIGOR",
    category: "Physical",
    points: 15,
  },
  {
    id: "q011",
    title: "The Cartwheel of Valor",
    description: QUEST_DESCRIPTIONS[10],
    difficulty: "Adept",
    passcode: "WHEEL",
    category: "Physical",
    points: 25,
  },
  {
    id: "q012",
    title: "The Star of Fortune",
    description: QUEST_DESCRIPTIONS[11],
    difficulty: "Master",
    passcode: "GEMINI",
    category: "Physical",
    points: 45,
  },
  {
    id: "q013",
    title: "The Bard's Verse",
    description: QUEST_DESCRIPTIONS[12],
    difficulty: "Adept",
    passcode: "VERSE",
    category: "Creative",
    points: 20,
  },
  {
    id: "q014",
    title: "The Royal Stride",
    description: QUEST_DESCRIPTIONS[13],
    difficulty: "Novice",
    passcode: "STRIDE",
    category: "Creative",
    points: 15,
  },
  {
    id: "q015",
    title: "The Lost Rune",
    description: QUEST_DESCRIPTIONS[14],
    difficulty: "Master",
    passcode: "GOOGLE",
    category: "Mental",
    points: 50,
  },
]

const useQuestBank = () => {
  const [userQuest, setUserQuest] = useState<Quest | null>(null)
  const [userId, setUserId] = useState<string>("")

  const generateUserId = () => {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substr(2, 5)
    return `${timestamp}-${random}`
  }

  useEffect(() => {
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }

    const selectUserQuest = (uid: string): Quest => {
      const seed = uid.split("").reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0)
        return a & a
      }, 0)

      const randomIndex = Math.floor(seededRandom(seed) * QUEST_BANK.length)
      const selectedQuest = QUEST_BANK[randomIndex]

      return {
        ...selectedQuest,
        completed: false,
      }
    }

    let storedUserId = localStorage.getItem("questUserId")
    const storedQuest = localStorage.getItem("userQuest")
    const sessionStart = localStorage.getItem("sessionStart")

    const now = Date.now()
    const sessionAge = sessionStart ? now - Number.parseInt(sessionStart) : 0
    const isSessionExpired = sessionAge > 24 * 60 * 60 * 1000

    if (!storedUserId || isSessionExpired) {
      storedUserId = generateUserId()
      localStorage.setItem("questUserId", storedUserId)
      localStorage.setItem("sessionStart", now.toString())
      localStorage.removeItem("userQuest")
    }

    setUserId(storedUserId)

    if (storedQuest && !isSessionExpired) {
      try {
        const parsed = JSON.parse(storedQuest)
        setUserQuest(parsed)
      } catch {
        const newQuest = selectUserQuest(storedUserId)
        setUserQuest(newQuest)
        localStorage.setItem("userQuest", JSON.stringify(newQuest))
      }
    } else {
      const newQuest = selectUserQuest(storedUserId)
      setUserQuest(newQuest)
      localStorage.setItem("userQuest", JSON.stringify(newQuest))
    }
  }, [])

  const verifyAndCompleteQuest = (questId: string, passcode: string): boolean => {
    if (!userQuest || userQuest.completed || userQuest.id !== questId) return false

    if (userQuest.passcode.toUpperCase() === passcode.toUpperCase()) {
      const updatedQuest = {
        ...userQuest,
        completed: true,
        completedAt: new Date(),
      }
      setUserQuest(updatedQuest)
      localStorage.setItem("userQuest", JSON.stringify(updatedQuest))
      return true
    }
    return false
  }

  const resetQuest = () => {
    if (!userId) return

    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }

    const seed = userId.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0)
      return a & a
    }, 0)

    const randomIndex = Math.floor(seededRandom(seed) * QUEST_BANK.length)
    const selectedQuest = QUEST_BANK[randomIndex]

    const newQuest: Quest = {
      ...selectedQuest,
      completed: false,
    }

    setUserQuest(newQuest)
    localStorage.setItem("userQuest", JSON.stringify(newQuest))
  }

  const getTotalPoints = () => {
    return userQuest?.completed ? userQuest.points : 0
  }

  const getCompletedCount = () => {
    return userQuest?.completed ? 1 : 0
  }

  return {
    userQuest,
    userId,
    verifyAndCompleteQuest,
    resetQuest,
    getTotalPoints,
    getCompletedCount,
    totalQuests: 1,
  }
}

export { useQuestBank }

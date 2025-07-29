import { useEffect, useState } from "react";
import { useGSAPAnimations } from "../hooks/useGSAPAnimations";
import type { Quest } from "../hooks/useQuestBank";
import { ParchmentBackground } from "./parchment-background";

interface QuestVerificationProps {
  quest: Quest;
  onVerify: (questId: string, passcode: string) => boolean;
  onClose: () => void;
}

const QuestVerification = ({
  quest,
  onVerify,
  onClose,
}: QuestVerificationProps) => {
  const [passcode, setPasscode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { modalRef, modalBackdropRef, animateModalEntrance, animateModalExit } =
    useGSAPAnimations();

  useEffect(() => {
    animateModalEntrance();
  }, [animateModalEntrance]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    animateModalExit(() => {
      onClose();
    });
  };

  const handleVerify = async () => {
    if (!passcode.trim()) {
      setError("Please enter the sacred verification rune");
      return;
    }

    setIsVerifying(true);
    setError("");

    setTimeout(() => {
      const isValid = onVerify(quest.id, passcode);

      if (isValid) {
        setSuccess(true);
      } else {
        setError(
          "The runes do not align. Seek the true code from thy quest giver."
        );
      }
      setIsVerifying(false);
    }, 1000);
  };

  return (
    <div
      ref={modalBackdropRef}
      className="fixed inset-0 backdrop-blur-md bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg sm:max-w-3xl md:max-w-4xl lg:max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <ParchmentBackground
          minHeight="min-h-[90vh] sm:min-h-[600px] lg:min-h-[700px]"
          className="overflow-y-hidden p-2 sm:p-10 lg:p-12"
        >
          {success ? (
            <div className="flex flex-col items-center justify-center h-full text-center animate-pulse space-y-10">
              <div className="text-6xl sm:text-8xl">
                {quest.isGrandPrize ? "🏆👑" : "🏆"}
              </div>
              <h2
                className={`font-jacquard-display text-display-lg ${
                  quest.isGrandPrize ? "text-yellow-800" : "text-green-800"
                } tracking-wide`}
              >
                {quest.isGrandPrize ? "GRAND PRIZE SEALED!" : "QUEST SEALED!"}
              </h2>
              <p className="font-serif-readable text-body-lg text-amber-800 leading-relaxed max-w-xl">
                {quest.isGrandPrize
                  ? "Thou hast claimed the ultimate prize! Thy name shall be etched in golden letters upon the sacred scrolls of legend!"
                  : "Thy deed is recorded in the annals of valor. Well done, noble adventurer!"}
              </p>
            </div>
          ) : (
            <div className="flex flex-col h-full space-y-2 sm:space-y-10 pt-8 lg:space-y-12">
              <div className="text-center space-y-4 sm:space-y-5">
                <h2 className="font-jacquard-display text-display-lg text-amber-900 tracking-wide">
                  QUEST VERIFICATION
                </h2>
                <div className="flex items-center justify-center gap-6 sm:gap-8">
                  <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent to-amber-800"></div>
                  <div className="relative">
                    <div className="w-5 h-5 bg-amber-800 rotate-45"></div>
                    <div className="absolute inset-0 w-5 h-5 bg-amber-600 rotate-45 scale-75"></div>
                  </div>
                  <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent to-amber-800"></div>
                </div>
                <p className="font-serif-readable text-body-lg text-amber-800 opacity-90 px-2 sm:px-4 lg:px-6">
                  Present thy sacred rune to seal this quest
                </p>
              </div>

              <div
                className={`bg-gradient-to-br from-amber-50/90 to-amber-100/80 border-3 border-amber-800/50 rounded-lg p-8 mb-4 max-w-2xl w-full shadow-inner relative
                  ${
                    quest.isGrandPrize
                      ? "from-yellow-50/90 to-yellow-100/80 border-yellow-800/50"
                      : ""
                  }
                `}
              >
                {quest.isGrandPrize && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-500 to-amber-500 text-yellow-900 text-center py-1 font-jacquard-display font-bold text-xs sm:text-sm tracking-wider rounded-t-lg">
                    ⭐ GRAND PRIZE QUEST ⭐
                  </div>
                )}
                <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-amber-800 opacity-50"></div>
                <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-amber-800 opacity-50"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-amber-800 opacity-50"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-amber-800 opacity-50"></div>

                <h3
                  className={`font-jacquard-display text-heading-lg font-bold ${
                    quest.isGrandPrize ? "text-yellow-800" : "text-amber-800"
                  } mb-4 tracking-wide text-readable`}
                >
                  {quest.title}
                </h3>
                <p className="font-serif-readable text-body-lg text-amber-900 leading-relaxed text-readable">
                  {quest.description}
                </p>
              </div>

              <div className="space-y-2 w-full">
                <label className="block font-serif-readable text-heading-lg font-bold text-amber-900 text-center">
                  Sacred Verification Rune:
                </label>
                <input
                  type="text"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value.toUpperCase())}
                  placeholder="Enter the sacred code..."
                  className="w-full px-6 py-4 border-3 border-amber-800 rounded-lg bg-amber-50/80 text-amber-900 font-serif-readable placeholder-amber-600 focus:outline-none focus:border-amber-900 focus:bg-white transition-all duration-300 text-center tracking-widest"
                  disabled={isVerifying}
                  onKeyPress={(e) => e.key === "Enter" && handleVerify()}
                />

                {error && (
                  <p className="text-red-800 font-serif-readable text-body-md font-bold text-center bg-red-100 border border-red-300 rounded-lg py-2 px-4">
                    {error}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
                <button
                  onClick={handleVerify}
                  disabled={isVerifying || !passcode.trim()}
                  className={`px-8 py-4 font-serif-readable text-body-lg font-bold rounded-lg transition-all duration-300 shadow-lg border-2 flex-1 ${
                    isVerifying || !passcode.trim()
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed border-gray-500"
                      : "bg-gradient-to-b from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white hover:scale-105 active:scale-95 border-green-800"
                  }`}
                >
                  {isVerifying ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm sm:text-base">
                        Verifying Sacred Rune...
                      </span>
                    </div>
                  ) : (
                    "SEAL QUEST"
                  )}
                </button>

                <button
                  onClick={handleClose}
                  className="px-8 py-4 font-serif-readable text-body-lg font-bold bg-gradient-to-b from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg border-2 border-amber-700 flex-1"
                >
                  RETURN LATER
                </button>
              </div>

              <div className="text-center mt-auto pt-4 sm:pt-6">
                <p className="font-serif-readable text-body-md text-amber-800 leading-relaxed bg-amber-100/50 border border-amber-300 rounded-lg py-4 px-6 text-sm sm:text-xs">
                  Complete thy quest and claim the sacred verification rune from its keeper to seal thy honor.
                </p>
              </div>
            </div>
          )}
        </ParchmentBackground>
      </div>
    </div>
  );
};

export { QuestVerification };

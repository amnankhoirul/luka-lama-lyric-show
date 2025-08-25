import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { ParticleBackground } from "./ParticleBackground";

const lyrics = [
  "Tapi sa su terlukai",
  "Su jauh sa tanam hati tapi tra hasil",
  "Cobalah dewasa ko su bukan anak kecil",
  "Sa coba imbangi namun hati tra kuat",
  "Tersiksa makan hati dan itu sa su muak",
  "",
  "Nanti pasti ko mengerti",
  "Stelah sa hilang dan sa jauh untuk pergi",
  "Ko akan tau bagaimana sa sayang ko tapi",
  "Sa rasa percuma ko terus ungkit",
  "Ungkit luka lama yang buat sa trauma",
  "",
  "Mungkin nanti sa pergi koi akan mengerti",
  "Percuma sa stay tapi ko tra hargai",
  "Menyesal kenal ko wanita tra punya hati",
  "I'm tried tapi sa su terlukai",
  "",
  "Su jauh sa tanam hati tapi tra hasil",
  "Cobalah dewasa ko su bukan anak kecil",
  "Sa coba imbangi namun hati tra kuat",
  "Tersiksa makan hati dan itu sa su muak",
  "",
  "Nanti pasti ko mengerti",
  "Stelah sa hilang dan sa jauh untuk pergi",
  "Ko akan tau bagaimana sa sayang ko tapi",
  "Sa rasa percuma ko terus ungkit",
  "Ungkit luka lama yang buat sa trauma",
  "",
  "yang buat sa trauma",
  "",
  "Nanti pasti ko mengerti",
  "Stelah sa hilang dan sa jauh untuk pergi",
  "Ko akan tau bagaimana sa sayang ko tapi",
  "Sa rasa percuma ko terus ungkit",
  "Ungkit luka lama yang buat sa trauma",
  "",
  "Sa duduk menangis di sana koi ada tertawa",
  "Cerita tra romantis tra sperti adam dan hawa",
  "Saling baku sayang hargai setiap insan",
  "Setiap sa buka ko HP macam sa rasa pingsan"
];

export const LyricAnimation = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const lyricsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentLine < lyrics.length) {
      interval = setInterval(() => {
        setCurrentLine(prev => {
          if (prev >= lyrics.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500); // 2.5 seconds per line
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentLine]);

  useEffect(() => {
    setProgress((currentLine / (lyrics.length - 1)) * 100);
    
    // Auto-scroll to current line
    if (lyricsRefs.current[currentLine]) {
      lyricsRefs.current[currentLine]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [currentLine]);

  const handlePlayPause = () => {
    if (currentLine >= lyrics.length - 1) {
      // Reset if finished
      setCurrentLine(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    setCurrentLine(0);
    setIsPlaying(false);
    setProgress(0);
  };

  const getLyricClass = (index: number) => {
    if (index < currentLine) return "lyric-line completed";
    if (index === currentLine) return "lyric-line active";
    return "lyric-line";
  };

  return (
    <div className="relative min-h-screen bg-gradient-lyric overflow-hidden">
      <ParticleBackground />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
            Su Jauh Sa Tanam Hati Tapi Tra Hasil
          </h1>
          <p className="text-muted-foreground text-lg">
            Animated Lyric Display
          </p>
        </div>

        {/* Lyrics container */}
        <div className="w-full max-w-4xl mx-auto mb-8">
          <div className="bg-card/20 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-border/20">
            <div className="space-y-6 max-h-96 overflow-hidden">
              {lyrics.map((line, index) => (
                <div
                  key={index}
                  ref={(el) => (lyricsRefs.current[index] = el)}
                  className={getLyricClass(index)}
                  style={{
                    transitionDelay: index === currentLine ? "0ms" : `${index * 100}ms`
                  }}
                >
                  {line || "\u00A0"} {/* Non-breaking space for empty lines */}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center space-y-6">
          {/* Progress bar */}
          <div className="w-full max-w-md">
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>{currentLine + 1}</span>
              <span>{lyrics.length}</span>
            </div>
          </div>

          {/* Control buttons */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleReset}
              variant="outline"
              size="lg"
              className="animate-pulse-glow"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
            
            <Button
              onClick={handlePlayPause}
              size="lg"
              className="animate-pulse-glow px-8"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 mr-2" />
              ) : (
                <Play className="w-6 h-6 mr-2" />
              )}
              {isPlaying ? "Pause" : currentLine >= lyrics.length - 1 ? "Replay" : "Play"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
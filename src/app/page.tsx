
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { AIChatAssistant } from "@/components/ai-chat-assistant";
import { SciFiBackground } from "@/components/sci-fi-background";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1 relative" style={{ backgroundColor: '#BCA88D' }}>
        <SciFiBackground />
        <HeroSection />
      </main>
      <AIChatAssistant />
    </div>
  );
}

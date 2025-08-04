
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { AIChatAssistant } from "@/components/ai-chat-assistant";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1">
        <HeroSection />
      </main>
      <AIChatAssistant />
    </div>
  );
}

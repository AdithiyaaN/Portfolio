
'use client';

import { useState, useRef, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { askAssistant } from '@/app/actions';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const initialState = {
  messages: [],
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending} className="bg-accent hover:bg-accent/90">
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      <span className="sr-only">Send</span>
    </Button>
  );
}

export function AIChatAssistant() {
  const [state, formAction] = useFormState(askAssistant, initialState);
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaViewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaViewportRef.current) {
        scrollAreaViewportRef.current.scrollTop = scrollAreaViewportRef.current.scrollHeight;
    }
  }, [state.messages]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formAction(formData);
    formRef.current?.reset();
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            size="lg"
            className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-lg bg-accent text-accent-foreground hover:bg-accent/90 focus:ring-accent animate-bounce"
            aria-label="Open AI Assistant"
          >
            <Bot className="h-8 w-8" />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Adi's AI Assistant</SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-grow my-4" viewportRef={scrollAreaViewportRef}>
            <div className="space-y-4 pr-4">
              <div className="flex items-start gap-4">
                <Avatar className="w-8 h-8 border border-accent">
                  <AvatarFallback className='bg-background'><Bot className="text-accent" size={18}/></AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm text-foreground">Hello! I'm Adi's AI assistant. Ask me anything about their skills, projects, or experience.</p>
                </div>
              </div>
              {state.messages.map((message, index) => (
                <div key={index} className={cn("flex items-start gap-4", message.role === 'user' && 'justify-end')}>
                  {message.role === 'assistant' && (
                    <Avatar className="w-8 h-8 border border-accent">
                      <AvatarFallback className='bg-background'><Bot className="text-accent" size={18}/></AvatarFallback>
                    </Avatar>
                  )}
                  <div className={cn(
                    "rounded-lg p-3 max-w-[80%]",
                    message.role === 'user' ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
                  )}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                     <Avatar className="w-8 h-8 border">
                      <AvatarFallback className='bg-background'><User size={18}/></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          <SheetFooter className="mt-auto">
            <form
              ref={formRef}
              onSubmit={handleFormSubmit}
              className="flex w-full items-center space-x-2"
            >
              <Input
                name="query"
                placeholder="Ask a question..."
                autoComplete="off"
                required
              />
              <SubmitButton />
            </form>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

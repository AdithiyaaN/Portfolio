
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Plus, Loader2, Play, CheckCircle, Timer as TimerIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { prioritizeTask } from '@/ai/flows/task-prioritizer';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';


type Priority = 'High' | 'Medium' | 'Low';

type Task = {
  id: string;
  content: string;
  priority: Priority;
  assignee?: string;
  timeEstimateMinutes: number;
  timeRemainingSeconds: number;
  timerStartedAt: number | null;
};

type ColumnId = 'column-1' | 'column-2' | 'column-3';

type Column = {
  id: ColumnId;
  title: string;
  taskIds: string[];
};

type TaskData = {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: ColumnId[];
};

type AIPrioritySuggestion = {
    priority: Priority,
    justification: string,
    timeEstimateMinutes: number,
    taskContent: string,
    columnId: string,
} | null;

const initialData: TaskData = {
  tasks: {},
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: [],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

const PriorityBadge = ({ priority }: { priority: Task['priority'] }) => {
    const priorityColors = {
        'High': 'bg-red-500 hover:bg-red-500/80',
        'Medium': 'bg-yellow-500 hover:bg-yellow-500/80',
        'Low': 'bg-green-500 hover:bg-green-500/80'
    }
    return <Badge className={`text-white ${priorityColors[priority]}`}>{priority}</Badge>
}

const Timer = ({ task, onTimerUpdate }: { task: Task, onTimerUpdate: (taskId: string, remainingSeconds: number) => void }) => {
    const [remainingSeconds, setRemainingSeconds] = useState(task.timeRemainingSeconds);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (task.timerStartedAt) {
            const updateTimer = () => {
                const elapsedSeconds = Math.floor((Date.now() - task.timerStartedAt!) / 1000);
                const newRemaining = task.timeEstimateMinutes * 60 - elapsedSeconds;
                if (newRemaining > 0) {
                    setRemainingSeconds(newRemaining);
                } else {
                    setRemainingSeconds(0);
                    if (intervalRef.current) clearInterval(intervalRef.current);
                }
            };
            
            updateTimer(); // Initial update
            intervalRef.current = setInterval(updateTimer, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [task.timerStartedAt, task.timeEstimateMinutes]);

    useEffect(() => {
        onTimerUpdate(task.id, remainingSeconds);
    }, [remainingSeconds, task.id, onTimerUpdate]);


    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    return (
        <Badge variant="outline" className={cn(remainingSeconds === 0 && "text-red-500 border-red-500")}>
            <TimerIcon className="mr-1.5 h-4 w-4" />
            {remainingSeconds > 0 ? `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}` : "Time's up!"}
        </Badge>
    );
};


const TaskCard = ({ task, columnId, onMoveTask, onTimerUpdate }: { task: Task; columnId: ColumnId, onMoveTask: (taskId: string, sourceColumnId: ColumnId, destinationColumnId: ColumnId) => void; onTimerUpdate: (taskId: string, remainingSeconds: number) => void; }) => {
  return (
    <div className="mb-4">
      <Card className="bg-card hover:bg-card/90 flex flex-col">
        <CardContent className="p-4 pb-0 flex-grow">
          <p className="font-medium">{task.content}</p>
          <div className="flex justify-between items-center mt-4">
            <PriorityBadge priority={task.priority} />
            {columnId === 'column-2' ? (
                <Timer task={task} onTimerUpdate={onTimerUpdate} />
            ) : (
                <Badge variant="outline">
                    <TimerIcon className="mr-1.5 h-4 w-4" />
                    {task.timeEstimateMinutes} min
                </Badge>
            )}
          </div>
          {task.assignee && (
              <Avatar className="h-8 w-8 mt-4">
                  <AvatarImage src={task.assignee} alt="Assignee"/>
                  <AvatarFallback>AD</AvatarFallback>
              </Avatar>
          )}
        </CardContent>
        <CardFooter className="p-4">
             {columnId === 'column-1' && (
                <Button variant="outline" size="sm" className="w-full" onClick={() => onMoveTask(task.id, 'column-1', 'column-2')}>
                    <Play className="mr-2 h-4 w-4" />
                    Start Task
                </Button>
            )}
            {columnId === 'column-2' && (
                <Button variant="outline" size="sm" className="w-full" onClick={() => onMoveTask(task.id, 'column-2', 'column-3')}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Done
                </Button>
            )}
        </CardFooter>
      </Card>
    </div>
  );
};

const AddTaskForm = ({ columnId, onAddTask, onCancel }: { columnId: string; onAddTask: (content: string, columnId: string) => void; onCancel: () => void; }) => {
    const [content, setContent] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        textareaRef.current?.focus();
    }, []);

    const handleSubmit = () => {
        if (content.trim()) {
            onAddTask(content.trim(), columnId);
            setContent('');
            onCancel();
        }
    };
    
    return (
        <div className="space-y-2">
            <Textarea 
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter task content..."
                className="w-full"
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSubmit())}
                onBlur={onCancel}
            />
            <div className="flex items-center gap-2">
                <Button onClick={handleSubmit}>Add Card</Button>
                <Button variant="ghost" onClick={onCancel}>Cancel</Button>
            </div>
        </div>
    )
}

const ColumnComponent = ({ column, tasks, onAddTask, onMoveTask, onTimerUpdate }: { column: Column; tasks: Task[], onAddTask: (content: string, columnId: string) => void; onMoveTask: (taskId: string, sourceColumnId: ColumnId, destinationColumnId: ColumnId) => void; onTimerUpdate: (taskId: string, remainingSeconds: number) => void; }) => {
  const [isAdding, setIsAdding] = useState(false);
  
  return (
    <Card className="w-[350px] bg-background/50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
        <CardTitle className="text-lg">{column.title}</CardTitle>
        <Badge variant="secondary">{tasks.length}</Badge>
      </CardHeader>
      <CardContent
        className={`p-4 flex-grow min-h-[100px] transition-colors duration-200`}
      >
        {tasks.map((task) => <TaskCard key={task.id} task={task} columnId={column.id as ColumnId} onMoveTask={onMoveTask} onTimerUpdate={onTimerUpdate} />)}
      </CardContent>
      {column.id === 'column-1' && (
        <CardContent className="p-4 pt-0">
          {isAdding ? (
            <AddTaskForm 
                columnId={column.id} 
                onAddTask={onAddTask} 
                onCancel={() => setIsAdding(false)} 
            />
          ) : (
             <Button variant="ghost" onClick={() => setIsAdding(true)} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add a card
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  );
};

const PriorityConfirmationDialog = ({
  suggestion,
  onConfirm,
  onCancel,
}: {
  suggestion: AIPrioritySuggestion;
  onConfirm: (priority: Priority) => void;
  onCancel: () => void;
}) => {
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(suggestion?.priority || null);

  useEffect(() => {
    if (suggestion) {
      setSelectedPriority(suggestion.priority);
    }
  }, [suggestion]);

  if (!suggestion) return null;

  return (
    <AlertDialog open={!!suggestion} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>AI Priority Suggestion</AlertDialogTitle>
          <AlertDialogDescription>
            Based on the task content, our AI suggests the following priority and time estimate. Is this correct?
            <br />
            <strong className="text-foreground">Justification:</strong> {suggestion.justification}
            <br />
            <strong className="text-foreground">Time Estimate:</strong> {suggestion.timeEstimateMinutes} minutes
          </AlertDialogDescription>
        </AlertDialogHeader>
        <RadioGroup value={selectedPriority!} onValueChange={(value) => setSelectedPriority(value as Priority)} className="my-4">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="High" id="p-high"/>
                <Label htmlFor="p-high">High</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="Medium" id="p-medium" />
                <Label htmlFor="p-medium">Medium</Label>
            </div>
             <div className="flex items-center space-x-2">
                <RadioGroupItem value="Low" id="p-low" />
                <Label htmlFor="p-low">Low</Label>
            </div>
        </RadioGroup>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onConfirm(selectedPriority!)}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};


export default function TaskManagementPage() {
  const [data, setData] = useState<TaskData>(initialData);
  const [isPrioritizing, setIsPrioritizing] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<AIPrioritySuggestion>(null);
  const { toast } = useToast();

  const moveTask = useCallback((taskId: string, sourceColumnId: ColumnId, destinationColumnId: ColumnId) => {
    if (!data) return;

    const sourceColumn = data.columns[sourceColumnId];
    const destinationColumn = data.columns[destinationColumnId];

    const newSourceTaskIds = Array.from(sourceColumn.taskIds);
    newSourceTaskIds.splice(newSourceTaskIds.indexOf(taskId), 1);
    const newSourceColumn = { ...sourceColumn, taskIds: newSourceTaskIds };

    const newDestinationTaskIds = Array.from(destinationColumn.taskIds);
    newDestinationTaskIds.unshift(taskId);
    const newDestinationColumn = { ...destinationColumn, taskIds: newDestinationTaskIds };

    const task = data.tasks[taskId];
    let updatedTask = { ...task };
    if (destinationColumnId === 'column-2') { // Moving to In Progress
        updatedTask.timerStartedAt = Date.now();
    } else { // Moving out of In Progress
        updatedTask.timerStartedAt = null;
    }


    const newState = {
        ...data,
        tasks: {
            ...data.tasks,
            [taskId]: updatedTask
        },
        columns: {
            ...data.columns,
            [newSourceColumn.id]: newSourceColumn,
            [newDestinationColumn.id]: newDestinationColumn,
        },
    };
    setData(newState);

    if (destinationColumnId === 'column-3') {
        const task = data.tasks[taskId];
        toast({
            title: "Task Completed!",
            description: `Great job on finishing "${task.content}"!`,
        });
    }
  }, [data, toast]);
  
  const addTaskWithPriority = useCallback((content: string, columnId: string, priority: Priority, timeEstimateMinutes: number) => {
      const newTaskId = `task-${Date.now()}-${Math.random()}`;
      const newTask: Task = { 
          id: newTaskId, 
          content, 
          priority, 
          timeEstimateMinutes,
          timeRemainingSeconds: timeEstimateMinutes * 60,
          timerStartedAt: null,
      };

      const column = data.columns[columnId];
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.unshift(newTaskId);
      
      const newState: TaskData = {
          ...data,
          tasks: { ...data.tasks, [newTaskId]: newTask },
          columns: {
              ...data.columns,
              [columnId]: { ...column, taskIds: newTaskIds }
          }
      };
      setData(newState);
  }, [data]);
  
  const handleAddTask = async (content: string, columnId: string) => {
      setIsPrioritizing(true);
      try {
          const result = await prioritizeTask({ taskContent: content });
          setAiSuggestion({
              ...result,
              taskContent: content,
              columnId: columnId,
          });
      } catch (error) {
          console.error("Failed to get priority from AI", error);
          toast({
              title: "AI Error",
              description: "Could not get AI priority. Defaulting to Medium.",
              variant: "destructive"
          });
          // Fallback to manual add if AI fails
          addTaskWithPriority(content, columnId, 'Medium', 15);
      } finally {
          setIsPrioritizing(false);
      }
  };

  const handleConfirmPriority = (priority: Priority) => {
      if (aiSuggestion) {
          addTaskWithPriority(aiSuggestion.taskContent, aiSuggestion.columnId, priority, aiSuggestion.timeEstimateMinutes);
      }
      setAiSuggestion(null);
  };

  const handleCancelPriority = () => {
    setAiSuggestion(null);
  }

  const handleTimerUpdate = useCallback((taskId: string, remainingSeconds: number) => {
    setData(prevData => {
        if (prevData && prevData.tasks[taskId] && prevData.tasks[taskId].timeRemainingSeconds !== remainingSeconds) {
            const updatedTask = { ...prevData.tasks[taskId], timeRemainingSeconds: remainingSeconds };
            return {
                ...prevData,
                tasks: {
                    ...prevData.tasks,
                    [taskId]: updatedTask,
                }
            };
        }
        return prevData;
    });
  }, []);

  return (
    <div className={cn("flex flex-col h-screen overflow-hidden", "task-app-theme")}>
        <Header />
        <main className="flex-1 flex flex-col pt-16">
            <div className="container mx-auto px-4 md:px-6 py-8 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Project Phoenix</h1>
                        <p className="text-muted-foreground">A collaborative board for the design and development team.</p>
                    </div>
                     <Button asChild variant="ghost">
                        <Link href="/projects">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Projects
                        </Link>
                    </Button>
                </div>
                {isPrioritizing && (
                    <div className="flex items-center justify-center gap-2 text-muted-foreground my-4">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>AI is prioritizing your task...</span>
                    </div>
                )}
                <div className="flex-1 overflow-x-auto">
                    <div className="flex gap-6 h-full pb-4">
                        {data.columnOrder.map(columnId => {
                            const column = data.columns[columnId];
                            const tasks = column.taskIds.map(taskId => data.tasks[taskId]).filter(Boolean);
                            return <ColumnComponent key={column.id} column={column} tasks={tasks} onAddTask={handleAddTask} onMoveTask={moveTask} onTimerUpdate={handleTimerUpdate}/>;
                        })}
                    </div>
                </div>
            </div>
        </main>
        <PriorityConfirmationDialog 
            suggestion={aiSuggestion}
            onConfirm={handleConfirmPriority}
            onCancel={handleCancelPriority}
        />
    </div>
  );
}

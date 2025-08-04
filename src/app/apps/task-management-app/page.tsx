
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Plus, Loader2, Play, CheckCircle } from 'lucide-react';
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


type Priority = 'High' | 'Medium' | 'Low';

type Task = {
  id: string;
  content: string;
  priority: Priority;
  assignee?: string;
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

const TaskCard = ({ task, index, columnId, onMoveTask }: { task: Task; index: number; columnId: ColumnId, onMoveTask: (taskId: string, sourceColumnId: ColumnId, destinationColumnId: ColumnId) => void; }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-4 ${snapshot.isDragging ? 'shadow-lg' : ''}`}
        >
          <Card className="bg-card hover:bg-card/90 flex flex-col">
            <CardContent className="p-4 pb-0 flex-grow">
              <p className="font-medium">{task.content}</p>
              <div className="flex justify-between items-center mt-4">
                <PriorityBadge priority={task.priority} />
                {task.assignee && (
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={task.assignee} alt="Assignee"/>
                        <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                )}
              </div>
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
      )}
    </Draggable>
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

const ColumnComponent = ({ column, tasks, onAddTask, onMoveTask }: { column: Column; tasks: Task[], onAddTask: (content: string, columnId: string) => void; onMoveTask: (taskId: string, sourceColumnId: ColumnId, destinationColumnId: ColumnId) => void; }) => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <Card className="w-[350px] bg-background/50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
        <CardTitle className="text-lg">{column.title}</CardTitle>
        <Badge variant="secondary">{tasks.length}</Badge>
      </CardHeader>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <CardContent
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-4 flex-grow min-h-[100px] transition-colors duration-200 ${snapshot.isDraggingOver ? 'bg-accent/10' : ''}`}
          >
            {tasks.map((task, index) => <TaskCard key={task.id} task={task} index={index} columnId={column.id as ColumnId} onMoveTask={onMoveTask} />)}
            {provided.placeholder}
          </CardContent>
        )}
      </Droppable>
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

  if (!suggestion) return null;

  return (
    <AlertDialog open={!!suggestion}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>AI Priority Suggestion</AlertDialogTitle>
          <AlertDialogDescription>
            Based on the task content, our AI suggests the following priority. Is this correct?
            <br />
            <strong className="text-foreground">Justification:</strong> {suggestion.justification}
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
  const [isClient, setIsClient] = useState(false);
  const [isPrioritizing, setIsPrioritizing] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<AIPrioritySuggestion>(null);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true)
  }, []);

  const moveTask = useCallback((taskId: string, sourceColumnId: ColumnId, destinationColumnId: ColumnId) => {
    if (!data) return;

    const sourceColumn = data.columns[sourceColumnId];
    const destinationColumn = data.columns[destinationColumnId];

    const newSourceTaskIds = Array.from(sourceColumn.taskIds);
    newSourceTaskIds.splice(newSourceTaskIds.indexOf(taskId), 1);
    const newSourceColumn = { ...sourceColumn, taskIds: newSourceTaskIds };

    const newDestinationTaskIds = Array.from(destinationColumn.taskIds);
    newDestinationTaskIds.push(taskId);
    const newDestinationColumn = { ...destinationColumn, taskIds: newDestinationTaskIds };

    const newState = {
        ...data,
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

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination || !data) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    if (startColumn === finishColumn) {
        const newTaskIds = Array.from(startColumn.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = { ...startColumn, taskIds: newTaskIds };
        const newState = {
            ...data,
            columns: { ...data.columns, [newColumn.id]: newColumn },
        };
        setData(newState);
        return;
    }

    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartColumn = { ...startColumn, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = { ...finishColumn, taskIds: finishTaskIds };

    const newState = {
        ...data,
        columns: {
            ...data.columns,
            [newStartColumn.id]: newStartColumn,
            [newFinishColumn.id]: newFinishColumn,
        },
    };
    setData(newState);
     if (finishColumn.id === 'column-3') {
        const task = data.tasks[draggableId];
        toast({
            title: "Task Completed!",
            description: `Great job on finishing "${task.content}"!`,
        });
    }
  };
  
  const addTaskWithPriority = useCallback((content: string, columnId: string, priority: Priority) => {
      const newTaskId = `task-${Date.now()}-${Math.random()}`;
      const newTask: Task = { id: newTaskId, content, priority };

      const column = data.columns[columnId];
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.push(newTaskId);
      
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
          // Fallback to manual add if AI fails
          addTaskWithPriority(content, columnId, 'Medium');
      } finally {
          setIsPrioritizing(false);
      }
  };

  const handleConfirmPriority = (priority: Priority) => {
      if (aiSuggestion) {
          addTaskWithPriority(aiSuggestion.taskContent, aiSuggestion.columnId, priority);
      }
      setAiSuggestion(null);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
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
                    {isClient ? (
                        <DragDropContext onDragEnd={onDragEnd}>
                            <div className="flex gap-6 h-full pb-4">
                                {data.columnOrder.map(columnId => {
                                    const column = data.columns[columnId];
                                    const tasks = column.taskIds.map(taskId => data.tasks[taskId]);
                                    return <ColumnComponent key={column.id} column={column} tasks={tasks} onAddTask={handleAddTask} onMoveTask={moveTask} />;
                                })}
                            </div>
                        </DragDropContext>
                    ) : <p>Loading board...</p>}
                </div>
            </div>
        </main>
        <PriorityConfirmationDialog 
            suggestion={aiSuggestion}
            onConfirm={handleConfirmPriority}
            onCancel={() => setAiSuggestion(null)}
        />
    </div>
  );
}

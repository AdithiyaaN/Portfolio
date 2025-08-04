
'use client';

import { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Plus, GripVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

type Task = {
  id: string;
  content: string;
  priority: 'High' | 'Medium' | 'Low';
  assignee?: string;
};

type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

type TaskData = {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
};

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

const TaskCard = ({ task, index }: { task: Task; index: number }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-4 ${snapshot.isDragging ? 'shadow-lg' : ''}`}
        >
          <Card className="bg-card hover:bg-card/90">
            <CardContent className="p-4">
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

const ColumnComponent = ({ column, tasks, onAddTask }: { column: Column; tasks: Task[], onAddTask: (content: string, columnId: string) => void; }) => {
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
            {tasks.map((task, index) => <TaskCard key={task.id} task={task} index={index} />)}
            {provided.placeholder}
          </CardContent>
        )}
      </Droppable>
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
    </Card>
  );
};


export default function TaskManagementPage() {
  const [data, setData] = useState<TaskData>(initialData);
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

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
  };
  
  const handleAddTask = (content: string, columnId: string) => {
      if (!data) return;

      const newTaskId = `task-${Object.keys(data.tasks).length + 1 + Date.now()}`;
      const newTask: Task = {
          id: newTaskId,
          content,
          priority: 'Medium', // Default priority
      };

      const column = data.columns[columnId];
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.push(newTaskId);
      
      const newState: TaskData = {
          ...data,
          tasks: {
              ...data.tasks,
              [newTaskId]: newTask,
          },
          columns: {
              ...data.columns,
              [columnId]: {
                  ...column,
                  taskIds: newTaskIds
              }
          }
      };

      setData(newState);
  }

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
                <div className="flex-1 overflow-x-auto">
                    {isClient ? (
                        <DragDropContext onDragEnd={onDragEnd}>
                            <div className="flex gap-6 h-full pb-4">
                                {data.columnOrder.map(columnId => {
                                    const column = data.columns[columnId];
                                    const tasks = column.taskIds.map(taskId => data.tasks[taskId]);
                                    return <ColumnComponent key={column.id} column={column} tasks={tasks} onAddTask={handleAddTask} />;
                                })}
                            </div>
                        </DragDropContext>
                    ) : <p>Loading board...</p>}
                </div>
            </div>
        </main>
    </div>
  );
}

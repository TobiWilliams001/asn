'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Plus, Edit, Trash2, Loader2, GripVertical, Eye, EyeOff } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { getAllModules, deleteModule, reorderModules, updateModule, Module } from '@/services/moduleService';

export default function AdminModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [reordering, setReordering] = useState(false);

  useEffect(() => {
    fetchModules();
  }, []);

  async function fetchModules() {
    try {
      const data = await getAllModules();
      setModules(data);
    } catch (error) {
      console.error('Error fetching modules:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(modules);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setModules(items);
    setReordering(true);

    try {
      const moduleIds = items.map(m => m.id);
      await reorderModules(moduleIds);
    } catch (error) {
      console.error('Error reordering modules:', error);
      fetchModules();
    } finally {
      setReordering(false);
    }
  };

  const handleDelete = async (moduleId: string, title: string) => {
    if (!confirm(`Delete "${title}" and all its lessons? This cannot be undone.`)) return;

    try {
      await deleteModule(moduleId);
      setModules(modules.filter(m => m.id !== moduleId));
      alert('Module deleted successfully');
    } catch (error) {
      console.error('Error deleting module:', error);
      alert('Failed to delete module');
    }
  };

  const handleTogglePublish = async (moduleId: string, currentStatus: boolean) => {
    try {
      await updateModule(moduleId, { published: !currentStatus });
      setModules(modules.map(m => 
        m.id === moduleId ? { ...m, published: !currentStatus } : m
      ));
    } catch (error) {
      console.error('Error toggling publish:', error);
      alert('Failed to update publish status');
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 size={48} className="text-[#ea2a33] animate-spin mx-auto mb-4" />
          <p className="text-[#b89d9f]">Loading modules...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Modules</h1>
          <p className="text-[#b89d9f]">Manage ASAP learning modules and lessons</p>
        </div>
        <Link
          href="/learn/admin/modules/new"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white font-bold hover:shadow-lg transition-all"
        >
          <Plus size={20} />
          Add Module
        </Link>
      </div>

      {modules.length > 1 && (
        <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm">
          <p className="font-semibold">💡 Drag and drop modules to reorder them</p>
        </div>
      )}

      {modules.length > 0 ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="modules">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {modules.map((module, index) => (
                  <Draggable key={module.id} draggableId={module.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`bg-[#261c1c] border border-[#382929] rounded-2xl p-6 transition-all ${
                          snapshot.isDragging ? 'shadow-2xl border-[#ea2a33] scale-105' : 'hover:bg-[#2d2222]'
                        } ${reordering ? 'opacity-50' : ''}`}
                      >
                        <div className="flex items-start gap-4">
                          <div {...provided.dragHandleProps} className="mt-1 cursor-grab active:cursor-grabbing">
                            <GripVertical size={24} className="text-[#b89d9f] hover:text-white transition-colors" />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#1a1314] text-[#b89d9f]">
                                Module {module.order}
                              </span>
                              <h3 className="text-lg font-bold text-white">{module.title}</h3>
                              {!module.published && (
                                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                                  DRAFT
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-[#b89d9f] mb-3">{module.description}</p>
                            <div className="flex flex-wrap gap-3 text-xs">
                              <span className="px-3 py-1 bg-[#1a1314] rounded-full text-[#b89d9f]">
                                {module.weekRange}
                              </span>
                              <span className="px-3 py-1 bg-[#1a1314] rounded-full text-[#b89d9f]">
                                {module.lessons.length} Lessons
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleTogglePublish(module.id, module.published)}
                              className="p-2 rounded-lg hover:bg-[#382929] transition-colors"
                              title={module.published ? 'Unpublish' : 'Publish'}
                            >
                              {module.published ? (
                                <Eye size={18} className="text-emerald-400" />
                              ) : (
                                <EyeOff size={18} className="text-[#b89d9f]" />
                              )}
                            </button>
                            <Link
                              href={`/learn/admin/modules/${module.id}`}
                              className="p-2 rounded-lg hover:bg-[#382929] transition-colors"
                            >
                              <Edit size={18} className="text-[#b89d9f] hover:text-white" />
                            </Link>
                            <button
                              onClick={() => handleDelete(module.id, module.title)}
                              className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                            >
                              <Trash2 size={18} className="text-red-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-12 text-center">
          <BookOpen size={48} className="text-[#382929] mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">No modules yet</h3>
          <p className="text-[#b89d9f] mb-6">Create your first module to get started</p>
          <Link
            href="/learn/admin/modules/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white font-bold hover:shadow-lg transition-all"
          >
            <Plus size={20} />
            Add Module
          </Link>
        </div>
      )}
    </div>
  );
}

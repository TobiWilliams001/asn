'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, Edit, Trash2, Loader2, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { getModule, createModule, updateModule, deleteLesson, reorderLessons, Module, Lesson } from '@/services/moduleService';

export default function EditModulePage({ params }: { params: { moduleId: string } }) {
  const router = useRouter();
  const { moduleId } = params;
  const isNew = moduleId === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    weekRange: '',
    order: 1,
    published: true,
  });
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    if (!isNew) {
      fetchModule();
    }
  }, [moduleId, isNew]);

  async function fetchModule() {
    try {
      const data = await getModule(moduleId);
      if (data) {
        setFormData({
          title: data.title,
          description: data.description,
          weekRange: data.weekRange,
          order: data.order,
          published: data.published,
        });
        setLessons(data.lessons);
      }
    } catch (error) {
      console.error('Error fetching module:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (isNew) {
        const newId = await createModule(formData);
        alert('Module created successfully');
        router.push(`/learn/admin/modules/${newId}`);
      } else {
        await updateModule(moduleId, formData);
        alert('Module updated successfully');
      }
    } catch (error) {
      console.error('Error saving module:', error);
      alert('Failed to save module');
    } finally {
      setSaving(false);
    }
  };

  const handleLessonDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(lessons);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setLessons(items);

    try {
      const lessonIds = items.map(l => l.id);
      await reorderLessons(moduleId, lessonIds);
    } catch (error) {
      console.error('Error reordering lessons:', error);
      fetchModule();
    }
  };

  const handleDeleteLesson = async (lessonId: string, title: string) => {
    if (!confirm(`Delete lesson "${title}"? This cannot be undone.`)) return;

    try {
      await deleteLesson(moduleId, lessonId);
      setLessons(lessons.filter(l => l.id !== lessonId));
      alert('Lesson deleted successfully');
    } catch (error) {
      console.error('Error deleting lesson:', error);
      alert('Failed to delete lesson');
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 size={48} className="text-[#ea2a33] animate-spin mx-auto mb-4" />
          <p className="text-[#b89d9f]">Loading module...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link
          href="/learn/admin/modules"
          className="flex items-center gap-2 text-sm font-semibold text-[#b89d9f] hover:text-white transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          Back to Modules
        </Link>
        <h1 className="text-3xl font-black text-white mb-2">
          {isNew ? 'Create Module' : 'Edit Module'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Module Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-[#261c1c] border border-[#382929] rounded-2xl p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">
                  Module Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
                  placeholder="e.g., Career Mapping & Personal Branding"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all resize-none"
                  placeholder="Brief description of the module"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">
                    Week Range *
                  </label>
                  <input
                    type="text"
                    value={formData.weekRange}
                    onChange={(e) => setFormData({ ...formData, weekRange: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
                    placeholder="e.g., Weeks 1-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">
                    Order *
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    required
                    min={1}
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-5 h-5 rounded bg-[#1a1314] border-[#382929] text-[#ea2a33] focus:ring-[#ea2a33]/20"
                />
                <label htmlFor="published" className="text-sm font-semibold text-white">
                  Publish module (visible to students)
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white font-bold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      {isNew ? 'Create Module' : 'Save Changes'}
                    </>
                  )}
                </button>
                <Link
                  href="/learn/admin/modules"
                  className="px-6 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white font-bold hover:bg-[#2d2222] transition-all"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </form>

          {/* Lessons Section */}
          {!isNew && (
            <div className="mt-6 bg-[#261c1c] border border-[#382929] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Lessons ({lessons.length})</h2>
                <Link
                  href={`/learn/admin/modules/${moduleId}/lessons/new`}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white font-bold text-sm hover:shadow-lg transition-all"
                >
                  <Plus size={16} />
                  Add Lesson
                </Link>
              </div>

              {lessons.length > 0 ? (
                <>
                  {lessons.length > 1 && (
                    <div className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs">
                      💡 Drag to reorder lessons
                    </div>
                  )}
                  <DragDropContext onDragEnd={handleLessonDragEnd}>
                    <Droppable droppableId="lessons">
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                          {lessons.map((lesson, index) => (
                            <Draggable key={lesson.id} draggableId={lesson.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                                    snapshot.isDragging
                                      ? 'bg-[#2d2222] border-[#ea2a33] shadow-lg'
                                      : 'bg-[#1a1314] border-[#382929]'
                                  }`}
                                >
                                  <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing">
                                    <GripVertical size={20} className="text-[#b89d9f]" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-semibold text-white text-sm">{lesson.title}</p>
                                    <p className="text-xs text-[#b89d9f] capitalize">{lesson.contentType} • {lesson.duration} min</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Link
                                      href={`/learn/admin/modules/${moduleId}/lessons/${lesson.id}`}
                                      className="p-2 rounded-lg hover:bg-[#382929] transition-colors"
                                    >
                                      <Edit size={16} className="text-[#b89d9f]" />
                                    </Link>
                                    <button
                                      onClick={() => handleDeleteLesson(lesson.id, lesson.title)}
                                      className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                                    >
                                      <Trash2 size={16} className="text-red-400" />
                                    </button>
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
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-[#b89d9f] mb-4">No lessons yet</p>
                  <Link
                    href={`/learn/admin/modules/${moduleId}/lessons/new`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white font-bold text-sm"
                  >
                    <Plus size={16} />
                    Add First Lesson
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-6 sticky top-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#b89d9f] mb-4">Tips</h3>
            <ul className="space-y-3 text-sm text-[#b89d9f]">
              <li>• Use clear, descriptive titles</li>
              <li>• Keep descriptions under 150 characters</li>
              <li>• Week ranges help students plan</li>
              <li>• Order determines module sequence</li>
              <li>• Unpublished modules are drafts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowLeft, Save, Loader2, Plus, X } from 'lucide-react';
import { getModule, createLesson, updateLesson, Lesson } from '@/services/moduleService';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Resource {
  title: string;
  description: string;
  fileUrl: string;
  type: 'pdf' | 'link' | 'video' | 'doc';
  pages?: number;
}

export default function EditLessonPage({ params }: { params: { moduleId: string; lessonId: string } }) {
  const router = useRouter();
  const { moduleId, lessonId } = params;
  const isNew = lessonId === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [moduleTitle, setModuleTitle] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contentType: 'video' as 'video' | 'article' | 'pdf',
    videoUrl: '',
    articleUrl: '',
    duration: 10,
    order: 1,
    content: '',
  });
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    fetchModuleAndLesson();
  }, [moduleId, lessonId, isNew]);

  async function fetchModuleAndLesson() {
    try {
      const moduleData = await getModule(moduleId);
      if (moduleData) {
        setModuleTitle(moduleData.title);
        
        if (!isNew) {
          const lesson = moduleData.lessons.find(l => l.id === lessonId);
          if (lesson) {
            setFormData({
              title: lesson.title,
              description: lesson.description,
              contentType: lesson.contentType,
              videoUrl: lesson.videoUrl || '',
              articleUrl: lesson.articleUrl || '',
              duration: lesson.duration,
              order: lesson.order,
              content: lesson.content,
            });
            setResources(lesson.resources || []);
          }
        } else {
          // Set order for new lesson
          setFormData(prev => ({ ...prev, order: moduleData.lessons.length + 1 }));
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const lessonData = {
        ...formData,
        resources,
      };

      if (isNew) {
        await createLesson(moduleId, lessonData);
        alert('Lesson created successfully');
      } else {
        await updateLesson(moduleId, lessonId, lessonData);
        alert('Lesson updated successfully');
      }
      
      router.push(`/learn/admin/modules/${moduleId}`);
    } catch (error) {
      console.error('Error saving lesson:', error);
      alert('Failed to save lesson');
    } finally {
      setSaving(false);
    }
  };

  const addResource = () => {
    setResources([...resources, { title: '', description: '', fileUrl: '', type: 'pdf' }]);
  };

  const updateResource = (index: number, field: keyof Resource, value: string | number) => {
    const updated = [...resources];
    updated[index] = { ...updated[index], [field]: value };
    setResources(updated);
  };

  const removeResource = (index: number) => {
    setResources(resources.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 size={48} className="text-[#ea2a33] animate-spin mx-auto mb-4" />
          <p className="text-[#b89d9f]">Loading lesson...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link
          href={`/learn/admin/modules/${moduleId}`}
          className="flex items-center gap-2 text-sm font-semibold text-[#b89d9f] hover:text-white transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          Back to {moduleTitle}
        </Link>
        <h1 className="text-3xl font-black text-white mb-2">
          {isNew ? 'Create Lesson' : 'Edit Lesson'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">
              Lesson Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
              placeholder="e.g., Understanding Corporate Culture"
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
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all resize-none"
              placeholder="Brief description"
            />
          </div>

          {/* Content Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-3">
              Content Type *
            </label>
            <div className="flex gap-4">
              {(['video', 'article', 'pdf'] as const).map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={type}
                    checked={formData.contentType === type}
                    onChange={(e) => setFormData({ ...formData, contentType: e.target.value as any })}
                    className="w-4 h-4 text-[#ea2a33] focus:ring-[#ea2a33]/20"
                  />
                  <span className="text-sm font-semibold text-white capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Type-specific fields */}
          {formData.contentType === 'video' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">
                YouTube URL *
              </label>
              <input
                type="url"
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
                placeholder="https://www.youtube.com/watch?v=..."
              />
              <p className="text-xs text-[#b89d9f] mt-2">Use the embed URL format</p>
            </div>
          )}

          {formData.contentType === 'article' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">
                Article URL *
              </label>
              <input
                type="url"
                value={formData.articleUrl}
                onChange={(e) => setFormData({ ...formData, articleUrl: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
                placeholder="https://..."
              />
            </div>
          )}

          {/* Duration & Order */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">
                Duration (minutes) *
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                required
                min={1}
                className="w-full px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
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

          {/* Rich Text Content */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">
              Lesson Content
            </label>
            <div className="rounded-xl overflow-hidden bg-white">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
                className="quill-editor"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link', 'blockquote', 'code-block'],
                    ['clean'],
                  ],
                }}
              />
            </div>
            <p className="text-xs text-[#b89d9f] mt-2">Additional context or instructions for students</p>
          </div>

          {/* Resources */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#b89d9f]">
                Resources (Optional)
              </label>
              <button
                type="button"
                onClick={addResource}
                className="flex items-center gap-1 text-xs font-bold text-[#ea2a33] hover:underline"
              >
                <Plus size={14} />
                Add Resource
              </button>
            </div>
            
            {resources.map((resource, index) => (
              <div key={index} className="mb-4 p-4 rounded-xl bg-[#1a1314] border border-[#382929]">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-xs font-bold text-[#b89d9f]">Resource {index + 1}</p>
                  <button
                    type="button"
                    onClick={() => removeResource(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={resource.title}
                    onChange={(e) => updateResource(index, 'title', e.target.value)}
                    placeholder="Resource title"
                    className="w-full px-3 py-2 rounded-lg bg-[#261c1c] border border-[#382929] text-white text-sm focus:border-[#ea2a33] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={resource.description}
                    onChange={(e) => updateResource(index, 'description', e.target.value)}
                    placeholder="Description"
                    className="w-full px-3 py-2 rounded-lg bg-[#261c1c] border border-[#382929] text-white text-sm focus:border-[#ea2a33] focus:outline-none"
                  />
                  <input
                    type="url"
                    value={resource.fileUrl}
                    onChange={(e) => updateResource(index, 'fileUrl', e.target.value)}
                    placeholder="URL"
                    className="w-full px-3 py-2 rounded-lg bg-[#261c1c] border border-[#382929] text-white text-sm focus:border-[#ea2a33] focus:outline-none"
                  />
                  <select
                    value={resource.type}
                    onChange={(e) => updateResource(index, 'type', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#261c1c] border border-[#382929] text-white text-sm focus:border-[#ea2a33] focus:outline-none"
                  >
                    <option value="pdf">PDF</option>
                    <option value="link">Link</option>
                    <option value="video">Video</option>
                    <option value="doc">Document</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-[#382929]">
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
                  {isNew ? 'Create Lesson' : 'Save Changes'}
                </>
              )}
            </button>
            <Link
              href={`/learn/admin/modules/${moduleId}`}
              className="px-6 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white font-bold hover:bg-[#2d2222] transition-all"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

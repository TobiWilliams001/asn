'use client';

import { useState, useEffect } from 'react';
import { Megaphone, Plus, Trash2, Loader2, Calendar, AlertCircle } from 'lucide-react';
import { getAnnouncements, createAnnouncement, deleteAnnouncement, Announcement } from '@/services/announcementService';

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    tag: 'Update',
    title: '',
    body: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  });

  const tags = [
    { label: 'Update', color: 'bg-white/10 text-white' },
    { label: 'Cohort', color: 'bg-[#ea2a33]/15 text-[#ea2a33]' },
    { label: 'Alert', color: 'bg-amber-500/10 text-amber-400' },
    { label: 'Event', color: 'bg-blue-500/10 text-blue-400' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const data = await getAnnouncements();
    setAnnouncements(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.title || !formData.body) return;

    setSubmitting(true);
    try {
      const selectedTag = tags.find(t => t.label === formData.tag);
      await createAnnouncement({
        tag: formData.tag,
        tagColor: selectedTag?.color || 'bg-white/10 text-white',
        title: formData.title,
        body: formData.body,
        date: formData.date
      });
      
      setFormData({
        tag: 'Update',
        title: '',
        body: '',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
      setShowForm(false);
      await fetchData();
    } catch (error) {
      console.error('Error creating announcement:', error);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this announcement?')) return;
    
    try {
      await deleteAnnouncement(id);
      await fetchData();
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Announcements</h1>
          <p className="text-[#b89d9f]">Manage updates shown on student dashboards</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[#ea2a33] hover:bg-[#d4222a] text-white px-6 py-3 rounded-xl font-bold transition-all"
        >
          {showForm ? 'Cancel' : (
            <>
              <Plus size={20} />
              New Announcement
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className="mb-10 bg-[#261c1c] border border-[#382929] rounded-2xl p-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Megaphone size={20} className="text-[#ea2a33]" />
            Post New Announcement
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#b89d9f] mb-2">Tag Type</label>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <button
                      key={tag.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, tag: tag.label })}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                        formData.tag === tag.label 
                          ? `${tag.color} ring-2 ring-[#ea2a33]/50` 
                          : 'bg-[#1a1314] text-[#b89d9f] hover:bg-[#2d2222]'
                      }`}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#b89d9f] mb-2">Display Date</label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="e.g. Feb 12, 2026"
                  className="w-full bg-[#1a1314] border border-[#382929] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ea2a33] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#b89d9f] mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="What is this announcement about?"
                className="w-full bg-[#1a1314] border border-[#382929] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ea2a33] transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#b89d9f] mb-2">Body Content</label>
              <textarea
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                placeholder="Briefly describe the update..."
                rows={3}
                className="w-full bg-[#1a1314] border border-[#382929] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ea2a33] transition-all resize-none"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#ea2a33] hover:bg-[#d4222a] disabled:opacity-50 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Posting...
                  </>
                ) : 'Post Announcement'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-40 bg-[#261c1c] border border-[#382929] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : announcements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="bg-[#261c1c] border border-[#382929] rounded-2xl p-6 relative group hover:border-[#533c3d] transition-all"
            >
              <button
                onClick={() => handleDelete(ann.id)}
                className="absolute top-4 right-4 p-2 text-[#b89d9f] hover:text-[#ea2a33] hover:bg-[#ea2a33]/10 rounded-lg transition-all md:opacity-0 group-hover:opacity-100"
                title="Delete announcement"
              >
                <Trash2 size={18} />
              </button>
              
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${ann.tagColor}`}>
                  {ann.tag}
                </span>
                <span className="text-xs text-[#b89d9f]/60 flex items-center gap-1">
                  <Calendar size={12} />
                  {ann.date}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">{ann.title}</h3>
              <p className="text-sm text-[#b89d9f] leading-relaxed">{ann.body}</p>
              
              <div className="mt-6 pt-6 border-t border-white/[0.05] flex items-center gap-2 text-[10px] text-[#b89d9f]/40 uppercase font-bold tracking-widest">
                <AlertCircle size={12} />
                Live on Dashboard
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#261c1c] border border-[#382929] rounded-2xl">
          <Megaphone size={48} className="text-[#382929] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Announcements Yet</h3>
          <p className="text-[#b89d9f]">Post your first update to show it on the student dashboard.</p>
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import ResourceTypeBadge from '@/components/admin/ResourceTypeBadge';
import { getResource, createResource, updateResource, Resource, ResourceType, JobType, FileType, VideoPlatform } from '@/services/resourceService';

export default function EditResourcePage({ params }: { params: { resourceId: string } }) {
  const router = useRouter();
  const { resourceId } = params;
  const isNew = resourceId === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    type: 'job' as ResourceType,
    title: '',
    description: '',
    category: '',
    url: '',
    imageUrl: '',
    published: true,
    order: 1,
    
    // Job fields
    company: '',
    location: '',
    jobType: 'full-time' as JobType,
    salary: '',
    deadline: '',
    
    // Toolkit fields
    fileType: 'pdf' as FileType,
    
    // Video fields
    duration: 0,
    platform: 'youtube' as VideoPlatform,
  });

  useEffect(() => {
    if (!isNew) {
      fetchResource();
    }
  }, [resourceId, isNew]);

  async function fetchResource() {
    try {
      const data = await getResource(resourceId);
      if (data) {
        setFormData({
          type: data.type,
          title: data.title,
          description: data.description,
          category: data.category,
          url: data.url,
          imageUrl: data.imageUrl || '',
          published: data.published,
          order: data.order,
          company: data.company || '',
          location: data.location || '',
          jobType: data.jobType || 'full-time',
          salary: data.salary || '',
          deadline: data.deadline || '',
          fileType: data.fileType || 'pdf',
          duration: data.duration || 0,
          platform: data.platform || 'youtube',
        });
      }
    } catch (error) {
      console.error('Error fetching resource:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Build resource object based on type
      const resourceData: any = {
        type: formData.type,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        url: formData.url,
        imageUrl: formData.imageUrl,
        published: formData.published,
        order: formData.order,
      };

      // Add type-specific fields
      if (formData.type === 'job') {
        resourceData.company = formData.company;
        resourceData.location = formData.location;
        resourceData.jobType = formData.jobType;
        resourceData.salary = formData.salary;
        resourceData.deadline = formData.deadline;
      } else if (formData.type === 'toolkit') {
        resourceData.fileType = formData.fileType;
      } else if (formData.type === 'video') {
        resourceData.duration = formData.duration;
        resourceData.platform = formData.platform;
      }

      if (isNew) {
        await createResource(resourceData);
        alert('Resource created successfully');
      } else {
        await updateResource(resourceId, resourceData);
        alert('Resource updated successfully');
      }
      
      router.push('/learn/admin/resources');
    } catch (error) {
      console.error('Error saving resource:', error);
      alert('Failed to save resource');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 size={48} className="text-[#ea2a33] animate-spin mx-auto mb-4" />
          <p className="text-[#b89d9f]">Loading resource...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link
          href="/learn/admin/resources"
          className="flex items-center gap-2 text-sm font-semibold text-[#b89d9f] hover:text-white transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          Back to Resources
        </Link>
        <h1 className="text-3xl font-black text-white mb-2">
          {isNew ? 'Create Resource' : 'Edit Resource'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-6 space-y-6">
          {/* Resource Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-3">
              Resource Type *
            </label>
            <div className="flex gap-4">
              {(['job', 'toolkit', 'video', 'article'] as ResourceType[]).map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={type}
                    checked={formData.type === type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as ResourceType })}
                    className="w-4 h-4 text-[#ea2a33] focus:ring-[#ea2a33]/20"
                  />
                  <ResourceTypeBadge type={type} size="sm" />
                </label>
              ))}
            </div>
          </div>

          {/* Common Fields */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
              placeholder="e.g., Software Engineer at Google"
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
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all resize-none"
              placeholder="Brief description of the resource"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">
                Category *
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
                placeholder="e.g., Engineering, Templates, Career"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">
                Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                min={1}
                className="w-full px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">
              URL *
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">
              Image URL (Optional)
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
              placeholder="https://... (logo or thumbnail)"
            />
          </div>

          {/* Type-Specific Fields */}
          {formData.type === 'job' && (
            <div className="space-y-4 pt-4 border-t border-[#382929]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#b89d9f]">Job Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
                    placeholder="e.g., Google, Microsoft"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
                    placeholder="e.g., Lagos, Remote"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">
                    Job Type
                  </label>
                  <select
                    value={formData.jobType}
                    onChange={(e) => setFormData({ ...formData, jobType: e.target.value as JobType })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">
                    Salary (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
                    placeholder="e.g., $80k-$120k"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">
                  Application Deadline (Optional)
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
                />
              </div>
            </div>
          )}

          {formData.type === 'toolkit' && (
            <div className="space-y-4 pt-4 border-t border-[#382929]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#b89d9f]">Toolkit Details</h3>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">
                  File Type
                </label>
                <select
                  value={formData.fileType}
                  onChange={(e) => setFormData({ ...formData, fileType: e.target.value as FileType })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
                >
                  <option value="pdf">PDF</option>
                  <option value="doc">Document</option>
                  <option value="template">Template</option>
                  <option value="zip">ZIP Archive</option>
                </select>
              </div>
            </div>
          )}

          {formData.type === 'video' && (
            <div className="space-y-4 pt-4 border-t border-[#382929]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#b89d9f]">Video Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                    min={0}
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">
                    Platform
                  </label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value as VideoPlatform })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
                  >
                    <option value="youtube">YouTube</option>
                    <option value="vimeo">Vimeo</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Published Toggle */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#382929]">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-5 h-5 rounded bg-[#1a1314] border-[#382929] text-[#ea2a33] focus:ring-[#ea2a33]/20"
            />
            <label htmlFor="published" className="text-sm font-semibold text-white">
              Publish resource (visible to students)
            </label>
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
                  {isNew ? 'Create Resource' : 'Save Changes'}
                </>
              )}
            </button>
            <Link
              href="/learn/admin/resources"
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

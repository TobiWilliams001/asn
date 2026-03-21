'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Loader2, FolderOpen, Eye, EyeOff, GripVertical, Search } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import ResourceTypeBadge from '@/components/admin/ResourceTypeBadge';
import { getAllResources, deleteResource, updateResource, reorderResources, Resource, ResourceType } from '@/services/resourceService';

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [reordering, setReordering] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | ResourceType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    let filtered = [...resources];

    // Type filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(r => r.type === activeFilter);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredResources(filtered);
  }, [activeFilter, searchQuery, resources]);

  async function fetchResources() {
    try {
      const data = await getAllResources();
      setResources(data);
      setFilteredResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(filteredResources);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFilteredResources(items);
    setReordering(true);

    try {
      const resourceIds = items.map(r => r.id);
      await reorderResources(resourceIds);
    } catch (error) {
      console.error('Error reordering resources:', error);
      fetchResources();
    } finally {
      setReordering(false);
    }
  };

  const handleDelete = async (resourceId: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;

    try {
      await deleteResource(resourceId);
      setResources(resources.filter(r => r.id !== resourceId));
      alert('Resource deleted successfully');
    } catch (error) {
      console.error('Error deleting resource:', error);
      alert('Failed to delete resource');
    }
  };

  const handleTogglePublish = async (resourceId: string, currentStatus: boolean) => {
    try {
      await updateResource(resourceId, { published: !currentStatus });
      setResources(resources.map(r => 
        r.id === resourceId ? { ...r, published: !currentStatus } : r
      ));
    } catch (error) {
      console.error('Error toggling publish:', error);
      alert('Failed to update publish status');
    }
  };

  const stats = {
    all: resources.length,
    job: resources.filter(r => r.type === 'job').length,
    toolkit: resources.filter(r => r.type === 'toolkit').length,
    video: resources.filter(r => r.type === 'video').length,
    article: resources.filter(r => r.type === 'article').length,
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 size={48} className="text-[#ea2a33] animate-spin mx-auto mb-4" />
          <p className="text-[#b89d9f]">Loading resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Resources</h1>
          <p className="text-[#b89d9f]">Manage jobs, toolkits, videos, and articles</p>
        </div>
        <Link
          href="/learn/admin/resources/new"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white font-bold hover:shadow-lg transition-all"
        >
          <Plus size={20} />
          Add Resource
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        {/* Type Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white'
                : 'bg-[#261c1c] border border-[#382929] text-[#b89d9f] hover:text-white'
            }`}
          >
            All ({stats.all})
          </button>
          <button
            onClick={() => setActiveFilter('job')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeFilter === 'job'
                ? 'bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white'
                : 'bg-[#261c1c] border border-[#382929] text-[#b89d9f] hover:text-white'
            }`}
          >
            Jobs ({stats.job})
          </button>
          <button
            onClick={() => setActiveFilter('toolkit')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeFilter === 'toolkit'
                ? 'bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white'
                : 'bg-[#261c1c] border border-[#382929] text-[#b89d9f] hover:text-white'
            }`}
          >
            Toolkits ({stats.toolkit})
          </button>
          <button
            onClick={() => setActiveFilter('video')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeFilter === 'video'
                ? 'bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white'
                : 'bg-[#261c1c] border border-[#382929] text-[#b89d9f] hover:text-white'
            }`}
          >
            Videos ({stats.video})
          </button>
          <button
            onClick={() => setActiveFilter('article')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeFilter === 'article'
                ? 'bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white'
                : 'bg-[#261c1c] border border-[#382929] text-[#b89d9f] hover:text-white'
            }`}
          >
            Articles ({stats.article})
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b89d9f]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#261c1c] border border-[#382929] text-white placeholder-[#b89d9f] focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Resources List */}
      {filteredResources.length > 0 ? (
        <>
          {filteredResources.length > 1 && (
            <div className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm">
              💡 Drag and drop to reorder resources
            </div>
          )}
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="resources">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {filteredResources.map((resource, index) => (
                    <Draggable key={resource.id} draggableId={resource.id} index={index}>
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
                                <ResourceTypeBadge type={resource.type} size="sm" />
                                <h3 className="text-lg font-bold text-white">{resource.title}</h3>
                                {!resource.published && (
                                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                                    DRAFT
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-[#b89d9f] mb-3">{resource.description}</p>
                              <div className="flex flex-wrap gap-3 text-xs">
                                <span className="px-3 py-1 bg-[#1a1314] rounded-full text-[#b89d9f]">
                                  {resource.category}
                                </span>
                                {resource.company && (
                                  <span className="px-3 py-1 bg-[#1a1314] rounded-full text-[#b89d9f]">
                                    {resource.company}
                                  </span>
                                )}
                                {resource.location && (
                                  <span className="px-3 py-1 bg-[#1a1314] rounded-full text-[#b89d9f]">
                                    {resource.location}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleTogglePublish(resource.id, resource.published)}
                                className="p-2 rounded-lg hover:bg-[#382929] transition-colors"
                                title={resource.published ? 'Unpublish' : 'Publish'}
                              >
                                {resource.published ? (
                                  <Eye size={18} className="text-emerald-400" />
                                ) : (
                                  <EyeOff size={18} className="text-[#b89d9f]" />
                                )}
                              </button>
                              <Link
                                href={`/learn/admin/resources/${resource.id}`}
                                className="p-2 rounded-lg hover:bg-[#382929] transition-colors"
                              >
                                <Edit size={18} className="text-[#b89d9f] hover:text-white" />
                              </Link>
                              <button
                                onClick={() => handleDelete(resource.id, resource.title)}
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
        </>
      ) : (
        <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-12 text-center">
          <FolderOpen size={48} className="text-[#382929] mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">No resources found</h3>
          <p className="text-[#b89d9f] mb-6">
            {searchQuery ? 'Try a different search term' : 'Create your first resource to get started'}
          </p>
          {!searchQuery && (
            <Link
              href="/learn/admin/resources/new"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white font-bold hover:shadow-lg transition-all"
            >
              <Plus size={20} />
              Add Resource
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

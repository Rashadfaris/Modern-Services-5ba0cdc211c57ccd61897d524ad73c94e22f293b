import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { 
  getAllBlogs, 
  createBlog, 
  updateBlog, 
  togglePublishBlog, 
  deleteBlog,
  Blog 
} from '../lib/api';
import { Plus, Edit, Trash2, Eye, EyeOff, X, Save, Calendar, FileText } from 'lucide-react';
import { FadeIn } from './FadeIn';

interface BlogManagementProps {
  onLogout?: () => void;
}

export function BlogManagement({ onLogout: _onLogout }: BlogManagementProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Other' as Blog['category'],
    content: '',
    source: ''
  });

  const categories: Blog['category'][] = ['Tax', 'Property', 'Employment', 'Leisure & Hospitality', 'Financial Services', 'Energy', 'Other'];

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const allBlogs = await getAllBlogs();
      setBlogs(allBlogs);
    } catch (error: any) {
      console.error('Error loading blogs:', error);
      setError(error.message || 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingBlog(null);
    setFormData({ title: '', category: 'Other', content: '', source: '' });
    setShowForm(true);
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      category: blog.category,
      content: blog.content,
      source: blog.source || ''
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      alert('Please fill in title and content');
      return;
    }

    try {
      setProcessing('saving');
      if (editingBlog) {
        await updateBlog(editingBlog.id!, formData);
      } else {
        await createBlog(formData.title, formData.category, formData.content, formData.source || undefined);
      }
      setShowForm(false);
      setEditingBlog(null);
      setFormData({ title: '', category: 'Other', content: '', source: '' });
      await loadBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Failed to save blog. Please try again.');
    } finally {
      setProcessing(null);
    }
  };

  const handleTogglePublish = async (blogId: string) => {
    try {
      setProcessing(blogId);
      await togglePublishBlog(blogId);
      await loadBlogs();
    } catch (error) {
      console.error('Error toggling publish status:', error);
      alert('Failed to update publish status. Please try again.');
    } finally {
      setProcessing(null);
    }
  };

  const handleDelete = async (blogId: string) => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }

    try {
      setProcessing(blogId);
      await deleteBlog(blogId);
      await loadBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog. Please try again.');
    } finally {
      setProcessing(null);
    }
  };

  const formatDate = (date: Date | string) => {
    if (!date) return 'N/A';
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FadeIn>
          <div className="mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#0A1A2F] mb-2">
                    Blog Posts Management
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {blogs.length} blog post{blogs.length !== 1 ? 's' : ''} total
                  </p>
                  {error && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
                      <strong>Error:</strong> {error}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={loadBlogs}
                    variant="outline"
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Refresh'}
                  </Button>
                  <Button
                    onClick={handleCreate}
                    className="bg-[#C8A75B] text-white hover:bg-[#B8964A]"
                  >
                    <Plus size={18} className="mr-2" />
                    Add New Post
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-[#0A1A2F]">
                    {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingBlog(null);
                      setFormData({ title: '', category: 'Other', content: '', source: '' });
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8A75B]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as Blog['category'] })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8A75B]"
                      required
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Content *
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={10}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8A75B]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Source (optional)
                    </label>
                    <input
                      type="text"
                      value={formData.source}
                      onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8A75B]"
                      placeholder="e.g., The Daily Telegraph"
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button
                      type="submit"
                      disabled={processing === 'saving'}
                      className="bg-[#C8A75B] text-white hover:bg-[#B8964A]"
                    >
                      <Save size={18} className="mr-2" />
                      {processing === 'saving' ? 'Saving...' : 'Save'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setEditingBlog(null);
                        setFormData({ title: '', category: 'Other', content: '', source: '' });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#C8A75B]"></div>
              <p className="mt-4 text-gray-600">Loading blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="bg-white p-12 rounded-lg shadow-md text-center">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-[#0A1A2F] mb-2">No Blog Posts Yet</h3>
              <p className="text-gray-600 mb-4">Create your first blog post to get started.</p>
              <Button
                onClick={handleCreate}
                className="bg-[#C8A75B] text-white hover:bg-[#B8964A]"
              >
                <Plus size={18} className="mr-2" />
                Add New Post
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                              blog.published 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {blog.published ? 'Published' : 'Draft'}
                            </span>
                            <span className="px-3 py-1 bg-[#C8A75B]/10 text-[#C8A75B] text-sm font-semibold rounded-full">
                              {blog.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-[#0A1A2F] mb-1">
                            {blog.title}
                          </h3>
                          {blog.source && (
                            <p className="text-sm text-gray-500 mb-2">
                              Source: {blog.source}
                            </p>
                          )}
                          <div className="flex items-center text-gray-500 text-xs gap-4">
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-1" />
                              <span>Created: {formatDate(blog.createdAt)}</span>
                            </div>
                            {blog.updatedAt && (
                              <div className="flex items-center">
                                <span>Updated: {formatDate(blog.updatedAt)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 line-clamp-3 mb-4">
                        {blog.content}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-48 flex-shrink-0">
                      <Button
                        onClick={() => handleEdit(blog)}
                        variant="outline"
                        className="border-blue-300 text-blue-600 hover:bg-blue-50"
                        fullWidth
                      >
                        <Edit size={18} className="mr-2" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleTogglePublish(blog.id!)}
                        disabled={processing === blog.id}
                        className={blog.published 
                          ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                          : 'bg-green-600 hover:bg-green-700 text-white'
                        }
                        fullWidth
                      >
                        {blog.published ? (
                          <>
                            <EyeOff size={18} className="mr-2" />
                            {processing === blog.id ? 'Processing...' : 'Unpublish'}
                          </>
                        ) : (
                          <>
                            <Eye size={18} className="mr-2" />
                            {processing === blog.id ? 'Processing...' : 'Publish'}
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={() => handleDelete(blog.id!)}
                        disabled={processing === blog.id}
                        variant="outline"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                        fullWidth
                      >
                        <Trash2 size={18} className="mr-2" />
                        {processing === blog.id ? 'Processing...' : 'Delete'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </FadeIn>
      </div>
    </div>
  );
}


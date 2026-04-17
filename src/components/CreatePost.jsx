import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Upload, X, Send, ArrowLeft } from 'lucide-react';

export default function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Write your full article or thread here...</p>',
  });

  const handleImageSelect = (e) => {
    setSelectedImages([...selectedImages, ...Array.from(e.target.files)]);
  };

  const removeImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    const urls = [];
    setUploading(true);

    for (const file of selectedImages) {
      const fileExt = file.name.split('.').pop();
      const fileName = `post-${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

      const { error } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file);

      if (!error) {
        const { data } = supabase.storage.from('blog-images').getPublicUrl(fileName);
        urls.push(data.publicUrl);
      }
    }
    setUploading(false);
    return urls;
  };

  const handleSubmit = async () => {
    if (!editor) return;
    const imageUrls = await uploadImages();
    const content = editor.getHTML();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert('You must be logged in to create a post');

    const { error } = await supabase.from('posts').insert({
      user_id: user.id,
      title: title || null,
      excerpt: excerpt || null,
      content,
      image_urls: imageUrls.length > 0 ? imageUrls : null,
      reading_time: Math.max(3, Math.ceil((content.length || 0) / 1200)),
      slug: title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : null,
    });

    if (!error) {
      alert('Post published successfully!');
      navigate('/blog');
    } else {
      alert('Failed to publish: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-3xl mx-auto px-6">
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-violet-400 hover:text-white mb-8"
        >
          <ArrowLeft size={20} /> Back to Blog
        </button>

        <h1 className="text-4xl font-bold mb-10">Create New Post</h1>

        <div className="space-y-8">
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent border-b border-gray-700 pb-4 text-3xl font-semibold focus:outline-none"
          />

          <textarea
            placeholder="Short excerpt (optional)"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-2xl p-5 h-24 resize-y"
          />

          {/* TipTap Editor */}
          <div className="border border-gray-700 rounded-3xl p-6 min-h-[320px] bg-[#0a0a0a]">
            <EditorContent editor={editor} className="prose prose-invert max-w-none" />
          </div>

          {/* Image Upload */}
          <div>
            <label className="cursor-pointer flex items-center gap-3 text-violet-400 hover:text-violet-300 mb-4">
              <Upload size={24} />
              <span className="font-medium">Add Images (Multiple allowed)</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </label>

            <div className="flex flex-wrap gap-4">
              {selectedImages.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-32 h-32 object-cover rounded-2xl border border-gray-700"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="w-full bg-violet-600 hover:bg-violet-700 py-5 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {uploading ? 'Uploading images...' : 'Publish Post'} <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
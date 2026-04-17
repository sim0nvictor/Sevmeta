import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Send } from 'lucide-react';
import { FullPost } from './BlogFullPost'; // Not used here, just for reference

// ==========================
// PostCard Component
// ==========================
function PostCard({ post }) {
  const firstImage = post.image_urls?.[0];

  return (
    <Link to={`/blog/${post.id}`} className="block group">
      <div className="bg-[#111111] border border-gray-800 hover:border-violet-500/30 rounded-3xl overflow-hidden transition-all duration-300">
        {firstImage && (
          <div className="h-52 bg-gray-900 relative overflow-hidden">
            <img
              src={firstImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <div className="p-6">
          <div className="flex justify-between items-baseline text-xs mb-3 text-gray-500">
            <span>{new Date(post.created_at).toISOString().split('T')[0]}</span>
            <span className="text-violet-400 font-medium">
              {post.reading_time || 5} min read
            </span>
          </div>

          <h3 className="text-2xl font-semibold text-white leading-tight mb-3 group-hover:text-violet-300 transition-colors">
            {post.title}
          </h3>

          <p className="text-gray-400 line-clamp-3 text-base mb-6">
            {post.excerpt || post.content?.replace(/<[^>]+>/g, '').slice(0, 160) + '...'}
          </p>

          <div className="flex items-center justify-between text-violet-400 text-sm font-medium">
            Read More →
            <div className="flex items-center gap-5 text-gray-400">
              <div className="flex items-center gap-1">
                ❤️ <span>{post.likes_count}</span>
              </div>
              <div className="flex items-center gap-1">
                💬 <span>{post.comments_count}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ==========================
// Main Blog Feed
// ==========================
export default function BlogFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) setPosts(data || []);
      setLoading(false);
    };

    fetchPosts();

    // Realtime: New posts appear instantly
    const channel = supabase
      .channel('blog-feed')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'posts' },
        (payload) => {
          setPosts((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Loading latest articles...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Latest Articles
        </h1>
        <p className="text-gray-400 text-lg">Thoughts, tutorials &amp; threads from SEV</p>
      </div>

      {/* Posts Grid */}
      <div className="max-w-4xl mx-auto px-6">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">No articles yet.</p>
            <p className="text-gray-600 mt-2">Be the first to share something!</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      {/* Floating Create Button */}
      <Link
        to="/create-post"
        className="fixed bottom-8 right-8 bg-violet-600 hover:bg-violet-700 w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all hover:scale-110 z-50"
      >
        <Send size={28} />
      </Link>
    </div>
  );
}
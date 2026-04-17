import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { XIcon, InstagramIcon } from '../assets/icons.jsx';

const defaultFeaturedShare = {
  id: 1,
  platform: 'X',
  author: '@sevmetaX',
  title: 'Featured daily share: The collision no one wants to admit',
  description: 'A curated post from X highlighting a recent thread shared about product architecture, DAOs, and community-led growth.',
  href: 'https://x.com/sevmetaX/status/1701234567890123456',
  icon: XIcon,
  user_id: null,
};

const getShareIcon = (platform) => {
  if (!platform) return XIcon;
  return platform.toLowerCase().includes('insta') ? InstagramIcon : XIcon;
};

const socialHighlights = [
  {
    id: 'x-1',
    platform: 'X',
    title: 'Thread on DAO tooling and composability',
    description: 'A short thread about building modular on-chain experiences and why composability matters.',
    href: 'https://x.com/sevmetaX/status/2021649744242630809?s=20',
    icon: XIcon,
  },
  {
    id: 'ig-1',
    platform: 'Instagram',
    title: 'Behind the scenes UI concept',
    description: 'A reel showing the design process for the latest blog and brand visuals.',
    href: 'https://www.instagram.com/p/CxYz12345/',
    icon: InstagramIcon,
  },
];

export default function Blog() {
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [featuredShare, setFeaturedShare] = useState(defaultFeaturedShare);
  const [shareLoading, setShareLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: defaultFeaturedShare.title,
    description: defaultFeaturedShare.description,
    href: defaultFeaturedShare.href,
    platform: defaultFeaturedShare.platform,
    author: defaultFeaturedShare.author,
  });

  const FeaturedIcon = getShareIcon(featuredShare.platform);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, excerpt, created_at, reading_time, image_urls, likes_count, comments_count')
        .order('created_at', { ascending: false })
        .limit(3);   // Show only 3 latest posts on homepage

      if (!error) setRecentPosts(data || []);
      setLoading(false);
    };

    const fetchFeatured = async () => {
      setShareLoading(true);
      const { data, error: shareError } = await supabase
        .from('featured_shares')
        .select('*')
        .eq('id', 1)
        .single();

      if (!shareError && data) {
        setFeaturedShare({ ...data, icon: getShareIcon(data.platform) });
        setForm({
          title: data.title,
          description: data.description,
          href: data.href,
          platform: data.platform,
          author: data.author,
        });
      } else {
        setFeaturedShare(defaultFeaturedShare);
      }
      setShareLoading(false);
    };

    const fetchUser = async () => {
      const { data: authData } = await supabase.auth.getUser();
      setUser(authData?.user || null);
    };

    fetchRecentPosts();
    fetchFeatured();
    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  const canManage = user && (!featuredShare.user_id || featuredShare.user_id === user.id);

  const handleInput = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSaveFeaturedShare = async () => {
    if (!user) {
      setError('Please sign in to manage the featured share.');
      return;
    }
    setSaving(true);
    setError('');

    const updates = {
      id: 1,
      user_id: user.id,
      title: form.title,
      description: form.description,
      href: form.href,
      platform: form.platform,
      author: form.author,
      updated_at: new Date().toISOString(),
    };

    const { data, error: upsertError } = await supabase
      .from('featured_shares')
      .upsert(updates)
      .select()
      .single();

    if (upsertError) {
      setError('Unable to save the featured share.');
    } else {
      setFeaturedShare({ ...data, icon: getShareIcon(data.platform) });
      setIsEditing(false);
    }

    setSaving(false);
  };

  const handleDeleteFeaturedShare = async () => {
    if (!user) {
      setError('Please sign in to delete the featured share.');
      return;
    }

    setDeleting(true);
    setError('');
    const { error: deleteError } = await supabase.from('featured_shares').delete().eq('id', 1);

    if (deleteError) {
      setError('Unable to delete the featured share.');
    } else {
      setFeaturedShare(defaultFeaturedShare);
      setForm({
        title: defaultFeaturedShare.title,
        description: defaultFeaturedShare.description,
        href: defaultFeaturedShare.href,
        platform: defaultFeaturedShare.platform,
        author: defaultFeaturedShare.author,
      });
      setIsEditing(false);
    }

    setDeleting(false);
  };


  const getFeaturedButtonText = () => {
    if (isEditing) return 'Cancel edit';
    return featuredShare.user_id ? 'Edit daily share' : 'Create daily share';
  };

  return (
    <section id="blog" className="py-20 bg-black relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Latest from the Blog
            </h2>
            <p className="text-gray-400 mt-2">Thoughts, tutorials, and Web3 explorations</p>
          </div>

          <Link
            to="/blog"
            className="text-violet-400 hover:text-violet-300 font-medium flex items-center gap-2 group"
          >
            View All Articles 
            <span className="group-hover:translate-x-1 transition">→</span>
          </Link>
        </div>

        {/* Featured Share */}

        {/* Featured Share */}
        <div className="mb-6 rounded-3xl border border-violet-500/20 bg-[#14141a] p-8 shadow-xl shadow-violet-500/10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-violet-500/10 text-violet-300">
                <FeaturedIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Featured Share</p>
                <h3 className="text-2xl font-semibold text-white">{featuredShare.title}</h3>
                <p className="text-sm text-gray-400 mt-2">Shared from {featuredShare.platform} by {featuredShare.author}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={featuredShare.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-3xl border border-violet-500/30 bg-violet-500/10 px-5 py-3 text-sm font-medium text-violet-200 transition hover:bg-violet-500/20"
              >
                View original post
              </a>
              {canManage && (
                <button
                  type="button"
                  onClick={() => setIsEditing((prev) => !prev)}
                  className="inline-flex items-center justify-center rounded-3xl border border-gray-700 bg-gray-900/80 px-5 py-3 text-sm font-medium text-white transition hover:border-violet-500/40 hover:text-violet-200"
                >
                  {getFeaturedButtonText()}
                </button>
              )}
            </div>
          </div>

          {shareLoading ? (
            <p className="mt-5 text-gray-500">Loading featured share...</p>
          ) : (
            <>
              {error && (
                <div className="mt-5 rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                  {error}
                </div>
              )}

              {isEditing ? (
                <div className="mt-6 space-y-4">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <label className="block">
                      <span className="text-sm text-gray-400">Title</span>
                      <input
                        type="text"
                        value={form.title}
                        onChange={handleInput('title')}
                        className="mt-2 w-full rounded-3xl border border-gray-700 bg-[#111111] px-4 py-3 text-white outline-none focus:border-violet-500"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm text-gray-400">Platform</span>
                      <input
                        type="text"
                        value={form.platform}
                        onChange={handleInput('platform')}
                        className="mt-2 w-full rounded-3xl border border-gray-700 bg-[#111111] px-4 py-3 text-white outline-none focus:border-violet-500"
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <label className="block">
                      <span className="text-sm text-gray-400">Author</span>
                      <input
                        type="text"
                        value={form.author}
                        onChange={handleInput('author')}
                        className="mt-2 w-full rounded-3xl border border-gray-700 bg-[#111111] px-4 py-3 text-white outline-none focus:border-violet-500"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm text-gray-400">Post URL</span>
                      <input
                        type="text"
                        value={form.href}
                        onChange={handleInput('href')}
                        className="mt-2 w-full rounded-3xl border border-gray-700 bg-[#111111] px-4 py-3 text-white outline-none focus:border-violet-500"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-sm text-gray-400">Description</span>
                    <textarea
                      value={form.description}
                      onChange={handleInput('description')}
                      rows={4}
                      className="mt-2 w-full rounded-3xl border border-gray-700 bg-[#111111] px-4 py-3 text-white outline-none focus:border-violet-500"
                    />
                  </label>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleSaveFeaturedShare}
                      disabled={saving}
                      className="inline-flex items-center justify-center rounded-3xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:opacity-60"
                    >
                      {saving ? 'Saving...' : 'Save daily share'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="inline-flex items-center justify-center rounded-3xl border border-gray-700 bg-[#111111] px-6 py-3 text-sm font-medium text-white transition hover:border-violet-500/40"
                    >
                      Cancel
                    </button>
                    {featuredShare.user_id && (
                      <button
                        type="button"
                        onClick={handleDeleteFeaturedShare}
                        disabled={deleting}
                        className="inline-flex items-center justify-center rounded-3xl border border-red-500 bg-red-500/10 px-6 py-3 text-sm font-medium text-red-200 transition hover:bg-red-500/20 disabled:opacity-60"
                      >
                        {deleting ? 'Deleting...' : 'Delete share'}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <p className="mt-5 text-gray-400 leading-relaxed">{featuredShare.description}</p>
              )}
            </>
          )}
        </div>

        {/* Social Highlights */}
        <div className="mb-10 grid gap-4 lg:grid-cols-2">
          {socialHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group block overflow-hidden rounded-3xl border border-gray-800 bg-[#111111] p-6 transition hover:border-violet-500/40"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">{item.platform}</p>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </a>
            );
          })}
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading latest posts...</div>
        ) : recentPosts.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-gray-800 rounded-3xl">
            <p className="text-gray-500">No posts yet.</p>
            <Link
              to="/create-post"
              className="mt-4 inline-block text-violet-400 hover:text-violet-300 underline"
            >
              Be the first to write something →
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => {
              const firstImage = post.image_urls?.[0];
              const shareLink = typeof window !== 'undefined'
                ? `https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.origin + '/blog/' + post.id)}`
                : 'https://x.com';

              return (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="group bg-[#111111] border border-gray-800 hover:border-violet-500/30 rounded-3xl overflow-hidden transition-all duration-300"
                >
                  {firstImage && (
                    <div className="h-48 bg-gray-900 overflow-hidden">
                      <img
                        src={firstImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex justify-between text-xs text-gray-500 mb-3">
                      <span>{new Date(post.created_at).toISOString().split('T')[0]}</span>
                      <span>{post.reading_time || 5} min read</span>
                    </div>

                    <h3 className="font-semibold text-lg leading-tight mb-3 line-clamp-2 group-hover:text-violet-300 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-400 text-sm line-clamp-3 mb-5">
                      {post.excerpt || post.content?.replace(/<[^>]+>/g, '').slice(0, 140) + '...'}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex gap-4">
                        <span>❤️ {post.likes_count}</span>
                        <span>💬 {post.comments_count}</span>
                      </div>
                      <a
                        href={`https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.origin + '/blog/' + post.id)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-violet-400 group-hover:underline"
                      >
                        Share on X
                      </a>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
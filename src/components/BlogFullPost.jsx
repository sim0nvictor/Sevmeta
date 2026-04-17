import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Heart, MessageCircle, Share, ArrowLeft, Send, Reply } from 'lucide-react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const buildShareUrl = (platform, title, url) => {
  const encodedText = encodeURIComponent(`${title} — Read this article`);
  const encodedUrl = encodeURIComponent(url);

  switch (platform) {
    case 'x':
      return `https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
    case 'linkedin':
      return `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`;
    default:
      return url;
  }
};

const openShare = (platform, title, url) => {
  const shareUrl = buildShareUrl(platform, title, url);
  window.open(shareUrl, '_blank', 'noopener,noreferrer');
};

// ==========================
// Like Button with Realtime
// ==========================
function LikeButton({ postId, initialCount, onAuthRequired }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount || 0);

  useEffect(() => {
    const channel = supabase
      .channel(`likes-${postId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'likes', filter: `post_id=eq.${postId}` },
        () => {
          supabase
            .from('posts')
            .select('likes_count')
            .eq('id', postId)
            .single()
            .then(({ data }) => {
              if (data) setCount(data.likes_count);
            });
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [postId]);

  const toggleLike = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      onAuthRequired?.();
      return;
    }

    if (liked) {
      await supabase.from('likes').delete().eq('post_id', postId).eq('user_id', user.id);
    } else {
      await supabase.from('likes').insert({ post_id: postId, user_id: user.id });
    }
    setLiked(!liked);
  };

  return (
    <button
      onClick={toggleLike}
      className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors"
    >
      <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
      <span className="font-medium">{count}</span>
    </button>
  );
}

// ==========================
// Nested Comment Component
// ==========================
function CommentItem({ comment }) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReply = async () => {
    if (!replyText.trim()) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert('Please log in');

    await supabase.from('comments').insert({
      post_id: comment.post_id,
      user_id: user.id,
      parent_comment_id: comment.id,
      content: replyText.trim(),
    });

    setReplyText('');
    setShowReply(false);
  };

  return (
    <div className="border-l-2 border-violet-500 pl-4 mb-6">
      <div className="flex gap-3">
        <div className="w-8 h-8 bg-gray-700 rounded-full flex-shrink-0" />
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-white">
              @{comment.user?.email?.split('@')[0] || 'user'}
            </span>
            <span className="text-gray-500 text-xs">
              {new Date(comment.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{comment.content}</p>

          <button
            onClick={() => setShowReply(!showReply)}
            className="text-violet-400 text-xs flex items-center gap-1 mt-2 hover:text-violet-300"
          >
            <Reply size={14} /> Reply
          </button>

          {showReply && (
            <div className="mt-3 flex gap-2">
              <input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 bg-gray-900 border border-gray-700 rounded-2xl px-4 py-2 text-sm focus:outline-none focus:border-violet-500"
              />
              <button
                onClick={handleReply}
                className="bg-violet-600 hover:bg-violet-700 px-5 rounded-2xl text-white text-sm font-medium"
              >
                Send
              </button>
            </div>
          )}

          {/* Recursive Replies */}
          {comment.replies?.length > 0 && (
            <div className="mt-4">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================
// Build Comment Tree Helper
// ==========================
const buildCommentTree = (flatComments) => {
  const map = {};
  flatComments.forEach((c) => {
    map[c.id] = { ...c, replies: [] };
  });

  const tree = [];
  flatComments.forEach((c) => {
    if (c.parent_comment_id && map[c.parent_comment_id]) {
      map[c.parent_comment_id].replies.push(map[c.id]);
    } else {
      tree.push(map[c.id]);
    }
  });
  return tree;
};

// ==========================
// Auth Modal Component
// ==========================
function AuthModal({
  open,
  onClose,
  mode,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onToggleMode,
  loading,
  message,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6">
      <div className="max-w-xl w-full rounded-3xl border border-violet-500/20 bg-[#0f1013] p-8 shadow-2xl shadow-violet-500/20">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Authentication Required</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Sign in to continue</h2>
            <p className="mt-2 text-gray-400">You need an account to like posts or leave comments.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-gray-700 bg-[#111111] p-3 text-gray-300 transition hover:bg-gray-900"
            aria-label="Close auth modal"
          >
            ✕
          </button>
        </div>

        <div className="mt-8 grid gap-4">
          <input
            type="email"
            value={email}
            onChange={onEmailChange}
            placeholder="Email"
            className="w-full rounded-3xl border border-gray-700 bg-[#111111] px-4 py-4 text-white outline-none focus:border-violet-500"
          />
          <input
            type="password"
            value={password}
            onChange={onPasswordChange}
            placeholder="Password"
            className="w-full rounded-3xl border border-gray-700 bg-[#111111] px-4 py-4 text-white outline-none focus:border-violet-500"
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onSubmit}
            disabled={!email || !password || loading}
            className="inline-flex items-center justify-center rounded-3xl bg-violet-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:opacity-60"
          >
            {loading ? (mode === 'signup' ? 'Creating account...' : 'Signing in...') : (mode === 'signup' ? 'Create account' : 'Sign in')}
          </button>
          <button
            type="button"
            onClick={onToggleMode}
            className="inline-flex items-center justify-center rounded-3xl border border-gray-700 bg-[#111111] px-6 py-4 text-sm font-medium text-white transition hover:border-violet-500/40"
          >
            {mode === 'signin' ? 'Switch to sign up' : 'Switch to sign in'}
          </button>
        </div>

        {message ? (
          <p className="mt-4 text-sm text-gray-300">{message}</p>
        ) : null}
      </div>
    </div>
  );
}

// ==========================
// Main Full Post Component
// ==========================
export function FullPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authMode, setAuthMode] = useState('signin');
  const [authMessage, setAuthMessage] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editable: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData } = await supabase.auth.getUser();
      setUser(authData?.user || null);
    };

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    fetchUser();

    return () => {
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  // Fetch Post + Comments
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Fetch Post
      const { data: postData } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (postData) {
        setPost(postData);
        if (editor) editor.commands.setContent(postData.content || '<p>No content</p>');
      }

      // Fetch Comments
      const { data: commentData } = await supabase
        .from('comments')
        .select('*, user:auth.users(email)')
        .eq('post_id', id)
        .order('created_at', { ascending: true });

      setComments(buildCommentTree(commentData || []));
      setLoading(false);
    };

    fetchData();
  }, [id, editor]);

  // Realtime Comments
  useEffect(() => {
    if (!id) return;

    const channel = supabase
      .channel(`comments-${id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'comments', filter: `post_id=eq.${id}` },
        async (payload) => {
          const { data: newC } = await supabase
            .from('comments')
            .select('*, user:auth.users(email)')
            .eq('id', payload.new.id)
            .single();

          if (newC) {
            setComments((prev) => buildCommentTree([...prev.flatMap(c => [c, ...(c.replies || [])]), newC]));
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [id]);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) {
      setShowAuthPrompt(true);
      setAuthMessage('Please sign in to comment.');
      return;
    }

    const { error } = await supabase.from('comments').insert({
      post_id: id,
      user_id: currentUser.id,
      content: newComment.trim(),
    });

    if (!error) setNewComment('');
  };

  const handleAuthSubmit = async () => {
    setAuthMessage('');
    setAuthLoading(true);

    if (!authEmail || !authPassword) {
      setAuthMessage('Email and password are required.');
      setAuthLoading(false);
      return;
    }

    if (authMode === 'signup') {
      const { data, error } = await supabase.auth.signUp({
        email: authEmail,
        password: authPassword,
      });

      if (error) {
        setAuthMessage(error.message);
      } else {
        setAuthMessage('Account created. Please sign in.');
        setAuthMode('signin');
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: authEmail,
        password: authPassword,
      });

      if (error) {
        setAuthMessage(error.message);
      } else if (data?.user) {
        setUser(data.user);
        setShowAuthPrompt(false);
        setAuthMessage('Signed in successfully.');
      }
    }

    setAuthLoading(false);
  };

  if (loading) return <div className="text-center py-20 text-gray-400">Loading post...</div>;
  if (!post) return <div className="text-center py-20 text-gray-400">Post not found</div>;

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-violet-400 hover:text-white mb-10"
        >
          <ArrowLeft size={20} /> Back to Latest Articles
        </button>

        {/* Post Header */}
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span>{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span className="text-violet-400">{post.reading_time || 5} min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8">{post.title}</h1>

        {/* Images Carousel */}
        {post.image_urls?.length > 0 && (
          <div className="flex gap-4 overflow-x-auto pb-8 snap-x scrollbar-hide">
            {post.image_urls.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`image ${i}`}
                className="w-80 h-80 object-cover rounded-3xl snap-center flex-shrink-0 border border-gray-800"
              />
            ))}
          </div>
        )}

        {/* Main Content */}
        <div className="prose prose-invert max-w-none text-gray-300 text-[17px] leading-relaxed">
          <EditorContent editor={editor} />
        </div>

        {/* Like & Action Bar */}
        <div className="flex flex-col gap-4 border-t border-b border-gray-800 py-8 my-12 lg:flex-row lg:items-center lg:justify-between">
          <LikeButton
            postId={post.id}
            initialCount={post.likes_count}
            onAuthRequired={() => {
              setShowAuthPrompt(true);
              setAuthMessage('Please sign in to like posts.');
            }}
          />
          <div className="flex items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <MessageCircle size={22} /> {post.comments_count}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => openShare('x', post.title, window.location.href)}
                className="inline-flex items-center gap-2 rounded-3xl border border-gray-800 bg-[#111111] px-4 py-2 text-sm text-violet-300 transition hover:border-violet-500 hover:text-white"
              >
                <Share size={18} /> Share on X
              </button>
              <button
                onClick={() => openShare('linkedin', post.title, window.location.href)}
                className="inline-flex items-center gap-2 rounded-3xl border border-gray-800 bg-[#111111] px-4 py-2 text-sm text-violet-300 transition hover:border-violet-500 hover:text-white"
              >
                <Share size={18} /> Share on LinkedIn
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">
            Comments <span className="text-sm font-normal text-gray-500">({post.comments_count})</span>
          </h3>

          {/* Add Comment */}
          <div className="flex gap-4 mb-10">
            <div className="w-9 h-9 bg-gray-700 rounded-full flex-shrink-0" />
            <div className="flex-1">
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full bg-gray-900 border border-gray-700 focus:border-violet-500 rounded-3xl px-6 py-4 outline-none text-sm"
              />
              <button
                onClick={handlePostComment}
                className="mt-4 bg-violet-600 hover:bg-violet-700 px-8 py-3 rounded-3xl text-sm font-medium flex items-center gap-2"
              >
                <Send size={18} /> Post Comment
              </button>
            </div>
          </div>

          <AuthModal
            open={showAuthPrompt && !user}
            onClose={() => setShowAuthPrompt(false)}
            mode={authMode}
            email={authEmail}
            password={authPassword}
            onEmailChange={(e) => setAuthEmail(e.target.value)}
            onPasswordChange={(e) => setAuthPassword(e.target.value)}
            onSubmit={handleAuthSubmit}
            onToggleMode={() => setAuthMode((prev) => (prev === 'signin' ? 'signup' : 'signin'))}
            loading={authLoading}
            message={authMessage}
          />

          {/* Display Comments */}
          <div>
            {comments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
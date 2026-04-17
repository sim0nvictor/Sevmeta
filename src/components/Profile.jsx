import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const defaultProfile = {
  full_name: '',
  bio: '',
  website: '',
  location: '',
  avatar_url: '',
};

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [realtimeConnected, setRealtimeConnected] = useState(false);

  const mergeProfile = (profileData, authUser) => {
    if (!authUser) return profileData || defaultProfile;

    return {
      full_name: profileData?.full_name || authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || '',
      bio: profileData?.bio || authUser.user_metadata?.bio || '',
      website: profileData?.website || authUser.user_metadata?.website || '',
      location: profileData?.location || authUser.user_metadata?.location || '',
      avatar_url: profileData?.avatar_url || authUser.user_metadata?.avatar_url || '',
    };
  };

  const loadCurrentUser = async () => {
    setLoading(true);
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError) {
      setError('Unable to load authenticated user.');
      setLoading(false);
      return;
    }

    const currentUser = authData?.data?.user || null;
    setUser(currentUser);

    if (!currentUser) {
      setProfile(null);
      setForm(defaultProfile);
      setLoading(false);
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', currentUser.id)
      .single();

    if (profileError && profileError.details?.includes('Results contain 0 rows')) {
      const newProfile = {
        id: currentUser.id,
        email: currentUser.email,
        full_name: currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0],
        avatar_url: currentUser.user_metadata?.avatar_url || '',
        website: currentUser.user_metadata?.website || '',
        location: currentUser.user_metadata?.location || '',
        bio: currentUser.user_metadata?.bio || '',
      };

      const { data: inserted, error: insertError } = await supabase.from('profiles').insert(newProfile).select().single();
      if (!insertError) {
        setProfile(inserted);
        setForm(mergeProfile(inserted, currentUser));
      } else {
        setProfile(null);
        setForm(mergeProfile(null, currentUser));
      }
    } else if (profileError) {
      setError('Unable to load profile data.');
      setProfile(null);
      setForm(mergeProfile(null, currentUser));
    } else {
      setProfile(profileData);
      setForm(mergeProfile(profileData, currentUser));
    }

    setLoading(false);
  };

  useEffect(() => {
    loadCurrentUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      const authUser = session?.user || null;
      setUser(authUser);
      if (authUser) {
        loadCurrentUser();
      } else {
        setProfile(null);
        setForm(defaultProfile);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe?.();
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel(`realtime-profile-${user.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'profiles', filter: `id=eq.${user.id}` },
        (payload) => {
          if (payload.new) {
            setProfile(payload.new);
            setForm(mergeProfile(payload.new, user));
            setRealtimeConnected(true);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleInputChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setError('');

    const updates = {
      id: user.id,
      email: user.email,
      full_name: form.full_name,
      website: form.website,
      bio: form.bio,
      location: form.location,
      avatar_url: form.avatar_url,
      updated_at: new Date().toISOString(),
    };

    const { error: upsertError, data: upsertData } = await supabase.from('profiles').upsert(updates).select().single();

    if (upsertError) {
      setError('Unable to save profile changes.');
    } else {
      setProfile(upsertData);
      setForm(mergeProfile(upsertData, user));
    }

    setSaving(false);
  };

  const profileDisplay = mergeProfile(profile, user);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white py-24 px-6">
        <div className="max-w-4xl mx-auto border border-gray-800 rounded-3xl p-10 bg-[#0b0b0b]/90 shadow-xl shadow-violet-500/10">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-800 rounded-xl" />
            <div className="h-4 bg-gray-800 rounded-xl w-3/4" />
            <div className="h-80 bg-gray-800 rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-24 px-6">
      <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-6 rounded-3xl border border-gray-800 bg-[#0b0b0b]/90 p-10 shadow-xl shadow-violet-500/10">
          <div className="flex items-start gap-5">
            <div className="h-24 w-24 rounded-3xl overflow-hidden bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-3xl font-semibold text-violet-300">
              {profileDisplay.full_name?.slice(0, 2).toUpperCase() || 'U'}
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-4xl font-bold">{profileDisplay.full_name || 'Your Profile'}</h1>
                <span className="rounded-full bg-violet-500/10 px-3 py-1 text-sm text-violet-300">
                  Realtime data
                </span>
              </div>
              <p className="text-gray-400">This page is connected to Supabase and updates automatically when your profile row changes.</p>
            </div>
          </div>

          {!user ? (
            <div className="rounded-3xl border border-gray-800 bg-gray-950/40 p-8 text-center">
              <p className="text-xl font-semibold text-white mb-3">No active session found.</p>
              <p className="text-gray-400">Sign in through Supabase to see your live profile data here.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-gray-800 bg-[#101010]/80 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">Email</p>
                  <p className="text-white break-all">{user.email}</p>
                </div>
                <div className="rounded-3xl border border-gray-800 bg-[#101010]/80 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">Member since</p>
                  <p className="text-white">{new Date(user.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-gray-800 bg-[#101010]/80 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">Location</p>
                  <p className="text-white">{profileDisplay.location || 'Add your location'}</p>
                </div>
                <div className="rounded-3xl border border-gray-800 bg-[#101010]/80 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">Website</p>
                  <p className="text-violet-300 break-all">{profileDisplay.website || 'Add your website'}</p>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-800 bg-[#101010]/80 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">Bio</p>
                <p className="text-gray-300">{profileDisplay.bio || 'Tell people what you do.'}</p>
              </div>

              <div className="rounded-3xl border border-gray-800 bg-[#101010]/80 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">Realtime status</p>
                <p className={`text-sm ${realtimeConnected ? 'text-green-400' : 'text-yellow-300'}`}>
                  {realtimeConnected ? 'Realtime profile updates connected.' : 'Waiting for live updates from Supabase...' }
                </p>
              </div>
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-gray-800 bg-[#0b0b0b]/90 p-10 shadow-xl shadow-violet-500/10">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold">Edit Profile</h2>
              <p className="text-gray-400 mt-2">Update your display name, bio, website, and location in real time.</p>
            </div>
            {saving && <span className="text-sm text-violet-300">Saving...</span>}
          </div>

          {error && <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-red-200 mb-6">{error}</div>}

          <div className="space-y-5">
            <label className="block">
              <span className="text-sm text-gray-400">Full name</span>
              <input
                type="text"
                value={form.full_name}
                onChange={handleInputChange('full_name')}
                className="mt-3 w-full rounded-3xl border border-gray-700 bg-[#111111] px-4 py-4 text-white outline-none focus:border-violet-500"
                placeholder="Your full name"
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-400">Avatar URL</span>
              <input
                type="text"
                value={form.avatar_url}
                onChange={handleInputChange('avatar_url')}
                className="mt-3 w-full rounded-3xl border border-gray-700 bg-[#111111] px-4 py-4 text-white outline-none focus:border-violet-500"
                placeholder="https://..."
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-400">Website</span>
              <input
                type="text"
                value={form.website}
                onChange={handleInputChange('website')}
                className="mt-3 w-full rounded-3xl border border-gray-700 bg-[#111111] px-4 py-4 text-white outline-none focus:border-violet-500"
                placeholder="https://your-site.com"
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-400">Location</span>
              <input
                type="text"
                value={form.location}
                onChange={handleInputChange('location')}
                className="mt-3 w-full rounded-3xl border border-gray-700 bg-[#111111] px-4 py-4 text-white outline-none focus:border-violet-500"
                placeholder="City, Country"
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-400">Bio</span>
              <textarea
                value={form.bio}
                onChange={handleInputChange('bio')}
                rows={5}
                className="mt-3 w-full rounded-3xl border border-gray-700 bg-[#111111] px-4 py-4 text-white outline-none focus:border-violet-500"
                placeholder="A short description of yourself"
              />
            </label>

            <button
              onClick={handleSave}
              disabled={!user || saving}
              className="w-full rounded-3xl bg-violet-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {user ? 'Save Profile' : 'Sign in to edit'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

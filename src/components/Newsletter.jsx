import { useState } from 'react';
import { useForm, ValidationError } from "@formspree/react";
import { supabase } from '../lib/supabaseClient';

export default function Newsletter() {
  const [state, handleSubmit] = useForm("https://formspree.io/f/xlgraoqe"); // Replace with your Formspree form ID
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // First, save to Supabase
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([
          {
            email: email,
            subscribed_at: new Date().toISOString(),
            source: 'blog_section'
          }
        ]);

      if (error && error.code !== '23505') { // Ignore duplicate key errors
        console.error('Supabase error:', error);
      }

      // Then submit to Formspree
      await handleSubmit(e);
    } catch (error) {
      console.error('Newsletter signup error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (state.succeeded) {
    return (
      <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-8 text-center">
        <div className="mb-4 text-2xl">🎉</div>
        <h3 className="text-xl font-semibold text-green-400 mb-2">Welcome aboard!</h3>
        <p className="text-green-200">
          Thanks for subscribing! You'll receive my latest thoughts and updates directly in your inbox.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-violet-500/20 bg-[#14141a] p-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Stay Updated
        </h3>
        <p className="text-gray-400">
          Get my daily thoughts, tutorials, and Web3 insights delivered straight to your inbox.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 rounded-2xl border border-gray-700 bg-[#111111] px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-violet-500 transition-colors"
          />

          <button
            type="submit"
            disabled={state.submitting || submitting}
            className="rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-3 font-semibold text-white transition hover:from-violet-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {state.submitting || submitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>

        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
          className="text-red-400 text-sm"
        />

        <p className="text-xs text-gray-500 text-center">
          No spam, unsubscribe anytime. Your email stays private.
        </p>
      </form>
    </div>
  );
}
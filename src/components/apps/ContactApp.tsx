import { useState, useRef, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

export function ContactApp() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');

    // Retrieve credentials from environment variables (.env file)
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_placeholder';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_placeholder';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key_placeholder';

    if (serviceId === 'service_placeholder') {
      // Simulate sending for dev mode if keys aren't set
      console.warn('EmailJS keys not found in .env. Simulating email send.');
      setTimeout(() => {
        setStatus('success');
        formRef.current?.reset();
      }, 1500);
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, {
        publicKey,
      });
      setStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e2e] text-white p-6 overflow-y-auto">
      <div className="max-w-md mx-auto w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center text-3xl mb-4 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            ✉️
          </div>
          <h1 className="text-2xl font-bold">Get in Touch</h1>
          <p className="text-gray-400 text-center mt-2 text-sm">
            Have a question or want to work together? Leave a message and I'll get back to you.
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="user_name" className="text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="from_name"
              id="user_name"
              required
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-600"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="user_email" className="text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="from_email"
              id="user_email"
              required
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-600"
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="message" className="text-sm font-medium text-gray-300">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              rows={4}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none placeholder-gray-600"
              placeholder="Hello, I'd like to talk about..."
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 text-green-300 text-sm rounded-lg text-center font-medium">
              Message sent successfully!
            </div>
          )}

          {status === 'error' && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 text-red-300 text-sm rounded-lg text-center font-medium">
              Failed to send message. Please try again.
            </div>
          )}
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-gray-500">
            Note: EmailJS requires environment variables to function properly. 
            Check the implementation plan for setup instructions.
          </p>
        </div>
      </div>
    </div>
  );
}

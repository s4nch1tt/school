"use client";
import { useState } from 'react';
import { generateNoticeContent, correctGrammar } from '@/lib/ai';
import { addNotice } from '@/lib/db-admin';
import { Loader2, Wand2 } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';

export default function NoticeForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!title) return;
    setGenerating(true);
    try {
      const generated = await generateNoticeContent(title, "details regarding the event/announcement");
      setContent(generated);
    } catch (e) {
      console.error(e);
    }
    setGenerating(false);
  };

  const handleCorrect = async () => {
      if (!content) return;
      setGenerating(true);
      try {
          const corrected = await correctGrammar(content);
          setContent(corrected);
      } catch (e) { console.error(e); }
      setGenerating(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addNotice({
        title,
        content,
        date: Timestamp.now(),
        published: true,
        type: 'general',
      });
      setTitle('');
      setContent('');
      alert('Notice added successfully!');
    } catch (e) {
      console.error(e);
      alert('Error adding notice');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
      <h3 className="text-lg font-bold mb-4">Create New Notice</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Notice Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2"
            placeholder="e.g. Annual Sports Day"
            required
          />
        </div>

        <div>
           <div className="flex justify-between items-center mb-1">
             <label className="block text-sm font-medium text-gray-700">Content</label>
             <div className="space-x-2">
                <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={generating || !title}
                    className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded flex items-center hover:bg-purple-200 disabled:opacity-50"
                >
                    <Wand2 className="w-3 h-3 mr-1" /> AI Generate
                </button>
                <button
                    type="button"
                    onClick={handleCorrect}
                    disabled={generating || !content}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center hover:bg-blue-200 disabled:opacity-50"
                >
                    <Wand2 className="w-3 h-3 mr-1" /> Grammar Fix
                </button>
             </div>
           </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Publish Notice'}
        </button>
      </form>
    </div>
  );
}

import React, { useState } from 'react';
import { ClipboardList, Send, ThumbsUp, User, Mail, MessageSquare } from 'lucide-react';

interface Survey {
  question: string;
  options: string[];
}

const initialSurveys: Survey[] = [
  {
    question: 'کیفیت خدمات ما را چگونه ارزیابی می‌کنید؟',
    options: ['عالی', 'خوب', 'متوسط', 'ضعیف']
  },
  {
    question: 'آیا خدمات ما را به دیگران پیشنهاد می‌کنید؟',
    options: ['قطعاً', 'احتمالاً', 'شاید', 'خیر']
  },
  {
    question: 'کدام بخش خدمات ما نیاز به بهبود دارد؟',
    options: ['سرعت', 'کیفیت', 'پشتیبانی', 'قیمت']
  }
];

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [currentSurvey, setCurrentSurvey] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentSurvey < initialSurveys.length - 1) {
      setCurrentSurvey(currentSurvey + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4" dir="rtl">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
          <ThumbsUp className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">با تشکر از شما!</h2>
          <p className="text-gray-600">نظرات شما با موفقیت ثبت شد.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <ClipboardList className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">نظرسنجی</h1>
          <p className="text-gray-600">نظر شما برای ما مهم است</p>
        </header>

        {/* Survey Questions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {initialSurveys[currentSurvey].question}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {initialSurveys[currentSurvey].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="text-right p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>سوال {currentSurvey + 1} از {initialSurveys.length}</span>
            <div className="flex gap-2">
              {Array.from({ length: initialSurveys.length }).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index <= currentSurvey ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">اطلاعات تماس</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">نام</label>
              <div className="relative">
                <User className="w-5 h-5 text-gray-400 absolute right-3 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pr-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">ایمیل</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute right-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">نظرات تکمیلی</label>
              <div className="relative">
                <MessageSquare className="w-5 h-5 text-gray-400 absolute right-3 top-3" />
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full pr-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              ارسال نظرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
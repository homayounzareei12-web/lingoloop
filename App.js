import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const lessonGroups = {
    beginner: [
      {
        id: 'b1',
        title: 'At a Coffee Shop ☕',
        description: 'Order, ask, and enjoy.',
        sentences: [
          {
            id: 'b1-1',
            en: 'Can I have a coffee, please?',
            fa: 'میشه لطفاً یک قهوه داشته باشم؟',
          },
          {
            id: 'b1-2',
            en: 'I would like a cappuccino.',
            fa: 'من یک کاپوچینو می‌خواهم.',
          },
          {
            id: 'b1-3',
            en: 'Can I pay by card?',
            fa: 'می‌توانم با کارت پرداخت کنم؟',
          },
        ],
      },
      {
        id: 'b2',
        title: 'At the Airport ✈️',
        description: 'Travel with confidence.',
        sentences: [
          {
            id: 'b2-1',
            en: 'Where is the check-in desk?',
            fa: 'کانتر چک‌این کجاست؟',
          },
          {
            id: 'b2-2',
            en: 'What time is boarding?',
            fa: 'سوار شدن چه ساعتی است؟',
          },
          {
            id: 'b2-3',
            en: 'Where is gate twelve?',
            fa: 'گیت دوازده کجاست؟',
          },
        ],
      },
      {
        id: 'b3',
        title: 'At Home 🏠',
        description: 'Talk about daily routines.',
        sentences: [
          {
            id: 'b3-1',
            en: 'I wake up at seven.',
            fa: 'من ساعت هفت بیدار می‌شوم.',
          },
          {
            id: 'b3-2',
            en: 'I make breakfast every morning.',
            fa: 'من هر صبح صبحانه درست می‌کنم.',
          },
          {
            id: 'b3-3',
            en: 'I go to bed at eleven.',
            fa: 'من ساعت یازده می‌خوابم.',
          },
        ],
      },
      {
        id: 'b4',
        title: 'Shopping 🛍️',
        description: 'Find what you need.',
        sentences: [
          {
            id: 'b4-1',
            en: 'How much is this?',
            fa: 'این چقدر است؟',
          },
          {
            id: 'b4-2',
            en: 'Do you have this in blue?',
            fa: 'این را به رنگ آبی دارید؟',
          },
          {
            id: 'b4-3',
            en: 'Can I try this on?',
            fa: 'می‌توانم این را پرو کنم؟',
          },
        ],
      },
      {
        id: 'b5',
        title: 'At a Restaurant 🍴',
        description: 'Order food and make requests.',
        sentences: [
          {
            id: 'b5-1',
            en: 'Can I see the menu?',
            fa: 'می‌توانم منو را ببینم؟',
          },
          {
            id: 'b5-2',
            en: 'I would like the chicken, please.',
            fa: 'لطفاً مرغ می‌خواهم.',
          },
          {
            id: 'b5-3',
            en: 'Can I have the bill, please?',
            fa: 'می‌شود لطفاً صورت‌حساب را بیاورید؟',
          },
        ],
      },
    ],

    intermediate: [
      {
        id: 'i1',
        title: 'At Work 💼',
        description: 'Build confidence at work.',
        sentences: [
          {
            id: 'i1-1',
            en: 'Could we schedule a meeting for tomorrow?',
            fa: 'می‌توانیم برای فردا یک جلسه تنظیم کنیم؟',
          },
          {
            id: 'i1-2',
            en: 'I will send you the report this afternoon.',
            fa: 'امروز بعدازظهر گزارش را برایتان می‌فرستم.',
          },
          {
            id: 'i1-3',
            en: 'Could you explain that again, please?',
            fa: 'می‌توانید لطفاً دوباره آن را توضیح دهید؟',
          },
        ],
      },
      {
        id: 'i2',
        title: 'Making Plans 📅',
        description: 'Talk about future activities.',
        sentences: [
          {
            id: 'i2-1',
            en: 'Are you free this weekend?',
            fa: 'این آخر هفته وقت داری؟',
          },
          {
            id: 'i2-2',
            en: 'Why don’t we meet around six?',
            fa: 'چرا حدود ساعت شش همدیگر را نبینیم؟',
          },
          {
            id: 'i2-3',
            en: 'Let me check my schedule.',
            fa: 'بگذار برنامه‌ام را بررسی کنم.',
          },
        ],
      },
      {
        id: 'i3',
        title: 'Doctor Visit 🩺',
        description: 'Explain everyday problems.',
        sentences: [
          {
            id: 'i3-1',
            en: 'I have been feeling tired lately.',
            fa: 'اخیراً احساس خستگی می‌کنم.',
          },
          {
            id: 'i3-2',
            en: 'How long have you had this problem?',
            fa: 'چه مدت است این مشکل را دارید؟',
          },
          {
            id: 'i3-3',
            en: 'Do I need to take any medicine?',
            fa: 'آیا لازم است دارویی مصرف کنم؟',
          },
        ],
      },
    ],

    advanced: [
      {
        id: 'a1',
        title: 'Giving Opinions 💬',
        description: 'Express complex ideas clearly.',
        sentences: [
          {
            id: 'a1-1',
            en: 'From my perspective, the benefits outweigh the risks.',
            fa: 'از دیدگاه من، مزایا از خطرات بیشتر است.',
          },
          {
            id: 'a1-2',
            en: 'I understand your point, but I see it differently.',
            fa: 'دیدگاهت را درک می‌کنم، اما من متفاوت به آن نگاه می‌کنم.',
          },
          {
            id: 'a1-3',
            en: 'There are several factors we should consider.',
            fa: 'چند عامل وجود دارد که باید در نظر بگیریم.',
          },
        ],
      },
      {
        id: 'a2',
        title: 'Professional English 🎯',
        description: 'Communicate with precision.',
        sentences: [
          {
            id: 'a2-1',
            en: 'We need to evaluate the long-term impact of this decision.',
            fa: 'باید تأثیر بلندمدت این تصمیم را ارزیابی کنیم.',
          },
          {
            id: 'a2-2',
            en: 'I would appreciate your feedback on the proposal.',
            fa: 'از بازخورد شما درباره این پیشنهاد استقبال می‌کنم.',
          },
          {
            id: 'a2-3',
            en: 'Let us focus on the most practical solution.',
            fa: 'بیایید روی عملی‌ترین راه‌حل تمرکز کنیم.',
          },
        ],
      },
      {
        id: 'a3',
        title: 'Discussion & Debate 🧠',
        description: 'Challenge yourself with complex topics.',
        sentences: [
          {
            id: 'a3-1',
            en: 'The issue is more nuanced than it initially appears.',
            fa: 'این موضوع پیچیده‌تر از چیزی است که در ابتدا به نظر می‌رسد.',
          },
          {
            id: 'a3-2',
            en: 'That argument is compelling, although it has limitations.',
            fa: 'آن استدلال قانع‌کننده است، هرچند محدودیت‌هایی دارد.',
          },
          {
            id: 'a3-3',
            en: 'We should distinguish between correlation and causation.',
            fa: 'باید بین همبستگی و رابطه علّی تفاوت قائل شویم.',
          },
        ],
      },
    ],
  };

  const [screen, setScreen] = useState('home');
  const [lessonLevel, setLessonLevel] = useState('beginner');
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [saved, setSaved] = useState([]);
  const [levels, setLevels] = useState({});
  const [completedLessons, setCompletedLessons] = useState([]);
  const [reviewSchedules, setReviewSchedules] = useState({});
  const [reviewLessonId, setReviewLessonId] = useState(null);
  const [reviewSentenceIndex, setReviewSentenceIndex] = useState(0);
  const [reviewIntervals, setReviewIntervals] = useState([3, 7, 10, 14, 30]);
  const [customReviewDay, setCustomReviewDay] = useState('');
  const [customItems, setCustomItems] = useState([]);
  const [customType, setCustomType] = useState('Word');
  const [customEnglish, setCustomEnglish] = useState('');
  const [customPersian, setCustomPersian] = useState('');
  const [customDifficulty, setCustomDifficulty] = useState('Easy');
  const [conversationInput, setConversationInput] = useState('');
  const [conversationMessages, setConversationMessages] = useState([
    {
      id: 'coach-welcome',
      role: 'coach',
      text: 'Hi! I am your LingoLoop speaking coach. How are you today?',
      translation: 'سلام! من مربی مکالمه لینگولوپ هستم. امروز حالت چطور است؟',
    },
  ]);
  const [storageReady, setStorageReady] = useState(false);
  useEffect(() => {
  const loadData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('saved');
      const levelsData = await AsyncStorage.getItem('levels');
      const completedData = await AsyncStorage.getItem('completedLessons');
      const reviewData = await AsyncStorage.getItem('reviewSchedules');
      const reviewIntervalsData = await AsyncStorage.getItem('reviewIntervals');
      const customItemsData = await AsyncStorage.getItem('customItems');

      if (savedData) setSaved(JSON.parse(savedData));
      if (levelsData) setLevels(JSON.parse(levelsData));
      if (completedData) {
        const completed = JSON.parse(completedData);
        setCompletedLessons(completed);

        if (!reviewData) {
          const startedAt = new Date().toISOString();
          const firstSchedules = completed.reduce((result, lessonId) => {
            result[lessonId] = { startedAt, completedIntervals: [] };
            return result;
          }, {});
          setReviewSchedules(firstSchedules);
        }
      }
      if (reviewData) setReviewSchedules(JSON.parse(reviewData));
      if (reviewIntervalsData) {
        setReviewIntervals(JSON.parse(reviewIntervalsData));
      }
      if (customItemsData) setCustomItems(JSON.parse(customItemsData));
    } catch (error) {
      console.log('Error loading data:', error);
    } finally {
      setStorageReady(true);
    }
  };

  loadData();
}, []);
  useEffect(() => {
  if (!storageReady) return;

  AsyncStorage.setItem('saved', JSON.stringify(saved));
  AsyncStorage.setItem('levels', JSON.stringify(levels));
  AsyncStorage.setItem(
    'completedLessons',
    JSON.stringify(completedLessons)
  );
  AsyncStorage.setItem('reviewSchedules', JSON.stringify(reviewSchedules));
  AsyncStorage.setItem('reviewIntervals', JSON.stringify(reviewIntervals));
  AsyncStorage.setItem('customItems', JSON.stringify(customItems));
}, [saved, levels, completedLessons, reviewSchedules, reviewIntervals, customItems, storageReady]);
  const lessons = lessonGroups[lessonLevel];
  const currentLesson = lessons[selectedLessonIndex];
  const currentSentence = currentLesson?.sentences[sentenceIndex];

  const selectedDifficulty = levels[currentSentence?.id];
  const isSaved = saved.includes(currentSentence?.id);

  const allLessons = [
    ...lessonGroups.beginner,
    ...lessonGroups.intermediate,
    ...lessonGroups.advanced,
  ];

  const allSentences = allLessons.flatMap((lesson) => lesson.sentences);

  const reviewLesson = allLessons.find((lesson) => lesson.id === reviewLessonId);
  const reviewSentence = reviewLesson?.sentences[reviewSentenceIndex];

  const savedSentences = allSentences.filter((sentence) =>
    saved.includes(sentence.id)
  );

const easySaved = savedSentences.filter(
  (sentence) => levels[sentence.id] === 'Easy'
);

const mediumSaved = savedSentences.filter(
  (sentence) => levels[sentence.id] === 'Medium'
);

const hardSaved = savedSentences.filter(
  (sentence) => levels[sentence.id] === 'Hard'
);

  const chooseDifficulty = (difficulty) => {
    setLevels({
      ...levels,
      [currentSentence.id]: difficulty,
    });
  };

  const saveSentence = () => {
    if (!isSaved) {
      setSaved([...saved, currentSentence.id]);
    }
  };

const removeSavedSentence = (id) => {
  setSaved(saved.filter((savedId) => savedId !== id));
};

  const sendConversationMessage = () => {
    const message = conversationInput.trim();
    if (!message) return;

    const learnedItems = [
      ...customItems,
      ...savedSentences,
    ].filter((item) => item?.en || item?.english);
    const practicePhrase = learnedItems[0]?.en || learnedItems[0]?.english;
    const lowerMessage = message.toLowerCase();

    let reply = 'That is a good answer! Can you tell me a little more?';
    let translation = 'پاسخ خوبی بود! می‌توانی کمی بیشتر توضیح بدهی؟';

    if (/hello|hi|hey/.test(lowerMessage)) {
      reply = 'Hello! Nice to meet you. What did you do today?';
      translation = 'سلام! از آشنایی با تو خوشحالم. امروز چه کار کردی؟';
    } else if (/fine|good|great|happy/.test(lowerMessage)) {
      reply = 'I am glad to hear that! What made your day good?';
      translation = 'خوشحالم که این را می‌شنوم! چه چیزی روزت را خوب کرد؟';
    } else if (/coffee|cappuccino|tea/.test(lowerMessage)) {
      reply = 'Great! How would you order it politely in a coffee shop?';
      translation = 'عالی! چطور آن را مؤدبانه در کافی‌شاپ سفارش می‌دهی؟';
    } else if (/because/.test(lowerMessage)) {
      reply = 'Excellent use of “because”! Now ask me one question.';
      translation = 'استفاده‌ات از «because» عالی بود! حالا یک سؤال از من بپرس.';
    } else if (practicePhrase) {
      reply = `Nice! Try to use this saved English in your next answer: “${practicePhrase}”`;
      translation = 'عالی! سعی کن عبارت ذخیره‌شده بالا را در پاسخ بعدی استفاده کنی.';
    }

    setConversationMessages((messages) => [
      ...messages,
      { id: `user-${Date.now()}`, role: 'user', text: message },
      {
        id: `coach-${Date.now() + 1}`,
        role: 'coach',
        text: reply,
        translation,
      },
    ]);
    setConversationInput('');
  };

  const addCustomItem = () => {
    const english = customEnglish.trim();
    const persian = customPersian.trim();

    if (!english || !persian) {
      Alert.alert('Missing information', 'Please enter both English and Persian.');
      return;
    }

    setCustomItems([
      {
        id: `custom-${Date.now()}`,
        type: customType,
        en: english,
        fa: persian,
        difficulty: customDifficulty,
        createdAt: new Date().toISOString(),
      },
      ...customItems,
    ]);
    setCustomEnglish('');
    setCustomPersian('');
    setCustomDifficulty('Easy');
  };

  const removeCustomItem = (id) => {
    setCustomItems(customItems.filter((item) => item.id !== id));
  };

  const openLesson = (level, lessonIndex) => {
    setLessonLevel(level);
    setSelectedLessonIndex(lessonIndex);
    setSentenceIndex(0);
    setScreen('lesson');
  };

  const nextSentence = () => {
    if (sentenceIndex < currentLesson.sentences.length - 1) {
      setSentenceIndex(sentenceIndex + 1);
    } else {
      if (!completedLessons.includes(currentLesson.id)) {
        setCompletedLessons([...completedLessons, currentLesson.id]);
      }
      setReviewSchedules((currentSchedules) => {
        if (currentSchedules[currentLesson.id]) return currentSchedules;

        return {
          ...currentSchedules,
          [currentLesson.id]: {
            startedAt: new Date().toISOString(),
            completedIntervals: [],
          },
        };
      });
      setScreen('lessons');
      setSentenceIndex(0);
    }
  };

  const addDays = (dateValue, days) => {
    const date = new Date(dateValue);
    date.setDate(date.getDate() + days);
    return date;
  };

  const formatReviewDate = (date) =>
    date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const getReviewInfo = (lessonId) => {
    const schedule = reviewSchedules[lessonId];
    const completedIntervals = schedule?.completedIntervals || [];
    const interval = reviewIntervals.find(
      (days) => !completedIntervals.includes(days)
    );

    if (!schedule || interval === undefined) {
      return { finished: true, isDue: false, interval: null, dueDate: null };
    }

    const dueDate = addDays(schedule.startedAt, interval);

    return {
      finished: false,
      isDue: new Date() >= dueDate,
      interval,
      dueDate,
    };
  };

  const reviewItems = Object.keys(reviewSchedules)
    .map((lessonId) => ({
      lesson: allLessons.find((lesson) => lesson.id === lessonId),
      info: getReviewInfo(lessonId),
    }))
    .filter((item) => item.lesson)
    .sort((a, b) => {
      if (a.info.finished) return 1;
      if (b.info.finished) return -1;
      return a.info.dueDate - b.info.dueDate;
    });

  const startReview = (lessonId) => {
    setReviewLessonId(lessonId);
    setReviewSentenceIndex(0);
    setScreen('review');
  };

  const addCustomReviewDay = () => {
    const day = Number.parseInt(customReviewDay, 10);

    if (!Number.isInteger(day) || day < 1) {
      Alert.alert(
        'Invalid day',
        'Please enter a whole number greater than zero.'
      );
      return;
    }

    if (reviewIntervals.includes(day)) {
      Alert.alert('Already added', `${day} days is already in your schedule.`);
      return;
    }

    setReviewIntervals([...reviewIntervals, day].sort((a, b) => a - b));
    setCustomReviewDay('');
  };

  const removeReviewDay = (day) => {
    const wasCompleted = Object.values(reviewSchedules).some((schedule) =>
      schedule.completedIntervals?.includes(day)
    );

    if (wasCompleted) {
      Alert.alert(
        'Completed review',
        'This day is locked because a review was already completed.'
      );
      return;
    }

    setReviewIntervals(reviewIntervals.filter((item) => item !== day));
  };

  const nextReviewSentence = () => {
    if (reviewSentenceIndex < reviewLesson.sentences.length - 1) {
      setReviewSentenceIndex(reviewSentenceIndex + 1);
      return;
    }

    const info = getReviewInfo(reviewLessonId);
    if (info.isDue && !info.finished) {
      setReviewSchedules((currentSchedules) => ({
        ...currentSchedules,
        [reviewLessonId]: {
          ...currentSchedules[reviewLessonId],
          completedIntervals: [
            ...currentSchedules[reviewLessonId].completedIntervals,
            info.interval,
          ],
        },
      }));
    }

    setReviewSentenceIndex(0);
    setScreen('progress');
  };

  const practicedCount = Object.keys(levels).length;

  const getProgressCount = (lesson) =>
    lesson.sentences.filter((sentence) => levels[sentence.id]).length;

  const LevelTabs = () => (
    <View style={styles.levelTabs}>
      <TouchableOpacity
        style={[
          styles.levelTab,
          styles.beginnerTab,
          lessonLevel === 'beginner' && styles.beginnerSelected,
        ]}
        onPress={() => {
  setLessonLevel('beginner');
  setScreen('lessons');
}}
      >
        <Text style={styles.levelIcon}>🌱</Text>
        <Text style={styles.levelTabTitle}>Beginner</Text>
        <Text style={styles.levelTabSub}>Everyday English</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.levelTab,
          styles.intermediateTab,
          lessonLevel === 'intermediate' && styles.intermediateSelected,
        ]}
        onPress={() => setLessonLevel('intermediate')}
      >
        <Text style={styles.levelIcon}>📊</Text>
        <Text style={styles.levelTabTitle}>Intermediate</Text>
        <Text style={styles.levelTabSub}>Real-life situations</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.levelTab,
          styles.advancedTab,
          lessonLevel === 'advanced' && styles.advancedSelected,
        ]}
        onPress={() => setLessonLevel('advanced')}
      >
        <Text style={styles.levelIcon}>⭐</Text>
        <Text style={styles.levelTabTitle}>Advanced</Text>
        <Text style={styles.levelTabSub}>Complex topics</Text>
      </TouchableOpacity>
    </View>
  );

  const BottomNav = () => (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={() => setScreen('home')}>
        <Text style={screen === 'home' ? styles.navActive : styles.navText}>
          🏠
        </Text>
        <Text style={screen === 'home' ? styles.navActiveLabel : styles.navLabel}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen('lessons')}>
        <Text style={screen === 'lessons' ? styles.navActive : styles.navText}>
          📖
        </Text>
        <Text
          style={screen === 'lessons' ? styles.navActiveLabel : styles.navLabel}
        >
          Lessons
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen('saved')}>
        <Text style={screen === 'saved' ? styles.navActive : styles.navText}>
          ♡
        </Text>
        <Text style={screen === 'saved' ? styles.navActiveLabel : styles.navLabel}>
          Saved
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen('progress')}>
        <Text style={screen === 'progress' ? styles.navActive : styles.navText}>
          ▥
        </Text>
        <Text
          style={screen === 'progress' ? styles.navActiveLabel : styles.navLabel}
        >
          Progress
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (screen === 'lesson') {
    return (
      <SafeAreaView style={styles.page}>
        <ScrollView contentContainerStyle={styles.container}>
          <TouchableOpacity onPress={() => setScreen('lessons')}>
            <Text style={styles.backText}>← Lessons</Text>
          </TouchableOpacity>

          <Text style={styles.lessonNumber}>
            LESSON {selectedLessonIndex + 1}
          </Text>

          <Text style={styles.lessonTitle}>{currentLesson.title}</Text>

          <Text style={styles.counter}>
            {sentenceIndex + 1} / {currentLesson.sentences.length}
          </Text>

          <View style={styles.sentenceCard}>
            <Text style={styles.english}>{currentSentence.en}</Text>
            <Text style={styles.persian}>{currentSentence.fa}</Text>
          </View>

          <Text style={styles.question}>How difficult was it?</Text>

          <View style={styles.difficultyRow}>
            <TouchableOpacity
              style={[
                styles.difficultyButton,
                styles.easyButton,
                selectedDifficulty === 'Easy' && styles.easySelected,
              ]}
              onPress={() => chooseDifficulty('Easy')}
            >
              <Text style={styles.difficultyText}>Easy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.difficultyButton,
                styles.mediumButton,
                selectedDifficulty === 'Medium' && styles.mediumSelected,
              ]}
              onPress={() => chooseDifficulty('Medium')}
            >
              <Text style={styles.difficultyText}>Medium</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.difficultyButton,
                styles.hardButton,
                selectedDifficulty === 'Hard' && styles.hardSelected,
              ]}
              onPress={() => chooseDifficulty('Hard')}
            >
              <Text style={styles.difficultyText}>Hard</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={saveSentence}
          >
            <Text style={styles.saveText}>
              {isSaved ? '♥ Saved' : '♡ Save Sentence'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={nextSentence}
          >
            <Text style={styles.nextText}>
              {sentenceIndex === currentLesson.sentences.length - 1
                ? 'Finish Lesson ✓'
                : 'Next →'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === 'lessons') {
    return (
      <SafeAreaView style={styles.page}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.logoRow}>
            <Text style={styles.logoLingo}>Lingo</Text>
            <Text style={styles.logoLoop}>Loop.</Text>
          </View>

          <Text style={styles.tagline}>Learn. Practice. Repeat.</Text>

          <Text style={styles.pageTitle}>Lessons</Text>
          <Text style={styles.pageSubtitle}>
            Choose a level and start learning.
          </Text>

          <LevelTabs />

          <Text style={styles.sectionTitle}>
            {lessonLevel === 'beginner'
              ? 'Beginner Lessons'
              : lessonLevel === 'intermediate'
              ? 'Intermediate Lessons'
              : 'Advanced Lessons'}
          </Text>

          {lessonGroups[lessonLevel].map((lesson, index) => {
            const progress = getProgressCount(lesson);

            return (
              <TouchableOpacity
                key={lesson.id}
                style={styles.lessonListCard}
                onPress={() => openLesson(lessonLevel, index)}
              >
                <View style={styles.lessonListContent}>
                  <Text style={styles.lessonListNumber}>
                    Lesson {index + 1}
                  </Text>

                  <Text style={styles.lessonListTitle}>{lesson.title}</Text>

                  <Text style={styles.lessonListDescription}>
                    {lesson.description}
                  </Text>
                </View>

                <View style={styles.progressCircle}>
                  <Text style={styles.progressCircleText}>
                    {progress}/{lesson.sentences.length}
                  </Text>
                </View>

                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            );
          })}

          <BottomNav />
        </ScrollView>
      </SafeAreaView>
    );
  }
 if (screen === 'practiceStory') {
  const allLessons = Object.values(lessonGroups).flat();

const futureLesson = allLessons.find(
  (lesson) => !completedLessons.includes(lesson.id)
);

const futureItem = futureLesson?.sentences?.[0]
  ? {
      ...futureLesson.sentences[0],
      type: 'Sentence',
      isPreview: true,
    }
  : null;
const currentItem = lessonGroups.beginner[0]?.sentences?.[0]
  ? {
      ...lessonGroups.beginner[0].sentences[0],
      type: 'Sentence',
      isCurrent: true,
    }
  : null;
const personalStoryItems = [...customItems, ...saved]
  .filter((item) => item?.en || item?.english)
  .slice(0, 4);

const storyItems = [
  ...personalStoryItems,
  ...(currentItem ? [currentItem] : []),
  ...(futureItem ? [futureItem] : []),
];
const wordItems = storyItems.filter((item) => {
  const text = item.en || item.english || '';
  return item.type === 'Word' || !text.trim().includes(' ');
});

const sentenceItems = storyItems.filter(
  (item) => !wordItems.includes(item)
);

const wordEnglish = wordItems.map(
  (item) => item.en || item.english
);

const wordPersian = wordItems
  .map((item) => item.fa || item.persian)
  .filter(Boolean);

const sentenceEnglish = sentenceItems.map(
  (item) => item.en || item.english
);

const sentencePersian = sentenceItems
  .map((item) => item.fa || item.persian)
  .filter(Boolean);

const storyEnglish = [
  'Today I decided to practice English.',
  wordEnglish.length
    ? `I learned ${wordEnglish.length > 1 ? 'the words' : 'the word'} ${wordEnglish
        .map((text) => `"${text}"`)
        .join(', ')}.`
    : '',
  sentenceEnglish.length
    ? `Then I practiced ${sentenceEnglish.length > 1 ? 'the sentences' : 'the sentence'} ${sentenceEnglish
        .map((text) => `"${text}"`)
        .join(', ')}.`
    : '',
  'At the end, I felt more confident.',
]
  .filter(Boolean)
  .join(' ');

const storyPersian = [
  'امروز تصمیم گرفتم انگلیسی تمرین کنم.',
  wordPersian.length
    ? `کلمه‌های «${wordPersian.join('»، «')}» را یاد گرفتم.`
    : '',
  sentencePersian.length
    ? `سپس جمله‌های «${sentencePersian.join('»، «')}» را تمرین کردم.`
    : '',
  'در پایان احساس اعتمادبه‌نفس بیشتری داشتم.',
]
  .filter(Boolean)
  .join(' ');

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => setScreen('home')}>
          <Text style={styles.backText}>← Home</Text>
        </TouchableOpacity>

        <Text style={styles.customEyebrow}>PERSONAL PRACTICE</Text>
        <Text style={styles.pageTitle}>My Practice Story 📖</Text>
        <Text style={styles.pageSubtitle}>
          A short practice made from your saved English.
        </Text>

  {storyItems.length === 0 ? (
  <View style={styles.customFormCard}>
    <Text style={styles.customLabel}>
      Save some words or sentences first.
    </Text>
  </View>
) : (
 <View style={styles.customFormCard}>
  <Text style={{ fontSize: 13, fontWeight: '800', marginBottom: 18 }}>
    <Text style={{ color: '#16A36A' }}>● Learned</Text>
    {'   '}
    <Text style={{ color: '#FF7417' }}>● Current</Text>
    {'   '}
    <Text style={{ color: '#1769E0' }}>● Future</Text>
  </Text>

  <Text style={styles.customLabel}>
    Today I practiced English.
    {personalStoryItems.length > 0 && (
      <Text style={{ color: '#16A36A' }}>
        {` I reviewed ${personalStoryItems
          .map((item) => `"${item.en || item.english}"`)
          .join(', ')}.`}
      </Text>
    )}
    {currentItem && (
      <Text style={{ color: '#FF7417' }}>
        {` In my current lesson, I practiced "${currentItem.en}".`}
      </Text>
    )}
    {futureItem && (
      <Text style={{ color: '#1769E0' }}>
        {` For the future, I previewed "${futureItem.en}".`}
      </Text>
    )}
    {' At the end, I felt more confident.'}
  </Text>

  <Text style={styles.pageSubtitle}>
    امروز انگلیسی تمرین کردم.
    {personalStoryItems.length > 0 && (
      <Text style={{ color: '#16A36A' }}>
        {` موارد قبلی «${personalStoryItems
          .map((item) => item.fa || item.persian || item.en || item.english)
          .join('»، «')}» را مرور کردم.`}
      </Text>
    )}
    {currentItem && (
      <Text style={{ color: '#FF7417' }}>
        {` در درس فعلی «${currentItem.fa}» را تمرین کردم.`}
      </Text>
    )}
    {futureItem && (
      <Text style={{ color: '#1769E0' }}>
        {` برای آینده با «${futureItem.fa}» آشنا شدم.`}
      </Text>
    )}
    {' در پایان اعتمادبه‌نفس بیشتری داشتم.'}
  </Text>
</View>

)}
      
      </ScrollView>
    </SafeAreaView>
  );
}
  if (screen === 'conversation') {
    return (
      <SafeAreaView style={styles.page}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity onPress={() => setScreen('home')}>
            <Text style={styles.backText}>← Home</Text>
          </TouchableOpacity>

          <Text style={styles.conversationEyebrow}>SPEAKING PRACTICE</Text>
          <Text style={styles.pageTitle}>Conversation Coach 💬</Text>
          <Text style={styles.pageSubtitle}>
            Practice freely. Your coach will guide you with simple questions.
          </Text>

          <View style={styles.conversationTip}>
            <Text style={styles.conversationTipTitle}>Today’s goal</Text>
            <Text style={styles.conversationTipText}>
              Write short English answers. Mistakes are welcome here.
            </Text>
          </View>

          {conversationMessages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.chatBubble,
                message.role === 'user'
                  ? styles.userBubble
                  : styles.coachBubble,
              ]}
            >
              <Text style={styles.chatRole}>
                {message.role === 'user' ? 'YOU' : 'LINGOLOOP COACH'}
              </Text>
              <Text
                style={[
                  styles.chatText,
                  message.role === 'user' && styles.userChatText,
                ]}
              >
                {message.text}
              </Text>
              {!!message.translation && (
                <Text style={styles.chatTranslation}>
                  {message.translation}
                </Text>
              )}
            </View>
          ))}

          <View style={styles.conversationComposer}>
            <TextInput
              style={styles.conversationInput}
              value={conversationInput}
              onChangeText={setConversationInput}
              placeholder="Write your answer in English..."
              placeholderTextColor="#8A949E"
              multiline
            />
            <TouchableOpacity
              style={styles.conversationSendButton}
              onPress={sendConversationMessage}
            >
              <Text style={styles.conversationSendText}>Send →</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.restartConversationButton}
            onPress={() => {
              setConversationMessages([
                {
                  id: `coach-welcome-${Date.now()}`,
                  role: 'coach',
                  text: 'Hi! I am your LingoLoop speaking coach. How are you today?',
                  translation: 'سلام! من مربی مکالمه لینگولوپ هستم. امروز حالت چطور است؟',
                },
              ]);
              setConversationInput('');
            }}
          >
            <Text style={styles.restartConversationText}>↻ Start again</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
  if (screen === 'myWords') {
    return (
      <SafeAreaView style={styles.page}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity onPress={() => setScreen('home')}>
            <Text style={styles.backText}>← Home</Text>
          </TouchableOpacity>

          <Text style={styles.customEyebrow}>YOUR OWN ENGLISH</Text>
          <Text style={styles.pageTitle}>My Words & Sentences</Text>
          <Text style={styles.pageSubtitle}>
            Add anything you want to learn. It will be used in your future personal stories and exercises.
          </Text>

          <View style={styles.customFormCard}>
            <Text style={styles.customLabel}>What are you adding?</Text>
            <View style={styles.customChoiceRow}>
              {['Word', 'Sentence'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.customChoice,
                    customType === type && styles.customChoiceSelected,
                  ]}
                  onPress={() => setCustomType(type)}
                >
                  <Text
                    style={[
                      styles.customChoiceText,
                      customType === type && styles.customChoiceTextSelected,
                    ]}
                  >
                    {type === 'Word' ? 'Word' : 'Sentence'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.customLabel}>English</Text>
            <TextInput
              style={styles.customInput}
              value={customEnglish}
              onChangeText={setCustomEnglish}
              placeholder={customType === 'Word' ? 'e.g. confident' : 'e.g. I feel confident today.'}
              placeholderTextColor="#8A949E"
            />

            <Text style={styles.customLabel}>Persian meaning</Text>
            <TextInput
              style={[styles.customInput, styles.customPersianInput]}
              value={customPersian}
              onChangeText={setCustomPersian}
              placeholder="معنی فارسی را بنویسید"
              placeholderTextColor="#8A949E"
            />

            <Text style={styles.customLabel}>Difficulty</Text>
            <View style={styles.customDifficultyRow}>
              {['Easy', 'Medium', 'Hard'].map((difficulty) => (
                <TouchableOpacity
                  key={difficulty}
                  style={[
                    styles.customDifficultyButton,
                    difficulty === 'Easy' && styles.customEasy,
                    difficulty === 'Medium' && styles.customMedium,
                    difficulty === 'Hard' && styles.customHard,
                    customDifficulty === difficulty && styles.customDifficultySelected,
                  ]}
                  onPress={() => setCustomDifficulty(difficulty)}
                >
                  <Text style={styles.customDifficultyText}>{difficulty}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.customAddButton} onPress={addCustomItem}>
              <Text style={styles.customAddButtonText}>+ Add to My List</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.customListHeader}>
            <Text style={styles.savedSectionTitle}>My List</Text>
            <Text style={styles.customCount}>{customItems.length} items</Text>
          </View>

          {customItems.length === 0 ? (
            <View style={styles.customEmptyCard}>
              <Text style={styles.customEmptyIcon}>✍️</Text>
              <Text style={styles.customEmptyTitle}>Your list is ready</Text>
              <Text style={styles.customEmptyText}>
                Add your first word or sentence above.
              </Text>
            </View>
          ) : (
            customItems.map((item) => (
              <View key={item.id} style={styles.customItemCard}>
                <View style={styles.customItemTopRow}>
                  <Text style={styles.customTypeBadge}>{item.type}</Text>
                  <Text
                    style={[
                      styles.customDifficultyBadge,
                      item.difficulty === 'Easy' && styles.customEasyText,
                      item.difficulty === 'Medium' && styles.customMediumText,
                      item.difficulty === 'Hard' && styles.customHardText,
                    ]}
                  >
                    {item.difficulty}
                  </Text>
                </View>
                <Text style={styles.english}>{item.en}</Text>
                <Text style={styles.persian}>{item.fa}</Text>
                <TouchableOpacity onPress={() => removeCustomItem(item.id)}>
                  <Text style={styles.customRemove}>🗑 Remove</Text>
                </TouchableOpacity>
              </View>
            ))
          )}

          <BottomNav />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === 'saved') {
    return (
      <SafeAreaView style={styles.page}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.pageTitle}>Saved Sentences</Text>

          {savedSentences.length === 0 ? (
            <Text style={styles.empty}>No saved sentences yet.</Text>
          ) : (
          <>
      
      {easySaved.length > 0 && (
      <>
   <Text style={styles.savedSectionTitle}>Easy</Text>  
          
           {easySaved.map((sentence) => (
            
              <View key={sentence.id} style={styles.savedCard}>
                <Text style={styles.english}>{sentence.en}</Text>
                <Text style={styles.persian}>{sentence.fa}</Text>

                <Text style={[styles.savedDifficulty, { color: '#165DDB' }]}>
                  {levels[sentence.id] || 'Not rated'}
                </Text>
            <TouchableOpacity
  onPress={() => removeSavedSentence(sentence.id)}
>
  <Text>🗑 Remove</Text>
</TouchableOpacity>    
              </View>
            ))}
            </>
)}
{mediumSaved.length > 0 && (
  <>
      <Text style={styles.savedSectionTitle}>Medium</Text>
        {mediumSaved.map((sentence) => (
            <View key={sentence.id} style={styles.savedCard}>
            
            <Text style={styles.english}>{sentence.en}</Text>
            <Text style={styles.persian}>{sentence.fa}</Text>
     <Text style={[styles.savedDifficulty, { color: '#B8860B' }]}>
  {levels[sentence.id] || 'Not rated'}
</Text> 
<TouchableOpacity
  onPress={() => removeSavedSentence(sentence.id)}
>
  <Text>🗑 Remove</Text>
</TouchableOpacity>
</View>     
          ))}
          </>
)}

{hardSaved.length > 0 && (
  <>
    <Text style={styles.savedSectionTitle}>Hard</Text>

    {hardSaved.map((sentence) => (
      <View key={sentence.id} style={styles.savedCard}>
        <Text style={styles.english}>{sentence.en}</Text>

        <Text style={styles.persian}>{sentence.fa}</Text>

        <Text style={styles.savedDifficulty}>
          {levels[sentence.id] || 'Not rated'}
        </Text>

        <TouchableOpacity
          onPress={() => removeSavedSentence(sentence.id)}
        >
          <Text>🗑 Remove</Text>
        </TouchableOpacity>
      </View>
     ) )}
</>
)}
</>
)}
<BottomNav/>
</ScrollView>
</SafeAreaView>
);
}

  if (screen === 'review' && reviewLesson && reviewSentence) {
    const reviewInfo = getReviewInfo(reviewLessonId);

    return (
      <SafeAreaView style={styles.page}>
        <ScrollView contentContainerStyle={styles.container}>
          <TouchableOpacity onPress={() => setScreen('progress')}>
            <Text style={styles.backText}>← Review Schedule</Text>
          </TouchableOpacity>

          <Text style={styles.reviewEyebrow}>
            {reviewInfo.finished
              ? 'EXTRA PRACTICE'
              : `${reviewInfo.interval}-DAY REVIEW`}
          </Text>
          <Text style={styles.pageTitle}>{reviewLesson.title}</Text>
          <Text style={styles.pageSubtitle}>
            Read the sentence, remember its meaning, then continue.
          </Text>

          <Text style={styles.counter}>
            {reviewSentenceIndex + 1} / {reviewLesson.sentences.length}
          </Text>

          <View style={styles.sentenceCard}>
            <Text style={styles.english}>{reviewSentence.en}</Text>
            <Text style={styles.persian}>{reviewSentence.fa}</Text>
            <Text style={styles.reviewDifficulty}>
              Difficulty: {levels[reviewSentence.id] || 'Not rated'}
            </Text>
          </View>

          {!reviewInfo.isDue && !reviewInfo.finished && (
            <Text style={styles.earlyPracticeNote}>
              Early practice does not change your next review date.
            </Text>
          )}

          <TouchableOpacity
            style={styles.nextButton}
            onPress={nextReviewSentence}
          >
            <Text style={styles.nextText}>
              {reviewSentenceIndex === reviewLesson.sentences.length - 1
                ? 'Finish Review ✓'
                : 'Next →'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === 'progress') {
    return (
      <SafeAreaView style={styles.page}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.pageTitle}>Your Progress</Text>

          <View style={styles.bigStatCard}>
            <Text style={styles.bigStatNumber}>{practicedCount}</Text>
            <Text style={styles.bigStatLabel}>Sentences Practiced</Text>
          </View>

          <View style={styles.bigStatCard}>
            <Text style={styles.bigStatNumber}>{saved.length}</Text>
            <Text style={styles.bigStatLabel}>Saved Sentences</Text>
          </View>

          <View style={styles.bigStatCard}>
            <Text style={styles.bigStatNumber}>
              {completedLessons.length}
            </Text>
            <Text style={styles.bigStatLabel}>Completed Lessons</Text>
          </View>

          <Text style={styles.reviewSectionTitle}>Review Schedule</Text>
          <Text style={styles.reviewSectionSubtitle}>
            Default reviews are after 3, 7, 10, 14, and 30 days. Add more days whenever you want.
          </Text>

          <View style={styles.addReviewCard}>
            <Text style={styles.addReviewTitle}>Add another review day</Text>
            <Text style={styles.addReviewHint}>
              Choose any day you want. Your schedule sorts automatically.
            </Text>
            <View style={styles.customDaysRow}>
              {reviewIntervals.map((day) => (
                <TouchableOpacity
                  key={day}
                  style={styles.customDayChip}
                  onPress={() => removeReviewDay(day)}
                >
                  <Text style={styles.customDayText}>{day}d  ×</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.addReviewRow}>
              <TextInput
                style={styles.reviewDayInput}
                value={customReviewDay}
                onChangeText={setCustomReviewDay}
                placeholder="Example: 60"
                keyboardType="number-pad"
                maxLength={4}
              />
              <TouchableOpacity
                style={styles.addReviewButton}
                onPress={addCustomReviewDay}
              >
                <Text style={styles.addReviewButtonText}>Add Day +</Text>
              </TouchableOpacity>
            </View>
          </View>

          {reviewItems.length === 0 ? (
            <View style={styles.reviewEmptyCard}>
              <Text style={styles.reviewEmptyIcon}>🗓️</Text>
              <Text style={styles.reviewEmptyTitle}>No reviews scheduled yet</Text>
              <Text style={styles.reviewEmptyText}>
                Finish a lesson and its first review will be scheduled in 3 days.
              </Text>
            </View>
          ) : (
            reviewItems.map(({ lesson, info }) => (
              <View key={lesson.id} style={styles.reviewCard}>
                <View style={styles.reviewCardHeader}>
                  <View style={styles.reviewCardText}>
                    <Text style={styles.reviewLessonTitle}>{lesson.title}</Text>
                    <Text style={styles.reviewDateText}>
                      {info.finished
                        ? 'All scheduled reviews completed'
                        : `${info.interval}-day review • ${formatReviewDate(
                            info.dueDate
                          )}`}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.reviewStatus,
                      info.isDue && styles.reviewStatusDue,
                      info.finished && styles.reviewStatusDone,
                    ]}
                  >
                    {info.finished ? 'Done' : info.isDue ? 'Due' : 'Upcoming'}
                  </Text>
                </View>

                <View style={styles.reviewSteps}>
                  {reviewIntervals.map((days) => (
                    <View
                      key={days}
                      style={[
                        styles.reviewStep,
                        reviewSchedules[lesson.id].completedIntervals.includes(
                          days
                        ) && styles.reviewStepDone,
                      ]}
                    >
                      <Text style={styles.reviewStepText}>{days}d</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.reviewButton}
                  onPress={() => startReview(lesson.id)}
                >
                  <Text style={styles.reviewButtonText}>
                    {info.finished
                      ? 'Practice Again'
                      : info.isDue
                      ? 'Review Now →'
                      : 'Practice Early →'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          )}

          <BottomNav />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoRow}>
          <Text style={styles.logoLingo}>Lingo</Text>
          <Text style={styles.logoLoop}>Loop.</Text>
        </View>

        <Text style={styles.tagline}>Learn. Practice. Repeat.</Text>

        <View style={styles.hero}>
          <Text style={styles.hello}>Good evening 👋</Text>
          <Text style={styles.subtitle}>
            Ready for your English today?
          </Text>
        </View>

        <View style={styles.currentCard}>
          <Text style={styles.currentLabel}>CONTINUE LESSON</Text>

          <Text style={styles.currentTitle}>
            At a Coffee Shop ☕
          </Text>

          <Text style={styles.currentDescription}>
            Learn useful English sentences for everyday conversations.
          </Text>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => openLesson('beginner', 0)}
          >
            <Text style={styles.continueText}>
              Continue Lesson →
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Choose Your Level</Text>

        <LevelTabs />

        <Text style={styles.sectionTitle}>Your progress</Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>📘 {practicedCount}</Text>
            <Text style={styles.statLabel}>Practiced</Text>
          </View>

          <TouchableOpacity
            style={styles.statCard}
            onPress={() => setScreen('saved')}
          >
            <Text style={styles.statNumber}>♥ {saved.length}</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.statCard}
            onPress={() => setScreen('progress')}
          >
            <Text style={styles.statNumber}>
              🏆 {completedLessons.length}
            </Text>
            <Text style={styles.statLabel}>Completed</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.savedShortcut}
          onPress={() => setScreen('saved')}
        >
          <Text style={styles.savedShortcutText}>
            ♥ Saved Sentences
          </Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.customHomeShortcut}
          onPress={() => setScreen('myWords')}
        >
          <View style={styles.customHomeIconWrap}>
            <Text style={styles.customHomeIcon}>✍️</Text>
          </View>
          <View style={styles.customHomeTextWrap}>
            <Text style={styles.customHomeTitle}>My Words & Sentences</Text>
            <Text style={styles.customHomeSubtitle}>
              Add your own English • {customItems.length} saved
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

<TouchableOpacity
  style={styles.customHomeShortcut}
  onPress={() => setScreen('practiceStory')}
>
  <View style={styles.customHomeIconWrap}>
    <Text style={styles.customHomeIcon}>📖</Text>
  </View>

  <View style={styles.customHomeTextWrap}>
    <Text style={styles.customHomeTitle}>Practice Story</Text>
    <Text style={styles.customHomeSubtitle}>
      Practice with your saved English
    </Text>
  </View>

  <Text style={styles.arrow}>›</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.customHomeShortcut}
  onPress={() => setScreen('conversation')}
>
  <View style={[styles.customHomeIconWrap, styles.conversationHomeIconWrap]}>
    <Text style={styles.customHomeIcon}>💬</Text>
  </View>
  <View style={styles.customHomeTextWrap}>
    <Text style={styles.customHomeTitle}>Conversation Coach</Text>
    <Text style={styles.customHomeSubtitle}>
      Practice a guided English conversation
    </Text>
  </View>
  <Text style={styles.arrow}>›</Text>
</TouchableOpacity>
        <BottomNav />


      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#D9EEFF',
  },
  savedSectionTitle: {
  fontSize: 22,
  fontWeight: '800',
  color: '#2F63D8',
  marginTop: 12,
  marginBottom: 8,
},

  container: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 40,
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoLingo: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FF7A1A',
    letterSpacing: -2,
  },

  logoLoop: {
    fontSize: 42,
    fontWeight: '800',
    color: '#165DDB',
    letterSpacing: -2,
  },

  tagline: {
    marginTop: 2,
    color: '#68717B',
    fontSize: 16,
  },

  hero: {
    marginTop: 35,
  },

  hello: {
    fontSize: 30,
    fontWeight: '800',
    color: '#141414',
  },

  subtitle: {
    marginTop: 8,
    fontSize: 17,
    color: '#68717B',
  },

  currentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 22,
    marginTop: 28,
  },

  currentLabel: {
    color: '#68717B',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  currentTitle: {
    fontSize: 27,
    fontWeight: '800',
    marginTop: 8,
    color: '#111111',
  },

  currentDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#68717B',
    marginTop: 10,
  },

  continueButton: {
    backgroundColor: '#FF7A1A',
    borderRadius: 18,
    paddingVertical: 16,
    marginTop: 20,
    alignItems: 'center',
  },

  continueText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 30,
    marginBottom: 15,
    color: '#111111',
  },

  levelTabs: {
    flexDirection: 'row',
    gap: 10,
  },

  levelTab: {
    flex: 1,
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 10,
    alignItems: 'center',
  },

  beginnerTab: {
    backgroundColor: '#EAF5FF',
  },

  intermediateTab: {
    backgroundColor: '#FFF5C9',
  },

  advancedTab: {
    backgroundColor: '#FFE4D3',
  },

  beginnerSelected: {
    borderWidth: 2,
    borderColor: '#2588FF',
  },

  intermediateSelected: {
    borderWidth: 2,
    borderColor: '#E6B800',
  },

  advancedSelected: {
    borderWidth: 2,
    borderColor: '#FF7A1A',
  },

  levelIcon: {
    fontSize: 28,
  },

  levelTabTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 8,
    color: '#111111',
  },

  levelTabSub: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    color: '#68717B',
  },

  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
  },

  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111111',
  },

  statLabel: {
    fontSize: 13,
    color: '#68717B',
    marginTop: 5,
  },

  savedShortcut: {
    marginTop: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  savedShortcutText: {
    fontSize: 17,
    fontWeight: '800',
  },

  bottomNav: {
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  navText: {
    textAlign: 'center',
    fontSize: 22,
    color: '#68717B',
  },

  navActive: {
    textAlign: 'center',
    fontSize: 22,
    color: '#165DDB',
  },

  navLabel: {
    textAlign: 'center',
    fontSize: 12,
    color: '#68717B',
  },

  navActiveLabel: {
    textAlign: 'center',
    fontSize: 12,
    color: '#165DDB',
    fontWeight: '800',
  },

  pageTitle: {
    marginTop: 28,
    fontSize: 32,
    fontWeight: '800',
    color: '#111111',
  },

  pageSubtitle: {
    fontSize: 17,
    color: '#68717B',
    marginTop: 6,
    marginBottom: 20,
  },

  lessonListCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  lessonListContent: {
    flex: 1,
  },

  lessonListNumber: {
    color: '#165DDB',
    fontSize: 14,
    fontWeight: '700',
  },

  lessonListTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: 4,
  },

  lessonListDescription: {
    fontSize: 14,
    color: '#68717B',
    marginTop: 4,
  },

  progressCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 5,
    borderColor: '#DCE7F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  progressCircleText: {
    color: '#165DDB',
    fontWeight: '800',
  },

  arrow: {
    fontSize: 28,
    marginLeft: 10,
    color: '#111111',
  },

  backText: {
    fontSize: 17,
    color: '#111111',
    marginBottom: 20,
  },

  lessonNumber: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: '#808080',
  },

  lessonTitle: {
    fontSize: 29,
    fontWeight: '800',
    marginTop: 8,
  },

  counter: {
    marginTop: 8,
    fontSize: 17,
    color: '#68717B',
  },

  sentenceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 24,
    marginTop: 22,
  },

  english: {
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 31,
    color: '#111111',
  },

  persian: {
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'right',
    color: '#68717B',
    marginTop: 16,
  },

  question: {
    fontSize: 19,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 28,
    marginBottom: 16,
  },

  difficultyRow: {
    flexDirection: 'row',
    gap: 10,
  },

  difficultyButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
  },

  easyButton: {
    backgroundColor: '#60B8FF',
  },

  mediumButton: {
    backgroundColor: '#FFD84D',
  },

  hardButton: {
    backgroundColor: '#FF7A1A',
  },

  easySelected: {
    borderWidth: 3,
    borderColor: '#165DDB',
  },

  mediumSelected: {
    borderWidth: 3,
    borderColor: '#C69B00',
  },

  hardSelected: {
    borderWidth: 3,
    borderColor: '#B94700',
  },

  difficultyText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111111',
  },

  saveButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 17,
    marginTop: 22,
    alignItems: 'center',
  },

  saveText: {
    fontSize: 17,
    fontWeight: '800',
  },

  nextButton: {
    backgroundColor: '#165DDB',
    borderRadius: 18,
    paddingVertical: 17,
    marginTop: 12,
    alignItems: 'center',
  },

  nextText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  savedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    marginTop: 6,
  },

  savedDifficulty: {
    marginTop: 12,
    color: '#FF7A1A',
    fontWeight: '800',
  },

  customEyebrow: {
    marginTop: 28,
    color: '#FF7A1A',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },

  customFormCard: {
    marginTop: 20,
    padding: 20,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
  },

  customLabel: {
    marginTop: 14,
    marginBottom: 8,
    color: '#141414',
    fontSize: 15,
    fontWeight: '800',
  },

  customChoiceRow: {
    flexDirection: 'row',
  },

  customChoice: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#D8DEE5',
    alignItems: 'center',
  },

  customChoiceSelected: {
    borderColor: '#165DDB',
    backgroundColor: '#E8F1FF',
  },

  customChoiceText: {
    color: '#68717B',
    fontSize: 15,
    fontWeight: '800',
  },

  customChoiceTextSelected: {
    color: '#165DDB',
  },

  customInput: {
    minHeight: 50,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#D8DEE5',
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    color: '#141414',
    fontSize: 16,
  },

  customPersianInput: {
    textAlign: 'right',
  },

  customDifficultyRow: {
    flexDirection: 'row',
  },

  customDifficultyButton: {
    flex: 1,
    marginRight: 7,
    paddingVertical: 12,
    borderWidth: 3,
    borderColor: 'transparent',
    borderRadius: 14,
    alignItems: 'center',
  },

  customEasy: { backgroundColor: '#83B7FF' },
  customMedium: { backgroundColor: '#FFD84D' },
  customHard: { backgroundColor: '#FF7A1A' },
  customDifficultySelected: { borderColor: '#141414' },
  customDifficultyText: { color: '#141414', fontWeight: '800' },

  customAddButton: {
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 17,
    backgroundColor: '#165DDB',
    alignItems: 'center',
  },

  customAddButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  customListHeader: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  customCount: {
    color: '#68717B',
    fontSize: 14,
    fontWeight: '700',
  },

  customEmptyCard: {
    marginTop: 12,
    padding: 24,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },

  customEmptyIcon: { fontSize: 32 },
  customEmptyTitle: {
    marginTop: 10,
    color: '#141414',
    fontSize: 18,
    fontWeight: '800',
  },
  customEmptyText: {
    marginTop: 6,
    color: '#68717B',
    fontSize: 14,
  },

  customItemCard: {
    marginTop: 12,
    padding: 20,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
  },

  customItemTopRow: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  customTypeBadge: {
    color: '#165DDB',
    fontSize: 13,
    fontWeight: '800',
  },

  customDifficultyBadge: { fontSize: 13, fontWeight: '800' },
  customEasyText: { color: '#165DDB' },
  customMediumText: { color: '#B8860B' },
  customHardText: { color: '#FF7A1A' },
  customRemove: { marginTop: 14, color: '#68717B' },

  customHomeShortcut: {
    marginTop: 14,
    padding: 18,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  customHomeIconWrap: {
    width: 46,
    height: 46,
    marginRight: 12,
    borderRadius: 15,
    backgroundColor: '#FFF0E5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  customHomeIcon: { fontSize: 23 },
  customHomeTextWrap: { flex: 1 },
  customHomeTitle: {
    color: '#141414',
    fontSize: 17,
    fontWeight: '800',
  },
  customHomeSubtitle: {
    marginTop: 4,
    color: '#68717B',
    fontSize: 13,
  },

  conversationHomeIconWrap: {
    backgroundColor: '#E8F1FF',
  },

  conversationEyebrow: {
    marginTop: 28,
    color: '#165DDB',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },

  conversationTip: {
    marginBottom: 18,
    padding: 18,
    borderRadius: 20,
    backgroundColor: '#FFF0E5',
  },

  conversationTipTitle: {
    color: '#FF7A1A',
    fontSize: 14,
    fontWeight: '800',
  },

  conversationTipText: {
    marginTop: 5,
    color: '#39424C',
    fontSize: 14,
    lineHeight: 21,
  },

  chatBubble: {
    maxWidth: '88%',
    marginBottom: 12,
    padding: 16,
    borderRadius: 20,
  },

  coachBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 6,
  },

  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#165DDB',
    borderBottomRightRadius: 6,
  },

  chatRole: {
    marginBottom: 7,
    color: '#FF7A1A',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },

  chatText: {
    color: '#141414',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 23,
  },

  userChatText: {
    color: '#FFFFFF',
  },

  chatTranslation: {
    marginTop: 9,
    color: '#68717B',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'right',
  },

  conversationComposer: {
    marginTop: 8,
    padding: 14,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
  },

  conversationInput: {
    minHeight: 70,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#D8DEE5',
    borderRadius: 15,
    backgroundColor: '#F8FAFC',
    color: '#141414',
    fontSize: 16,
    textAlignVertical: 'top',
  },

  conversationSendButton: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 15,
    backgroundColor: '#FF7A1A',
    alignItems: 'center',
  },

  conversationSendText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  restartConversationButton: {
    marginTop: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },

  restartConversationText: {
    color: '#165DDB',
    fontSize: 14,
    fontWeight: '800',
  },

  empty: {
    fontSize: 17,
    color: '#68717B',
    marginTop: 20,
  },

  bigStatCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 24,
    marginTop: 16,
  },

  bigStatNumber: {
    fontSize: 36,
    fontWeight: '800',
    color: '#165DDB',
  },

  bigStatLabel: {
    fontSize: 17,
    color: '#68717B',
    marginTop: 6,
  },

  reviewSectionTitle: {
    marginTop: 34,
    fontSize: 26,
    fontWeight: '800',
    color: '#141414',
  },

  reviewSectionSubtitle: {
    marginTop: 7,
    marginBottom: 4,
    fontSize: 15,
    lineHeight: 22,
    color: '#68717B',
  },

  addReviewCard: {
    marginTop: 16,
    padding: 18,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },

  addReviewTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#141414',
  },

  addReviewHint: {
    marginTop: 5,
    fontSize: 13,
    color: '#68717B',
  },

  customDaysRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },

  customDayChip: {
    marginRight: 8,
    marginBottom: 8,
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#E8F1FF',
  },

  customDayText: {
    color: '#165DDB',
    fontSize: 13,
    fontWeight: '800',
  },

  addReviewRow: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginTop: 14,
  },

  reviewDayInput: {
   width: '100%',
    height: 48,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#D8DEE5',
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    fontSize: 16,
    color: '#141414',
  },

  addReviewButton: {
    height: 48,
    marginTop: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: '#165DDB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addReviewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  reviewEmptyCard: {
    marginTop: 16,
    padding: 24,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },

  reviewEmptyIcon: {
    fontSize: 30,
  },

  reviewEmptyTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '800',
    color: '#141414',
  },

  reviewEmptyText: {
    marginTop: 7,
    fontSize: 14,
    lineHeight: 21,
    color: '#68717B',
    textAlign: 'center',
  },

  reviewCard: {
    marginTop: 16,
    padding: 20,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
  },

  reviewCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  reviewCardText: {
    flex: 1,
    paddingRight: 10,
  },

  reviewLessonTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#141414',
  },

  reviewDateText: {
    marginTop: 5,
    fontSize: 14,
    color: '#68717B',
  },

  reviewStatus: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#E8F1FF',
    color: '#165DDB',
    fontSize: 12,
    fontWeight: '800',
  },

  reviewStatusDue: {
    backgroundColor: '#FFF0E5',
    color: '#B94700',
  },

  reviewStatusDone: {
    backgroundColor: '#E8F7EE',
    color: '#237A45',
  },

  reviewSteps: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 18,
  },

  reviewStep: {
    minWidth: 46,
    marginRight: 8,
    marginBottom: 8,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#EEF1F4',
    alignItems: 'center',
  },

  reviewStepDone: {
    backgroundColor: '#BFE9CF',
  },

  reviewStepText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#39424C',
  },

  reviewButton: {
    marginTop: 18,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#FF7A1A',
    alignItems: 'center',
  },

  reviewButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  reviewEyebrow: {
    marginTop: 32,
    color: '#FF7A1A',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },

  reviewDifficulty: {
    marginTop: 18,
    color: '#68717B',
    fontSize: 14,
    fontWeight: '700',
  },

  earlyPracticeNote: {
    marginTop: 14,
    paddingHorizontal: 4,
    color: '#68717B',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});

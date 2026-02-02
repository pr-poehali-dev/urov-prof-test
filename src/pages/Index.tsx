import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Question {
  id: number;
  text: string;
  options: { value: string; label: string; profession: string[] }[];
}

interface University {
  name: string;
  city: string;
  specialties: string[];
}

const questions: Question[] = [
  {
    id: 1,
    text: 'Что вам интереснее?',
    options: [
      { value: 'people', label: 'Работа с людьми и помощь им', profession: ['medical'] },
      { value: 'tech', label: 'Технологии и инновации', profession: ['it', 'engineering'] },
      { value: 'analysis', label: 'Анализ данных и исследования', profession: ['it', 'medical'] },
      { value: 'creative', label: 'Творчество и создание нового', profession: ['engineering', 'it'] },
    ],
  },
  {
    id: 2,
    text: 'Какие предметы вам нравятся больше?',
    options: [
      { value: 'bio', label: 'Биология и химия', profession: ['medical'] },
      { value: 'math', label: 'Математика и физика', profession: ['it', 'engineering'] },
      { value: 'info', label: 'Информатика', profession: ['it'] },
      { value: 'mix', label: 'Все точные науки', profession: ['engineering', 'it'] },
    ],
  },
  {
    id: 3,
    text: 'Где вы видите себя в будущем?',
    options: [
      { value: 'hospital', label: 'В больнице или клинике', profession: ['medical'] },
      { value: 'office', label: 'В IT-компании или стартапе', profession: ['it'] },
      { value: 'lab', label: 'В лаборатории или на производстве', profession: ['engineering', 'medical'] },
      { value: 'remote', label: 'Удаленная работа из любой точки', profession: ['it'] },
    ],
  },
  {
    id: 4,
    text: 'Что вас больше мотивирует?',
    options: [
      { value: 'help', label: 'Помогать людям и спасать жизни', profession: ['medical'] },
      { value: 'solve', label: 'Решать сложные технические задачи', profession: ['it', 'engineering'] },
      { value: 'create', label: 'Создавать что-то новое и инновационное', profession: ['engineering', 'it'] },
      { value: 'research', label: 'Проводить исследования и эксперименты', profession: ['medical', 'engineering'] },
    ],
  },
  {
    id: 5,
    text: 'Какая работа вам ближе?',
    options: [
      { value: 'hands', label: 'Практическая работа руками', profession: ['medical', 'engineering'] },
      { value: 'computer', label: 'Работа за компьютером', profession: ['it'] },
      { value: 'team', label: 'Работа в команде над проектами', profession: ['it', 'engineering'] },
      { value: 'patient', label: 'Индивидуальная работа с пациентами', profession: ['medical'] },
    ],
  },
  {
    id: 6,
    text: 'Что для вас важнее в профессии?',
    options: [
      { value: 'impact', label: 'Социальная значимость и помощь обществу', profession: ['medical'] },
      { value: 'innovation', label: 'Инновации и технологический прогресс', profession: ['it', 'engineering'] },
      { value: 'salary', label: 'Высокий доход и карьерный рост', profession: ['it'] },
      { value: 'stability', label: 'Стабильность и востребованность', profession: ['medical', 'engineering'] },
    ],
  },
  {
    id: 7,
    text: 'Какие навыки у вас развиты лучше?',
    options: [
      { value: 'empathy', label: 'Эмпатия и понимание людей', profession: ['medical'] },
      { value: 'logic', label: 'Логическое и алгоритмическое мышление', profession: ['it'] },
      { value: 'spatial', label: 'Пространственное воображение', profession: ['engineering'] },
      { value: 'detail', label: 'Внимание к деталям и точность', profession: ['medical', 'engineering', 'it'] },
    ],
  },
  {
    id: 8,
    text: 'Как вы относитесь к обучению?',
    options: [
      { value: 'long', label: 'Готов учиться долго (6+ лет)', profession: ['medical'] },
      { value: 'self', label: 'Предпочитаю самообучение и онлайн-курсы', profession: ['it'] },
      { value: 'practice', label: 'Важна практика и стажировки', profession: ['engineering', 'medical'] },
      { value: 'continuous', label: 'Постоянно изучаю новые технологии', profession: ['it', 'engineering'] },
    ],
  },
  {
    id: 9,
    text: 'Какая рабочая среда вам подходит?',
    options: [
      { value: 'clinic', label: 'Больница, клиника, лаборатория', profession: ['medical'] },
      { value: 'startup', label: 'Стартап или IT-компания', profession: ['it'] },
      { value: 'factory', label: 'Производство, завод, НИИ', profession: ['engineering'] },
      { value: 'hybrid', label: 'Гибридный формат работы', profession: ['it', 'engineering'] },
    ],
  },
  {
    id: 10,
    text: 'Какой проект вас больше вдохновляет?',
    options: [
      { value: 'cure', label: 'Разработка нового метода лечения', profession: ['medical'] },
      { value: 'app', label: 'Создание мобильного приложения', profession: ['it'] },
      { value: 'robot', label: 'Проектирование робота или механизма', profession: ['engineering'] },
      { value: 'ai', label: 'Искусственный интеллект и big data', profession: ['it'] },
    ],
  },
];

const professions = {
  medical: {
    title: 'Медицинские специальности',
    icon: 'Heart',
    careers: ['Врач-терапевт', 'Хирург', 'Фармацевт', 'Медицинский исследователь'],
    exams: ['Биология', 'Химия', 'Русский язык'],
    description: 'Помогайте людям, спасайте жизни и развивайте здравоохранение',
  },
  it: {
    title: 'IT и программирование',
    icon: 'Code',
    careers: ['Разработчик ПО', 'Data Scientist', 'DevOps инженер', 'Архитектор систем'],
    exams: ['Математика', 'Информатика', 'Русский язык'],
    description: 'Создавайте технологии будущего и цифровые решения',
  },
  engineering: {
    title: 'Инженерные специальности',
    icon: 'Cog',
    careers: ['Инженер-конструктор', 'Робототехник', 'Промышленный инженер', 'Технолог'],
    exams: ['Математика', 'Физика', 'Русский язык'],
    description: 'Проектируйте и создавайте инновационные решения',
  },
};

const universities: { [key: string]: University[] } = {
  medical: [
    { 
      name: 'Уральский государственный медицинский университет (УГМУ)', 
      city: 'Екатеринбург', 
      specialties: ['Лечебное дело', 'Педиатрия', 'Стоматология', 'Фармация', 'Медицинская биохимия'] 
    },
    { 
      name: 'Пермский государственный медицинский университет им. Вагнера', 
      city: 'Пермь', 
      specialties: ['Лечебное дело', 'Педиатрия', 'Стоматология', 'Медико-профилактическое дело'] 
    },
    { 
      name: 'Тюменский государственный медицинский университет', 
      city: 'Тюмень', 
      specialties: ['Лечебное дело', 'Педиатрия', 'Фармация'] 
    },
    { 
      name: 'Южно-Уральский государственный медицинский университет', 
      city: 'Челябинск', 
      specialties: ['Лечебное дело', 'Педиатрия', 'Фармация', 'Стоматология'] 
    },
  ],
  it: [
    { 
      name: 'Уральский федеральный университет (УрФУ)', 
      city: 'Екатеринбург', 
      specialties: ['Программная инженерия', 'Информатика и ВТ', 'Прикладная математика и информатика', 'Информационные системы и технологии'] 
    },
    { 
      name: 'Уральский государственный университет путей сообщения', 
      city: 'Екатеринбург', 
      specialties: ['Информационные системы и технологии', 'Прикладная информатика'] 
    },
    { 
      name: 'Пермский национальный исследовательский политехнический университет (ПНИПУ)', 
      city: 'Пермь', 
      specialties: ['Информатика и ВТ', 'Прикладная информатика', 'Программная инженерия'] 
    },
    { 
      name: 'Южно-Уральский государственный университет (ЮУрГУ)', 
      city: 'Челябинск', 
      specialties: ['Программная инженерия', 'Информационные системы', 'Прикладная математика'] 
    },
    { 
      name: 'Тюменский государственный университет', 
      city: 'Тюмень', 
      specialties: ['Программная инженерия', 'Информатика и ВТ', 'Прикладная информатика'] 
    },
    { 
      name: 'Уральский государственный экономический университет (УрГЭУ)', 
      city: 'Екатеринбург', 
      specialties: ['Прикладная информатика', 'Бизнес-информатика'] 
    },
  ],
  engineering: [
    { 
      name: 'Уральский федеральный университет (УрФУ)', 
      city: 'Екатеринбург', 
      specialties: ['Машиностроение', 'Мехатроника и робототехника', 'Автоматизация технологических процессов', 'Техническая физика'] 
    },
    { 
      name: 'Уральский государственный горный университет (УГГУ)', 
      city: 'Екатеринбург', 
      specialties: ['Горное дело', 'Технологические машины и оборудование', 'Металлургия'] 
    },
    { 
      name: 'Пермский национальный исследовательский политехнический университет (ПНИПУ)', 
      city: 'Пермь', 
      specialties: ['Машиностроение', 'Авиастроение', 'Технологические машины', 'Ракетные комплексы'] 
    },
    { 
      name: 'Южно-Уральский государственный университет (ЮУрГУ)', 
      city: 'Челябинск', 
      specialties: ['Робототехника', 'Мехатроника', 'Машиностроение', 'Автоматизация'] 
    },
    { 
      name: 'Магнитогорский государственный технический университет', 
      city: 'Магнитогорск', 
      specialties: ['Металлургия', 'Машиностроение', 'Автоматизация'] 
    },
    { 
      name: 'Тюменский индустриальный университет', 
      city: 'Тюмень', 
      specialties: ['Нефтегазовое дело', 'Технологические машины', 'Автоматизация'] 
    },
  ],
};

export default function Index() {
  const [currentView, setCurrentView] = useState<'home' | 'test' | 'results' | 'universities' | 'about'>('home');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [selectedProfession, setSelectedProfession] = useState<string>('');

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const professionScores: { [key: string]: number } = {
      medical: 0,
      it: 0,
      engineering: 0,
    };

    Object.values(answers).forEach((answer) => {
      questions.forEach((q) => {
        const option = q.options.find((opt) => opt.value === answer);
        if (option) {
          option.profession.forEach((prof) => {
            professionScores[prof] = (professionScores[prof] || 0) + 1;
          });
        }
      });
    });

    const topProfession = Object.entries(professionScores).sort(([, a], [, b]) => b - a)[0][0];
    setSelectedProfession(topProfession);
    setCurrentView('results');
  };

  const startTest = () => {
    setCurrentView('test');
    setCurrentQuestion(0);
    setAnswers({});
  };

  const restartTest = () => {
    setCurrentView('home');
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedProfession('');
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="GraduationCap" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-primary">ПрофНавигатор</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <button
                onClick={() => setCurrentView('home')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Главная
              </button>
              <button
                onClick={() => setCurrentView('test')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Тест
              </button>
              <button
                onClick={() => setCurrentView('universities')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Университеты
              </button>
              <button
                onClick={() => setCurrentView('about')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                О проекте
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {currentView === 'home' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4 text-gray-900">
                Найди свою профессию будущего
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Пройди тест и узнай, какая специальность подходит именно тебе
              </p>
              <Button onClick={startTest} size="lg" className="text-lg px-8 py-6">
                Начать тест
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-16">
              {Object.entries(professions).map(([key, prof]) => (
                <Card key={key} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                      <Icon name={prof.icon as any} size={24} className="text-primary" />
                    </div>
                    <CardTitle>{prof.title}</CardTitle>
                    <CardDescription>{prof.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium text-gray-700 mb-2">Нужно сдавать:</p>
                    <div className="flex flex-wrap gap-2">
                      {prof.exams.map((exam) => (
                        <span
                          key={exam}
                          className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full"
                        >
                          {exam}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentView === 'test' && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-2xl">
                    Вопрос {currentQuestion + 1} из {questions.length}
                  </CardTitle>
                  <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="mb-4" />
                <CardDescription className="text-lg">
                  {questions[currentQuestion].text}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={answers[questions[currentQuestion].id] || ''}
                  onValueChange={handleAnswer}
                  className="space-y-4"
                >
                  {questions[currentQuestion].options.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                  >
                    <Icon name="ChevronLeft" size={16} className="mr-2" />
                    Назад
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!answers[questions[currentQuestion].id]}
                  >
                    {currentQuestion === questions.length - 1 ? 'Получить результат' : 'Далее'}
                    <Icon name="ChevronRight" size={16} className="ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentView === 'results' && selectedProfession && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name={professions[selectedProfession as keyof typeof professions].icon as any} size={32} className="text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl">
                      {professions[selectedProfession as keyof typeof professions].title}
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Вам подходит это направление!
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Профессии:</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {professions[selectedProfession as keyof typeof professions].careers.map((career) => (
                        <div key={career} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <Icon name="CheckCircle2" size={20} className="text-green-600" />
                          <span>{career}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Предметы ЕГЭ:</h3>
                    <div className="flex flex-wrap gap-3">
                      {professions[selectedProfession as keyof typeof professions].exams.map((exam) => (
                        <span
                          key={exam}
                          className="px-4 py-2 bg-primary text-white rounded-lg font-medium"
                        >
                          {exam}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Университеты Урала:</h3>
                    <div className="space-y-4">
                      {universities[selectedProfession].map((uni, idx) => (
                        <Card key={idx}>
                          <CardHeader>
                            <CardTitle className="text-xl">{uni.name}</CardTitle>
                            <CardDescription className="flex items-center gap-2">
                              <Icon name="MapPin" size={16} />
                              {uni.city}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-600 mb-2">Специальности:</p>
                            <div className="flex flex-wrap gap-2">
                              {uni.specialties.map((spec) => (
                                <span
                                  key={spec}
                                  className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full"
                                >
                                  {spec}
                                </span>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <Button onClick={restartTest} variant="outline">
                    <Icon name="RotateCcw" size={16} className="mr-2" />
                    Пройти тест заново
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentView === 'universities' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold mb-8">Университеты Урала</h2>
            {Object.entries(universities).map(([category, unis]) => (
              <div key={category} className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name={professions[category as keyof typeof professions].icon as any} size={24} className="text-primary" />
                  {professions[category as keyof typeof professions].title}
                </h3>
                <div className="space-y-4">
                  {unis.map((uni, idx) => (
                    <Card key={idx}>
                      <CardHeader>
                        <CardTitle>{uni.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Icon name="MapPin" size={16} />
                          {uni.city}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {uni.specialties.map((spec) => (
                            <span
                              key={spec}
                              className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {currentView === 'about' && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">О проекте</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong>ПрофНавигатор</strong> — это платформа для помощи школьникам в выборе будущей профессии.
                </p>
                <p>
                  Мы помогаем определить склонности к различным направлениям деятельности и подбираем подходящие
                  учебные заведения Урала.
                </p>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Направления:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Медицинские специальности</li>
                    <li>IT и программирование</li>
                    <li>Инженерные специальности</li>
                  </ul>
                </div>
                <p>
                  Наш тест анализирует ваши интересы и предпочтения, чтобы предложить наиболее подходящие варианты
                  профессионального развития.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-20 py-8 bg-white">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 ПрофНавигатор. Помогаем выбрать профессию будущего на Урале</p>
        </div>
      </footer>
    </div>
  );
}
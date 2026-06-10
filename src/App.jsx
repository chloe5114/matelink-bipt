import { useEffect, useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  BadgeCheck,
  BellRing,
  Bot,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  FilePlus2,
  Flame,
  GraduationCap,
  HandCoins,
  Home,
  LayoutDashboard,
  LockKeyhole,
  LogIn,
  Paperclip,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Trophy,
  UploadCloud,
  Users,
  WalletCards,
  WandSparkles,
  X,
  Zap,
} from 'lucide-react'
import './App.css'

const schoolLogo = '/brand/school-logo.png'
const platformLogo = '/brand/matelink-logo.png'

const pages = [
  { id: 'home', label: '校内认证', icon: Home },
  { id: 'lobby', label: '组队大厅', icon: Trophy },
  { id: 'contract', label: '契约中心', icon: LockKeyhole },
  { id: 'chat', label: 'AI监工', icon: Bot },
  { id: 'dashboard', label: '数据看板', icon: LayoutDashboard },
  { id: 'pitch', label: '答辩模式', icon: Rocket },
]

const baseTasks = [
  {
    id: 1,
    title: '互联网+低空经济创新项目',
    owner: 'Chloe',
    need: '缺无人机代码',
    skill: 'Python / CV',
    progress: 3,
    total: 4,
    deposit: 20,
    score: 96,
    tone: 'cyan',
    tags: ['低空经济', '视觉识别', '路演冲刺'],
  },
  {
    id: 2,
    title: '数智校园可信协作平台',
    owner: '张同学',
    need: '缺PPT手',
    skill: '路演 / 视觉',
    progress: 2,
    total: 4,
    deposit: 30,
    score: 93,
    tone: 'blue',
    tags: ['UI展示', '问卷支撑', '校内孵化'],
  },
  {
    id: 3,
    title: '挑战杯乡村振兴调研',
    owner: 'Mia',
    need: '缺问卷分析',
    skill: 'SPSS / 图表',
    progress: 4,
    total: 5,
    deposit: 25,
    score: 91,
    tone: 'green',
    tags: ['调研报告', '统计建模', '访谈纪要'],
  },
  {
    id: 4,
    title: 'AI 课程大作业智能客服',
    owner: '李同学',
    need: '缺产品经理',
    skill: 'PRD / 原型',
    progress: 1,
    total: 3,
    deposit: 50,
    score: 98,
    tone: 'orange',
    tags: ['Prompt', 'RAG', '原型验收'],
  },
]

const baseApplicants = [
  { name: '林同学', type: 'INFJ', skill: 'PPT视觉与路演', match: 97, status: 'AI强推' },
  { name: '王同学', type: 'ISTJ', skill: '进度拆解与文档', match: 94, status: '稳定交付' },
  { name: '赵同学', type: 'INTP', skill: '算法调参', match: 89, status: '技术补位' },
]

const milestones = [
  { time: '18:00', title: '完成需求确认', state: '已打卡', owner: 'Chloe' },
  { time: '20:30', title: '代码模块提交', state: '已预审', owner: '李同学' },
  { time: '22:00', title: 'PPT 初稿', state: 'AI催办中', owner: '张同学' },
  { time: '23:30', title: '汇报彩排', state: '待开始', owner: '全员' },
]

const surveyData = [
  { name: '担心队友划水', value: 76, color: '#2563eb' },
  { name: '痛点来自大作业', value: 60, color: '#14b8a6' },
  { name: '愿意使用对赌机制', value: 68, color: '#f97316' },
  { name: '希望AI自动催进度', value: 82, color: '#8b5cf6' },
]

const painData = [
  { label: '划水', value: 76 },
  { label: '沟通慢', value: 58 },
  { label: '能力不匹配', value: 54 },
  { label: 'DDL失控', value: 69 },
]

const reliabilityTrend = [
  { day: '周一', score: 88 },
  { day: '周二', score: 91 },
  { day: '周三', score: 92 },
  { day: '周四', score: 95 },
  { day: '周五', score: 98 },
]

const chatMessages = [
  {
    sender: 'Chloe',
    meta: '队长 / ENTP',
    text: '兄弟们，爆肝 PPT 的时候到了，DDL 还有 6 小时！',
    mine: false,
  },
  {
    sender: '李同学',
    meta: '技术独行侠 / INTJ',
    text: '我把核心模块代码和测试截图传上来了，接口文档也同步了。',
    mine: true,
  },
  {
    sender: 'AI虚拟合伙人',
    meta: '智能监工',
    text: '检测到李同学已提交模块代码，多模态质量预审通过，靠谱分 +1。@Chloe 队长，当前进度已达 75%，但距离最终 DDL 仅剩 6 小时，AI 已自动生成汇报大纲草稿。',
    ai: true,
  },
]

const initialNotifications = [
  { id: 1, title: 'AI监工在线', text: '今天已自动提醒 3 个关键节点。', time: '刚刚', unread: true },
  { id: 2, title: '画像同步完成', text: '已同步 GPA、竞赛经历、历史靠谱分。', time: '2分钟前', unread: true },
]

function getInitialPage() {
  const hash = window.location.hash.replace('#', '')
  return pages.some((page) => page.id === hash) ? hash : 'home'
}

function App() {
  const [page, setPage] = useState(getInitialPage)
  const [user, setUser] = useState(null)
  const [tasks, setTasks] = useState(baseTasks)
  const [applications, setApplications] = useState([])
  const [contracts, setContracts] = useState([])
  const [notifications, setNotifications] = useState(initialNotifications)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [publishOpen, setPublishOpen] = useState(false)
  const [applyTask, setApplyTask] = useState(null)
  const [matching, setMatching] = useState(false)
  const [contractLocked, setContractLocked] = useState(false)
  const [toast, setToast] = useState('AI监工在线：今天已自动提醒 3 个关键节点')
  const [progress, setProgress] = useState(75)

  useEffect(() => {
    const timer = setInterval(() => {
      const text = '@张同学 距离 PPT 提交还有 4 小时，请尽快打卡！'
      setToast((current) =>
        current.includes('4小时') ? 'AI监工在线：李同学代码预审通过，团队靠谱分 +1' : text,
      )
      setNotifications((current) => [
        {
          id: Date.now(),
          title: 'AI监工提醒',
          text,
          time: '刚刚',
          unread: true,
        },
        ...current.slice(0, 5),
      ])
    }, 7600)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    window.history.replaceState(null, '', `#${page}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  const pool = useMemo(() => (contractLocked ? 80 + contracts.length * 20 : contracts.length * 20), [contractLocked, contracts])

  const notify = (title, text) => {
    setToast(`${title}：${text}`)
    setNotifications((current) => [
      { id: Date.now(), title, text, time: '刚刚', unread: true },
      ...current.slice(0, 7),
    ])
  }

  const handleLogin = () => {
    const mockUser = {
      name: 'Chloe',
      studentId: `2024${Math.floor(100000 + Math.random() * 899999)}`,
      email: '2024xxxxxx@bipt.edu.cn',
      mbti: 'ENTP',
      gpa: '3.8',
      score: 98,
      points: 160,
      intro: '擅长选题拆解、路演表达和项目推进，能稳定组织 DDL 冲刺。',
    }
    setUser(mockUser)
    notify('登录成功', `已生成模拟账号 ${mockUser.studentId}，校园画像同步完成。`)
    setPage('lobby')
  }

  const handlePublish = (form) => {
    const newTask = {
      id: Date.now(),
      title: form.title || '我的校园创新项目',
      owner: user?.name || '我',
      need: form.need || '缺队友',
      skill: form.skill || '待补充',
      progress: 1,
      total: Number(form.total) || 4,
      deposit: Number(form.deposit) || 20,
      score: 95,
      tone: 'cyan',
      tags: [form.tag || '新发布', form.deadline || 'DDL待定', form.attachment || '需求文档'],
    }
    setTasks((current) => [newTask, ...current])
    setPublishOpen(false)
    notify('任务发布成功', `${newTask.title} 已进入组队大厅，AI 正在推荐候选人。`)
    setPage('lobby')
  }

  const handleApplySubmit = (form) => {
    if (!applyTask) return
    const application = {
      id: Date.now(),
      task: applyTask,
      intro: form.intro,
      attachment: form.attachment || '个人能力证明.pdf',
      status: 'AI预审通过',
      match: applyTask.score,
    }
    setApplications((current) => [application, ...current])
    setApplyTask(null)
    setMatching(true)
    window.setTimeout(() => {
      setMatching(false)
      notify('申请已提交', `AI 已读取个人介绍和附件，匹配度 ${application.match}%。`)
      setPage('contract')
    }, 1700)
  }

  const handleCreateContract = (application = applications[0]) => {
    if (!application) {
      notify('暂无申请', '请先去组队大厅申请一个项目，再建立契约。')
      setPage('lobby')
      return
    }
    const contract = {
      id: Date.now(),
      title: application.task.title,
      applicant: user?.name || 'Chloe',
      deposit: application.task.deposit,
      status: 'CONTRACT_LOCKED',
      attachment: application.attachment,
    }
    setContracts((current) => [contract, ...current])
    setContractLocked(true)
    setProgress(82)
    notify('契约建立成功', `${contract.title} 已锁定 ${contract.deposit} 积分保证金。`)
  }

  const handleKick = () => {
    setContractLocked(false)
    setProgress(67)
    notify('罚没模拟完成', '14 积分返还靠谱队员，6 积分进入平台账户。')
  }

  return (
    <main className="app-shell">
      <AppHeader
        page={page}
        user={user}
        unreadCount={notifications.filter((item) => item.unread).length}
        onNavigate={setPage}
        onOpenDrawer={() => setDrawerOpen(true)}
      />

      <div className="page-stage">
        {page === 'home' && <HomePage user={user} onLogin={handleLogin} onStart={() => setPage('lobby')} />}
        {page === 'lobby' && (
          <LobbyPage
            user={user}
            tasks={tasks}
            onApply={setApplyTask}
            onPublish={() => setPublishOpen(true)}
            onLogin={handleLogin}
          />
        )}
        {page === 'contract' && (
          <ContractPage
            contractLocked={contractLocked}
            applications={applications}
            contracts={contracts}
            pool={pool}
            progress={progress}
            onCreateContract={handleCreateContract}
            onKick={handleKick}
          />
        )}
        {page === 'chat' && <ChatPage toast={toast} notifications={notifications} />}
        {page === 'dashboard' && <DashboardPage />}
        {page === 'pitch' && <PitchPage onNavigate={setPage} />}
      </div>

      <button type="button" className="floating-demo" onClick={() => setApplyTask(tasks[0])}>
        <Sparkles size={18} />
        AI 匹配演示
      </button>

      {publishOpen && <PublishModal onClose={() => setPublishOpen(false)} onSubmit={handlePublish} />}
      {applyTask && <ApplyModal task={applyTask} user={user} onClose={() => setApplyTask(null)} onSubmit={handleApplySubmit} />}
      {matching && <MatchingModal task={applications[0]?.task || tasks[0]} />}
      {drawerOpen && <NotificationDrawer notifications={notifications} onClose={() => setDrawerOpen(false)} />}
    </main>
  )
}

function AppHeader({ page, user, unreadCount, onNavigate, onOpenDrawer }) {
  return (
    <header className="app-header">
      <div className="brand-lockup">
        <img src={schoolLogo} alt="北京石油化工学院" className="school-logo" />
        <span className="divider" />
        <img src={platformLogo} alt="MateLink 校园靠谱组队平台" className="platform-logo" />
      </div>

      <nav className="page-tabs" aria-label="页面切换">
        {pages.map(({ id, label, icon: Icon }) => (
          <button
            type="button"
            key={id}
            className={page === id ? 'page-tab active' : 'page-tab'}
            onClick={() => onNavigate(id)}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>

      <div className="nav-actions">
        {user && <span className="session-chip">{user.studentId}</span>}
        <button type="button" className="icon-button" title="智能搜索">
          <Search size={18} />
        </button>
        <button type="button" className="icon-button has-dot" title="AI提醒" aria-label="AI提醒" onClick={onOpenDrawer}>
          <BellRing size={18} />
          {unreadCount > 0 && <span className="notify-count">{unreadCount}</span>}
        </button>
      </div>
    </header>
  )
}

function HomePage({ user, onLogin, onStart }) {
  return (
    <section className="hero-band page-view">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            <GraduationCap size={16} />
            北京石油化工学院校园场景 Demo
          </div>
          <h1>MateLink，让组队从“赌运气”变成“看数据”。</h1>
          <p>
            面向大作业、竞赛、创新创业项目，MateLink 用实名认证、多维画像、契约锁和 AI
            云监工，把找队友、定责任、防划水、看成果连成一个闭环。
          </p>
          <div className="hero-actions">
            <button type="button" className="primary-action" onClick={user ? onStart : onLogin}>
              <LogIn size={18} />
              {user ? '进入校内平台' : '模拟学号登录'}
            </button>
            <button type="button" className="secondary-action" onClick={onLogin}>
              <BadgeCheck size={18} />
              生成模拟账号
            </button>
          </div>
        </div>

        <div className="login-panel">
          <img src={platformLogo} alt="" className="login-logo" />
          <div className="login-form">
            <label>
              校园统一身份
              <span>{user ? `${user.studentId}@bipt.edu.cn` : '点击后生成模拟学号'}</span>
            </label>
            <label>
              画像同步
              <span>{user ? `${user.mbti} / GPA ${user.gpa} / 靠谱分 ${user.score}` : '绩点 / 竞赛经历 / 历史靠谱分'}</span>
            </label>
            <button type="button" onClick={user ? onStart : onLogin} className="apply-button">
              {user ? '进入组队大厅' : '一键同步并进入'}
              <ShieldCheck size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="feature-row">
        <FeatureCard icon={Users} title="多维画像" text="MBTI、绩点、技能标签、历史靠谱分统一展示。" />
        <FeatureCard icon={WalletCards} title="对赌托管" text="保证金进入托管池，违约处罚有账可查。" />
        <FeatureCard icon={Bot} title="AI 监工" text="自动拆解节点、催办任务、预审提交质量。" />
      </div>
    </section>
  )
}

function LobbyPage({ user, tasks, onApply, onPublish, onLogin }) {
  return (
    <section className="content-band page-view">
      <div className="section-title">
        <div>
          <span className="eyebrow dark">
            <Trophy size={16} />
            大作业与竞赛组队大厅
          </span>
          <h2>发布任务、提交个人介绍、申请加入项目</h2>
        </div>
        <button type="button" className="ghost-button" onClick={onPublish}>
          <FilePlus2 size={18} />
          发布需求
        </button>
      </div>

      <div className="lobby-layout">
        <div className="profile-panel compact-profile">
          <div className="profile-head">
            <div>
              <span className="verified">
                <BadgeCheck size={16} />
                {user ? '已登录' : '未登录'}
              </span>
              <h2>{user?.name || '访客同学'}</h2>
              <p>{user ? `学号 ${user.studentId}` : '先生成模拟号再演示'}</p>
            </div>
            <span className="avatar">{user?.name?.[0] || 'M'}</span>
          </div>

          <div className="profile-metrics">
            <Metric label="MBTI" value={user?.mbti || 'ENTP'} note="创意型" strong />
            <Metric label="绩点" value={user?.gpa || '3.8'} note="专业前 15%" />
            <Metric label="靠谱分" value={user?.score || '98'} note="全校前 5%" />
          </div>

          <div className="profile-intro">
            <b>个人介绍</b>
            <p>{user?.intro || '擅长选题拆解、路演表达和项目推进，能稳定组织 DDL 冲刺。'}</p>
          </div>

          {!user && (
            <button type="button" className="apply-button profile-login" onClick={onLogin}>
              先模拟登录
              <LogIn size={16} />
            </button>
          )}
        </div>

        <div className="masonry">
          {tasks.map((task) => (
            <TaskCard task={task} key={task.id} onApply={onApply} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TaskCard({ task, onApply }) {
  return (
    <article className={`task-card ${task.tone}`}>
      <div className="card-topline">
        <span className="pill">
          <Flame size={14} />
          {task.need}
        </span>
        <span className="deposit">{task.deposit} 积分</span>
      </div>
      <h3>{task.title}</h3>
      <p>发起人：{task.owner}</p>
      <div className="skill-row">
        <Code2 size={16} />
        <span>{task.skill}</span>
      </div>
      <div className="tag-row">
        {task.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className="progress-row">
        <span>
          已有 {task.progress}/{task.total} 人
        </span>
        <b>{Math.round((task.progress / task.total) * 100)}%</b>
      </div>
      <div className="progress-track">
        <span style={{ width: `${(task.progress / task.total) * 100}%` }} />
      </div>
      <button type="button" onClick={() => onApply(task)} className="apply-button">
        申请加入并提交介绍
        <Send size={16} />
      </button>
    </article>
  )
}

function ContractPage({ contractLocked, applications, contracts, pool, progress, onCreateContract, onKick }) {
  const pending = applications[0]

  return (
    <section className="content-band page-view split-band">
      <div className="contract-panel">
        <span className="eyebrow dark">
          <LockKeyhole size={16} />
          契约锁与对赌机制
        </span>
        <h2>从申请记录一键建立契约</h2>
        <div className="state-machine">
          <div className={contractLocked ? 'state-node done' : 'state-node active'}>WAITING_JOIN</div>
          <div className="state-line" />
          <div className={contractLocked ? 'state-node active' : 'state-node'}>CONTRACT_LOCKED</div>
          <div className="state-line" />
          <div className="state-node">REPLACE_MEMBER</div>
        </div>
        <div className="contract-stats">
          <Stat label="托管池" value={`${pool} 积分`} />
          <Stat label="当前进度" value={`${progress}%`} />
          <Stat label="契约数量" value={`${contracts.length} 份`} />
        </div>

        <div className="contract-preview">
          <b>{pending ? pending.task.title : '暂无待签约申请'}</b>
          <p>{pending ? pending.intro : '请先在组队大厅申请一个项目，系统会把个人介绍和附件带到这里。'}</p>
          {pending && (
            <span>
              <Paperclip size={15} />
              {pending.attachment}
            </span>
          )}
        </div>

        <div className="contract-actions">
          <button type="button" onClick={() => onCreateContract(pending)} className="primary-action small">
            <HandCoins size={17} />
            建立契约并锁定保证金
          </button>
          <button type="button" onClick={onKick} className="danger-action">
            模拟踢出摆烂队员
          </button>
        </div>
      </div>

      <div className="contract-panel">
        <span className="eyebrow dark">
          <WandSparkles size={16} />
          AI 候选人与契约记录
        </span>
        <h2>补位不靠喊，靠匹配度排序</h2>
        <div className="candidate-list">
          {[...applications.map((item) => ({
            name: '我的申请',
            type: item.status,
            skill: item.attachment,
            match: item.match,
            status: '可签约',
          })), ...baseApplicants].map((person) => (
            <div className="candidate-card" key={`${person.name}-${person.skill}`}>
              <span className="candidate-avatar">{person.name[0]}</span>
              <div>
                <b>{person.name}</b>
                <p>
                  {person.type} / {person.skill}
                </p>
              </div>
              <strong>{person.match}%</strong>
              <span className="candidate-status">{person.status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ChatPage({ toast, notifications }) {
  return (
    <section className="content-band page-view split-band">
      <div className="chat-panel">
        <div className="chat-header">
          <div>
            <span className="eyebrow dark">
              <Bot size={16} />
              AI 云监工群聊
            </span>
            <h2>MateLink 项目协作群</h2>
          </div>
          <span className="live-badge">LIVE</span>
        </div>

        <div className="chat-body">
          {chatMessages.map((message) => (
            <div className={`message ${message.mine ? 'mine' : ''} ${message.ai ? 'ai-message' : ''}`} key={message.text}>
              <span className="message-avatar">{message.ai ? <Bot size={18} /> : message.sender[0]}</span>
              <div>
                <div className="message-meta">
                  {message.sender}
                  <small>{message.meta}</small>
                </div>
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="toast">
          <Zap size={16} />
          {toast}
        </div>
      </div>

      <div className="contract-panel">
        <span className="eyebrow dark">
          <CalendarDays size={16} />
          节点化协作看板
        </span>
        <h2>AI 自动拆解 DDL</h2>
        <div className="timeline-list">
          {milestones.map((item) => (
            <div className="timeline-item" key={item.title}>
              <span>{item.time}</span>
              <div>
                <b>{item.title}</b>
                <p>{item.owner}</p>
              </div>
              <em>{item.state}</em>
            </div>
          ))}
        </div>
        <div className="inline-notifications">
          <b>最新 AI 提醒</b>
          {notifications.slice(0, 3).map((item) => (
            <p key={item.id}>{item.text}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

function DashboardPage() {
  return (
    <section className="content-band page-view dashboard-band">
      <div className="section-title">
        <div>
          <span className="eyebrow dark">
            <BrainCircuit size={16} />
            校园靠谱度大数据看板
          </span>
          <h2>60 份问卷结果，现场直接变成产品洞察</h2>
        </div>
        <div className="sample-size">
          <Users size={18} />
          n = 60
        </div>
      </div>

      <div className="kpi-grid">
        {surveyData.map((item) => (
          <div className="kpi-card" key={item.name}>
            <span>{item.name}</span>
            <b>{item.value}%</b>
            <div className="mini-track">
              <i style={{ width: `${item.value}%`, background: item.color }} />
            </div>
          </div>
        ))}
      </div>

      <div className="chart-grid">
        <ChartCard title="痛点占比">
          <BarChart data={painData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#2563eb" />
          </BarChart>
        </ChartCard>

        <ChartCard title="功能期待">
          <PieChart>
            <Pie data={surveyData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={88}>
              {surveyData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartCard>

        <div className="chart-card wide">
          <h3>靠谱分成长趋势</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={reliabilityTrend}>
              <defs>
                <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis domain={[80, 100]} />
              <Tooltip />
              <Area dataKey="score" stroke="#0f766e" fill="url(#scoreFill)" strokeWidth={3} />
              <Line dataKey="score" stroke="#0f766e" strokeWidth={3} dot={{ r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}

const demoSteps = [
  {
    title: '1. 校内登录',
    status: '生成模拟学号 2024xxxxxx',
    detail: '统一身份认证后，同步 GPA、MBTI、竞赛经历和历史靠谱分。',
    metric: '画像可信度 98%',
  },
  {
    title: '2. 发布任务',
    status: '校园无人机巡检项目已发布',
    detail: '队长设置招募需求、人数上限、DDL、保证金和项目附件。',
    metric: '曝光 324 次',
  },
  {
    title: '3. 申请项目',
    status: '个人介绍与附件已提交',
    detail: '申请者先写自我介绍，再附作品集，AI 预审技能互补度。',
    metric: '匹配度 95%',
  },
  {
    title: '4. 建立契约',
    status: '保证金进入托管池',
    detail: '双方同意后锁定积分，项目进入 CONTRACT_LOCKED 监控状态。',
    metric: '托管 100 积分',
  },
  {
    title: '5. AI 监工提醒',
    status: '@张同学 距离 PPT 提交还有 4 小时',
    detail: '系统自动催办节点，队长不用唱黑脸，群聊同步进度。',
    metric: '提醒 6 条',
  },
  {
    title: '6. 商业闭环',
    status: '收入到账：服务费 + 加急匹配',
    detail: '围绕学生高频组队需求，平台通过契约服务费、会员、置顶和加急匹配形成闭环。',
    metric: '月收入模型 ¥8,900',
  },
]

const revenueItems = [
  { title: '契约服务费', value: '30%', text: '违约罚没中平台抽取 30%，正常履约可收 1-3 积分服务费。' },
  { title: '会员增值', value: '¥9.9/月', text: '高级匹配、靠谱分诊断、AI 简历/申请润色。' },
  { title: '任务置顶曝光', value: '5积分/天', text: '队长可购买大厅置顶，让紧急项目更快招到合适队友。' },
  { title: 'AI 加急匹配', value: '8积分/次', text: 'DDL 临近时解锁更快的候选人排序、风险提示和私信模板。' },
]

function PitchPage({ onNavigate }) {
  const [activeStep, setActiveStep] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return undefined
    const timer = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % demoSteps.length)
    }, 2400)

    return () => window.clearInterval(timer)
  }, [playing])

  const current = demoSteps[activeStep]

  return (
    <section className="content-band page-view pitch-page">
      <div className="section-title">
        <div>
          <span className="eyebrow dark">
            <Rocket size={16} />
            答辩模式
          </span>
          <h2>自动播放完整流程演示</h2>
        </div>
        <button type="button" className="primary-action small" onClick={() => setPlaying((value) => !value)}>
          <Rocket size={17} />
          {playing ? '暂停自动演示' : '开始自动演示'}
        </button>
      </div>

      <div className="pitch-showcase">
        <div className="auto-demo-panel">
          <div className="demo-screen">
            <div className="demo-screen-head">
              <span>{current.title}</span>
              <b>{current.metric}</b>
            </div>
            <AnimatedDemoStage activeStep={activeStep} current={current} />
            <div className="demo-progress">
              {demoSteps.map((step, index) => (
                <button
                  type="button"
                  key={step.title}
                  className={index === activeStep ? 'demo-dot active' : 'demo-dot'}
                  onClick={() => {
                    setActiveStep(index)
                    setPlaying(false)
                  }}
                  aria-label={step.title}
                />
              ))}
            </div>
          </div>

          <div className="pitch-grid compact">
            <PitchStep number="01" title="登录认证" text="生成模拟学号，说明数据来自校内统一身份。" target="home" onNavigate={onNavigate} active={activeStep === 0} />
            <PitchStep number="02" title="发布任务" text="现场发布项目，任务会进入大厅。" target="lobby" onNavigate={onNavigate} active={activeStep === 1} />
            <PitchStep number="03" title="申请项目" text="填写个人介绍，上传附件名，展示 AI 预审。" target="lobby" onNavigate={onNavigate} active={activeStep === 2} />
            <PitchStep number="04" title="建立契约" text="基于申请记录锁定保证金。" target="contract" onNavigate={onNavigate} active={activeStep === 3} />
            <PitchStep number="05" title="AI提醒" text="右上角提醒栏持续收到 AI 监工通知。" target="chat" onNavigate={onNavigate} active={activeStep === 4} />
          </div>
        </div>

        <aside className="revenue-panel">
          <span className="eyebrow dark">
            <WalletCards size={16} />
            盈利模式
          </span>
          <h3>从“高频组队刚需”里收费</h3>
          <div className="revenue-list">
            {revenueItems.map((item) => (
              <article className="revenue-item" key={item.title}>
                <div>
                  <b>{item.title}</b>
                  <p>{item.text}</p>
                </div>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
          <div className="revenue-summary">
            <span>示例月收入</span>
            <b>¥8,900</b>
            <p>按 300 个活跃学生、80 个项目、20 个会员、60 次置顶/加急服务估算。</p>
          </div>
        </aside>
      </div>
    </section>
  )
}

function AnimatedDemoStage({ activeStep, current }) {
  return (
    <div className={`animated-stage step-${activeStep}`}>
      <div className="stage-caption">
        <h3>{current.status}</h3>
        <p>{current.detail}</p>
      </div>

      <div className="stage-device">
        <div className="stage-topbar">
          <span />
          <span />
          <span />
          <b>MateLink Demo</b>
        </div>

        <div className="stage-canvas">
          <div className="stage-card login-card">
            <BadgeCheck size={18} />
            <b>校园统一身份</b>
            <strong>2024 096214</strong>
            <small>画像同步完成 · 靠谱分 98</small>
          </div>

          <div className="stage-card task-stage-card">
            <div>
              <b>校园无人机巡检创新项目</b>
              <small>缺代码手 · 保证金 20 积分</small>
            </div>
            <span>发布成功</span>
          </div>

          <div className="stage-card apply-stage-card">
            <b>申请加入</b>
            <p>我可以负责代码模块和展示页面，今晚 22:00 前提交可运行版本。</p>
            <span>
              <Paperclip size={14} />
              个人作品集_MateLink.pdf
            </span>
          </div>

          <div className="stage-card contract-stage-card">
            <LockKeyhole size={18} />
            <b>CONTRACT_LOCKED</b>
            <small>4 人各锁定 20 积分</small>
            <div className="mini-ledger">
              <i style={{ width: '82%' }} />
            </div>
          </div>

          <div className="stage-card remind-stage-card">
            <Bot size={18} />
            <b>AI监工提醒</b>
            <p>@张同学 距离 PPT 提交还有 4 小时，请尽快打卡。</p>
          </div>

          <div className="stage-card revenue-stage-card">
            <WalletCards size={18} />
            <b>收入到账</b>
            <strong>+ 8 积分</strong>
            <small>AI 加急匹配服务</small>
          </div>

          <div className="stage-scanline" />
          <div className="stage-cursor">点击</div>
        </div>
      </div>
    </div>
  )
}

function PublishModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: '校园无人机巡检创新项目',
    need: '缺代码手',
    skill: 'Python / YOLO / 前端展示',
    total: 4,
    deposit: 20,
    deadline: 'DDL 3天',
    tag: '创新创业',
    attachment: '项目需求书.pdf',
  })

  return (
    <FormModal title="发布组队任务" onClose={onClose}>
      <div className="form-grid">
        <TextField label="项目名称" value={form.title} onChange={(title) => setForm({ ...form, title })} />
        <TextField label="招募需求" value={form.need} onChange={(need) => setForm({ ...form, need })} />
        <TextField label="核心技能" value={form.skill} onChange={(skill) => setForm({ ...form, skill })} />
        <TextField label="人数上限" value={form.total} onChange={(total) => setForm({ ...form, total })} />
        <TextField label="保证金积分" value={form.deposit} onChange={(deposit) => setForm({ ...form, deposit })} />
        <TextField label="附件名称" value={form.attachment} onChange={(attachment) => setForm({ ...form, attachment })} />
      </div>
      <button type="button" className="apply-button" onClick={() => onSubmit(form)}>
        发布到组队大厅
        <FilePlus2 size={16} />
      </button>
    </FormModal>
  )
}

function ApplyModal({ task, user, onClose, onSubmit }) {
  const [form, setForm] = useState({
    intro: user?.intro || '我可以负责代码模块和展示页面，今晚 22:00 前提交可运行版本，并配合队长完成答辩演示。',
    attachment: '个人作品集_MateLink.pdf',
  })

  return (
    <FormModal title={`申请加入：${task.title}`} onClose={onClose}>
      <label className="textarea-field">
        个人介绍
        <textarea value={form.intro} onChange={(event) => setForm({ ...form, intro: event.target.value })} />
      </label>
      <label className="upload-field">
        <UploadCloud size={20} />
        附件名称
        <input value={form.attachment} onChange={(event) => setForm({ ...form, attachment: event.target.value })} />
      </label>
      <div className="ai-review-box">
        <Bot size={18} />
        AI 将读取个人介绍与附件，预估技能互补度、DDL 风险和靠谱分影响。
      </div>
      <button type="button" className="apply-button" onClick={() => onSubmit(form)}>
        提交申请并交给 AI 预审
        <Send size={16} />
      </button>
    </FormModal>
  )
}

function NotificationDrawer({ notifications, onClose }) {
  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="notification-drawer" onClick={(event) => event.stopPropagation()}>
        <div className="drawer-head">
          <div>
            <span className="eyebrow dark">
              <BellRing size={16} />
              AI 监工提醒栏
            </span>
            <h2>实时通知</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} title="关闭">
            <X size={18} />
          </button>
        </div>
        <div className="notification-list">
          {notifications.map((item) => (
            <article className={item.unread ? 'notification-item unread' : 'notification-item'} key={item.id}>
              <CheckCircle2 size={18} />
              <div>
                <b>{item.title}</b>
                <p>{item.text}</p>
                <small>{item.time}</small>
              </div>
            </article>
          ))}
        </div>
      </aside>
    </div>
  )
}

function MatchingModal({ task }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="match-modal">
        <div className="scanner">
          <span />
          <Bot size={34} />
        </div>
        <h2>AI 正在读取介绍和附件...</h2>
        <p>正在分析 {task?.title} 的技能缺口、附件证明、历史靠谱分、DDL 风险和 MBTI 协作互补度。</p>
        <div className="scan-lines">
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  )
}

function FormModal({ title, children, onClose }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="form-modal">
        <div className="drawer-head">
          <h2>{title}</h2>
          <button type="button" className="icon-button" onClick={onClose} title="关闭">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function TextField({ label, value, onChange }) {
  return (
    <label className="text-field">
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

function ChartCard({ title, children }) {
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={240}>
        {children}
      </ResponsiveContainer>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, text }) {
  return (
    <div className="feature-card">
      <Icon size={22} />
      <b>{title}</b>
      <p>{text}</p>
    </div>
  )
}

function Metric({ label, value, note, strong }) {
  return (
    <div className={strong ? 'metric strong' : 'metric'}>
      <span>{label}</span>
      <b>{value}</b>
      <small>{note}</small>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <b>{value}</b>
    </div>
  )
}

function PitchStep({ number, title, text, target, onNavigate, active }) {
  return (
    <article className={active ? 'pitch-step active' : 'pitch-step'}>
      <span>{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
      <button type="button" className="ghost-button" onClick={() => onNavigate(target)}>
        跳到此页
        <ClipboardCheck size={16} />
      </button>
    </article>
  )
}

export default App

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  BookOpen,
  Calendar,
  Target,
  Star,
  Trophy,
  Zap,
  ArrowRight,
  Check,
  X,
  Lightbulb,
  Award,
  ArrowLeft,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import Link from "next/link"

interface LessonModule {
  id: string
  stage: string
  title: string
  progress: number
  lessons: Array<{
    id: string
    title: string
    duration: string
    completed: boolean
    current?: boolean
    isPlaying?: boolean
  }>
  expanded: boolean
}

export default function Dashboard() {
  const [modules, setModules] = useState<LessonModule[]>([
    {
      id: "stage1",
      stage: "Stage 1",
      title: "Basics of Digital Communication",
      progress: 100,
      lessons: [
        { id: "1-1", title: "Starting Conversations Naturally", duration: "12 min", completed: true },
        { id: "1-2", title: "Using Emojis Effectively", duration: "8 min", completed: true },
        { id: "1-3", title: "Tone and Context in Text", duration: "15 min", completed: true },
      ],
      expanded: false,
    },
    {
      id: "stage2",
      stage: "Stage 2",
      title: "Conversation Flow",
      progress: 100,
      lessons: [
        { id: "2-1", title: "Keeping Conversations Alive", duration: "18 min", completed: true },
        { id: "2-2", title: "Asking Engaging Questions", duration: "14 min", completed: true },
        { id: "2-3", title: "Reading Between the Lines", duration: "22 min", completed: true },
      ],
      expanded: false,
    },
    {
      id: "stage3",
      stage: "Stage 3",
      title: "Advanced Texting Techniques",
      progress: 28,
      lessons: [
        {
          id: "3-1",
          title: "Graceful Conversation Endings",
          duration: "16 min",
          completed: false,
          current: true,
          isPlaying: true,
        },
        { id: "3-2", title: "Handling Misunderstandings", duration: "19 min", completed: false },
        { id: "3-3", title: "Setting Boundaries Kindly", duration: "21 min", completed: false },
        { id: "3-4", title: "Professional Communication", duration: "25 min", completed: false },
        { id: "3-5", title: "Building Rapport Through Text", duration: "18 min", completed: false },
      ],
      expanded: true,
    },
    {
      id: "stage4",
      stage: "Stage 4",
      title: "Dating & Romantic Communication",
      progress: 0,
      lessons: [
        { id: "4-1", title: "First Message Strategies", duration: "13 min", completed: false },
        { id: "4-2", title: "Flirting vs. Friendly", duration: "17 min", completed: false },
        { id: "4-3", title: "Post-Date Follow Up", duration: "12 min", completed: false },
      ],
      expanded: false,
    },
    {
      id: "stage5",
      stage: "Stage 5",
      title: "Group Chat Mastery",
      progress: 0,
      lessons: [
        { id: "5-1", title: "Group Dynamics", duration: "20 min", completed: false },
        { id: "5-2", title: "Mediating Conflicts", duration: "25 min", completed: false },
      ],
      expanded: false,
    },
  ])

  const [currentStep, setCurrentStep] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [currentLessonId, setCurrentLessonId] = useState("3-1")

  // Complete lesson database
  const allLessons = {
    "1-1": {
      title: "Starting Conversations Naturally",
      description: "Learn how to begin conversations without awkwardness",
      stage: "Stage 1",
      lesson: "Lesson 1",
      xpReward: 100,
      steps: [
        {
          type: "introduction",
          title: "The Art of Natural Conversation Starters",
          content: {
            text: "Starting conversations naturally is a skill that opens doors to meaningful connections. Whether it's a new friendship, professional relationship, or romantic interest, the first message sets the tone for everything that follows.",
            keyPoints: [
              "Creates positive first impressions",
              "Reduces anxiety and awkwardness",
              "Opens doors to meaningful connections",
              "Builds confidence in digital communication",
            ],
            icon: "💬",
          },
        },
        {
          type: "principle",
          title: "The SPARK Method",
          content: {
            text: "Use this proven framework to start any conversation naturally:",
            rules: [
              {
                title: "Shared Experience",
                description: "Reference something you both experienced or witnessed",
                example: "That presentation today was incredible! What did you think of the main points?",
                icon: "🤝",
              },
              {
                title: "Personal Interest",
                description: "Show genuine curiosity about their interests or opinions",
                example: "I saw you're into photography - any tips for a beginner?",
                icon: "🎯",
              },
              {
                title: "Authentic Compliment",
                description: "Give a sincere, specific compliment",
                example: "Your insights during the meeting were really thoughtful",
                icon: "✨",
              },
              {
                title: "Relevant Question",
                description: "Ask something that invites engagement",
                example: "What's been the highlight of your week so far?",
                icon: "❓",
              },
              {
                title: "Kind Observation",
                description: "Notice something positive about their day or mood",
                example: "You seem really excited about that project you mentioned!",
                icon: "👀",
              },
            ],
          },
        },
        {
          type: "examples",
          title: "Conversation Starters That Work",
          content: {
            text: "Let's see the difference between awkward and natural conversation starters:",
            comparisons: [
              {
                situation: "Starting a conversation with a coworker",
                bad: {
                  text: "Hey",
                  issues: ["Too generic", "Puts pressure on them to respond", "No conversation hook"],
                },
                good: {
                  text: "That coffee shop recommendation you gave me was perfect! The barista even remembered my order today ☕",
                  strengths: ["References shared experience", "Shows appreciation", "Creates talking points"],
                },
              },
              {
                situation: "Reaching out to someone new",
                bad: {
                  text: "What's up?",
                  issues: ["Vague and impersonal", "Hard to respond to meaningfully", "Shows no effort"],
                },
                good: {
                  text: "I loved your point about sustainable design in today's discussion. Have you worked on any green projects recently?",
                  strengths: ["Shows you were listening", "Specific reference", "Invites detailed response"],
                },
              },
            ],
          },
        },
        {
          type: "quiz",
          title: "Test Your Conversation Starting Skills",
          questions: [
            {
              id: 1,
              question: "Which conversation starter follows the SPARK method best?",
              options: [
                { id: "A", text: "Hey, how are you?", correct: false },
                {
                  id: "B",
                  text: "Your presentation on climate change was fascinating! What got you interested in environmental science?",
                  correct: true,
                },
                { id: "C", text: "What's up?", correct: false },
                { id: "D", text: "Are you busy?", correct: false },
              ],
              explanation:
                "Option B uses multiple SPARK elements: authentic compliment + personal interest + relevant question.",
            },
            {
              id: 2,
              question: "What makes a conversation starter 'natural'?",
              options: [
                { id: "A", text: "It's very casual and informal", correct: false },
                { id: "B", text: "It references shared context or shows genuine interest", correct: true },
                { id: "C", text: "It's short and simple", correct: false },
                { id: "D", text: "It asks a personal question immediately", correct: false },
              ],
              explanation:
                "Natural starters feel organic because they connect to shared experiences or show authentic curiosity.",
            },
            {
              id: 3,
              question: "When is the best time to start a conversation?",
              options: [
                { id: "A", text: "Only when you have something important to say", correct: false },
                { id: "B", text: "When you have a genuine reason or shared context", correct: true },
                { id: "C", text: "Anytime you feel like talking", correct: false },
                { id: "D", text: "Only during business hours", correct: false },
              ],
              explanation:
                "The best conversations start when there's a natural reason or shared context that makes the interaction feel purposeful.",
            },
          ],
        },
      ],
    },
    "1-2": {
      title: "Using Emojis Effectively",
      description: "Master the art of emoji usage to enhance your messages",
      stage: "Stage 1",
      lesson: "Lesson 2",
      xpReward: 100,
      steps: [
        {
          type: "introduction",
          title: "The Power of Digital Body Language",
          content: {
            text: "Emojis are the body language of digital communication. They add emotion, context, and personality to our messages, helping bridge the gap between face-to-face and text-based conversations.",
            keyPoints: [
              "Convey tone and emotion clearly",
              "Prevent misunderstandings",
              "Add personality to messages",
              "Create warmth and connection",
            ],
            icon: "😊",
          },
        },
        {
          type: "principle",
          title: "The Emoji Guidelines",
          content: {
            text: "Follow these principles for effective emoji usage:",
            rules: [
              {
                title: "Match the Mood",
                description: "Use emojis that align with your message's tone",
                example: "Thanks for your help today! 🙏 vs Thanks for your help today! 😂",
                icon: "🎭",
              },
              {
                title: "Less is More",
                description: "1-2 emojis per message is usually perfect",
                example: "Great job on the presentation! 👏✨ (not 👏🎉🔥💯🚀⭐)",
                icon: "⚖️",
              },
              {
                title: "Know Your Audience",
                description: "Adjust emoji usage based on relationship and context",
                example: "Professional: Thanks! 😊 vs Friends: YASSS QUEEN! 💅✨🔥",
                icon: "👥",
              },
            ],
          },
        },
        {
          type: "examples",
          title: "Emoji Do's and Don'ts",
          content: {
            text: "See how emojis can enhance or hurt your messages:",
            comparisons: [
              {
                situation: "Expressing gratitude",
                bad: {
                  text: "Thanks!!!!!!! 😂😂😂🤣🤣💀💀",
                  issues: ["Excessive emojis", "Wrong emotional tone", "Looks immature"],
                },
                good: {
                  text: "Thanks so much! This really helps 🙏",
                  strengths: ["Appropriate emoji", "Matches grateful tone", "Professional yet warm"],
                },
              },
              {
                situation: "Sharing exciting news",
                bad: {
                  text: "I got the job",
                  issues: ["No emotional context", "Sounds flat", "Hard to gauge your feelings"],
                },
                good: {
                  text: "I got the job! 🎉 Can't wait to start next week!",
                  strengths: ["Shows excitement", "Invites celebration", "Clear emotional context"],
                },
              },
            ],
          },
        },
        {
          type: "tips",
          title: "Advanced Emoji Strategies",
          content: {
            text: "Take your emoji game to the next level:",
            tips: [
              {
                title: "Emoji Substitution",
                description: "Replace words with relevant emojis for visual interest",
                examples: ["Going to the ☕ shop", "Happy 🎂 day!", "Working from 🏠 today"],
                icon: "🔄",
              },
              {
                title: "Emotional Clarification",
                description: "Use emojis to clarify tone when text might be ambiguous",
                examples: [
                  "That's interesting 🤔 (curious, not sarcastic)",
                  "Sure thing 😊 (happy to help)",
                  "We need to talk 😅 (not serious/scary)",
                ],
                icon: "💡",
              },
            ],
            mistakes: [
              {
                title: "Emoji Overload",
                description: "Using too many emojis in one message",
                why: "Makes messages hard to read and can seem unprofessional",
                icon: "🌪️",
              },
              {
                title: "Wrong Context",
                description: "Using casual emojis in formal situations",
                why: "Can damage professional relationships and credibility",
                icon: "🚫",
              },
            ],
          },
        },
        {
          type: "quiz",
          title: "Emoji Mastery Quiz",
          questions: [
            {
              id: 1,
              question: "Which message uses emojis most effectively?",
              options: [
                { id: "A", text: "Meeting at 3pm 📅⏰🏢💼📋", correct: false },
                { id: "B", text: "Meeting at 3pm 📅", correct: true },
                { id: "C", text: "Meeting at 3pm", correct: false },
                { id: "D", text: "Meeting at 3pm 😂🎉", correct: false },
              ],
              explanation: "Option B uses one relevant emoji that adds context without overwhelming the message.",
            },
            {
              id: 2,
              question: "When should you avoid using emojis?",
              options: [
                { id: "A", text: "In formal business communications", correct: true },
                { id: "B", text: "When texting friends", correct: false },
                { id: "C", text: "When expressing emotions", correct: false },
                { id: "D", text: "Never - emojis are always appropriate", correct: false },
              ],
              explanation: "Formal business communications often require a more professional tone without emojis.",
            },
          ],
        },
      ],
    },
    "3-1": {
      title: "Graceful Conversation Endings",
      description: "Master the art of ending conversations naturally and warmly",
      stage: "Stage 3",
      lesson: "Lesson 1",
      xpReward: 150,
      steps: [
        {
          type: "introduction",
          title: "Why Graceful Endings Matter",
          content: {
            text: "Ending conversations well is just as important as starting them. A graceful ending leaves people feeling good about the interaction and maintains positive relationships for future conversations.",
            keyPoints: [
              "Preserves relationships and keeps doors open",
              "Shows respect for the other person's time",
              "Prevents awkwardness and misunderstandings",
              "Creates positive lasting impressions",
            ],
            icon: "👋",
          },
        },
        {
          type: "principle",
          title: "The 3 Golden Rules",
          content: {
            text: "Follow these three essential principles for ending any conversation gracefully:",
            rules: [
              {
                title: "Give a Reason",
                description: "Always provide a brief, honest reason for ending the conversation",
                example: "I need to get back to work, but this was great!",
                icon: "💼",
              },
              {
                title: "Express Appreciation",
                description: "Show that you valued the conversation and their time",
                example: "Thanks for sharing that story - it really made my day!",
                icon: "🙏",
              },
              {
                title: "Leave the Door Open",
                description: "Indicate you'd like to continue the relationship",
                example: "Let's catch up again soon!",
                icon: "🚪",
              },
            ],
          },
        },
        {
          type: "examples",
          title: "Good vs. Bad Examples",
          content: {
            text: "Let's look at some real examples to see the difference:",
            comparisons: [
              {
                situation: "Ending a casual chat with a friend",
                bad: {
                  text: "k bye",
                  issues: ["Too abrupt", "No reason given", "Feels dismissive"],
                },
                good: {
                  text: "Hey, I gotta run to a meeting, but I loved hearing about your trip! Let's grab coffee soon to hear more 😊",
                  strengths: ["Gives reason", "Shows interest", "Plans future interaction", "Warm tone"],
                },
              },
              {
                situation: "Wrapping up a work conversation",
                bad: {
                  text: "This is taking too long. I'm done.",
                  issues: ["Rude and dismissive", "No appreciation", "Burns bridges"],
                },
                good: {
                  text: "Thanks for walking me through this! I need to jump on another call, but I'll follow up with those questions later today.",
                  strengths: ["Shows gratitude", "Clear reason", "Sets expectations"],
                },
              },
            ],
          },
        },
        {
          type: "scenario",
          title: "Practice Scenario",
          content: {
            text: "Your friend has been telling you about their relationship problems for 20 minutes, but you need to leave for an appointment. How do you end this gracefully?",
            chatExample: [
              {
                sender: "friend",
                message: "...and then he said he needed 'space' but he's still liking other girls' photos!",
                name: "Alex",
              },
              { sender: "friend", message: "I just don't know what to think anymore 😢", name: "Alex" },
            ],
            goodResponse:
              "Alex, I'm so sorry you're going through this - it sounds really tough. I have to head to a doctor's appointment in 5 minutes, but I want to give this the attention it deserves. Can we talk more tonight? I'll call you after dinner ❤️",
            explanation:
              "This response acknowledges their feelings, gives a valid reason for leaving, and shows you care by scheduling a proper follow-up conversation.",
          },
        },
        {
          type: "tips",
          title: "Pro Tips & Common Mistakes",
          content: {
            text: "Here are some advanced techniques and pitfalls to avoid:",
            tips: [
              {
                title: "Use Transition Phrases",
                description: "Smooth phrases that signal you're wrapping up",
                examples: ["Well, I should probably...", "Before I forget to mention...", "One last thing..."],
                icon: "🔄",
              },
              {
                title: "Match Their Energy",
                description: "If they're excited, be enthusiastic. If they're serious, be respectful.",
                examples: [
                  "Excited: 'This was amazing! Can't wait to hear how it goes!'",
                  "Serious: 'Thank you for trusting me with this. I'm here if you need anything.'",
                ],
                icon: "⚡",
              },
            ],
            mistakes: [
              {
                title: "The Fade-Out",
                description: "Just stopping replies without explanation",
                why: "Leaves people confused and hurt",
                icon: "👻",
              },
              {
                title: "Over-Explaining",
                description: "Giving too many reasons or excuses",
                why: "Sounds fake and makes things awkward",
                icon: "📝",
              },
            ],
          },
        },
        {
          type: "quiz",
          title: "Test Your Knowledge",
          questions: [
            {
              id: 1,
              question: "What's the best way to end a casual conversation with a friend?",
              options: [
                { id: "A", text: "Just stop replying", correct: false },
                { id: "B", text: "Hey, I gotta run! Talk soon 😊", correct: true },
                { id: "C", text: "This conversation is over", correct: false },
                { id: "D", text: "Goodbye forever", correct: false },
              ],
              explanation:
                "Option B follows all three golden rules: gives a reason (gotta run), shows warmth, and leaves the door open (talk soon)!",
            },
            {
              id: 2,
              question: "Your friend is telling a long story but you need to leave. What do you do?",
              options: [
                { id: "A", text: "Interrupt and say you have to go", correct: false },
                { id: "B", text: "Wait for a natural pause, then politely exit", correct: true },
                { id: "C", text: "Just leave without saying anything", correct: false },
                { id: "D", text: "Pretend your phone died", correct: false },
              ],
              explanation:
                "Waiting for a natural pause shows respect and makes the goodbye feel less abrupt. Timing matters!",
            },
            {
              id: 3,
              question: "Which phrase best demonstrates 'leaving the door open'?",
              options: [
                { id: "A", text: "Don't contact me again", correct: false },
                { id: "B", text: "Let's continue this conversation later", correct: true },
                { id: "C", text: "I'm busy now", correct: false },
                { id: "D", text: "Talk to you never", correct: false },
              ],
              explanation:
                "Suggesting to continue later shows you value the relationship and want to maintain the connection.",
            },
          ],
        },
      ],
    },
    "3-2": {
      title: "Handling Misunderstandings",
      description: "Learn to clear up confusion before it escalates",
      stage: "Stage 3",
      lesson: "Lesson 2",
      xpReward: 150,
      steps: [
        {
          type: "introduction",
          title: "The Cost of Digital Misunderstandings",
          content: {
            text: "Without tone of voice and body language, digital messages are easily misinterpreted. Learning to handle misunderstandings quickly and gracefully can save relationships and prevent unnecessary conflict.",
            keyPoints: [
              "Prevents small issues from becoming big problems",
              "Maintains trust and understanding",
              "Shows emotional intelligence and maturity",
              "Strengthens relationships through clear communication",
            ],
            icon: "🤝",
          },
        },
        {
          type: "principle",
          title: "The CLEAR Method",
          content: {
            text: "Use this framework to handle any misunderstanding:",
            rules: [
              {
                title: "Clarify Quickly",
                description: "Address the misunderstanding as soon as you notice it",
                example: "I think there might be some confusion about what I meant...",
                icon: "⚡",
              },
              {
                title: "Listen First",
                description: "Understand their perspective before explaining yours",
                example: "Help me understand how you interpreted my message",
                icon: "👂",
              },
              {
                title: "Explain Gently",
                description: "Share your intended meaning without being defensive",
                example: "What I was trying to say was...",
                icon: "💬",
              },
              {
                title: "Acknowledge Impact",
                description: "Recognize how the misunderstanding affected them",
                example: "I can see how that came across as dismissive",
                icon: "❤️",
              },
              {
                title: "Reset Together",
                description: "Move forward with mutual understanding",
                example: "Are we on the same page now?",
                icon: "🔄",
              },
            ],
          },
        },
        {
          type: "examples",
          title: "Misunderstanding Recovery",
          content: {
            text: "See how to turn confusion into connection:",
            comparisons: [
              {
                situation: "Your joke was taken seriously",
                bad: {
                  text: "It was obviously a joke. Don't be so sensitive.",
                  issues: ["Dismissive", "Blames the other person", "Defensive tone"],
                },
                good: {
                  text: "Oh no! I was trying to be funny but I can see how that came across as insensitive. I'm sorry - that wasn't my intention at all.",
                  strengths: ["Takes responsibility", "Acknowledges impact", "Shows empathy"],
                },
              },
              {
                situation: "Your message seemed rude",
                bad: {
                  text: "That's not what I meant. You misunderstood.",
                  issues: ["Puts blame on them", "No explanation", "Sounds frustrated"],
                },
                good: {
                  text: "I realize my message might have sounded harsh - I was rushing and didn't express myself well. What I meant to say was... How did it come across to you?",
                  strengths: ["Takes ownership", "Explains context", "Invites dialogue"],
                },
              },
            ],
          },
        },
        {
          type: "scenario",
          title: "Practice Scenario",
          content: {
            text: "You texted your friend 'Fine, whatever' when they canceled plans, but you meant it casually. They think you're angry. How do you fix this?",
            chatExample: [
              { sender: "you", message: "Fine, whatever", name: "You" },
              {
                sender: "friend",
                message: "Wow, I'm sorry I had to cancel. You don't need to be so angry about it.",
                name: "Sam",
              },
              { sender: "friend", message: "I had a family emergency", name: "Sam" },
            ],
            goodResponse:
              "Oh Sam, I'm so sorry! I wasn't angry at all - I was just being casual but I realize 'fine whatever' sounds really dismissive over text. I hope everything's okay with your family. Rain check on our plans whenever you're free! ❤️",
            explanation:
              "This response quickly clarifies the misunderstanding, takes responsibility for poor word choice, shows concern for their situation, and maintains the friendship.",
          },
        },
        {
          type: "quiz",
          title: "Misunderstanding Management Quiz",
          questions: [
            {
              id: 1,
              question: "What's the first step when you realize there's been a misunderstanding?",
              options: [
                { id: "A", text: "Explain what you really meant", correct: false },
                { id: "B", text: "Clarify quickly and acknowledge the confusion", correct: true },
                { id: "C", text: "Ignore it and hope it goes away", correct: false },
                { id: "D", text: "Blame them for misunderstanding", correct: false },
              ],
              explanation: "Quick clarification prevents the misunderstanding from growing into a bigger issue.",
            },
            {
              id: 2,
              question: "How should you respond when someone misinterprets your message?",
              options: [
                { id: "A", text: "Get defensive and explain why they're wrong", correct: false },
                { id: "B", text: "Listen to their perspective first, then gently clarify", correct: true },
                { id: "C", text: "Tell them they're being too sensitive", correct: false },
                { id: "D", text: "Repeat your original message", correct: false },
              ],
              explanation:
                "Understanding their perspective first shows respect and makes them more receptive to your clarification.",
            },
            {
              id: 3,
              question: "What's the best way to prevent misunderstandings?",
              options: [
                { id: "A", text: "Use very formal language", correct: false },
                { id: "B", text: "Be clear, add context, and check for understanding", correct: true },
                { id: "C", text: "Avoid texting altogether", correct: false },
                { id: "D", text: "Use lots of emojis", correct: false },
              ],
              explanation: "Clear communication with context and confirmation helps prevent most misunderstandings.",
            },
          ],
        },
      ],
    },
    "4-1": {
      title: "First Message Strategies",
      description: "Craft opening messages that get responses in dating",
      stage: "Stage 4",
      lesson: "Lesson 1",
      xpReward: 200,
      steps: [
        {
          type: "introduction",
          title: "The Make-or-Break Moment",
          content: {
            text: "Your first message in dating apps or when reaching out to someone you're interested in can determine whether you get a response or get ignored. It's your chance to make a memorable first impression.",
            keyPoints: [
              "Sets the tone for potential relationship",
              "Shows your personality and communication style",
              "Demonstrates genuine interest vs. generic approach",
              "Creates intrigue and encourages response",
            ],
            icon: "💕",
          },
        },
        {
          type: "principle",
          title: "The CHARM Formula",
          content: {
            text: "Create irresistible first messages with this proven approach:",
            rules: [
              {
                title: "Curious",
                description: "Ask something that makes them want to share",
                example: "Your travel photos are amazing! What's been your favorite adventure so far?",
                icon: "🤔",
              },
              {
                title: "Honest",
                description: "Be genuine about why you're reaching out",
                example: "I had to message you - your sense of humor in your bio made me laugh out loud",
                icon: "💯",
              },
              {
                title: "Attentive",
                description: "Reference something specific from their profile",
                example: "Fellow coffee enthusiast here! Have you tried that new roastery downtown?",
                icon: "👀",
              },
              {
                title: "Respectful",
                description: "Keep it appropriate and considerate",
                example: "Hope you don't mind me reaching out - I'd love to get to know you better",
                icon: "🙏",
              },
              {
                title: "Memorable",
                description: "Stand out from generic messages",
                example:
                  "I see you're into rock climbing - any tips for someone afraid of heights but curious about the sport?",
                icon: "⭐",
              },
            ],
          },
        },
        {
          type: "examples",
          title: "Messages That Work vs. Don't",
          content: {
            text: "See the difference between messages that get responses and those that get ignored:",
            comparisons: [
              {
                situation: "Messaging someone with travel photos",
                bad: {
                  text: "Hey beautiful, wanna chat?",
                  issues: ["Generic compliment", "No personal connection", "Sounds like a copy-paste"],
                },
                good: {
                  text: "That sunset photo from Santorini is incredible! I'm planning a Greece trip next year - any hidden gems you'd recommend?",
                  strengths: ["Specific reference", "Shows genuine interest", "Creates conversation topic"],
                },
              },
              {
                situation: "Reaching out to someone with shared interests",
                bad: {
                  text: "Hi, how's your day?",
                  issues: ["Boring and generic", "No hook for response", "Shows no effort"],
                },
                good: {
                  text: "A fellow Game of Thrones fan! I'm still not over that finale - team 'it was perfect' or team 'they ruined it'? 😅",
                  strengths: ["References shared interest", "Playful tone", "Easy to respond to"],
                },
              },
            ],
          },
        },
        {
          type: "tips",
          title: "Advanced First Message Tactics",
          content: {
            text: "Take your first messages to the next level:",
            tips: [
              {
                title: "The Callback",
                description: "Reference something from earlier in their profile",
                examples: [
                  "You mentioned loving rainy days AND being a bookworm - what's your perfect rainy day read?",
                  "Dog lover and hiking enthusiast? Your pup must be the best trail buddy!",
                ],
                icon: "🔗",
              },
              {
                title: "The Gentle Tease",
                description: "Playful, light teasing that shows confidence",
                examples: [
                  "Pineapple on pizza? I might have to reconsider this whole thing 😉",
                  "5 cats? I respect the commitment to the crazy cat person lifestyle!",
                ],
                icon: "😏",
              },
            ],
            mistakes: [
              {
                title: "The Novel",
                description: "Writing extremely long first messages",
                why: "Overwhelming and shows you're trying too hard",
                icon: "📚",
              },
              {
                title: "The Interview",
                description: "Asking too many questions at once",
                why: "Feels like an interrogation rather than natural conversation",
                icon: "❓",
              },
            ],
          },
        },
        {
          type: "quiz",
          title: "First Message Mastery",
          questions: [
            {
              id: 1,
              question: "What makes a first message effective in dating?",
              options: [
                { id: "A", text: "Being as attractive as possible", correct: false },
                { id: "B", text: "Showing you read their profile and asking engaging questions", correct: true },
                { id: "C", text: "Using pickup lines", correct: false },
                { id: "D", text: "Complimenting their appearance", correct: false },
              ],
              explanation:
                "Personal attention and engaging questions show genuine interest and create natural conversation flow.",
            },
            {
              id: 2,
              question: "Which first message is most likely to get a response?",
              options: [
                { id: "A", text: "Hey gorgeous", correct: false },
                {
                  id: "B",
                  text: "I see you're into photography! That street art shot is amazing - where did you find that mural?",
                  correct: true,
                },
                { id: "C", text: "What's up?", correct: false },
                { id: "D", text: "You're really pretty", correct: false },
              ],
              explanation:
                "Option B shows attention to their interests, gives a specific compliment, and asks an engaging question.",
            },
          ],
        },
      ],
    },
    "5-1": {
      title: "Group Dynamics",
      description: "Navigate group conversations with confidence",
      stage: "Stage 5",
      lesson: "Lesson 1",
      xpReward: 200,
      steps: [
        {
          type: "introduction",
          title: "The Art of Group Communication",
          content: {
            text: "Group chats have their own unique dynamics. Unlike one-on-one conversations, you need to consider multiple personalities, relationships, and communication styles all at once.",
            keyPoints: [
              "Manage multiple conversation threads",
              "Include everyone without dominating",
              "Navigate different personality types",
              "Maintain group harmony and engagement",
            ],
            icon: "👥",
          },
        },
        {
          type: "principle",
          title: "The GROUP Framework",
          content: {
            text: "Master group chat dynamics with these principles:",
            rules: [
              {
                title: "Gauge the Room",
                description: "Read the group's mood and energy before contributing",
                example: "Noticing if the conversation is serious, playful, or focused",
                icon: "📊",
              },
              {
                title: "Rotate Attention",
                description: "Make sure everyone feels included in the conversation",
                example: "Sarah, what do you think? Mike mentioned this earlier too",
                icon: "🔄",
              },
              {
                title: "Organize Chaos",
                description: "Help keep conversations on track when they get scattered",
                example: "Let's circle back to planning the trip - I think we had three options?",
                icon: "📋",
              },
              {
                title: "Unite, Don't Divide",
                description: "Build consensus and avoid creating sides",
                example: "I think we all want the same thing here - let's find common ground",
                icon: "🤝",
              },
              {
                title: "Positive Energy",
                description: "Contribute positively to the group's overall vibe",
                example: "This group always has the best ideas! Love brainstorming with you all",
                icon: "✨",
              },
            ],
          },
        },
        {
          type: "examples",
          title: "Group Chat Success vs. Failure",
          content: {
            text: "See how to contribute positively to group dynamics:",
            comparisons: [
              {
                situation: "Planning a group event",
                bad: {
                  text: "That restaurant is terrible. We should go somewhere else. I hate that place.",
                  issues: ["Negative without alternatives", "Dismissive of others' ideas", "Creates conflict"],
                },
                good: {
                  text: "I had a mixed experience there last time, but I'm open to it! What did everyone else think? Or should we explore a few options?",
                  strengths: ["Honest but diplomatic", "Includes others", "Offers alternatives"],
                },
              },
              {
                situation: "Someone shares exciting news",
                bad: {
                  text: "Cool. Anyway, did anyone see the game last night?",
                  issues: ["Dismissive", "Changes subject abruptly", "Ignores their excitement"],
                },
                good: {
                  text: "That's amazing, congratulations! 🎉 We should celebrate - who's free this weekend?",
                  strengths: ["Shows enthusiasm", "Builds on their news", "Includes the group"],
                },
              },
            ],
          },
        },
        {
          type: "quiz",
          title: "Group Dynamics Quiz",
          questions: [
            {
              id: 1,
              question: "What's the best way to handle disagreement in a group chat?",
              options: [
                { id: "A", text: "Take sides with whoever you agree with", correct: false },
                { id: "B", text: "Stay quiet and let others argue", correct: false },
                { id: "C", text: "Find common ground and redirect toward solutions", correct: true },
                { id: "D", text: "Tell everyone to stop arguing", correct: false },
              ],
              explanation:
                "Finding common ground helps unite the group and moves the conversation toward productive solutions.",
            },
            {
              id: 2,
              question: "How do you include a quiet group member in the conversation?",
              options: [
                { id: "A", text: "Call them out for not participating", correct: false },
                { id: "B", text: "Directly ask for their opinion on something relevant", correct: true },
                { id: "C", text: "Ignore them - they'll speak up if they want to", correct: false },
                { id: "D", text: "Message them privately instead", correct: false },
              ],
              explanation:
                "Directly but gently asking for their input shows you value their perspective and gives them an opening to contribute.",
            },
          ],
        },
      ],
    },
  }

  const toggleModule = (moduleId: string) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId ? { ...module, expanded: !module.expanded } : { ...module, expanded: false },
      ),
    )
  }

  const switchLesson = (lessonId: string) => {
    setCurrentLessonId(lessonId)
    setCurrentStep(0)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
  }

  const handleAnswerSelect = (answerId: string) => {
    const currentLessonData = allLessons[currentLessonId as keyof typeof allLessons]
    if (!currentLessonData || currentLessonData.steps[currentStep].type !== "quiz") return

    setSelectedAnswer(answerId)
    const quizStep = currentLessonData.steps[currentStep] as any
    const currentQuestion = quizStep.questions[currentQuestionIndex]
    const isCorrect = currentQuestion.options.find((opt: any) => opt.id === answerId)?.correct || false

    setTimeout(() => {
      setShowResult(true)
      if (isCorrect) {
        setScore(score + 10)
      }
    }, 500)
  }

  const nextQuestion = () => {
    const currentLessonData = allLessons[currentLessonId as keyof typeof allLessons]
    if (!currentLessonData || currentLessonData.steps[currentStep].type !== "quiz") return

    const quizStep = currentLessonData.steps[currentStep] as any
    if (currentQuestionIndex < quizStep.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      // Quiz completed, move to next step or complete lesson
      nextStep()
    }
  }

  const nextStep = () => {
    const currentLessonData = allLessons[currentLessonId as keyof typeof allLessons]
    if (!currentLessonData) return

    if (currentStep < currentLessonData.steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setCurrentQuestionIndex(0)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setCurrentQuestionIndex(0)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const currentLessonData = allLessons[currentLessonId as keyof typeof allLessons]
  if (!currentLessonData) return <div>Lesson not found</div>

  const currentStepData = currentLessonData.steps[currentStep]
  const progress = ((currentStep + 1) / currentLessonData.steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Nuntius Academy
                </span>
              </div>
              <nav className="flex items-center gap-8">
                <Link
                  href="/courses"
                  className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors"
                >
                  Courses
                </Link>
                <Link href="/practice" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  Practice
                </Link>
                <Link href="/community" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  Community
                </Link>
                <Link href="/achievements" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  Achievements
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search lessons..."
                  className="pl-10 w-64 bg-white/60 backdrop-blur-sm border-white/20 rounded-xl h-10 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl px-3 py-2">
                <Star className="h-4 w-4 text-white" />
                <span className="text-white font-bold text-sm">1,247 XP</span>
              </div>
              <Avatar className="h-10 w-10 ring-2 ring-blue-500/20">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                  A
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white/40 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              🏠 Home
            </Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-blue-600 transition-colors">
              Courses
            </Link>
            <span>/</span>
            <Link href="/courses/digital-communication" className="hover:text-blue-600 transition-colors">
              Digital Communication
            </Link>
            <span>/</span>
            <span className="text-blue-600 font-medium">
              {currentLessonData.stage} • {currentLessonData.lesson}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar - Course Modules */}
          <div className="col-span-3">
            <div className="space-y-3">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className="flex items-center justify-between p-5 cursor-pointer hover:bg-white/40 transition-all duration-200"
                    onClick={() => toggleModule(module.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg ${
                          module.progress === 100
                            ? "bg-gradient-to-br from-green-500 to-emerald-600"
                            : module.progress > 0
                              ? "bg-gradient-to-br from-orange-500 to-red-500"
                              : "bg-gradient-to-br from-gray-400 to-gray-500"
                        }`}
                      >
                        {module.progress === 100 ? (
                          <CheckCircle className="h-7 w-7" />
                        ) : module.progress > 0 ? (
                          `${module.progress}%`
                        ) : (
                          <div className="w-5 h-5 border-2 border-white rounded-full" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs text-blue-600 font-semibold mb-1">{module.stage}</div>
                        <div className="text-sm font-bold text-gray-800">{module.title}</div>
                      </div>
                    </div>
                    {module.expanded ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  {module.expanded && (
                    <div className="border-t border-white/20 bg-white/20">
                      {module.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => switchLesson(lesson.id)}
                          className={`w-full flex items-center justify-between px-5 py-4 hover:bg-white/30 transition-all duration-200 text-left ${
                            currentLessonId === lesson.id
                              ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-l-4 border-blue-500"
                              : ""
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 flex items-center justify-center">
                              {lesson.completed ? (
                                <CheckCircle className="h-6 w-6 text-green-500" />
                              ) : currentLessonId === lesson.id ? (
                                <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                </div>
                              ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-gray-400" />
                              )}
                            </div>
                            <span
                              className={`text-sm font-medium ${
                                currentLessonId === lesson.id ? "text-blue-700" : "text-gray-700"
                              }`}
                            >
                              {lesson.title}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 font-medium bg-white/40 rounded-full px-2 py-1">
                            {lesson.duration}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content - Interactive Lesson */}
          <div className="col-span-6">
            <div className="space-y-6">
              {/* Lesson Header */}
              <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-blue-200 text-sm font-medium mb-2">
                      {currentLessonData.stage} • {currentLessonData.lesson}
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{currentLessonData.title}</h1>
                    <p className="text-blue-100">{currentLessonData.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 mb-2">
                      <div className="text-2xl font-bold">{currentLessonData.xpReward}</div>
                      <div className="text-xs text-blue-200">XP Reward</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-3 bg-white/20" />
                  </div>
                  <div className="text-sm">
                    <span className="font-bold">{currentStep + 1}</span> of {currentLessonData.steps.length}
                  </div>
                </div>
              </div>

              {/* Lesson Content */}
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                {/* Introduction Step */}
                {currentStepData.type === "introduction" && (
                  <div className="text-center">
                    <div className="text-6xl mb-6">{currentStepData.content.icon}</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentStepData.title}</h2>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">{currentStepData.content.text}</p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {currentStepData.content.keyPoints.map((point, index) => (
                        <div key={index} className="bg-blue-50 rounded-2xl p-4 text-left">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-gray-700 font-medium">{point}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Principle Step */}
                {currentStepData.type === "principle" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{currentStepData.title}</h2>
                    <p className="text-lg text-gray-600 mb-8 text-center">{currentStepData.content.text}</p>

                    <div className="space-y-6">
                      {currentStepData.content.rules.map((rule, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200"
                        >
                          <div className="flex items-start gap-4">
                            <div className="text-3xl">{rule.icon}</div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-800 mb-2">{rule.title}</h3>
                              <p className="text-gray-600 mb-3">{rule.description}</p>
                              <div className="bg-white/60 rounded-xl p-3 border-l-4 border-blue-500">
                                <span className="text-sm font-medium text-gray-700">Example: </span>
                                <span className="text-sm text-gray-600 italic">"{rule.example}"</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Examples Step */}
                {currentStepData.type === "examples" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{currentStepData.title}</h2>
                    <p className="text-lg text-gray-600 mb-8 text-center">{currentStepData.content.text}</p>

                    <div className="space-y-8">
                      {currentStepData.content.comparisons.map((comparison, index) => (
                        <div key={index} className="bg-gray-50 rounded-2xl p-6">
                          <h3 className="font-bold text-gray-800 mb-4 text-center">{comparison.situation}</h3>

                          <div className="grid grid-cols-2 gap-6">
                            {/* Bad Example */}
                            <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
                              <div className="flex items-center gap-2 mb-3">
                                <ThumbsDown className="h-5 w-5 text-red-500" />
                                <span className="font-bold text-red-700">Don't Do This</span>
                              </div>
                              <div className="bg-white rounded-lg p-3 mb-3">
                                <p className="text-gray-800 italic">"{comparison.bad.text}"</p>
                              </div>
                              <div className="space-y-1">
                                {comparison.bad.issues.map((issue, i) => (
                                  <div key={i} className="flex items-center gap-2 text-sm text-red-600">
                                    <X className="h-3 w-3" />
                                    <span>{issue}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Good Example */}
                            <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                              <div className="flex items-center gap-2 mb-3">
                                <ThumbsUp className="h-5 w-5 text-green-500" />
                                <span className="font-bold text-green-700">Do This Instead</span>
                              </div>
                              <div className="bg-white rounded-lg p-3 mb-3">
                                <p className="text-gray-800 italic">"{comparison.good.text}"</p>
                              </div>
                              <div className="space-y-1">
                                {comparison.good.strengths.map((strength, i) => (
                                  <div key={i} className="flex items-center gap-2 text-sm text-green-600">
                                    <Check className="h-3 w-3" />
                                    <span>{strength}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Scenario Step */}
                {currentStepData.type === "scenario" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{currentStepData.title}</h2>
                    <p className="text-lg text-gray-600 mb-6">{currentStepData.content.text}</p>

                    {/* Chat Example */}
                    <div className="bg-gray-100 rounded-2xl p-6 mb-6">
                      <div className="space-y-3">
                        {currentStepData.content.chatExample.map((msg, index) => (
                          <div key={index} className="flex justify-start">
                            <div className="bg-white rounded-2xl px-4 py-2 max-w-xs shadow-sm">
                              <div className="text-xs text-gray-500 mb-1">{msg.name}</div>
                              <p className="text-sm text-gray-800">{msg.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Good Response */}
                    <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                      <h3 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                        <Lightbulb className="h-5 w-5" />
                        Great Response:
                      </h3>
                      <div className="bg-white rounded-xl p-4 mb-4">
                        <p className="text-gray-800 italic">"{currentStepData.content.goodResponse}"</p>
                      </div>
                      <div className="bg-green-100 rounded-xl p-4">
                        <h4 className="font-semibold text-green-800 mb-2">Why this works:</h4>
                        <p className="text-green-700 text-sm">{currentStepData.content.explanation}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tips Step */}
                {currentStepData.type === "tips" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{currentStepData.title}</h2>
                    <p className="text-lg text-gray-600 mb-8 text-center">{currentStepData.content.text}</p>

                    {/* Pro Tips */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        Pro Tips
                      </h3>
                      <div className="space-y-4">
                        {currentStepData.content.tips.map((tip, index) => (
                          <div key={index} className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                            <div className="flex items-start gap-4">
                              <div className="text-2xl">{tip.icon}</div>
                              <div className="flex-1">
                                <h4 className="font-bold text-gray-800 mb-2">{tip.title}</h4>
                                <p className="text-gray-600 mb-3">{tip.description}</p>
                                <div className="space-y-2">
                                  {tip.examples.map((example, i) => (
                                    <div key={i} className="bg-white/60 rounded-lg p-2 text-sm text-gray-700">
                                      {example}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Common Mistakes */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        Common Mistakes to Avoid
                      </h3>
                      <div className="space-y-4">
                        {currentStepData.content.mistakes.map((mistake, index) => (
                          <div key={index} className="bg-red-50 rounded-2xl p-6 border border-red-200">
                            <div className="flex items-start gap-4">
                              <div className="text-2xl">{mistake.icon}</div>
                              <div className="flex-1">
                                <h4 className="font-bold text-red-800 mb-2">{mistake.title}</h4>
                                <p className="text-gray-600 mb-2">{mistake.description}</p>
                                <div className="bg-red-100 rounded-lg p-3">
                                  <span className="text-sm font-medium text-red-700">Why to avoid: </span>
                                  <span className="text-sm text-red-600">{mistake.why}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Quiz Step */}
                {currentStepData.type === "quiz" && (
                  <div>
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Trophy className="h-8 w-8 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentStepData.title}</h2>
                      <p className="text-gray-600">Let's see how well you've learned the concepts!</p>
                      <div className="mt-4">
                        <span className="text-sm text-gray-500">
                          Question {currentQuestionIndex + 1} of {(currentStepData as any).questions.length}
                        </span>
                      </div>
                    </div>

                    {/* Current Quiz Question */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">
                        {(currentStepData as any).questions[currentQuestionIndex].question}
                      </h3>

                      <div className="space-y-3 mb-6">
                        {(currentStepData as any).questions[currentQuestionIndex].options.map((option: any) => (
                          <button
                            key={option.id}
                            onClick={() => handleAnswerSelect(option.id)}
                            disabled={showResult}
                            className={`w-full p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                              selectedAnswer === option.id
                                ? showResult
                                  ? option.correct
                                    ? "bg-green-100 border-green-500 text-green-800"
                                    : "bg-red-100 border-red-500 text-red-800"
                                  : "bg-blue-100 border-blue-500 text-blue-800"
                                : showResult && option.correct
                                  ? "bg-green-100 border-green-500 text-green-800"
                                  : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-blue-300 text-gray-700"
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                                  selectedAnswer === option.id && showResult
                                    ? option.correct
                                      ? "bg-green-500 text-white"
                                      : "bg-red-500 text-white"
                                    : showResult && option.correct
                                      ? "bg-green-500 text-white"
                                      : "bg-blue-500 text-white"
                                }`}
                              >
                                {showResult ? (
                                  selectedAnswer === option.id ? (
                                    option.correct ? (
                                      <Check className="h-4 w-4" />
                                    ) : (
                                      <X className="h-4 w-4" />
                                    )
                                  ) : option.correct ? (
                                    <Check className="h-4 w-4" />
                                  ) : (
                                    option.id
                                  )
                                ) : (
                                  option.id
                                )}
                              </div>
                              <span className="font-medium">{option.text}</span>
                            </div>
                          </button>
                        ))}
                      </div>

                      {showResult && (
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200 mb-4">
                          <div className="flex items-start gap-3">
                            <Lightbulb className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div>
                              <h4 className="font-bold text-gray-800 mb-1">Explanation</h4>
                              <p className="text-gray-700 text-sm">
                                {(currentStepData as any).questions[currentQuestionIndex].explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {showResult && (
                        <div className="flex justify-center">
                          <Button
                            onClick={nextQuestion}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2"
                          >
                            {currentQuestionIndex < (currentStepData as any).questions.length - 1 ? (
                              <>
                                Next Question
                                <ArrowRight className="h-4 w-4 ml-2" />
                              </>
                            ) : (
                              <>
                                Complete Quiz
                                <Award className="h-4 w-4 ml-2" />
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                  <Button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    variant="outline"
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span className="font-bold text-gray-700">Score: {score} XP</span>
                  </div>

                  {currentStepData.type !== "quiz" && (
                    <Button
                      onClick={nextStep}
                      disabled={currentStep === currentLessonData.steps.length - 1}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center gap-2"
                    >
                      {currentStep === currentLessonData.steps.length - 1 ? (
                        <>
                          Complete Lesson
                          <Award className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Next
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Course Info */}
          <div className="col-span-3">
            <div className="space-y-6">
              {/* Course Stats */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Your Progress
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Lessons Completed</span>
                    <span className="font-bold text-gray-800">12/25</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Current Streak</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-orange-600">7 days</span>
                      <Zap className="h-4 w-4 text-orange-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total XP</span>
                    <span className="font-bold text-yellow-600">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Accuracy Rate</span>
                    <span className="font-bold text-green-600">89%</span>
                  </div>
                </div>
              </div>

              {/* Course Metadata */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Course Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Level</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Beginner</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Duration</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">5 Stages, 16 Hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Practice</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">Daily</span>
                  </div>
                </div>
              </div>

              {/* Course Overview */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="font-bold text-gray-800 mb-4">Course Overview</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Instructor</p>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" />
                        <AvatarFallback className="bg-blue-500 text-white text-xs">SM</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-blue-600">Sarah Martinez</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Digital Communication Mastery</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Communication</Badge>
                      <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">Social Skills</Badge>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Texting</Badge>
                      <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-100">Dating</Badge>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Master the art of digital communication through interactive lessons, real-world scenarios, and
                      personalized feedback.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Learning Path:</h4>
                    <div className="space-y-2">
                      {[
                        "Basics of Digital Communication",
                        "Conversation Flow Techniques",
                        "Advanced Texting Strategies",
                        "Dating & Romance Communication",
                        "Group Chat Mastery",
                      ].map((stage, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center ${
                              index < 2 ? "bg-green-500" : index === 2 ? "bg-blue-500" : "bg-gray-300"
                            }`}
                          >
                            {index < 2 ? (
                              <Check className="h-3 w-3 text-white" />
                            ) : index === 2 ? (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            ) : (
                              <div className="w-2 h-2 bg-white rounded-full opacity-50" />
                            )}
                          </div>
                          <span className={index < 3 ? "text-gray-700" : "text-gray-500"}>{stage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

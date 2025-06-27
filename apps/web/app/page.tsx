"use client"

import type React from "react"

// Custom components
const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  onClick,
  ...props
}: {
  children: React.ReactNode
  className?: string
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "lg"
  onClick?: () => void
  [key: string]: any
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "hover:bg-gray-100 text-gray-900",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-900",
  }

  const sizes = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-8 px-3 py-1 text-sm",
    lg: "h-12 px-6 py-3 text-base",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

const Input = ({
  className = "",
  placeholder,
  onFocus,
  onBlur,
  ...props
}: {
  className?: string
  placeholder?: string
  onFocus?: () => void
  onBlur?: () => void
  [key: string]: any
}) => {
  return (
    <input
      className={`flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
      {...props}
    />
  )
}

const Badge = ({
  children,
  className = "",
  variant = "default",
}: {
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline"
}) => {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"

  const variants = {
    default: "bg-blue-100 text-blue-800",
    outline: "border border-gray-300 text-gray-700",
  }

  return <span className={`${baseClasses} ${variants[variant]} ${className}`}>{children}</span>
}

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>{children}</div>
}

const CardHeader = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
}

const CardTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
}

const CardDescription = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <p className={`text-sm text-gray-600 ${className}`}>{children}</p>
}

const CardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>
}

import {
  Search,
  Home,
  Shield,
  Users,
  MapPin,
  Star,
  CheckCircle,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Wifi,
  Zap,
  Play,
  ArrowRight,
  Award,
  Clock,
  ChevronLeft,
  ChevronRight,
  Quote,
  Sparkles,
  Heart,
  Eye,
  Share2,
  TrendingUp,
  MessageCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Component() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [stats, setStats] = useState({ properties: 0, users: 0, cities: 0, satisfaction: 0 })
  const [searchFocused, setSearchFocused] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeFilter, setActiveFilter] = useState("all")
  const [likedProperties, setLikedProperties] = useState<number[]>([])

  const testimonials = [
    {
      name: "Ankit Sharma",
      role: "Software Engineer",
      content:
        "Found an amazing PG near my office through Baasthan. The process was so smooth and the property was exactly as shown in photos.",
      rating: 5,
      avatar: "A",
      location: "Bangalore",
    },
    {
      name: "Priya Patel",
      role: "Marketing Executive",
      content:
        "Great platform for finding PGs! The verification process gives me confidence and the support team is very helpful.",
      rating: 5,
      avatar: "P",
      location: "Mumbai",
    },
    {
      name: "Rahul Kumar",
      role: "MBA Student",
      content:
        "As a student, finding affordable and safe accommodation was my priority. Baasthan helped me find the perfect PG near my college.",
      rating: 5,
      avatar: "R",
      location: "Delhi",
    },
    {
      name: "Sneha Gupta",
      role: "Data Analyst",
      content:
        "The best part about Baasthan is the transparency. No hidden charges, verified properties, and excellent customer service. Highly recommended!",
      rating: 5,
      avatar: "S",
      location: "Pune",
    },
    {
      name: "Arjun Singh",
      role: "Graphic Designer",
      content:
        "Moving to a new city was stressful, but Baasthan made finding accommodation so easy. The PG I found has all amenities and great roommates.",
      rating: 5,
      avatar: "A",
      location: "Hyderabad",
    },
    {
      name: "Kavya Reddy",
      role: "Content Writer",
      content:
        "I love how Baasthan focuses on safety and community. The PG I'm staying in feels like home, and I've made lifelong friends here.",
      rating: 5,
      avatar: "K",
      location: "Chennai",
    },
    {
      name: "Vikram Joshi",
      role: "Financial Analyst",
      content:
        "Zero brokerage and instant booking - that's what attracted me to Baasthan. The entire process was hassle-free and transparent.",
      rating: 5,
      avatar: "V",
      location: "Gurgaon",
    },
    {
      name: "Meera Nair",
      role: "UX Designer",
      content:
        "The quality of PGs listed on Baasthan is exceptional. Clean, safe, and well-maintained properties with all modern amenities.",
      rating: 5,
      avatar: "M",
      location: "Kochi",
    },
  ]

  const featuredProperties = [
    {
      id: 1,
      title: "Premium PG in Koramangala",
      location: "Koramangala, Bangalore",
      price: "₹15,000",
      rating: 4.8,
      reviews: 124,
      amenities: ["WiFi", "AC", "Meals", "Laundry"],
      type: "Single",
      verified: true,
      images: ["/placeholder.svg?height=300&width=400"],
    },
    {
      id: 2,
      title: "Modern Shared PG in Andheri",
      location: "Andheri West, Mumbai",
      price: "₹12,000",
      rating: 4.6,
      reviews: 89,
      amenities: ["WiFi", "Gym", "Food", "Security"],
      type: "Shared",
      verified: true,
      images: ["/placeholder.svg?height=300&width=400"],
    },
    {
      id: 3,
      title: "Luxury PG near Cyber City",
      location: "Gurgaon, Delhi NCR",
      price: "₹18,000",
      rating: 4.9,
      reviews: 156,
      amenities: ["WiFi", "AC", "Gym", "Pool"],
      type: "Single",
      verified: true,
      images: ["/placeholder.svg?height=300&width=400"],
    },
  ]

  const toggleLike = (propertyId: number) => {
    setLikedProperties((prev) =>
      prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId],
    )
  }

  useEffect(() => {
    // Animate stats counter
    const animateStats = () => {
      const targets = { properties: 5000, users: 25000, cities: 50, satisfaction: 98 }
      const duration = 2000
      const steps = 60
      const stepTime = duration / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps
        const easeOut = 1 - Math.pow(1 - progress, 3)

        setStats({
          properties: Math.floor(targets.properties * easeOut),
          users: Math.floor(targets.users * easeOut),
          cities: Math.floor(targets.cities * easeOut),
          satisfaction: Math.floor(targets.satisfaction * easeOut),
        })

        if (step >= steps) clearInterval(timer)
      }, stepTime)
    }

    // Intersection Observer for animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
            if (entry.target.classList.contains("stats-section")) {
              animateStats()
            }
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(
      ".fade-in-up, .fade-in-left, .fade-in-right, .stagger-item, .stats-section",
    )
    elements.forEach((el) => observerRef.current?.observe(el))

    // Mouse tracking for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Auto-rotate testimonials
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => {
      observerRef.current?.disconnect()
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(testimonialTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }

        .olx-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid #f0f0f0;
          overflow: hidden;
          position: relative;
        }

        .olx-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          border-color: #3b82f6;
        }

        .olx-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.5s;
        }

        .olx-card:hover::before {
          left: 100%;
        }

        .property-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          border: 1px solid #e5e7eb;
          position: relative;
        }

        .property-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }

        .property-image {
          position: relative;
          overflow: hidden;
          height: 200px;
        }

        .property-image img {
          transition: transform 0.5s ease;
        }

        .property-card:hover .property-image img {
          transform: scale(1.1);
        }

        .property-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.7));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .property-card:hover .property-overlay {
          opacity: 1;
        }

        .property-actions {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          gap: 8px;
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.3s ease;
        }

        .property-card:hover .property-actions {
          opacity: 1;
          transform: translateY(0);
        }

        .action-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          background: #3b82f6;
          color: white;
          transform: scale(1.1);
        }

        .action-btn.liked {
          background: #ef4444;
          color: white;
        }

        .floating-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #10b981;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          transform: translateX(100%);
          transition: transform 0.3s ease;
          z-index: 1000;
        }

        .floating-notification.show {
          transform: translateX(0);
        }

        .search-suggestions {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          border: 1px solid #e5e7eb;
          z-index: 10;
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.3s ease;
        }

        .search-suggestions.show {
          opacity: 1;
          transform: translateY(0);
        }

        .suggestion-item {
          padding: 12px 16px;
          cursor: pointer;
          transition: background 0.2s ease;
          border-bottom: 1px solid #f3f4f6;
        }

        .suggestion-item:hover {
          background: #f8fafc;
        }

        .suggestion-item:last-child {
          border-bottom: none;
        }

        .filter-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          overflow-x: auto;
          padding-bottom: 8px;
        }

        .filter-tab {
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid #e5e7eb;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          font-weight: 500;
        }

        .filter-tab:hover {
          border-color: #3b82f6;
          background: #f0f9ff;
        }

        .filter-tab.active {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .gradient-text {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-gradient {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #bae6fd 50%, #7dd3fc 75%, #38bdf8 100%);
        }

        .floating-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }

        .floating-shape {
          position: absolute;
          opacity: 0.1;
          animation: float 6s ease-in-out infinite;
        }

        .floating-shape:nth-child(1) {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .floating-shape:nth-child(2) {
          top: 60%;
          right: 10%;
          animation-delay: 2s;
        }

        .floating-shape:nth-child(3) {
          bottom: 20%;
          left: 20%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .interactive-cursor {
          position: fixed;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.1s ease;
        }

        .fade-in-up {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .fade-in-left {
          opacity: 0;
          transform: translateX(-30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .fade-in-right {
          opacity: 0;
          transform: translateX(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-in {
          opacity: 1 !important;
          transform: translate(0) !important;
        }

        .stagger-item {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stagger-item:nth-child(1) { transition-delay: 0.1s; }
        .stagger-item:nth-child(2) { transition-delay: 0.2s; }
        .stagger-item:nth-child(3) { transition-delay: 0.3s; }
        .stagger-item:nth-child(4) { transition-delay: 0.4s; }
        .stagger-item:nth-child(5) { transition-delay: 0.5s; }
        .stagger-item:nth-child(6) { transition-delay: 0.6s; }

        .premium-button {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border: none;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .premium-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .premium-button:hover::before {
          left: 100%;
        }

        .premium-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
        }

        .search-container {
          position: relative;
          transition: all 0.3s ease;
        }

        .search-container.focused {
          transform: scale(1.02);
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }

        .testimonial-card {
          background: linear-gradient(145deg, #ffffff, #f8fafc);
          border: 1px solid rgba(59, 130, 246, 0.1);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }

        .testimonial-card.active {
          transform: scale(1.05) rotateY(0deg);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
          z-index: 10;
        }

        .testimonial-card:not(.active) {
          transform: scale(0.95) rotateY(5deg);
          opacity: 0.7;
        }

        .stats-counter {
          font-variant-numeric: tabular-nums;
          transition: all 0.3s ease;
        }

        .icon-glow {
          filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.3));
          transition: all 0.3s ease;
        }

        .icon-glow:hover {
          filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.5));
          transform: scale(1.1);
        }

        .morphing-blob {
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          animation: morph 8s ease-in-out infinite;
        }

        @keyframes morph {
          0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
          50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
          75% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
        }

        .text-shadow-glow {
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }

        .interactive-element {
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .interactive-element:hover {
          transform: translateY(-2px);
        }

        .bounce-in {
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes bounceIn {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .slide-up {
          animation: slideUp 0.5s ease-out;
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .stats-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 24px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stats-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.6s;
        }

        .stats-card:hover::before {
          left: 100%;
        }

        .stats-card:hover {
          transform: translateY(-12px) scale(1.05);
          box-shadow: 0 25px 50px rgba(59, 130, 246, 0.3);
          border-color: rgba(255,255,255,0.5);
        }

        .stats-icon {
          width: 4rem;
          height: 4rem;
          background: linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1));
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .stats-card:hover .stats-icon {
          transform: scale(1.1) rotate(5deg);
          background: linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.2));
          box-shadow: 0 8px 25px rgba(255,255,255,0.2);
        }

        .stats-number {
          font-size: 3rem;
          font-weight: 900;
          background: linear-gradient(135deg, #ffffff, #e0f2fe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 30px rgba(255,255,255,0.5);
          margin-bottom: 0.5rem;
          line-height: 1;
        }

        .stats-label {
          color: rgba(255,255,255,0.9);
          font-weight: 600;
          font-size: 1.1rem;
          letter-spacing: 0.5px;
        }

        @media (max-width: 768px) {
          .stats-number {
            font-size: 2.5rem;
          }
          
          .stats-icon {
            width: 3rem;
            height: 3rem;
          }
        }
      `}</style>

      {/* Interactive Cursor */}
      <div
        className="interactive-cursor"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
        }}
      />

      {/* Floating Background Shapes */}
      <div className="floating-shapes">
        <div className="floating-shape w-32 h-32 bg-blue-200 rounded-full morphing-blob"></div>
        <div className="floating-shape w-24 h-24 bg-blue-300 rounded-full morphing-blob"></div>
        <div className="floating-shape w-40 h-40 bg-blue-100 rounded-full morphing-blob"></div>
      </div>

      {/* Hero Section */}
      <section className="hero-gradient py-24 lg:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-6 fade-in-left">
                <Badge className="bg-white/20 text-blue-700 hover:bg-white/30 backdrop-blur-sm border-white/30 px-4 py-2 text-sm font-medium bounce-in">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Trusted PG Rental Platform
                  <div className="pulse-dot ml-2"></div>
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight text-shadow-glow">
                  Find Your Perfect
                  <span className="gradient-text block"> PG Home</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium">
                  Discover comfortable, affordable, and safe paying guest accommodations. Your home away from home is
                  just a click away.
                </p>
              </div>

              <div
                className={`search-container glass-effect p-8 rounded-3xl shadow-2xl border border-white/30 ${searchFocused ? "focused" : ""}`}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Enter city, area, or landmark"
                      className="h-14 pl-12 border-0 bg-white/50 backdrop-blur-sm text-lg font-medium focus:bg-white/70 transition-all duration-300"
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setSearchFocused(false)}
                    />
                    <div className={`search-suggestions ${searchFocused ? "show" : ""}`}>
                      {[
                        "Koramangala, Bangalore",
                        "Andheri, Mumbai",
                        "Cyber City, Gurgaon",
                        "Whitefield, Bangalore",
                      ].map((suggestion, index) => (
                        <div key={index} className="suggestion-item">
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{suggestion}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button className="premium-button h-14 px-8 text-lg font-semibold">
                    <Search className="w-5 h-5 mr-2" />
                    Search PGs
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>

                <div className="flex items-center justify-center space-x-8 mt-6 text-sm text-gray-600">
                  {[
                    { icon: CheckCircle, text: "Verified Properties" },
                    { icon: Shield, text: "Zero Brokerage" },
                    { icon: Clock, text: "24/7 Support" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 interactive-element">
                      <item.icon className="w-5 h-5 text-green-500 icon-glow" />
                      <span className="font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative fade-in-right">
              <div className="relative z-10">
                <Image
                  src="/placeholder.svg?height=700&width=600"
                  alt="Modern PG accommodation"
                  width={600}
                  height={700}
                  className="rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg bounce-in">
                  <Award className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="absolute -top-8 -right-8 w-full h-full bg-gradient-to-br from-blue-200 to-blue-300 rounded-3xl -z-10 morphing-blob"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-6 mb-16 fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900">
              Featured <span className="gradient-text">Properties</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Handpicked premium PG accommodations with verified amenities and great reviews
            </p>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="filter-tabs flex-1">
              {["All", "Single", "Shared", "Premium"].map((filter) => (
                <button
                  key={filter}
                  className={`filter-tab ${activeFilter === filter.toLowerCase() ? "active" : ""}`}
                  onClick={() => setActiveFilter(filter.toLowerCase())}
                >
                  {filter}
                </button>
              ))}
            </div>
            <Button className="premium-button px-6 py-2 ml-4">
              View All Properties
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <div key={property.id} className="property-card stagger-item">
                <div className="property-image">
                  <Image
                    src={property.images[0] || "/placeholder.svg"}
                    alt={property.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <div className="property-overlay"></div>
                  <div className="property-actions">
                    <button
                      className={`action-btn ${likedProperties.includes(property.id) ? "liked" : ""}`}
                      onClick={() => toggleLike(property.id)}
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="action-btn">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="action-btn">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                  {property.verified && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                        {property.title}
                      </h3>
                      <p className="text-gray-600 flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{property.location}</span>
                      </p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700">{property.type}</Badge>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{property.rating}</span>
                      <span className="text-gray-500 text-sm">({property.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {property.amenities.slice(0, 3).map((amenity, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {property.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{property.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{property.price}</span>
                      <span className="text-gray-500">/month</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Chat
                      </Button>
                      <Button size="sm" className="premium-button">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 stats-section relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
              Our <span className="text-blue-200">Impact</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Trusted by thousands across India for safe and comfortable PG accommodations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                label: "Properties Listed",
                value: stats.properties,
                suffix: "+",
                icon: Home,
                description: "Verified accommodations",
              },
              {
                label: "Happy Users",
                value: stats.users,
                suffix: "+",
                icon: Users,
                description: "Satisfied residents",
              },
              {
                label: "Cities Covered",
                value: stats.cities,
                suffix: "",
                icon: MapPin,
                description: "Major Indian cities",
              },
              {
                label: "Satisfaction Rate",
                value: stats.satisfaction,
                suffix: "%",
                icon: TrendingUp,
                description: "Customer happiness",
              },
            ].map((stat, index) => (
              <div key={index} className="stats-card text-center group">
                <div className="stats-decoration"></div>
                <div className="stats-icon">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="stats-number stats-counter">
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="stats-label">{stat.label}</div>
                <p className="text-blue-200 text-sm mt-2 opacity-80">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="text-center space-y-8 mb-24 fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-blue-200/50">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-semibold">Why Choose Us</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
              Why Choose <span className="gradient-text">Baasthan?</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed">
              Experience the future of PG accommodation with our cutting-edge platform designed for modern living
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: Shield,
                title: "AI-Verified Properties",
                description:
                  "Every property undergoes rigorous AI-powered verification for safety, cleanliness, and authenticity. Our smart screening process ensures you get exactly what you see.",
                color: "from-emerald-400 via-green-500 to-teal-600",
                bgColor: "from-emerald-50 to-green-50",
                iconBg: "from-emerald-100 to-green-100",
                stats: "100% Verified",
              },
              {
                icon: Users,
                title: "Smart Community Matching",
                description:
                  "Our intelligent algorithm matches you with like-minded roommates based on lifestyle, interests, and preferences for the perfect living experience.",
                color: "from-purple-400 via-violet-500 to-indigo-600",
                bgColor: "from-purple-50 to-violet-50",
                iconBg: "from-purple-100 to-violet-100",
                stats: "95% Match Rate",
              },
              {
                icon: MapPin,
                title: "Strategic Locations",
                description:
                  "Handpicked locations near tech hubs, universities, metro stations, and entertainment districts. Your commute just got easier and more convenient.",
                color: "from-red-400 via-pink-500 to-rose-600",
                bgColor: "from-red-50 to-pink-50",
                iconBg: "from-red-100 to-pink-100",
                stats: "50+ Prime Areas",
              },
              {
                icon: Wifi,
                title: "Premium Amenities",
                description:
                  "Ultra-fast WiFi, climate control, modern appliances, and luxury facilities. Every comfort you need for productive living and relaxation.",
                color: "from-blue-400 via-cyan-500 to-sky-600",
                bgColor: "from-blue-50 to-cyan-50",
                iconBg: "from-blue-100 to-cyan-100",
                stats: "20+ Amenities",
              },
              {
                icon: Zap,
                title: "Instant Digital Booking",
                description:
                  "Book your perfect PG in under 60 seconds with our streamlined digital process. Virtual tours, instant approvals, and seamless move-ins.",
                color: "from-yellow-400 via-amber-500 to-orange-600",
                bgColor: "from-yellow-50 to-amber-50",
                iconBg: "from-yellow-100 to-amber-100",
                stats: "< 60 Seconds",
              },
              {
                icon: Phone,
                title: "24/7 Concierge Support",
                description:
                  "Dedicated relationship managers, emergency support, and premium customer service. We're here whenever you need us, day or night.",
                color: "from-indigo-400 via-blue-500 to-purple-600",
                bgColor: "from-indigo-50 to-blue-50",
                iconBg: "from-indigo-100 to-blue-100",
                stats: "Always Available",
              },
            ].map((feature, index) => (
              <div key={index} className="group stagger-item">
                <div
                  className={`relative p-8 rounded-3xl bg-gradient-to-br ${feature.bgColor} border border-white/60 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 cursor-pointer overflow-hidden`}
                >
                  {/* Animated background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                  ></div>

                  {/* Floating particles effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-700"></div>
                  </div>

                  <div className="relative z-10 space-y-6">
                    {/* Icon with enhanced styling */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-20 h-20 bg-gradient-to-br ${feature.iconBg} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 border border-white/50`}
                      >
                        <feature.icon
                          className={`w-10 h-10 bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`}
                        />
                      </div>
                      <div
                        className={`px-3 py-1 bg-gradient-to-r ${feature.color} text-white text-xs font-bold rounded-full shadow-lg`}
                      >
                        {feature.stats}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-black text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed font-medium text-lg group-hover:text-gray-700 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>

                    {/* Interactive arrow */}
                    <div className="flex items-center space-x-2 text-gray-400 group-hover:text-gray-600 transition-colors duration-300">
                      <span className="text-sm font-semibold">Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Hover border effect */}
                  <div
                    className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20 fade-in-up">
            <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-xl border border-blue-200/50">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-semibold">5000+ Happy Residents</span>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-gray-700 font-semibold">4.9/5 Rating</span>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700 font-semibold">Trusted Platform</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-6 mb-20 fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Find your perfect PG in just 3 simple steps with our intelligent matching system
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 transform -translate-y-1/2"></div>
            <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-purple-300 to-blue-300 transform -translate-y-1/2"></div>

            {[
              {
                step: "1",
                title: "Search & Filter",
                description:
                  "Enter your preferred location and filter by price, amenities, room type, and lifestyle preferences",
                icon: Search,
                color: "from-blue-500 to-blue-700",
              },
              {
                step: "2",
                title: "Visit & Choose",
                description:
                  "Schedule virtual or physical visits to shortlisted PGs and choose the one that feels like home",
                icon: Heart,
                color: "from-purple-500 to-purple-700",
              },
              {
                step: "3",
                title: "Book & Move In",
                description: "Complete the secure booking process online and move into your new PG with zero hassle",
                icon: CheckCircle,
                color: "from-green-500 to-green-700",
              },
            ].map((step, index) => (
              <div key={index} className="text-center space-y-6 stagger-item group">
                <div className="relative">
                  <div
                    className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-all duration-300 relative z-10`}
                  >
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg z-20 bounce-in">
                    <span className="text-sm font-black text-gray-800">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium max-w-sm mx-auto">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Testimonials */}
      <section className="py-24 bg-gradient-to-r from-gray-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-10"></div>
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="text-center space-y-6 mb-20 fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-black text-white">
              What Our <span className="text-blue-400">Residents Say</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto font-medium">
              Hear from thousands of happy residents who found their perfect PG through Baasthan
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="flex items-center justify-center space-x-8">
              <Button
                variant="ghost"
                size="lg"
                className="text-white hover:text-blue-400 hover:bg-white/10 olx-card bg-white/5"
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <div className="flex space-x-6 overflow-hidden">
                {testimonials.slice(currentTestimonial, currentTestimonial + 3).map((testimonial, index) => (
                  <div key={index} className={`testimonial-card min-w-[350px] ${index === 1 ? "active" : ""} slide-up`}>
                    <div className="p-8 space-y-6">
                      <Quote className="w-12 h-12 text-blue-500 opacity-50" />
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed font-medium italic">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{testimonial.avatar}</span>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-lg">{testimonial.name}</p>
                          <p className="text-gray-500 font-medium">{testimonial.role}</p>
                          <p className="text-gray-400 text-sm flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{testimonial.location}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="ghost"
                size="lg"
                className="text-white hover:text-blue-400 hover:bg-white/10 olx-card bg-white/5"
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? "bg-blue-400 w-8" : "bg-white/30"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] opacity-10"></div>
        <div className="container mx-auto px-4 lg:px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-10 fade-in-up">
            <h2 className="text-4xl lg:text-6xl font-black text-white text-shadow-glow">
              Ready to Find Your Perfect PG?
            </h2>
            <p className="text-xl lg:text-2xl text-blue-100 font-medium leading-relaxed">
              Join thousands of happy residents who found their ideal accommodation through Baasthan
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 text-lg font-bold premium-button"
              >
                <Search className="w-6 h-6 mr-3" />
                Find PG Now
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 text-lg font-bold premium-button bg-transparent"
              >
                <Play className="w-6 h-6 mr-3" />
                Watch Demo
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-8 text-blue-100 text-sm font-medium">
              <div className="flex items-center space-x-2 interactive-element">
                <CheckCircle className="w-5 h-5" />
                <span>Free to Use</span>
              </div>
              <div className="flex items-center space-x-2 interactive-element">
                <CheckCircle className="w-5 h-5" />
                <span>Instant Booking</span>
              </div>
              <div className="flex items-center space-x-2 interactive-element">
                <CheckCircle className="w-5 h-5" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center interactive-element">
                <span className="text-3xl font-bold gradient-text">Baasthan</span>
              </div>
              <p className="text-gray-300 leading-relaxed font-medium">
                Your trusted partner in finding the perfect PG accommodation. Safe, comfortable, and affordable living
                spaces with premium amenities.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram].map((Icon, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all duration-300 interactive-element olx-card"
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>

            {[
              {
                title: "For Tenants",
                links: ["Find PG", "How it Works", "Safety Guidelines", "Support"],
              },
              {
                title: "For Owners",
                links: ["List Property", "Owner Dashboard", "Pricing", "Resources"],
              },
              {
                title: "Company",
                links: ["Careers", "Press", "Legal"],
              },
            ].map((section, index) => (
              <div key={index} className="space-y-6">
                <h3 className="text-xl font-bold text-white">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href="#"
                        className="text-gray-300 hover:text-white transition-all duration-300 font-medium interactive-element hover:translate-x-2"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 font-medium">
              &copy; {new Date().getFullYear()} Baasthan. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-gray-400">
              <Link href="#" className="hover:text-white transition-colors font-medium interactive-element">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors font-medium interactive-element">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  Home,
  Shield,
  Users,
  MapPin,
  Star,
  CheckCircle,
  Facebook,
  Twitter,
  Instagram,
  Play,
  ArrowRight,
  Award,
  Clock,
  Sparkles,
  Heart,
  Eye,
  Share2,
  TrendingUp,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Quote,
  Zap,
  Globe,
  Camera,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
} from "lucide-react"

// Custom Button Component
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
  variant?: "default" | "ghost" | "outline" | "secondary"
  size?: "default" | "sm" | "lg"
  onClick?: () => void
  [key: string]: any
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transform hover:scale-105 active:scale-95"
  const variants = {
    default:
      "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl",
    ghost: "hover:bg-gray-100 text-gray-900 hover:shadow-md",
    outline: "border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-900 hover:border-blue-500 hover:shadow-lg",
    secondary:
      "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 hover:from-gray-200 hover:to-gray-300 shadow-md hover:shadow-lg",
  }
  const sizes = {
    default: "h-12 px-6 py-3 text-sm",
    sm: "h-10 px-4 py-2 text-sm",
    lg: "h-14 px-8 py-4 text-base",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

// Custom Input Component
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
      className={`flex w-full rounded-xl border-2 border-gray-200 bg-white/90 backdrop-blur-sm px-4 py-3 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
      {...props}
    />
  )
}

// Custom Badge Component
const Badge = ({
  children,
  className = "",
  variant = "default",
}: {
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline" | "secondary" | "success" | "gradient"
}) => {
  const baseClasses =
    "inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-300 hover:scale-105"
  const variants = {
    default: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    outline: "border-2 border-gray-300 text-gray-700 bg-white hover:border-blue-500 hover:text-blue-700",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    success: "bg-green-100 text-green-800 hover:bg-green-200",
    gradient: "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl",
  }

  return <span className={`${baseClasses} ${variants[variant]} ${className}`}>{children}</span>
}

// Custom Card Components
const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  )
}

const CardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={`p-6 ${className}`}>{children}</div>
}

export default function Component() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [stats, setStats] = useState({ properties: 0, users: 0, cities: 0, satisfaction: 0 })
  const [searchFocused, setSearchFocused] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [likedProperties, setLikedProperties] = useState<number[]>([])

  const testimonials = [
    {
      name: "Ankit Sharma",
      role: "Software Engineer",
      content:
        "Found an amazing PG near my office through Baasthan. The process was so smooth and the property was exactly as shown in photos. The virtual tour feature is incredible!",
      rating: 5,
      avatar: "A",
      location: "Bangalore",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Priya Patel",
      role: "Marketing Executive",
      content:
        "Great platform for finding PGs! The verification process gives me confidence and the support team is very helpful. Love the community features too!",
      rating: 5,
      avatar: "P",
      location: "Mumbai",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Rahul Kumar",
      role: "MBA Student",
      content:
        "As a student, finding affordable and safe accommodation was my priority. Baasthan helped me find the perfect PG near my college with amazing amenities.",
      rating: 5,
      avatar: "R",
      location: "Delhi",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Sneha Gupta",
      role: "Data Analyst",
      content:
        "The best part about Baasthan is the transparency. No hidden charges, verified properties, and excellent customer service. The app is super intuitive!",
      rating: 5,
      avatar: "S",
      location: "Pune",
      image: "/placeholder.svg?height=60&width=60",
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
      amenities: ["WiFi", "AC", "Meals", "Laundry", "Gym", "Security"],
      type: "Single",
      verified: true,
      images: ["/placeholder.svg?height=300&width=400"],
      discount: "20% OFF",
      featured: true,
    },
    {
      id: 2,
      title: "Modern Shared PG in Andheri",
      location: "Andheri West, Mumbai",
      price: "₹12,000",
      rating: 4.6,
      reviews: 89,
      amenities: ["WiFi", "Gym", "Food", "Security", "Parking"],
      type: "Shared",
      verified: true,
      images: ["/placeholder.svg?height=300&width=400"],
      discount: "15% OFF",
      featured: false,
    },
    {
      id: 3,
      title: "Luxury PG near Cyber City",
      location: "Gurgaon, Delhi NCR",
      price: "₹18,000",
      rating: 4.9,
      reviews: 156,
      amenities: ["WiFi", "AC", "Gym", "Pool", "Spa", "Concierge"],
      type: "Single",
      verified: true,
      images: ["/placeholder.svg?height=300&width=400"],
      discount: "25% OFF",
      featured: true,
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

    // Auto-rotate testimonials
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => {
      observerRef.current?.disconnect()
      clearInterval(testimonialTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      <style jsx global>{`
        /* Enhanced animations and effects */
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
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stagger-item:nth-child(1) { transition-delay: 0.1s; }
        .stagger-item:nth-child(2) { transition-delay: 0.2s; }
        .stagger-item:nth-child(3) { transition-delay: 0.3s; }
        .stagger-item:nth-child(4) { transition-delay: 0.4s; }
        .stagger-item:nth-child(5) { transition-delay: 0.5s; }
        .stagger-item:nth-child(6) { transition-delay: 0.6s; }

        html {
          scroll-behavior: smooth;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: linear-gradient(to bottom, #f1f5f9, #e2e8f0);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
        }

        .hover-lift {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(-5px) rotate(-1deg); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .text-shadow {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-300/10 to-purple-300/10 rounded-full blur-2xl animate-pulse"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8 fade-in-left text-center lg:text-left">
              <div className="space-y-6">
                <Badge variant="gradient" className="animate-pulse-glow mx-auto lg:mx-0 w-fit">
                  <Sparkles className="w-4 h-4 mr-2" />
                  India's #1 PG Platform
                  <div className="w-2 h-2 bg-green-400 rounded-full ml-2 animate-ping"></div>
                </Badge>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-900 leading-tight text-shadow">
                  Find Your Perfect
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                    Dream PG
                  </span>
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                  Discover premium, verified, and affordable paying guest accommodations with world-class amenities.
                  Your perfect home awaits!
                </p>
              </div>

              {/* Enhanced Search */}
              <Card
                className={`p-6 sm:p-8 glass-effect transition-all duration-500 ${searchFocused ? "scale-105 shadow-2xl animate-pulse-glow" : ""}`}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Enter city, area, or landmark..."
                      className="pl-12 h-14 text-base font-medium"
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setSearchFocused(false)}
                    />
                  </div>
                  <Button size="lg" className="h-14 px-8 text-base font-bold">
                    <Search className="w-5 h-5 mr-2" />
                    Search PGs
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-gray-600">
                  {[
                    { icon: CheckCircle, text: "100% Verified Properties", color: "text-green-500" },
                    { icon: Shield, text: "Zero Brokerage", color: "text-blue-500" },
                    { icon: Clock, text: "24/7 Support", color: "text-purple-500" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 hover:text-blue-600 transition-colors cursor-pointer hover:scale-105 transform duration-300"
                    >
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                      <span className="font-semibold">{item.text}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="relative fade-in-right order-first lg:order-last">
              <div className="relative z-10">
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=700&width=600"
                    alt="Modern PG accommodation"
                    width={600}
                    height={700}
                    className="rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500 w-full max-w-lg mx-auto lg:max-w-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce hover:scale-110 transition-transform cursor-pointer">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse hover:scale-110 transition-transform cursor-pointer">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <div className="absolute top-1/2 -right-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-xl animate-float hover:scale-110 transition-transform cursor-pointer">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 lg:py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16 fade-in-up">
            <Badge variant="gradient" className="mx-auto">
              <Star className="w-4 h-4 mr-2" />
              Premium Collection
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 text-shadow">
              Featured{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Properties
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-medium">
              Handpicked premium PG accommodations with verified amenities, stunning interiors, and unmatched comfort
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-3">
              {["All", "Single", "Shared", "Premium", "Luxury"].map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter.toLowerCase() ? "default" : "outline"}
                  size="sm"
                  className={`transition-all duration-300 ${
                    activeFilter === filter.toLowerCase() ? "shadow-lg" : "hover:shadow-md"
                  }`}
                  onClick={() => setActiveFilter(filter.toLowerCase())}
                >
                  {filter}
                </Button>
              ))}
            </div>
            <Button variant="outline" className="hover:shadow-lg bg-transparent">
              View All Properties
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <Card key={property.id} className="group overflow-hidden hover-lift stagger-item">
                <div className="relative overflow-hidden">
                  <Image
                    src={property.images[0] || "/placeholder.svg"}
                    alt={property.title}
                    width={400}
                    height={280}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Property Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {property.featured && (
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    {property.verified && (
                      <Badge variant="success" className="shadow-lg">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {property.discount && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
                        {property.discount}
                      </Badge>
                    )}
                  </div>

                  {/* Property Actions */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Button
                      size="sm"
                      variant="secondary"
                      className={`w-10 h-10 p-0 rounded-full glass-effect ${likedProperties.includes(property.id) ? "bg-red-500 text-white" : ""}`}
                      onClick={() => toggleLike(property.id)}
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="w-10 h-10 p-0 rounded-full glass-effect">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="w-10 h-10 p-0 rounded-full glass-effect">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer truncate">
                        {property.title}
                      </h3>
                      <p className="text-gray-600 flex items-center space-x-1 text-sm">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{property.location}</span>
                      </p>
                    </div>
                    <Badge variant="outline" className="ml-2 flex-shrink-0">
                      {property.type}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-sm">{property.rating}</span>
                      <span className="text-gray-500 text-xs">({property.reviews} reviews)</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-gray-900">{property.price}</span>
                      <span className="text-gray-500 text-sm">/month</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {property.amenities.slice(0, 4).map((amenity, idx) => {
                      const icons = {
                        WiFi: Wifi,
                        AC: Sparkles,
                        Meals: Coffee,
                        Laundry: Home,
                        Gym: Dumbbell,
                        Security: Shield,
                        Parking: Car,
                        Pool: Globe,
                        Spa: Heart,
                        Concierge: Users,
                        Food: Coffee,
                      }
                      const Icon = icons[amenity as keyof typeof icons] || CheckCircle
                      return (
                        <Badge key={idx} variant="secondary" className="text-xs hover:scale-105 transition-transform">
                          <Icon className="w-3 h-3 mr-1" />
                          {amenity}
                        </Badge>
                      )
                    })}
                    {property.amenities.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{property.amenities.length - 4} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Chat
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        <Camera className="w-3 h-3 mr-1" />
                        Tour
                      </Button>
                    </div>
                    <Button size="sm" className="text-xs font-bold">
                      View Details
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 via-purple-700 to-pink-800 stats-section relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <Badge variant="gradient" className="mb-6 bg-white/20 text-white border-white/30">
              <TrendingUp className="w-4 h-4 mr-2" />
              Our Impact
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 text-shadow">
              Transforming Lives Across <span className="text-blue-200">India</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-medium">
              Join millions of satisfied residents who found their perfect home through our platform
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                label: "Properties Listed",
                value: stats.properties,
                suffix: "+",
                icon: Home,
                description: "Verified accommodations",
                color: "from-blue-400 to-blue-600",
              },
              {
                label: "Happy Users",
                value: stats.users,
                suffix: "+",
                icon: Users,
                description: "Satisfied residents",
                color: "from-purple-400 to-purple-600",
              },
              {
                label: "Cities Covered",
                value: stats.cities,
                suffix: "",
                icon: MapPin,
                description: "Major Indian cities",
                color: "from-pink-400 to-pink-600",
              },
              {
                label: "Satisfaction Rate",
                value: stats.satisfaction,
                suffix: "%",
                icon: TrendingUp,
                description: "Customer happiness",
                color: "from-green-400 to-green-600",
              },
            ].map((stat, index) => (
              <Card
                key={index}
                className="glass-effect border-white/20 text-center group hover:scale-105 transition-all duration-300"
              >
                <CardContent className="p-6 space-y-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                    {stat.value.toLocaleString()}
                    {stat.suffix}
                  </div>
                  <div className="text-blue-200 font-bold text-base sm:text-lg">{stat.label}</div>
                  <p className="text-blue-100 text-sm opacity-90">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8 mb-16 fade-in-up">
            <Badge variant="gradient" className="mx-auto">
              <Sparkles className="w-4 h-4 mr-2" />
              Why Choose Us
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight text-shadow">
              Experience The{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Future of Living
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed">
              Revolutionary technology meets premium comfort to create the ultimate PG experience
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "AI-Powered Verification",
                description:
                  "Advanced AI technology verifies every property for safety, cleanliness, and authenticity with 99.9% accuracy.",
                color: "from-emerald-500 to-green-600",
                bgColor: "from-emerald-50 to-green-50",
              },
              {
                icon: Users,
                title: "Smart Community Matching",
                description:
                  "Our intelligent algorithm matches you with compatible roommates based on lifestyle, interests, and preferences.",
                color: "from-purple-500 to-violet-600",
                bgColor: "from-purple-50 to-violet-50",
              },
              {
                icon: MapPin,
                title: "Prime Strategic Locations",
                description:
                  "Carefully curated locations near tech hubs, universities, metro stations, and entertainment districts.",
                color: "from-red-500 to-pink-600",
                bgColor: "from-red-50 to-pink-50",
              },
              {
                icon: Zap,
                title: "Premium Smart Amenities",
                description:
                  "Ultra-fast WiFi, smart home automation, modern appliances, and luxury facilities for ultimate comfort.",
                color: "from-blue-500 to-cyan-600",
                bgColor: "from-blue-50 to-cyan-50",
              },
              {
                icon: Clock,
                title: "Instant Digital Experience",
                description:
                  "Book your perfect PG in under 60 seconds with virtual tours, digital contracts, and seamless payments.",
                color: "from-yellow-500 to-orange-600",
                bgColor: "from-yellow-50 to-orange-50",
              },
              {
                icon: Heart,
                title: "24/7 Concierge Support",
                description:
                  "Dedicated relationship managers, emergency support, and premium customer service around the clock.",
                color: "from-indigo-500 to-purple-600",
                bgColor: "from-indigo-50 to-purple-50",
              },
            ].map((feature, index) => (
              <Card key={index} className="group border-0 shadow-xl hover-lift stagger-item overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-60`}></div>
                <CardContent className="relative p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="w-8 h-8 bg-white/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-4 h-4 text-gray-700" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-base">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Testimonials */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6 mb-16 fade-in-up">
            <Badge variant="gradient" className="bg-white/20 text-white border-white/30">
              <Quote className="w-4 h-4 mr-2" />
              Success Stories
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white text-shadow">
              What Our <span className="text-blue-400">Community Says</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto font-medium">
              Real stories from thousands of happy residents who transformed their living experience
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="flex items-center justify-center space-x-8">
              <Button
                variant="ghost"
                size="lg"
                className="text-white hover:text-blue-400 hover:bg-white/10 rounded-full w-14 h-14 p-0 flex-shrink-0 glass-effect"
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <Card className="glass-effect border-white/20 max-w-3xl mx-auto flex-1 hover:scale-105 transition-transform duration-300">
                <CardContent className="p-8 sm:p-12 space-y-8 text-center">
                  <Quote className="w-12 h-12 text-blue-400 opacity-60 mx-auto" />

                  <div className="flex items-center justify-center space-x-1 mb-6">
                    {testimonials[currentTestimonial] &&
                      [...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                      ))}
                  </div>

                  <p className="text-white text-lg sm:text-xl leading-relaxed font-medium italic">
                    "{testimonials[currentTestimonial]?.content || "Loading testimonial..."}"
                  </p>

                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-2xl">
                      <span className="text-white font-bold text-lg">
                        {testimonials[currentTestimonial]?.avatar || "U"}
                      </span>
                    </div>
                    <div className="text-left min-w-0">
                      <p className="font-bold text-white text-lg truncate">
                        {testimonials[currentTestimonial]?.name || "User"}
                      </p>
                      <p className="text-blue-200 text-sm truncate">
                        {testimonials[currentTestimonial]?.role || "Customer"}
                      </p>
                      <p className="text-blue-300 text-sm flex items-center space-x-1">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{testimonials[currentTestimonial]?.location || "India"}</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                variant="ghost"
                size="lg"
                className="text-white hover:text-blue-400 hover:bg-white/10 rounded-full w-14 h-14 p-0 flex-shrink-0 glass-effect"
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? "bg-blue-400 w-8" : "bg-white/30 hover:bg-white/50"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 via-purple-700 to-pink-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float delay-1000"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-5xl mx-auto space-y-8 fade-in-up">
            <Badge variant="gradient" className="bg-white/20 text-white border-white/30 mx-auto">
              <Sparkles className="w-4 h-4 mr-2" />
              Start Your Journey
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white text-shadow">
              Ready to Find Your Dream PG?
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-100 font-medium leading-relaxed max-w-4xl mx-auto">
              Join millions of happy residents who discovered their perfect home through our revolutionary platform
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-5 text-lg font-bold shadow-2xl hover:shadow-3xl"
              >
                <Search className="w-6 h-6 mr-3" />
                Find Your Perfect PG
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-5 text-lg font-bold bg-transparent glass-effect"
              >
                <Play className="w-6 h-6 mr-3" />
                Watch Success Stories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-6 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Baasthan
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed font-medium">
                Your trusted partner in finding the perfect PG accommodation. Safe, comfortable, and affordable living
                spaces with premium amenities and world-class service.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram].map((Icon, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-2xl"
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
                links: ["About Us", "Careers", "Press", "Legal"],
              },
            ].map((section, index) => (
              <div key={index} className="space-y-6">
                <h3 className="text-lg font-bold text-white">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href="#"
                        className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:translate-x-2 inline-block hover:text-blue-400"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 font-medium text-center md:text-left">
              &copy; {new Date().getFullYear()} Baasthan. All rights reserved. Made with ❤️ in India.
            </p>
            <div className="flex items-center space-x-6 text-gray-400">
              <Link href="#" className="hover:text-white transition-colors font-medium hover:text-blue-400">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors font-medium hover:text-blue-400">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

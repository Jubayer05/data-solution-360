import {
  ArrowRight,
  ArrowUpRight,
  BarChart,
  ChevronRight,
  Globe,
  Lock,
  MousePointer,
  Sparkles,
  Star,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

const BrandName = () => (
  <span className="relative inline-block group">
    <span className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent font-bold bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500">
      Data Lytics 360
    </span>
    <span className="absolute bottom-1 left-0 w-full h-2 bg-gradient-to-r from-blue-200 via-indigo-200 to-blue-200 -rotate-1 rounded-full opacity-50 group-hover:opacity-75 transition-all duration-500"></span>
  </span>
);

const LandingPage = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white overflow-hidden">
      {/* Enhanced background with multiple layers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-indigo-400/5"></div>
      </div>

      {/* Hero Section with enhanced animation */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-32 pb-12 md:pb-20 relative">
          <div className="text-center relative">
            <div className="flex items-center justify-center mb-6 md:mb-8">
              <a
                href="https://datalytics360.ltd/"
                className="group inline-flex items-center px-4 md:px-6 py-2 md:py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-blue-600/10 hover:from-blue-600/20 hover:via-indigo-600/20 hover:to-blue-600/20 text-blue-600 transition-all cursor-pointer backdrop-blur-sm border border-blue-200/20"
              >
                <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent font-bold">
                  Data Lytics 360
                </span>
                <span className="mx-2 text-blue-400 hidden md:inline">—</span>
                <span className="hidden md:inline">
                  Next Generation Analytics
                </span>
                <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Enhanced hero content */}
            <div className="relative">
              <h1 className="text-4xl md:text-7xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight tracking-tight">
                Welcome to
                <div className="relative inline-block mx-2 md:mx-4 group">
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500">
                    Data Lytics 360
                  </span>
                  <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-2 md:h-4 bg-gradient-to-r from-blue-200 via-indigo-200 to-blue-200 -rotate-1 rounded-full opacity-60 group-hover:opacity-75 transition-all duration-500"></span>
                </div>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
                <BrandName /> harnesses the power of AI-driven analytics to
                unlock hidden patterns, predict trends, and make data-driven
                decisions with unprecedented accuracy.
              </p>

              {/* Enhanced buttons */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                <a
                  href="https://datalytics360.ltd/"
                  className="group px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white visited:text-white rounded-2xl font-semibold transition-all flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 hover:scale-105 w-full md:w-auto"
                >
                  Start Free Trial
                  <ArrowUpRight className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                </a>
                <a
                  href="https://datalytics360.ltd/"
                  className="group px-6 md:px-8 py-3 md:py-4 bg-white/80 backdrop-blur-sm text-gray-900 rounded-2xl font-semibold border border-gray-200 hover:border-blue-200 transition-all shadow-lg hover:-translate-y-0.5 hover:scale-105 w-full md:w-auto"
                >
                  Watch Demo
                  <BarChart className="ml-2 h-5 w-5 inline-block group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

            {/* Added floating elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 animate-float-slow">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-2xl"></div>
            </div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 animate-float-slow-reverse">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-indigo-400/10 to-blue-400/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features section with enhanced cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center mb-12 md:mb-20">
          <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-full text-blue-600 font-semibold mb-3 md:mb-4">
            POWERFUL FEATURES
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Why choose <BrandName />
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Unleash the full potential of your data with our cutting-edge
            analytics platform
          </p>
        </div>

        {/* Enhanced feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              icon: Globe,
              title: 'Real-time Analytics',
              description:
                'Get instant insights with our real-time data processing and analytics engine.',
              gradient: 'from-blue-600 to-blue-400',
              bgGradient: 'from-blue-100 to-blue-50',
            },
            {
              icon: Zap,
              title: 'AI Predictions',
              description:
                'Leverage machine learning to predict trends and stay ahead of the curve.',
              gradient: 'from-indigo-600 to-indigo-400',
              bgGradient: 'from-indigo-100 to-indigo-50',
            },
            {
              icon: Lock,
              title: 'Enterprise Security',
              description:
                'Bank-grade security with end-to-end encryption for your sensitive data.',
              gradient: 'from-violet-600 to-violet-400',
              bgGradient: 'from-violet-100 to-violet-50',
            },
          ].map((feature, index) => (
            <a
              href="https://datalytics360.ltd/"
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10`}
              ></div>
              <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-3xl hover:shadow-xl transition-all duration-500 border border-gray-200 group-hover:border-transparent h-full">
                <div
                  className={`h-12 w-12 md:h-14 md:w-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="h-6 w-6 md:h-7 md:w-7 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-4 md:mt-6 flex items-center text-blue-600 font-medium">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Enhanced stats section */}
      <div className="bg-white/80 backdrop-blur-sm py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: '99.9%', label: 'Uptime', icon: Globe },
              { value: '24/7', label: 'Support', icon: Users },
              { value: '150+', label: 'Integrations', icon: Zap },
              { value: '50M+', label: 'Data Points', icon: BarChart },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:-translate-y-1 transition-transform"
              >
                <div className="inline-block p-3 md:p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced CTA section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 rounded-3xl transform -rotate-1"></div>
          <div className="relative bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 rounded-3xl p-8 md:p-16 text-center transform rotate-1 hover:rotate-0 transition-transform duration-500">
            <Star className="h-10 w-10 md:h-12 md:w-12 text-blue-200 mx-auto mb-6 md:mb-8 animate-pulse" />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8">
              Ready to Transform Your Data with{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-white">
                  Data Lytics 360
                </span>
                <span className="absolute bottom-1 left-0 w-full h-2 bg-blue-200/30 -rotate-1 rounded-full"></span>
              </span>
              ?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 md:mb-12 max-w-2xl mx-auto">
              Join thousands of companies using{' '}
              <span className="bg-white px-2 py-1 md:px-3 md:py-1 rounded-lg">
                {' '}
                <BrandName />
              </span>{' '}
              to drive growth and innovation.
            </p>
            <Link
              href="https://datalytics360.ltd/"
              className="group inline-block px-8 py-3 md:px-12 md:py-5 bg-white backdrop-blur-sm rounded-2xl
               font-semibold transition-all shadow-xl hover:-translate-y-1 hover:scale-105"
            >
              Get Started Today
              <MousePointer className="ml-2 h-5 w-5 inline-block group-hover:rotate-12 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

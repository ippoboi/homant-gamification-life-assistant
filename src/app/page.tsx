"use client";

import { Button } from "@/components/ui/button";
import { FerrisWheel } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Header Component
const Header = () => (
  <header className="fixed w-full top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-sm border-zinc-800">
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/images/homant-logo.svg"
            alt="Homant"
            width={24}
            height={24}
          />
          <Link
            href="#"
            className="text-lg font-mono text-white hover:text-zinc-200 transition"
          >
            Homant.
          </Link>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link
            href="#why"
            className="font-mono text-muted-foreground text-sm hover:text-white transition-all duration-200"
          >
            Why us
          </Link>
          <Link
            href="#benefits"
            className="font-mono text-muted-foreground text-sm hover:text-white transition-all duration-200"
          >
            Benefits
          </Link>
          <Link
            href="#features"
            className="font-mono text-muted-foreground text-sm hover:text-white transition-all duration-200"
          >
            Features
          </Link>
          <Link
            href="#clients"
            className="font-mono text-muted-foreground text-sm hover:text-white transition-all duration-200"
          >
            Clients
          </Link>
          <Link
            href="#faq"
            className="font-mono text-muted-foreground text-sm hover:text-white transition-all duration-200"
          >
            FAQs
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/auth/signin"
            className="px-3 py-1.5 text-muted-foreground hover:text-white transition"
          >
            Sign in
          </Link>
          <Link
            href="/auth/signup"
            className="px-3 py-1.5 text-black transition bg-white rounded-md"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  </header>
);

// Hero Section
const Hero = () => (
  <section className="pt-48 pb-16 relative">
    <div className="container mx-auto px-4 relative">
      <div className="relative max-w-3xl mx-auto text-center">
        <div className="absolute top-0 -left-10">
          <Image
            src="/images/plus-hero.svg"
            alt="Homant"
            width={56}
            height={56}
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-mono font-semibold text-white mb-6">
          A home assistant that gamifies your life.
        </h1>
        <p className="font-mono text-muted-foreground mb-10">
          Transform your living space into an intelligent companion that helps
          you crush your goals, optimize your routine, and make everyday life
          more rewarding.
        </p>
        <div className="absolute top-0 -right-10">
          <Image
            src="/images/stars-hero.svg"
            alt="Homant"
            width={56}
            height={56}
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="font-mono bg-white text-zinc-900">
            Get Started
          </Button>
          <Button
            variant="outline"
            className="font-mono border border-zinc-700 text-white"
          >
            Watch demo
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Image
          src="/images/hero-image.svg"
          alt="Hero"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  </section>
);

// Why Homant Section
const WhyHomant = () => (
  <section id="why" className="py-24 bg-zinc-950">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mb-16">
        <h2 className="text-2xl font-bold text-white mb-2">Why us</h2>
        <p className="text-zinc-400">Not Just Another Smart Home System</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-8">
          <Image
            src="/images/why-us-1.svg"
            alt="Smart Home"
            width={403}
            height={187}
          />
          <div className="space-y-8">
            <h3 className="text-lg font-semibold text-white mb-3">
              Smart Homes React. Homant Anticipates.
            </h3>
            <p className="text-zinc-400">
              Homant learns your patterns, anticipates your needs, and creates
              environments that help you thrive
            </p>
          </div>
        </div>
        <div className="space-y-8">
          <Image
            src="/images/why-us-2.svg"
            alt="Smart Home"
            width={403}
            height={187}
          />
          <div className="space-y-8">
            <h3 className="text-lg font-semibold text-white mb-3">
              Growth Through Gamification.
            </h3>
            <p className="text-zinc-400">
              Turn personal development into an engaging journey with
              achievement-based rewards and leveling system
            </p>
          </div>
        </div>
        <div className="space-y-8">
          <Image
            src="/images/why-us-3.svg"
            alt="Smart Home"
            width={403}
            height={187}
          />
          <div className="space-y-8">
            <h3 className="text-lg font-semibold text-white mb-3">
              Emotion-Driven Intelligence.
            </h3>
            <p className="text-zinc-400">
              Homant recognizes your emotional state and adapts your
              surroundings to support your wellbeing—whether you need focus,
              relaxation, or motivation
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Benefits Section
const Benefits = () => (
  <section id="benefits" className="py-24 bg-zinc-950">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mb-16">
        <h2 className="text-2xl font-bold text-white mb-2">Benefits</h2>
        <p className="text-zinc-400">Experience Life on a New Level</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="space-y-8 hover:bg-[#0F0F0F] transition-all duration-200 p-6">
          <FerrisWheel className="w-10 h-10 text-white" strokeWidth={1.5} />
          <h3 className="text-lg font-semibold text-white mb-3">
            Stress-Free Living
          </h3>
          <p className="text-zinc-400">
            Homant detects when you&apos;re stressed and automatically adjusts
            lighting, music, and climate to create your ideal calming
            environment.
          </p>
        </div>

        <div className="space-y-8 hover:bg-[#0F0F0F] transition-all duration-200 p-6">
          <FerrisWheel className="w-10 h-10 text-white" strokeWidth={1.5} />
          <h3 className="text-lg font-semibold text-white mb-3">
            Peak Productivity
          </h3>
          <p className="text-zinc-400">
            Running late on a deadline? Your home transforms into a
            distraction-free workspace optimized for focus and efficiency.
          </p>
        </div>

        <div className="space-y-8 hover:bg-[#0F0F0F] transition-all duration-200 p-6">
          <FerrisWheel className="w-10 h-10 text-white" strokeWidth={1.5} />
          <h3 className="text-lg font-semibold text-white mb-3">
            Healthier Habits
          </h3>
          <p className="text-zinc-400">
            From morning routines to workout reminders, Homant nudges you toward
            better habits while making them easier to maintain.
          </p>
        </div>

        <div className="space-y-8 hover:bg-[#0F0F0F] transition-all duration-200 p-6">
          <FerrisWheel className="w-10 h-10 text-white" strokeWidth={1.5} />
          <h3 className="text-lg font-semibold text-white mb-3">
            Family Connection
          </h3>
          <p className="text-zinc-400">
            Create shared experiences and goals for the whole family, turning
            quality time into meaningful moments that strengthen bonds.
          </p>
        </div>

        <div className="space-y-8 hover:bg-[#0F0F0F] transition-all duration-200 p-6">
          <FerrisWheel className="w-10 h-10 text-white" strokeWidth={1.5} />
          <h3 className="text-lg font-semibold text-white mb-3">
            Energy Efficiency
          </h3>
          <p className="text-zinc-400">
            Save on utility bills while reducing your carbon footprint—HomeAI
            optimizes energy usage without sacrificing comfort.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// CTA Section
const CTASection = () => (
  <section className="py-24 bg-zinc-950">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Ready to Experience the Future of Smart Living?
        </h2>
        <p className="text-muted-foreground">
          Homant works with your existing smart devices and starts at just
          $XX/month
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="font-mono bg-white text-zinc-900">
            Get Started
          </Button>
          <Button
            variant="outline"
            className="font-mono border border-zinc-700 text-white"
          >
            Watch demo
          </Button>
        </div>
        <p className="text-muted-foreground text-sm">
          *No credit card required. Cancel anytime.*
        </p>
      </div>
    </div>
  </section>
);

// Testimonials Section
const Testimonials = () => (
  <section id="testimonials" className="py-24 bg-zinc-900">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          What Our Users Say
        </h2>
        <p className="text-xl text-zinc-400">
          Join thousands of people who are transforming their lives with Homant.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-zinc-800 p-8 rounded-xl border border-zinc-700">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-zinc-700 rounded-full mr-4"></div>
            <div>
              <h4 className="text-white font-medium">Alex Johnson</h4>
              <p className="text-zinc-500 text-sm">Tech Enthusiast</p>
            </div>
          </div>
          <p className="text-zinc-400">
            &ldquo;Homant has completely changed how I interact with my home.
            The mood detection feature is like having a personal assistant who
            always knows what I need.&rdquo;
          </p>
        </div>
        <div className="bg-zinc-800 p-8 rounded-xl border border-zinc-700">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-zinc-700 rounded-full mr-4"></div>
            <div>
              <h4 className="text-white font-medium">Sarah Miller</h4>
              <p className="text-zinc-500 text-sm">Fitness Coach</p>
            </div>
          </div>
          <p className="text-zinc-400">
            &ldquo;The goal tracking has helped me stay consistent with my
            fitness routine. I love how my home encourages me and creates the
            perfect workout environment.&rdquo;
          </p>
        </div>
        <div className="bg-zinc-800 p-8 rounded-xl border border-zinc-700">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-zinc-700 rounded-full mr-4"></div>
            <div>
              <h4 className="text-white font-medium">Michael Chen</h4>
              <p className="text-zinc-500 text-sm">Remote Worker</p>
            </div>
          </div>
          <p className="text-zinc-400">
            &ldquo;Working from home has never been more productive. Homant
            helps me focus during work hours and relax afterward - all
            automatically!&rdquo;
          </p>
        </div>
      </div>
    </div>
  </section>
);

// FAQ Section with Accordions
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What hardware do I need to use Homant?",
      answer:
        "Homant works with most popular smart home devices. You&apos;ll need basic sensors and smart home hubs, but our system is designed to be affordable and compatible with existing setups.",
    },
    {
      question: "How does Homant detect my mood?",
      answer:
        "Homant uses a combination of environmental sensors, voice analysis, and behavioral patterns to understand your emotional state, then responds accordingly.",
    },
    {
      question: "Is my data private and secure?",
      answer:
        "Absolutely. Your privacy is our top priority. All data is processed locally when possible, and any cloud data is encrypted end-to-end.",
    },
    {
      question: "Can Homant integrate with my existing smart home setup?",
      answer:
        "Yes! Homant is designed to work with popular smart home ecosystems including Google Home, Amazon Alexa, Apple HomeKit, and more.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-zinc-400">
            Everything you need to know about Homant.
          </p>
        </div>
        <div className="max-w-3xl mx-auto divide-y divide-zinc-800">
          {faqItems.map((item, index) => (
            <div key={index} className="py-6">
              <button
                onClick={() => toggleAccordion(index)}
                className="flex w-full justify-between items-center text-left"
              >
                <h3 className="text-xl font-semibold text-white">
                  {item.question}
                </h3>
                <svg
                  className={`w-6 h-6 text-white transform transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`mt-3 transition-all duration-200 overflow-hidden ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-zinc-400">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Second CTA Section
const SecondCTASection = () => (
  <section className="py-24 bg-zinc-900 border-t border-zinc-800">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl p-12 border border-zinc-700">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your home?
          </h2>
          <p className="text-xl text-zinc-400 mb-10">
            Join thousands of users who are making their homes work for them.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-4 py-2 bg-white text-zinc-900 rounded-md hover:bg-zinc-200 font-medium transition">
              Get Started Free
            </button>
            <button className="px-4 py-2 border border-zinc-700 text-white rounded-md hover:bg-zinc-800 font-medium transition">
              Book a Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Footer
const Footer = () => (
  <footer className="bg-zinc-950 pt-20 pb-10 border-t border-zinc-900">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Product</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition">
                Integrations
              </a>
            </li>
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition">
                Changelog
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition">
                Guides
              </a>
            </li>
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition">
                API
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition">
                Terms
              </a>
            </li>
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition">
                Security
              </a>
            </li>
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition">
                Cookies
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <span className="text-2xl font-bold text-white mr-2">Homant</span>
          <span className="text-zinc-500">© 2023. All rights reserved.</span>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-zinc-400 hover:text-white transition">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a href="#" className="text-zinc-400 hover:text-white transition">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="#" className="text-zinc-400 hover:text-white transition">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a href="#" className="text-zinc-400 hover:text-white transition">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-mono">
      <Header />
      <main>
        <Hero />
        <WhyHomant />
        <Benefits />
        <CTASection />
        <Testimonials />
        <FAQ />
        <SecondCTASection />
      </main>
      <Footer />
    </div>
  );
}

'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSearchParams } from 'next/navigation';

const therapyData = {
  a: {
    title: 'Cognitive Behavioral Therapy (CBT)',
    description: `CBT is a widely used, evidence-based form of therapy that focuses on identifying and challenging negative thought patterns and replacing them with healthier alternatives. It is especially effective in treating anxiety, depression, and stress-related disorders. Through real-time AI support and structured techniques like journaling, exposure tasks, and goal-setting, CBT helps clients build resilience and regain control over their thoughts and emotions.`,
    image: '/project-image/rectangle.png',
  },
  b: {
    title: 'Dialectical Behavior Therapy (DBT)',
    description: `DBT integrates cognitive-behavioral techniques with concepts of mindfulness and acceptance. Originally developed for borderline personality disorder, DBT is now used to treat trauma, emotional dysregulation, and suicidal behaviors. This therapy emphasizes four core skills: mindfulness, emotional regulation, distress tolerance, and interpersonal effectiveness — supported by interactive AI feedback and daily check-ins.`,
    image: '/project-image/rectangle2.png',
  },
  c: {
    title: 'Acceptance and Commitment Therapy (ACT)',
    description: `ACT teaches clients to stop avoiding, denying, or struggling with their inner emotions and instead accept them as appropriate responses to certain situations. Through exercises in mindfulness, values clarification, and committed action, ACT helps individuals face life's challenges while maintaining psychological flexibility. It is effective for chronic pain, OCD, anxiety, and major life transitions, with AI tools offering real-time guidance in practicing presence and purpose.`,
    image: '/project-image/rectangle3.png',
  },
  d: {
    title: "Loneliness Support",
    description: `Feeling alone, even when you're not? We help you recognize and reframe unhelpful thoughts and behaviors through structured tools and real-time AI support.`,
    image: '/longliness.png',
  },
  e: {
    title: "Bullying Recovery",
    description: `Bullying leaves emotional scars whether it happens at school, work, online, or even at home. We offer support to help heal and regain confidence.`,
    image: '/bullying.png',
  },
  f: {
    title: "Alcohol & Recovery",
    description: `Struggling with alcohol use or walking the path of recovery can feel overwhelming and isolating. Every step counts and you don’t have to take it alone.`,
    image: '/alchole.png',
  },
  g: {
    title: "Work-Life Balance",
    description: `Long hours, endless to-do lists, and constant pressure can take a toll on your mental health. It's time to find your balance.`,
    image: '/work_life.png',
  },
  h: {
    title: "Relationship Conflicts",
    description: `Every relationship has its challenges. Whether it’s tension with a partner, misunderstandings with friends, or family stress, we help you work through it.`,
    image: '/relationship.png',
  },
  i: {
    title: "Procrastination",
    description: `Stuck, overwhelmed, or always running out of time? Procrastination often hides deeper issues like anxiety or burnout. We help you uncover what’s really going on.`,
    image: '/procrastination.png',
  },
  j: {
    title: "Low Self-Esteem",
    description: `You are enough even if it doesn’t feel that way right now. We support you in building confidence and self-worth.`,
    image: '/low_self.png',
  },
  k: {
    title: "Life in General",
    description: `Sometimes, it’s just... everything. If you're feeling stressed, confused, or stuck without a specific diagnosis, we’re here to support you.`,
    image: '/project-image/rectangle2.png',
  },
};

const TheraphyDetails = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const therapy = therapyData[type];

  if (!therapy) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p className="text-xl">Therapy type not found.</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-black text-white">
      <section className="text-white">
        <div className="container flex flex-col p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row justify-between">
          <div className="flex items-center justify-center p-6 mt-4 lg:mt-0">
            <Image
              src={therapy.image}
              alt={therapy.title}
              width={600}
              height={400}
              className="rounded-lg mt-16"
            />
          </div>

          <div className="flex flex-col justify-center p-3 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            <h1 className="text-2xl mt-4 lg:text-4xl mb-6 font-bold text-blue-600">
              {therapy.title}
            </h1>
            <p className="text-xl mb-4">{therapy.description}</p>

            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start mt-2">
              <Link
                href="/"
                className="px-8 py-3 text-lg font-bold rounded bg-violet-400 dark:bg-[#ff3811] text-gray-900 dark:text-gray-50 hover:bg-sky-700 hover:text-white duration-1000 ease-in-out"
              >
                Back to home
              </Link>
            
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TheraphyDetails;

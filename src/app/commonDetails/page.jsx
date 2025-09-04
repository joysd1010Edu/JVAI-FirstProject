"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

// Therapy data object
const therapyData = {
  d: {
    title: "Loneliness",
    description: `Lonely isn't lonely. It's that yucky sensation when you can't connect with people for anything, and they're sitting next to you. It may be hard for you to communicate, or it doesn't feel like anyone listens when you do. Surviving friendships can sting, too. All this can make you feel anxious, blue, and as though you don't matter. At EmoThrive, we provide easy techniques and smart technology that gets it. We can help you look at how you feel, figure out how you think, and practice at getting through hard spots. We'll be there for you as you sort out what's going on for you, practice tiny tasks each day to help out, and find things that help you feel more like yourself and like everyone else. Everyone should feel seen, heard, and like they count.`,
    image: '/longliness.png',
  },
  e: {
    title: "Bullying",
    description: `Bullying can leave you with invisible wounds that remain. It may have come in the manner of name-calling, exclusion, cyberbullying, or an attempt at control. If it were at school, home, or work, it could upset your confidence, make you feel unsafe, and ruin your faith in other people. We know that this is not easy. We can help support you through sessions, reflection, and learning how to cope with your feelings. We'll help provide you with the strength for facing what happened and feeling positive about yourself again. What went down before that doesn't define you. You can still be strong and believe in yourself while getting over it.`,
    image: '/bullying.png',
  },
  f: {
    title: "Alcohol & Recovery",
    description: `Attempting to quit drinking or become sober is often very hard. Feeling guilty, shameful, and lonely is normal. Self-questioning and feeling engulfed by one's own mind and actions are usual. EmoThrive is a non-judgmental, supportive space that rejoices in every small victory. EmoThrive helps you by discovering your triggers, building urge control, and restructuring the way you think in order to stay concentrated. You don't need to go through this alone. EmoThrive provides you with tools, every day support, and recovery resources that are available for one reason and one reason only—that you can recover and rebuild.`,
    image: '/alchole.png',
  },
  g: {
    title: "Work-Life Balance",
    description: `It's easy to forget about yourself when work takes over your time and energy. Constant stress and not having a clear line between work and life can hurt your health, friendships, and happiness. EmoThrive can help you figure out what balance looks like for you. We have tools to help you think about things, plan habits, and care for your emotions, so you can set limits, feel less guilty, and find happiness in activities beyond work. You can be successful and feel good, as long as you start putting yourself first again.`,
    image: '/work_life.png',
  },
  h: {
    title: "Relationship Problems",
    description: `Relationships are great, but they can also hurt, confuse you, and drain your energy. Whether you're not talking well with your partner, having family drama, or were betrayed by someone you thought you could trust, it can be a lot to deal with. At EmoThrive, we can help you process these things, spot bad habits, and understand your feelings better. We'll give you the tools to create better boundaries, talk honestly, and think about yourself. This will help you fix, let go of, or rebuild relationships in a way that's good for you.`,
    image: '/relationship.png',
  },
  i: {
    title: "Procrastination",
    description: `Procrastination often hides deeper emotional struggles—fear of failure, perfectionism, burnout, or unresolved anxiety. If you’re feeling stuck, constantly overwhelmed by deadlines, or ashamed of your productivity patterns, you’re not alone. EmoThrive goes beyond surface-level solutions. We help you unpack the emotional and cognitive reasons behind your avoidance. With gentle prompts, task breakdown strategies, and mindset shifts, you'll start to rebuild trust in your ability to take action, stay focused, and meet your goals without self-judgment.`,
    image: '/procrastination.png',
  },
  j: {
    title: "Having Low Self-Worth?",
    description: `The way you feel about yourself impacts everything – from your relationships to how you handle problems. If you're always questioning your value, scared of being turned away, or just feel like you don't measure up, remember it's something you've learned and can change. EmoThrive is here to back you. We can guide you to rethink those feelings through journaling, positive statements based on how your mind works, and small changes in what you do. You'll start to see what you're good at, value what you need, and be kinder to yourself. Because you matter, just as you are.`,
    image: '/low_self.png',
  },
  k: {
    title: "Life, in general, can be a lot.",
    description: `It's not always one huge problem; it's just...everything. Life feels like one crazy storm of feelings, duties, what people expect, and not knowing what will happen. You might feel super tired in your head, not feel much of anything, or just not know what to do next. EmoThrive gives you a chill place to think and figure things out. If you're sad, confused about who you are, burned out, or just have way too much on your plate, our stuff can help you get back on track. We can assist you deal with feelings, take care of yourself, and find small ways to move forward. We're here to help you be okay with how messy being a person can be`,
    image: '/project-image/rectangle2.png',
  },
};

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center text-white bg-black">
    <p className="text-xl">Loading therapy details...</p>
  </div>
);

// Therapy content component
const TherapyContent = () => {
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
                href="/commonStruggles"
                className="px-8 py-3 text-lg font-bold rounded bg-violet-400 dark:bg-[#ff3811] text-gray-900 dark:text-gray-50 hover:bg-sky-700 hover:text-white duration-1000 ease-in-out"
              >
                Back to struggles
              </Link>
              <div className="navbar-end">
                <Link href={'/chat'} className='bg-[#0056F6] text-lg text-white rounded-[38px] py-[10px] px-[20px] outline-none'>Try Free AI Therapy</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Main page component with Suspense
export default function Page() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <TherapyContent />
    </Suspense>
  );
}

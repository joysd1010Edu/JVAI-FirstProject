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
                href="/theraphy"
                className="px-8 py-3 text-lg font-bold rounded bg-violet-400 dark:bg-[#ff3811] text-gray-900 dark:text-gray-50 hover:bg-sky-700 hover:text-white duration-1000 ease-in-out"
              >
                Back to theraphy
              </Link>
            
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TheraphyDetails;

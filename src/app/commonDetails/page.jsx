'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react'


   const therapyData = {
d: {
  title: "Loneliness Support",
  description: `Loneliness isn’t just about being physically alone—it’s the deep, aching feeling of disconnection even when others are around. You might find it hard to express yourself, feel invisible in conversations, or struggle to maintain relationships. These feelings can lead to anxiety, depression, and a loss of self-worth. At EmoThrive, we provide interactive tools and emotionally intelligent AI support to help you explore your feelings, identify thinking patterns, and develop emotional resilience. You’ll be guided through reflections, daily coping strategies, and exercises to slowly rebuild your connection with yourself and others—because everyone deserves to feel seen, heard, and valued.`,
  image: '/longliness.png',
},

e: {
  title: "Bullying Recovery",
  description: `Bullying can leave invisible scars that last long after the behavior stops. Whether you’ve experienced verbal abuse, exclusion, cyberbullying, or manipulation—at school, at home, or at work—the emotional damage can deeply impact your sense of self, safety, and trust. At EmoThrive, we understand how painful and confusing this journey can be. Through guided healing sessions, supportive reflections, and emotional regulation tools, we help you build the strength to confront past wounds and reclaim your personal power. You are not what happened to you—your story can be one of resilience, confidence, and healing.`,
  image: '/bullying.png',
},

f: {
  title: "Alcohol & Recovery",
  description: `The journey through alcohol dependency or recovery is complex. It often comes with cycles of guilt, shame, secrecy, and isolation. You may find yourself questioning your worth or struggling to regain control over your thoughts and behaviors. EmoThrive provides a safe, judgment-free space where every small victory is celebrated. Our supportive platform helps you understand your triggers, manage emotional cravings, and reframe thoughts that sabotage your progress. You don’t have to walk this road alone—compassionate tools, daily check-ins, and personalized support are available every step of the way to help you heal and move forward with purpose.`,
  image: '/alchole.png',
},

g: {
  title: "Work-Life Balance",
  description: `When your career responsibilities begin to consume your time, energy, and emotional bandwidth, it's easy to lose sight of yourself. Chronic stress, burnout, and a blurred boundary between personal and professional life can affect your health, relationships, and inner peace. EmoThrive helps you step back and assess what balance truly looks like for you. Our guided self-reflection tools, habit planners, and emotional wellness practices support you in setting boundaries, managing guilt, and finding joy beyond productivity. You can be both successful and mentally well—it starts by putting yourself back on the priority list.`,
  image: '/work_life.png',
},

h: {
  title: "Relationship Conflicts",
  description: `Relationships are deeply rewarding—but they can also be a source of pain, confusion, and emotional exhaustion. Whether you’re facing communication breakdowns with a partner, tension within your family, or betrayal by someone you trusted, the emotional toll can be overwhelming. At EmoThrive, we help you process these experiences, recognize unhealthy patterns, and strengthen your emotional awareness. Our tools guide you toward healthier boundaries, honest communication, and self-reflection so you can repair, release, or rebuild relationships in a way that aligns with your well-being.`,
  image: '/relationship.png',
},

i: {
  title: "Procrastination",
  description: `Procrastination often hides deeper emotional struggles—fear of failure, perfectionism, burnout, or unresolved anxiety. If you’re feeling stuck, constantly overwhelmed by deadlines, or ashamed of your productivity patterns, you’re not alone. EmoThrive goes beyond surface-level solutions. We help you unpack the emotional and cognitive reasons behind your avoidance. With gentle prompts, task breakdown strategies, and mindset shifts, you'll start to rebuild trust in your ability to take action, stay focused, and meet your goals without self-judgment.`,
  image: '/procrastination.png',
},

j: {
  title: "Low Self-Esteem",
  description: `Self-esteem shapes how you see yourself, how you interact with others, and how you respond to life’s challenges. If you constantly doubt your worth, fear rejection, or feel like you’re never “enough,” it’s not just in your head—it’s a learned belief that can be unlearned. EmoThrive offers support to help you rewire those beliefs. Through self-reflective journaling, affirmations grounded in psychology, and gentle behavior shifts, you’ll begin to rediscover your strengths, honor your needs, and build a more compassionate relationship with yourself—because you are worthy, exactly as you are.`,
  image: '/low_self.png',
},

k: {
  title: "Life in General",
  description: `Sometimes, it’s not one big thing—it’s everything. Life can feel like an unpredictable storm of emotions, responsibilities, expectations, and uncertainty. You may feel mentally exhausted, emotionally numb, or unsure about what’s next. EmoThrive creates a calming, reflective space to sort through the chaos. Whether you’re experiencing grief, identity confusion, burnout, or just the weight of “too much,” our tools guide you gently back to clarity. By helping you process emotions, prioritize self-care, and find small, meaningful steps forward, we support you in making peace with the messiness of being human.`,
  image: '/project-image/rectangle2.png',
},


};


const page = () => {

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
            
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default page

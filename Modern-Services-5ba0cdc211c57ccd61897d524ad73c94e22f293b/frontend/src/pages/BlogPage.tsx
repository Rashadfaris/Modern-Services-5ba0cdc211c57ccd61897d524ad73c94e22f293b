import { useState } from 'react';
import { Button } from '../components/ui/button';
import { FadeIn } from '../components/FadeIn';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';

interface BlogPageProps {
  onNavigate: (page: string) => void;
}

interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  content: string;
}

export function BlogPage({ onNavigate }: BlogPageProps) {
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const togglePost = (postId: string) => {
    const newExpanded = new Set(expandedPosts);
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId);
    } else {
      newExpanded.add(postId);
    }
    setExpandedPosts(newExpanded);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    // Close all expanded posts when changing category
    setExpandedPosts(new Set());
  };

  const blogPosts: BlogPost[] = [
  
    {
      id: '8',
      title: "Housing survey highlights 'forever renter' rise",
      category: 'Property',
      date: '8th December 2025',
      content: `First-time buyers in Britain are older and more indebted than ever, according to the English Housing Survey. The average buyer is now 34, with many opting for 30-year mortgages. The average deposit for buyers is £78,131, and many are borrowing more, increasing their vulnerability to falling prices. Only 42% of renters believe they will own a home, a decline from 45% in 2019/20, and Sarah Coles, head of personal finance at Hargreaves Lansdown, noted the rise of the "forever renter." It was found that those aged 45 to 54 made up 18% of private renters, up from 15% a year ago. The Government aims to address the housing crisis with new reforms and a mortgage guarantee scheme.`
    },
    {
      id: '9',
      title: 'London homeowners see record losses',
      category: 'Property',
      date: '8th December 2025',
      content: `London homeowners are selling properties at a greater loss than those anywhere else in England and Wales, with 14% of owners selling for less than they paid, according to estate agency Hamptons. This figure is up from 6% in 2016 and is well above the national average of 8.7%. The report also shows that first-time buyers now account for 50% of purchases in London. Hamptons predicts flat growth in house prices for 2026 due to tax changes, including a council tax surcharge on properties worth £2m or more.`
    },
  ];

  const categories = ['All', 'Tax', 'Property', 'Employment', 'Leisure & Hospitality', 'Financial Services', 'Energy', 'Other'];

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A2F]/90 to-[#0A1A2F]/70 z-10"></div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwbmV3c3xlbnwxfHx8fDE3NjQyNzY1NDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Finance and property news"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-white mb-4">Property & Finance News</h1>
          <p className="text-xl text-gray-200">
            Stay informed with the latest insights on property management, tax regulations, and financial services affecting UK property investors.
          </p>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {filteredPosts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-600 text-lg">No posts found in this category.</p>
                </div>
              ) : (
                filteredPosts.map((post, index) => (
                <FadeIn key={post.id} delay={index * 0.1}>
                  <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-[#C8A75B]/10 text-[#C8A75B] text-sm font-semibold rounded-full">
                          {post.category}
                        </span>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar size={16} className="mr-1" />
                          {post.date}
                        </div>
                      </div>
                      
                      <h2 className="text-2xl font-bold text-[#0A1A2F] mb-3 hover:text-[#C8A75B] transition-colors">
                        {post.title}
                      </h2>
                      
                      <div className="text-gray-700 leading-relaxed mb-4">
                        {expandedPosts.has(post.id) ? (
                          <p className="whitespace-pre-wrap">{post.content}</p>
                        ) : (
                          <p className="line-clamp-4">{post.content}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-end pt-4 border-t border-gray-200">
                        <button
                          onClick={() => togglePost(post.id)}
                          className="text-[#C8A75B] hover:text-[#B8964A] font-semibold text-sm flex items-center gap-1 transition-colors"
                        >
                          {expandedPosts.has(post.id) ? (
                            <>
                              Show Less
                              <ChevronUp size={16} />
                            </>
                          ) : (
                            <>
                              Read More
                              <ChevronDown size={16} />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                </FadeIn>
                ))
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-bold text-[#0A1A2F] mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? 'bg-[#C8A75B] text-white font-semibold'
                          : 'hover:bg-[#C8A75B]/10 text-gray-700 hover:text-[#C8A75B]'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-[#0A1A2F] mb-4">Need Help?</h3>
                  <p className="text-gray-600 mb-4">
                    Our experts can help you navigate property management and tax regulations.
                  </p>
                  <Button
                    onClick={() => onNavigate('contact')}
                    className="w-full bg-[#C8A75B] text-white hover:bg-[#B8964A]"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0A1A2F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Property Investment?</h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Get expert advice on property management, tax planning, and financial services tailored for UK property investors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => onNavigate('contact')}
                className="bg-[#C8A75B] text-white hover:bg-[#B8964A]"
              >
                Schedule Consultation
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate('services')}
                className="border-white text-white hover:bg-white hover:text-[#0A1A2F]"
              >
                View Our Services
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}


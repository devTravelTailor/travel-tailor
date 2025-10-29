import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Clock, ArrowRight } from "lucide-react";

const BlogSection = () => {
  return (
    <section id="blog" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Blog{" "}
            <span className="text-orange-500 font-handwriting">Highlights</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert travel insights, destination guides, and insider tips to help
            you plan your perfect journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card
              key={post.id}
              className="group p-0 border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-orange-500 px-3 rounded-full text-primary-foreground">
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span>{post.publishDate}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      By {post.author}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:text-orange-500 transition-colors"
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="hover:bg-orange-500 hover:text-primary-foreground"
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

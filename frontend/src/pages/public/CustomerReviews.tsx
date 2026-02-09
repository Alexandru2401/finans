import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    name: "Alex M.",
    role: "Freelancer",
    text: "This app completely changed how I manage my finances. Clean, simple and powerful.",
  },
  {
    name: "Maria L.",
    role: "Small Business Owner",
    text: "Tracking expenses for my team has never been easier. Highly recommended!",
  },
  {
    name: "John D.",
    role: "Entrepreneur",
    text: "Finally an app that makes budgeting feel effortless and intuitive.",
  },
  {
    name: "Elena P.",
    role: "Product Manager",
    text: "The insights are amazing. I finally know where my money goes every month.",
  },
  {
    name: "Daniel R.",
    role: "Startup Founder",
    text: "Perfect balance between simplicity and advanced features.",
  },
];

export default function CustomerReviews() {
  return (
    <section className="py-24 bg-muted/40">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Loved by our customers
          </h2>
          <p className="mt-3 text-muted-foreground">
            See what people are saying about our platform
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="relative"
        >
          <CarouselContent>
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full">
                  <CardContent className="flex h-full flex-col justify-between p-6">
                    <p className="mb-6 text-muted-foreground">
                      “{review.text}”
                    </p>

                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {review.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="cursor-pointer" />
          <CarouselNext className="cursor-pointer" />
        </Carousel>
      </div>
    </section>
  );
}

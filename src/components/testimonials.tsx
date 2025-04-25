'use client'

import { Quote } from "lucide-react"

interface TestimonialProps {
  quote: string
  author: string
}

function Testimonial({ quote, author }: TestimonialProps) {
  return (
    <div className="relative p-6 rounded-lg border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <Quote className="absolute -top-3 -left-3 w-8 h-8 text-muted-foreground/20" />
      <blockquote className="text-sm italic text-muted-foreground">
        {quote}
      </blockquote>
      <footer className="mt-2 text-sm font-medium text-right">
        — {author}
      </footer>
    </div>
  )
}

export function Testimonials() {
  const testimonials = [
    {
      quote: "They could win, I'm just saying your Down syndrome model is using ERA as a major input four games into the season when this particular pitcher has an artificially high ERA. Because he's had three really good games and one really bad one you fucking braindead twat.",
      author: "CC"
    },
    {
      quote: "At the end of the day all you've done is dress up a coin flip in a suit",
      author: "parlaydegen"
    },
    {
      quote: "Where's my quote?",
      author: "100p"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {testimonials.map((testimonial, index) => (
        <Testimonial key={index} {...testimonial} />
      ))}
    </div>
  )
} 
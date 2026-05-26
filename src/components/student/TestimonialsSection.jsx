import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";

const TestimonialsSection = () => {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-10 lg:px-20">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
        <div className="absolute right-10 top-24 h-40 w-40 rounded-full bg-fuchsia-200/20 blur-3xl" />
        <div className="absolute bottom-0 left-10 h-32 w-32 rounded-full bg-[#7F265B]/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl text-center">
        {/* Header */}
        <div className="mx-auto max-w-3xl">
          <div className="mb-5 inline-flex items-center rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-4 py-1.5 text-sm font-medium text-[#7F265B] transition-all duration-300 hover:scale-105">
            Testimonials
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            What our learners say
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Hear from our learners as they share their journeys of growth,
            success, and how our platform has helped them move forward with
            confidence.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dummyTestimonial.map((testimonial, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 text-left shadow-[0_12px_35px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#7F265B]/20 hover:shadow-[0_20px_50px_rgba(127,38,91,0.12)]"
            >
              {/* Top section */}
              <div className="flex items-center gap-4 border-b border-slate-100 bg-gradient-to-r from-[#7F265B]/6 to-transparent px-5 py-5">
                <div className="overflow-hidden rounded-full ring-2 ring-[#7F265B]/10 transition-all duration-300 group-hover:ring-[#7F265B]/25">
                  <img
                    className="h-14 w-14 rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-[#7F265B]">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <img
                      className="h-4 w-4 transition-transform duration-300 group-hover:scale-105"
                      key={i}
                      src={
                        i < Math.floor(testimonial.rating)
                          ? assets.star
                          : assets.star_blank
                      }
                      alt="star"
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium text-slate-500">
                    {testimonial.rating.toFixed(1)}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-7 text-slate-600">
                  “{testimonial.feedback}”
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
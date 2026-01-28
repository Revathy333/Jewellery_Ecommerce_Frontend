import React from "react";
import { FaGem, FaShippingFast, FaHandshake } from "react-icons/fa";
import { Link } from "react-router-dom"; 

const About = () => {
  
  const heroImage =
    "https://cdn.caratlane.com/media/catalog/product/J/P/JP06596-1RS3S0_4_lar.jpg";
  const team = [
    {
      id: 1,
      name: "Asha Menon",
      role: "Founder & Designer",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      id: 2,
      name: "Riya Patel",
      role: "Head of Diamonds and Gold",
      img: "https://w0.peakpx.com/wallpaper/1011/649/HD-wallpaper-kalyani-priyadarshan-delligent.jpg",
    },
    {
      id: 3,
      name: "Sahil Kumar",
      role: "Quality Specialist",
      img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
  ];

  const gallery = [
    "https://images.unsplash.com/photo-1535526535427-2f4f1bde0a53?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1524762128396-2f9e7b2f9f3b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1562791353-6f6b6f6f6f6f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
  ];

  return (
    <main className="bg-gradient-to-b from-purple-50 to-white min-h-screen">
   <section className="relative overflow-hidden rounded-b-3xl h-[400px] md:h-[600px]">
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${heroImage})` }}
  />

  <div className="absolute inset-0 bg-purple-900/30" />

  <div className="absolute overflow-y-hidden  flex items-center h-full">
    <div className="container  mx-auto px-6">
      <div className="max-w-3xl text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Handcrafted jewellery made with love & soul
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-purple-100/90">
          At <span className="font-semibold">UMIKz</span>, we combine timeless
          craftsmanship with modern design — each piece celebrates stories,
          memories and milestones.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/products"
            className="inline-block bg-amber-200 hover:bg-amber-300 text-black px-5 py-3 rounded-lg font-medium shadow"
          >
            Shop Collections
          </Link>
          <Link
            to=""
            className="inline-block border border-white/30 text-white px-5 py-3 rounded-lg hover:bg-white/10 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>


      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-purple-900">Our Mission</h3>
            <p className="mt-2 text-gray-700">
              To craft timeless, ethically-sourced jewellery that becomes part
              of your story.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-purple-900">Our Promise</h3>
            <p className="mt-2 text-gray-700">
              Sustainability, quality, and attention to detail — guaranteed.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-purple-900">Why Shop With Us</h3>
            <ul className="mt-3 space-y-2 text-gray-700">
              <li className="flex items-center gap-3">
                <FaGem className="text-amber-400" /> Exquisite designs
              </li>
              <li className="flex items-center gap-3">
                <FaShippingFast className="text-amber-400" /> Fast shipping
              </li>
              <li className="flex items-center gap-3">
                <FaHandshake className="text-amber-400" /> Secure & reliable
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white/80 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-purple-900 mb-6">Our Story</h2>
          <p className="text-gray-700 max-w-3xl">
            Founded in [Year], our studio started as a small atelier. Over the
            years we have grown into a community of artisans who believe in
            slow, thoughtful design. Every collection is designed in-house and
            finished by hand.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-amber-50 rounded-lg">
              <h4 className="font-semibold">Design</h4>
              <p className="mt-2 text-sm text-gray-700">
                Inspired by nature and personal stories, we create statement
                pieces.
              </p>
            </div>
            <div className="p-6 bg-amber-50 rounded-lg">
              <h4 className="font-semibold">Craft</h4>
              <p className="mt-2 text-sm text-gray-700">
                Hand finishing and rigorous quality checks on every product.
              </p>
            </div>
            <div className="p-6 bg-amber-50 rounded-lg">
              <h4 className="font-semibold">Care</h4>
              <p className="mt-2 text-sm text-gray-700">
                Lifetime cleaning guide and aftercare support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-purple-900 mb-6">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {team.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={t.img}
                alt={t.name}
                className="w-full h-100 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-black">{t.name}</h3>
                <p className="text-sm text-gray-600">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* <section className="bg-white/80 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-purple-900 mb-6">Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {gallery.map((src, i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden bg-amber-50"
              >
                <img
                  src={src}
                  alt={`gallery-${i}`}
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <section className="container mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-purple-700 to-purple-500 text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">
              Have a question or custom order?
            </h3>
            <p className="mt-2 text-purple-100 max-w-xl">
              Tell us about your idea and we'll bring it to life. Free
              consultations available.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to=""
              className="bg-amber-200 hover:bg-amber-300 text-black px-6 py-3 rounded-lg font-medium shadow"
            >
              Contact Us
            </Link>
            
          </div>
        </div>
      </section>

    </main>
  );
};

export default About;

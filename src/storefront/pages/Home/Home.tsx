import Contact from '@storefront/components/sections/Contact/Contact';
import Gallery from '@storefront/components/sections/Gallery/Gallery';
import Hero from '@storefront/components/sections/Hero/Hero';
import Services from '@storefront/components/sections/Services/Services';
import Stats from '@storefront/components/sections/Stats/Stats';
import Story from '@storefront/components/sections/Story/Story';
import Testimonials from '@storefront/components/sections/Testimonials/Testimonials';
import { contactDetails } from '@storefront/data/contact';
import { galleryItems } from '@storefront/data/gallery';
import { services } from '@storefront/data/services';
import { stats } from '@storefront/data/stats';
import { testimonials } from '@storefront/data/testimonials';

function Home() {
  return (
    <>
      <Hero
        eyebrow="Hecho a mano con amor"
        title="Accesorios que cuentan tu historia"
        description="Piezas únicas diseñadas y elaboradas a mano, pensadas para acompañar cada momento especial."
        ctaLabel="Ver colección"
        ctaHref="/productos"
      />
      <Stats stats={stats} />
      <Gallery
        eyebrow="Galería"
        heading="Nuestras creaciones"
        items={galleryItems}
      />
      <Services
        eyebrow="Nuestros productos"
        heading="Categorías destacadas"
        items={services}
      />
      <Story
        eyebrow="Nuestra historia"
        heading="Detrás de cada pieza hay una historia"
        paragraphs={[
          'Musé nació de la pasión por crear accesorios que reflejan la personalidad de quien los usa.',
          'Cada pieza es diseñada y elaborada a mano, cuidando cada detalle desde la selección de materiales hasta el empaque final.',
        ]}
        ctaLabel="Conóceme más"
        ctaHref="https://www.instagram.com/camilavaronag/?hl=es"
      />
      <Testimonials
        eyebrow="Testimonios"
        heading="Lo que dicen nuestras clientas"
        items={testimonials}
      />
      <Contact eyebrow="Contacto" heading="Hablemos" details={contactDetails} />
    </>
  );
}

export default Home;

import Contact from '@public/storefront/components/sections/Contact/Contact';
import Gallery from '@public/storefront/components/sections/Gallery/Gallery';
import Hero from '@public/storefront/components/sections/Hero/Hero';
import Services from '@public/storefront/components/sections/Services/Services';
import Stats from '@public/storefront/components/sections/Stats/Stats';
import Story from '@public/storefront/components/sections/Story/Story';
import Testimonials from '@public/storefront/components/sections/Testimonials/Testimonials';
import { contactDetails } from '@public/storefront/data/contact';
import { galleryItems } from '@public/storefront/data/gallery';
import { services } from '@public/storefront/data/services';
import { stats } from '@public/storefront/data/stats';
import { testimonials } from '@public/storefront/data/testimonials';

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

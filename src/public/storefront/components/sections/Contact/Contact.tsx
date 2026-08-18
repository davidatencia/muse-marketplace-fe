import { useState } from 'react'
import type { FormEvent } from 'react'
import type { ContactDetails } from '@public/storefront/types/content'
import Button from '@shared/components/ui/Button/Button'
import SectionHeading from '@shared/components/ui/SectionHeading/SectionHeading'
import styles from './Contact.module.css'

interface ContactProps {
  heading: string
  details: ContactDetails
  eyebrow?: string
}

function Contact({ heading, details, eyebrow }: ContactProps) {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contacto" className={styles.contact}>
      <div className={styles.inner}>
        <div>
          <SectionHeading eyebrow={eyebrow} title={heading} tone="light" />
          <ul className={styles.details}>
            <li>{details.email}</li>
            <li>{details.phone}</li>
            <li>{details.address}</li>
          </ul>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            Nombre
            <input type="text" name="name" required />
          </label>
          <label className={styles.field}>
            Correo
            <input type="email" name="email" required />
          </label>
          <label className={styles.field}>
            Mensaje
            <textarea name="message" rows={4} required />
          </label>
          <Button type="submit">Enviar mensaje</Button>
          {submitted && <p className={styles.confirmation}>¡Gracias! Te responderemos pronto.</p>}
        </form>
      </div>
    </section>
  )
}

export default Contact

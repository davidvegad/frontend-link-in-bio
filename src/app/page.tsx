import Header from './components/Header';
import Hero from './components/Hero';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        {/* Aquí irán otras secciones de la página principal */}
      </main>
    </div>
  );
}

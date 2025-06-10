import OurServices from '../components/our-services';
import Footer from '../components/footer';

export default function Page() {
  return (
    <div className="flex flex-col min-h-svh">
      <OurServices />
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Under Construction 🚧</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
}

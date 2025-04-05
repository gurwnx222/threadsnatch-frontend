import { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const TNC = () => {
  useEffect(() => {
    document.body.classList.add('tnc-page');
    return () => {
      document.body.classList.remove('tnc-page');
    };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-montserrat flex flex-col">
      <Navbar />

      <main className="flex-grow px-4 md:px-6 py-10 md:py-16 flex justify-center my-6">
        <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-6 md:p-10">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Terms of Use</h1>
            <p className="text-sm text-gray-500 mt-2">Effective Date: 7-12-2024</p>
            <p className="mt-4 max-w-2xl mx-auto text-base text-gray-600">
              By accessing or using the ThreadSnatch API, you agree to comply with and be bound by the following terms.
            </p>
          </header>

          <div className="space-y-10 text-gray-700 leading-relaxed">
            {[
              {
                title: '1. Use of the API',
                content: [
                  'The ThreadSnatch API provides access to publicly available data from Threads, including images, videos, and carousel posts, delivered in JSON format.',
                  'You are solely responsible for ensuring your use of the API complies with all applicable laws, regulations, and the terms and policies of Threads (Meta).',
                  'The API must not be used to:',
                  <ul key="use-api-ul" className="list-disc ml-6 space-y-1">
                    <li>Scrape private, sensitive, or unauthorized data.</li>
                    <li>Violate intellectual or privacy rights of Threads users.</li>
                    <li>Misuse or resell data in breach of Threads’ terms.</li>
                  </ul>,
                ],
              },
              {
                title: '2. Restrictions',
                content: [
                  'You must not use the API to:',
                  <ul key="restrict-ul" className="list-disc ml-6 space-y-1">
                    <li>Disrupt Threads or the API’s performance.</li>
                    <li>Bypass access control, security, or limits.</li>
                  </ul>,
                  'Do not cache or distribute API data without explicit permission.',
                  'Only use the API for legal and authorized purposes.',
                ],
              },
              {
                title: '3. Rate Limits and Fair Use',
                content: [
                  'The API includes rate limits to ensure fair use. Abuse may lead to suspension or blocking.',
                  'Avoid excessive or redundant requests.',
                ],
              },
              {
                title: '4. Ownership and IP',
                content: [
                  'The API and related documentation are the property of the developer.',
                  'All retrieved data belongs to Threads (Meta).',
                ],
              },
              {
                title: '5. Disclaimer of Warranties',
                content: [
                  'The API is provided "as-is" without guarantees.',
                  'The developer is not liable for misuse or resulting issues.',
                ],
              },
              {
                title: '6. Limitation of Liability',
                content: [
                  'Developer is not responsible for any damages caused by API usage.',
                  'Users are accountable for legal compliance.',
                ],
              },
              {
                title: '7. Termination',
                content: [
                  'Access can be terminated at any time for violations.',
                  'Users must stop using and delete data upon termination.',
                ],
              },
              {
                title: '8. Modifications',
                content: [
                  'Terms may change at any time. Continued usage implies acceptance.',
                ],
              },
              {
                title: '9. Contact',
                content: [
                  'For questions, contact us at:',
                  <span key="email" className="font-medium text-black">threader.tech@gmail.com</span>,
                ],
              },
            ].map((section, index) => (
              <section key={index}>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{section.title}</h2>
                <div className="space-y-2">
                  {section.content.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-gray-600 border-t pt-6">
            By using the ThreadSnatch API, you confirm that you have read, understood, and agreed to these Terms of Use.
          </p>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default TNC;

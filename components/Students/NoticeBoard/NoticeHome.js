import { ArrowLeft, NotepadText } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useStateContextDashboard } from '../../../src/context/UtilitiesContext';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';

const NoticeHome = () => {
  const { activeMenu } = useStateContextDashboard();
  const [currentContent, setCurrentContent] = useState(null);

  const router = useRouter();

  useEffect(() => {
    setCurrentContent(contentArray[0]);
  }, []);

  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <div
        className={`${
          activeMenu
            ? 'w-full mx-auto px-4'
            : 'w-full pr-6 pr-3 md:pr-[6] pl-[84px] md:pl-[96px]'
        } mx-auto flex items-start gap-6`}
      >
        {/* NOTE: LEFT SIDE */}
        <div className="w-[65%] ">
          <div className="flex items-end gap-4 pt-6">
            <ButtonDashboard onClick={handleBack}>
              <ArrowLeft />
              Back
            </ButtonDashboard>
          </div>
          <div className="pb-2 my-5 bg-white border rounded-lg overflow-hidden">
            <h2
              className="flex items-center gap-2 font-heading font-bold text-lg bg-[#ff48003a]
            px-5 py-2 text-[orangered]"
            >
              <NotepadText className="-mt-1" /> Notice
            </h2>
            <div className="bg-[#f9f9fa] m-4 py-3 px-5 rounded-lg">
              <div className="flex items-center gap-3">
                <Image
                  width={500}
                  height={300}
                  src="/icon/3d-pin.png"
                  className="w-8"
                  alt=""
                />
                <h3 className="text-xl font-bold">{currentContent?.title}</h3>
                <p className="ml-auto">{currentContent?.date}</p>
              </div>
              <p
                className="inline-block px-2 py-1 bg-[#f6fef9] border border-[#53cb93] 
              text-[#53cb93] text-xs rounded ml-11 mt-3 font-medium"
              >
                Live Class
              </p>
              <div
                className="text-base ml-11 mt-5"
                dangerouslySetInnerHTML={{ __html: currentContent?.richText }}
              />
            </div>
          </div>
        </div>

        {/* NOTE: RIGHT SIDE */}
        <div className="w-[35%] rounded-lg py-5 my-5">
          <h2 className="text-xl font-semibold px-3">Previous Notice</h2>

          {contentArray?.map((item, index) => (
            <div
              key={item.id}
              className={`w-full border ${
                item.id === currentContent?.id && 'border-[orangered]'
              } bg-white py-3 px-5 mx-3 my-3 rounded-lg hover:border-[orangered]
              transition-all cursor-pointer`}
              onClick={() => setCurrentContent(item)}
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-right mt-3 text-sm text-gray-600">
                {item.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeHome;

const contentArray = [
  {
    id: '1a2b3c',
    title: 'New Feature Release',
    date: '2024-08-12',
    richText: `
      <h1>New Feature Release</h1>
      <p>We're thrilled to announce the release of our latest feature! This new feature allows users to manage their tasks more efficiently through a streamlined interface, improved performance, and additional customization options. Whether you're tracking personal projects or collaborating with a team, this feature is designed to enhance your productivity.</p>
      <h2>Key Benefits:</h2>
      <ul>
        <li><strong>Improved Interface:</strong> The user interface has been completely redesigned to be more intuitive and user-friendly, making task management smoother and faster.</li>
        <li><strong>Customization Options:</strong> Tailor the interface and functionality to suit your specific needs with a range of new customization options.</li>
        <li><strong>Performance Enhancements:</strong> Enjoy faster load times and a more responsive experience, even when managing large projects.</li>
      </ul>
      <p>We’ve also included several under-the-hood improvements that make the app more robust and secure. We’re committed to continuously improving our services based on user feedback, and we believe this update will make a significant positive impact on your experience.</p>
      <blockquote>“This update has transformed the way we work. The new features are a game-changer for our team!” — A satisfied user</blockquote>
      <p>Thank you for your continued support. We're excited to see how you'll use this new feature to achieve your goals!</p>
      <footer>If you have any questions or feedback, please don't hesitate to reach out to our support team.</footer>
    `,
  },
  {
    id: '4d5e6f',
    title: 'Scheduled Maintenance',
    date: '2024-08-15',
    richText: `
      <h1>Scheduled Maintenance Notice</h1>
      <p>We want to inform you about an upcoming scheduled maintenance that will take place on <strong>August 15, 2024</strong>, from <strong>2 AM to 4 AM (UTC)</strong>. During this time, our services will be temporarily unavailable. This maintenance is necessary to ensure the continued stability and security of our platform.</p>
      <h2>What to Expect:</h2>
      <ul>
        <li><strong>Temporary Downtime:</strong> All services will be offline during the maintenance window. We recommend saving your work and logging out before the maintenance begins.</li>
        <li><strong>System Updates:</strong> We'll be implementing critical updates that will enhance security, improve performance, and lay the groundwork for future features.</li>
        <li><strong>Minimal Disruption:</strong> We've scheduled this maintenance during off-peak hours to minimize any disruption to your workflow.</li>
      </ul>
      <p>We understand that any downtime can be inconvenient, and we appreciate your understanding as we work to improve our services. If you have any questions or concerns, please don't hesitate to contact our support team.</p>
      <blockquote>“Maintenance is key to ensuring the reliability and security of our platform. We aim to make these updates as seamless as possible.” — Technical Team</blockquote>
      <footer>Thank you for your cooperation and continued support.</footer>
    `,
  },
  {
    id: '7g8h9i',
    title: 'Monthly Newsletter - August',
    date: '2024-08-01',
    richText: `
      <h1>August 2024 Newsletter</h1>
      <p>Welcome to the August edition of our monthly newsletter! We're excited to share the latest updates, news, and insights from our community. This month has been particularly eventful, with several new developments and initiatives that we believe will greatly benefit our users.</p>
      <h2>What's New?</h2>
      <ul>
        <li><strong>Feature Spotlight:</strong> Our new task management tool has been a big hit! We've received positive feedback from users around the globe who appreciate the enhanced functionality and ease of use.</li>
        <li><strong>Community Events:</strong> We're hosting a series of virtual workshops and webinars this month. These events are designed to help you get the most out of our tools and connect with other users.</li>
        <li><strong>User Stories:</strong> In this edition, we're featuring stories from three different users who have achieved incredible results using our platform. Their experiences highlight the versatility and impact of our tools in real-world scenarios.</li>
      </ul>
      <h2>Upcoming Events:</h2>
      <p>Don't miss out on our upcoming events! This month, we're focusing on enhancing your skills and knowledge with a range of learning opportunities:</p>
      <ul>
        <li><strong>August 10:</strong> Webinar on advanced task management techniques.</li>
        <li><strong>August 20:</strong> Virtual networking event for professionals in project management.</li>
        <li><strong>August 30:</strong> Q&A session with our product development team.</li>
      </ul>
      <p>As always, we're here to support you. If you have any questions, suggestions, or feedback, feel free to reach out to us. We're committed to ensuring you have the best experience possible.</p>
      <blockquote>“Our community is at the heart of everything we do. We're grateful for your continued engagement and support.” — The Team</blockquote>
      <footer>Stay tuned for more updates in the next edition of our newsletter.</footer>
    `,
  },
  {
    id: '0j1k2l',
    title: 'Security Update',
    date: '2024-08-10',
    richText: `
      <h1>Important Security Update</h1>
      <p>Your security is our top priority. We're writing to inform you of a critical security update that has been applied to our platform. This update addresses several vulnerabilities that were recently discovered, ensuring that your data remains safe and secure.</p>
      <h2>Details of the Update:</h2>
      <ul>
        <li><strong>Vulnerability Patches:</strong> We've patched several vulnerabilities that could have been exploited by malicious actors. These patches ensure that your data is protected against the latest threats.</li>
        <li><strong>Enhanced Encryption:</strong> We've implemented stronger encryption protocols across the platform. This ensures that all data transmitted between your device and our servers is securely encrypted.</li>
        <li><strong>Security Best Practices:</strong> We've updated our security protocols to align with the latest industry standards. This includes improvements to our authentication systems, monitoring, and incident response procedures.</li>
      </ul>
      <p>We strongly recommend that you take the following steps to enhance your security:</p>
      <ul>
        <li><strong>Reset Your Password:</strong> As a precaution, please reset your account password. Choose a strong, unique password that you don't use for any other accounts.</li>
        <li><strong>Enable Two-Factor Authentication:</strong> If you haven't already, enable two-factor authentication (2FA) on your account. This adds an extra layer of security to your login process.</li>
        <li><strong>Stay Vigilant:</strong> Be cautious of phishing attempts and other online scams. Always verify the authenticity of communications claiming to be from us.</li>
      </ul>
      <p>Your trust is important to us, and we're committed to keeping your data secure. If you have any questions or concerns about this update, please don't hesitate to contact our support team.</p>
      <blockquote>“Security is an ongoing effort. We're constantly working to protect our users' data and stay ahead of emerging threats.” — Security Team</blockquote>
      <footer>Thank you for your attention to this important matter.</footer>
    `,
  },
];

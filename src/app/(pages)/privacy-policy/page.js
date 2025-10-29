import PolicyLayout from "../../components/Policy/PolicyLayout";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy",
};

function Privacy() {
  const data = [
    {
      title: "Introduction",
      content:
        "This Privacy Policy details H&K holidays LLP (H&K Holidays) collects, uses, and safeguards the personal information of users accessing our website, Travel Tailor., App or Whatsapp channels. Personal information refers to data that can identify you as an individual, such as your name, address, phone number, email address, and payment details. We encourage you to read this policy carefully to understand our practices. Please note that we may update this policy periodically, so we recommend reviewing this page regularly to stay informed of any changes. Regardless of future updates, we will adhere to the privacy practices described herein at the time your personal information was collected.",
    },
    {
      title: "Browsing Our Website",
      content:
        "You are not required to provide any personal information while browsing our site unless you choose to make a purchase or sign up for our newsletters or other services.1.2 Making a Purchase",
    },
    {
      title: "Making a Purchase",
      content:
        "To book travel and related services through our website, we require certain personal details: \n **Personal Information:** Your name, email address, telephone number, PAN Card, Passport Details, and billing address. \n**Payment Details:** Credit card number, expiration date, and billing information.\n**Traveler Information:** Names of all travelers if you are booking for others.\n**‍Additional Information:** Frequent flyer numbers or other travel-related preferences.\nThis information is necessary to process and confirm your reservations and to keep you updated on your transaction status. If you are booking on behalf of others, please ensure you have their consent to share their personal information with us.",
    },
    {
      title: "Creating an Account",
      content:
        "When you register as a member on Travel Tailor., we collect:\n**Login Information:** Unique username and password, along with a password hint.\n**Contact Information:** Name, address, telephone number, and email address.\nThis information is used for:\nPersonal identification.\nCompleting travel reservations.\nCustomer service communication.\nPersonalizing website content to suit your preferences.\nEnhancing our products and services.\nWe also use your email address to confirm your registration and any reservations you make.",
    },
    {
      title: "Travel Tailor Mobile Application",
      content:
        "Our mobile app does not publicly disclose any personal or sensitive data related to financial transactions or government identification numbers. ",
    },
    {
      title: "Camera and Microphone Access",
      content:
        "We may request access to your camera and microphone (primarily on iOS devices) to allow you to take photos or videos and send them to our customer support team if assistance is needed.",
    },
    {
      title: "GPS Location",
      content:
        "We may request access to your GPS location on both Android and iOS devices to suggest nearby places of interest.\nAs a member, you may occasionally receive updates about special offers, travel inspirations, and other relevant information. You can opt out of these communications at any time (see Section 5 for details).",
    },
    {
      title: "Member Profile",
      content:
        "You have the option to complete your online profile by providing:\n- Travel preferences.\n- Frequent traveler or loyalty program numbers.\n- Payment and billing information.\n- Delivery addresses for physical vouchers or tickets.\nThis information helps you make reservations quickly without re-entering your details each time.",
    },
    {
      title: "Online Surveys",
      content:
        "We value your feedback and may conduct online surveys to improve our services. Participation is voluntary, and information collected is typically aggregated and used to enhance our website and offerings.",
    },
    {
      title: "Promotions and Contests",
      content:
        "From time to time, we may offer promotions. Participation may require providing contact information and answering survey questions. This information is used to notify winners and improve our services.",
    },
    {
      title: "Automatic Session Data Logging",
      content:
        "We automatically collect generic information about your computer's connection to the Internet, known as 'session data.' This includes:\n- IP address.\n- Operating system.\n- Browser type.\n- Activities conducted on our site.\nThis data helps us analyze user behavior, diagnose server issues, and administer our systems. While this information does not personally identify you, it can indicate your Internet Service Provider (ISP) and approximate geographic location.",
    },
    {
      title: "Cookies and Tracking Technologies",
      content:
        "'Cookies' are small data files stored on your computer by your web browser. They help us personalize your experience on our site by:\n- Remembering your login information (only your password is needed upon subsequent visits).\n- Displaying advertisements or offers that may interest you.\n- Tracking the effectiveness of our advertising campaigns.\nWe assure you that cookies placed by Travel Tailor. do not store any personally identifiable information (PII). You can control cookie acceptance through your browser settings. However, blocking cookies may limit certain features and functionalities of our website.",
    },
    {
      title: "Additional Features and Services",
      content:
        "We may introduce new services or features on Travel Tailor.. If you choose to use these services, we will use the information you provide to facilitate your requests. For example, if you contact us with a question, we will use your contact information to respond.",
    },
    {
      title: "Service Providers",
      content:
        "To fulfill your travel arrangements, we may need to share your personal information with:\n- Airlines.\n- Hotels.\n- Car rental agencies.\n- Travel agencies.\n- Other third-party service providers.\nWe do not sell or rent your personal information to third parties.",
    },
    {
      title: "Contracted Research & Marketing Vendors",
      content:
        "We may use your data for:\n- Statistical analysis.\n- Improving our services.\n- Sharing with suppliers, advertisers, affiliates, and business partners.\nWe ensure data privacy by binding our vendors with confidentiality clauses and ensure very strong technical infrastructure for data security",
    },
    {
      title: "Third-Party Projects",
      content:
        "We may engage third parties for projects like:\n- Market research surveys.\n- Contest processing.\nInformation provided to these third parties is protected by confidentiality agreements and used solely for the specified project.",
    },
    {
      title: "Managing Your Communication Preferences",
      content:
        "If you prefer not to receive promotional communications, you can opt out by:\n- Clicking the 'unsubscribe' link in promotional emails.\n- Following the instructions provided in the communication.\n- Adjusting your preferences in your account settings on Travel Tailor..\n- Contacting us directly via email athi@traveltailor.in.\nPlease note that we reserve the right to limit membership to those who accept communications.",
    },
    {
      title: "Protecting Your Information",
      content:
        "All payments made on Travel Tailor. are secured using SSL (Secure Socket Layer) encryption. This technology encrypts your personal information before transmission, ensuring your data is protected during online transactions.",
    },
    {
      title: "External Links",
      content:
        "Our website may contain links to external sites. We are not responsible for the privacy practices of these websites. We encourage you to review their privacy policies.",
    },
    {
      title: "Password Security",
      content:
        "You are responsible for maintaining the confidentiality of your passwords and account information. Please exercise caution when sharing this information online.",
    },
    {
      title: "Legal Disclosure",
      content:
        "We may disclose your personal information if required by law, court order, or governmental authority. This includes:\n- Protecting the rights and property of H&K Holidays LLP and its affiliates.\n- Identifying or taking legal action against individuals causing harm or interference.\n- Compliance with legal obligations.\nIn the event of a corporate transaction, such as a merger or acquisition, your personal information may be transferred as part of the assets.",
    },
    {
      title: "Effective Date and Changes to Policy",
      content:
        "This policy is effective as of **30th August, 2024**.. We may update this Privacy Policy periodically to reflect changes in our practices. Significant changes will be communicated through updates on this page. We encourage you to review this Privacy Policy regularly to stay informed.",
    },
    {
      title: "Contact Information",
      content:
        "If you have any questions or concerns about our Privacy Policy or how we handle your personal information, please contact us at:\n-Email:hi@traveltailor.in\n- Subject Line: 'Privacy Policy Inquiry'\nWe will make every effort to address your concerns promptly, typically within seven working days.",
    },
    {
      title: "Cancellation & Refund Policy",
      content:
        "In case of user's request to cancel a booking, the following cancellation fee's are applicable\nPartner Cancellation Fee: Please refer to the Airline, Hotel, Activity or Transfer cancellation policy for H&K Holidays and it's users while booking.\nH&K Holidays Cancellation Fee: Please refer to H&K Holidays cancellation fee on your travel voucher. The balance amount between what user has paid and cancellation fee will be refunded to the user.",
    },
    {
      title: "Conclusion",
      content:
        "We appreciate the opportunity to serve you and are dedicated to protecting your privacy. Thank you for choosing Travel Tailor for your travel experiences.\n\nBy using our services, you agree to the terms outlined in this Privacy Policy. If you do not agree with any part of this policy, please do not use our website or services.",
    },
  ];

  return (
    <section className="p1">
      <PolicyLayout
        data={data}
        title="Privacy Policy"
        subtitle="Please read these terms carefully"
      />
    </section>
  );
}

export default Privacy;

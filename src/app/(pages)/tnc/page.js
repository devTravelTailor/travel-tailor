import PolicyLayout from "../../components/Policy/PolicyLayout";

export const metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions",
};

function Tnc() {
  // {
  //     "title": "Scope of Agreement",
  //     "content": "This User Agreement (\"Agreement\") outlines the terms and conditions under which H&K Holidays LLP (\"H&K Holidays\") and its brand Travel Tailor provide services to individuals (\"User\") who intend to purchase or inquire about any products and/or services offered by H&K Holidays, whether through our website \\l\\Traveltailor.in|https://traveltailor.in \n\nor any other customer interface channels. Each of H&K Holidays and the User is individually referred to as a \"party,\" and collectively as the \"parties.\""
  // }

  const data = [
    {
      title: "Scope of Agreement",
      content:
        'This User Agreement ("Agreement") outlines the terms and conditions under which H&K Holidays LLP ("H&K Holidays") and its brand Travel Tailor provide services to individuals ("User") who intend to purchase or inquire about any products and/or services offered by H&K Holidays, whether through our website \\l\\Traveltailor.in|https://traveltailor.in \n\n nor any other customer interface channels. Each of H&K Holidays and the User is individually referred to as a "party," and collectively as the "parties."',
    },
    {
      title: "Acceptance of Terms",
      content:
        "By availing services from H&K Holidays, Users confirm that they have read, comprehended, and expressly agreed to the terms and conditions of this Agreement, which govern all transactions and services provided by H&K Holidays. This Agreement is binding and defines all rights and obligations of both the User and H&K Holidays concerning any services offered by H&K Holidays.",
    },
    {
      title: "Right to Terminate Access",
      content:
        "H&K Holidays reserves the right, at its sole discretion, to terminate access to any or all of its websites or other sales channels, and related services or any portion thereof, at any time without notice, whether for general maintenance or any other reason.",
    },
    {
      title: "Additional Terms for Specific Services",
      content:
        'In addition to this Agreement, specific Terms of Service ("TOS") may apply to particular services or products provided by H&K Holidays, such as travel packages,hotel reservations, air tickets, etc.. These TOS, provided or updated by H&K Holidays, are considered part of this Agreement. In the event of any conflict between such TOS and this Agreement, the terms of this Agreement shall prevail.',
    },
    {
      title: "Compliance with Service Provider Policies",
      content:
        "Users are required to read and accept the relevant TOS for the services or products they avail. Moreover, service providers themselves may offer terms and guidelines governing specific features, offers, operating rules, or policies applicable to each service (e.g., flights, hotel reservations, packages). The User is responsible for ensuring compliance with the terms, guidelines, and policies of the service provider they choose to engage with, including any terms and conditions set by the service provider.",
    },
    {
      title: "Unconditional Acceptance of Terms",
      content:
        "H&K Holidays's services are offered to the User on the condition of acceptance, without modification, of all terms, conditions, and notices contained in this Agreement and any applicable TOS. Availing the services constitutes the User's acknowledgment and acceptance of this Agreement and the TOS. If the User does not agree with any part of these terms, they must not avail themselves of H&K Holidays's services.",
    },
    {
      title: "Precedence of Terms",
      content:
        "In the event of any conflict between the terms, conditions, and notices contained herein and any additional terms or other terms and guidelines in any other H&K Holidays document or website, the terms of this Agreement shall prevail.",
    },
    {
      title: "Third-Party Account Access",
      content:
        "By using the account access services on Travel Tailor' website, the User authorizes H&K Holidays and its agents to access third-party sites, including banks and payment gateways, designated by them or on their behalf for retrieving requested information. When registering, the User will select a password and is responsible for maintaining its confidentiality along with the security of their account.The User is solely responsible for all activities that occur under their password or account. It is the User's responsibility to notify H&K Holidays immediately in writing of any unauthorized use of their password or account or any other security breach. H&K Holidays will not be liable for any loss that may be incurred by the User as a result of unauthorized use of their password or account, with or without their knowledge. The User must not use anyone else's password at any time.",
    },
    {
      title: "Confidential Information",
      content:
        "Any information specifically designated by H&K Holidays as confidential must be kept confidential by the User and not disclosed unless required by law or necessary to fulfill the purposes and obligations of this Agreement for both parties.",
    },
    {
      title: "Use of Website/ App/ Whatsapp",
      content:
        "Your use of any information or materials on the Travel Tailor website/App/ Whatsapp  is entirely at your own risk; H&K Holidays accepts no liability for such use. It is your responsibility to ensure that any products, services, or information available through our website meet your specific requirements.You are prohibited from altering, duplicating, distributing, transmitting, reproducing, publishing, licensing, or selling any information, software, products, or services obtained from this website. Duplication of content from the website is forbidden in accordance with our copyright notice, which is part of these Terms of Use. Additionally, H&K Holidays reserves the right to modify, revise, and delete any content without prior notice to any person.",
    },
    {
      title: "User's Duties",
      content:
        "H&K Holidays is responsible only for the transactions conducted by the User through H&K Holidays. We are not responsible for screening, censoring, or otherwise controlling transactions, including determining whether a transaction is legal and valid according to the laws of the User's country. Users must verify the accuracy of all data and bookings themselves. The User warrants that they will abide by all additional procedures and guidelines, as modified from time to time, related to the use of our services. The User further warrants that they will comply with all applicable laws and regulations regarding the use of the services, relevant to the jurisdiction concerned for each transaction.",
    },
    {
      title: "Insurance Responsibility",
      content:
        "Unless explicitly provided by H&K Holidays in any specific service or deliverable, obtaining adequate insurance coverage is the responsibility of the User, and H&K Holidays does not accept any claims arising from such scenarios.Any insurance provided as part of a service or product by H&K Holidays shall be governed by the terms and conditions of the insurance company. The User must contact the insurance company directly for any claims or disputes. H&K Holidays does not provide any express or implied assurances regarding the acceptance of claims by the insurance company.",
    },
    {
      title: "Circumstances Beyond Control (Force Majeure)",
      content:
        "The User acknowledges that there may be exceptional circumstances where service providers such as airlines, hotels, or transportation providers may be unable to honor confirmed bookings due to reasons such as weather conditions, labor unrest, insolvency, business exigencies, government decisions, operational and technical issues, route and flight cancellations, etc. If H&K Holidays is informed in advance of such situations where bookings may not be honored, we will make our best efforts to provide a similar alternative to our customers or refund the booking amount after deducting reasonable service charges, if supported and refunded by the respective service providers. The User agrees that H&K Holidays, acting as an agent facilitating booking services, is not responsible for such circumstances, and customers must contact the service provider directly for any further resolutions and refunds.\nThe User agrees that in situations due to any technical or other failure in H&K Holidays's systems, services previously committed may not be provided or may involve substantial modification. In such cases, H&K Holidays will refund the entire amount received from the customer for such services, minus any applicable cancellation, refund, or other charges, which will completely discharge any and all liabilities of H&K Holidays for such non-provision or deficiencies. Any additional liabilities shall be borne by the User.\n\nH&K Holidays shall not be liable for delays, performance failures, or non-performance, in whole or in part, of its obligations due to any causes beyond its reasonable control, such as acts of God, fire, strikes, embargo, government actions, acts of terrorism, or other similar causes, including problems at airlines, rails, buses, hotels, or transporters. In such events, affected users will be notified promptly as the situation permits.\nWithout prejudice to the foregoing, the maximum liability of H&K Holidays under any circumstances, in respect of any services offered on the site, shall be limited to the refund of the total amount received from the customer for such services, less any applicable cancellation, refund, or other charges. In no case shall liability include any loss, damage, or additional expense beyond the amount charged by H&K Holidays for its services.\nUnder no circumstances shall H&K Holidays and/or its suppliers be liable for any direct, indirect, punitive, incidental, special, consequential damages, or any damages whatsoever, including without limitation damages for loss of use, data, or profits, arising out of or connected with the use or performance of the Travel Tailor website or any other channels. H&K Holidays shall not be responsible for any delay or inability to use the website or related services, the provision of or failure to provide services, or for any information, software, products, services, and related graphics obtained through the website, or otherwise arising out of the use of the website, whether based on contract, tort, negligence, strict liability, or otherwise. H&K Holidays is not responsible for any errors, omissions, or representations on any of its pages or any links or any of the linked pages.",
    },
    {
      title: "Data Download and Security",
      content:
        "The User understands and agrees that any material and/or data downloaded or otherwise obtained through the use of the services is done entirely at their own discretion and risk, and they are solely responsible for any damage to their computer systems or loss of data resulting from such downloads.Nevertheless, H&K Holidays will make its best efforts to ensure that the content on its website or other information channels is free of viruses or other malware.",
    },
    {
      title: "Customer Feedback and Communication",
      content:
        "The User acknowledges that H&K Holidays offers various services such as travel packages and would like to inform them about these services to enhance their travel experience. The User hereby specifically authorizes H&K Holidays to contact them with offers on various services through direct mail, email, telephone calls, SMS, or any other medium from time to time. If the User prefers not to be contacted, they should write to H&K Holidays at hi@traveltailor.in or specify their preferences to the respective service provider. Users are advised to read and understand the privacy policy of H&K Holidays on its website, which governs how H&K Holidays contacts or solicits the User or shares the User's information.",
    },
    {
      title: "Intellectual Property Rights",
      content:
        "H&K Holidays may provide the User with content such as audio, photographs, graphics, videos, or other materials contained in sponsor advertisements or information. This material may be protected by copyrights, trademarks, or other intellectual property rights and laws.\nThe User may use this material only as expressly authorized by H&K Holidays and must not copy, transmit, or create derivative works of such material without express authorization.\nThe User acknowledges and agrees that they shall not upload, post, reproduce, or distribute any content on or through the services that is protected by copyright or other proprietary rights of a third party without obtaining the written permission of the owner of such rights.\nAny copyrighted or proprietary content distributed with the consent of the owner must include the appropriate copyright or proprietary rights notice. Unauthorized submission or distribution of copyrighted or proprietary content is illegal and may subject the User to personal liability or criminal prosecution.",
    },
    {
      title: "Visa Requirements",
      content:
        "Travel bookings made by H&K Holidays are subject to applicable visa requirements, which must be obtained by the individual traveler. H&K Holidays is not responsible for any issues, including inability to travel, arising from such visa requirements and is not liable to refund for untraveled bookings due to such reasons.",
    },
    {
      title: "Indemnity",
      content:
        "The User agrees to indemnify, defend, and hold harmless H&K Holidays and/or its affiliates, their websites, and their respective lawful successors and assigns from and against any and all losses, liabilities, claims, damages, costs, and expenses (including reasonable legal fees and disbursements in connection therewith and interest chargeable thereon) asserted against or incurred by H&K Holidays and/or its affiliates, partner websites, and their respective lawful successors and assigns that arise out of, result from, or may be payable by virtue of any breach or non-performance of any representation, warranty, covenant, or agreement made or obligation to be performed by the User pursuant to this Agreement.\nThe User shall be solely and exclusively liable for any breach of any country-specific rules and regulations or general code of conduct, and H&K Holidays cannot be held responsible for the same.",
    },
    {
      title: "Right to Decline Service",
      content:
        "H&K Holidays reserves the right, at its sole discretion, to decline any customer order without providing any reason. Any contract to provide any service by H&K Holidays is not complete until full payment for the service is received from the customer and accepted by H&K Holidays.\nWithout prejudice to other remedies available to H&K Holidays under this Agreement, the TOS, or applicable law, H&K Holidays may limit the User's activity, terminate the User's listing, warn other users of the User's actions, immediately suspend or terminate the User's registration temporarily or indefinitely, and/or refuse to provide the User with access to the website if:\n- The User is in breach of this Agreement, the TOS, and/or the documents it incorporates by reference.\n- H&K Holidays is unable to verify or authenticate any information provided by the User.\n- H&K Holidays believes that the User's actions may infringe on any third-party rights or breach any applicable law or otherwise result in any liability for the User, other users of the website, and/or H&K Holidays.\nH&K Holidays may, at any time in its sole discretion, reinstate suspended users. Once the User has been indefinitely suspended, they shall not register or attempt to register with H&K Holidays or use the website in any manner whatsoever until reinstated by H&K Holidays.\nNotwithstanding the foregoing, if the User breaches this Agreement, the TOS, or the documents it incorporates by reference, H&K Holidays reserves the right to recover any amounts due and owing by the User to H&K Holidays and/or the service provider and to take any legal action as deemed necessary.",
    },
    {
      title: "Cancellation Due to Invalid Information",
      content:
        "The User expressly undertakes to provide H&K Holidays only with accurate and valid information when requesting any services under this Agreement, and not to misrepresent any facts. Any default by the User would invalidate this Agreement and disqualify the User from availing services from H&K Holidays.\nIf H&K Holidays discovers or has reasons to believe, at any time during or after receiving a request for services from the User, that the request is unauthorized or the information provided is incorrect or that any fact has been misrepresented, H&K Holidays has the unrestricted right, at its sole discretion, to take any steps against the User(s), including cancellation of bookings, without prior notice. In such an event, H&K Holidays shall not be responsible or liable for any loss or damage that may be caused to the User as a consequence of such cancellation.\nThe User unequivocally indemnifies H&K Holidays against any such claim or liability and shall not hold H&K Holidays responsible for any loss or damage arising out of measures taken by H&K Holidays for safeguarding its own interests and those of its genuine customers. This includes H&K Holidays denying or cancelling any bookings on account of suspected fraudulent transactions.",
    },
    {
      title: "Severability Clause",
      content:
        "If any provision of this Agreement is found to be invalid or unenforceable, in whole or in part, such invalidity or unenforceability shall apply only to that provision or part thereof, and the remaining provisions of this Agreement shall remain in full force and effect.",
    },
    {
      title: "Section Headings",
      content:
        "The headings and subheadings in this Agreement are included for convenience and identification only and are not intended to describe, interpret, define, or limit the scope, extent, or intent of this Agreement, terms and conditions, notices, or the User's right to use this website, or any other section or pages of H&K Holidays's websites or partner websites, or any provision hereof in any manner whatsoever.In the event that any of the terms, conditions, and notices contained herein conflict with any additional terms or other terms and guidelines contained within any particular H&K Holidays document or website, these terms shall prevail.",
    },
    {
      title: "Relationship Between Parties",
      content:
        "Nothing in this Agreement, terms and conditions, notices, or the User's right to use this website contained herein or in any other section or pages of H&K Holidays's websites or partner websites shall be construed as constituting a partnership between the User and H&K Holidays. No party shall have any authority to bind or shall be deemed to be the agent of the other in any way.",
    },
    {
      title: "Information Updates",
      content:
        "The User acknowledges that H&K Holidays provides services with reasonable diligence and care, and endeavors to ensure that the User does not face any inconvenience. However, from time to time, the information, software, products, and services included in or available through the Travel Tailor website or other sales channels and promotional materials may contain inaccuracies or typographical errors, which will be corrected as soon as H&K Holidays becomes aware of them. Changes may be periodically made to the information provided. H&K Holidays may make improvements and/or changes to the website at any time without notice to the User. Any advice received except through an authorized representative of H&K Holidays via the Travel Tailor website should not be relied upon for any decisions.",
    },
    {
      title: "Changes to Terms",
      content:
        "H&K Holidays reserves the right to change the terms, conditions, and notices under which the Travel Tailor website is offered, including but not limited to charges for services. The User is responsible for regularly reviewing these terms and conditions.",
    },
    {
      title: "Governing Law and Jurisdiction",
      content:
        "This Agreement shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with this Agreement shall be subject to the exclusive jurisdiction of the courts of Bangalore, India.",
    },
    {
      title: "User's Responsibilities Under the Agreement",
      content:
        'The User expressly agrees that use of the services is at their sole risk. To the extent that H&K Holidays acts only as a booking agent on behalf of third-party service providers, it shall not have any liability whatsoever for any aspect of the standards of services provided by those service providers. Under no circumstances shall H&K Holidays be liable for the services provided by the service provider. The services are provided on an "as is" and "as available" basis. H&K Holidays may change the features or functionality of the services at any time, at its sole discretion, without notice. H&K Holidays expressly disclaims all warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, and non-infringement. No advice or information, whether oral or written, obtained by the User from H&K Holidays or through the services shall create any warranty not expressly stated herein or in the terms and conditions of the services. If the User does not agree with any of the above terms, they are advised not to read the material on any of the Travel Tailor pages or otherwise use any of the contents, pages, information, or any other material provided by H&K Holidays. The sole and exclusive remedy of the User in case of disagreement, in whole or in part, with the User Agreement, is to discontinue using the services after notifying H&K Holidays in writing.',
    },
    {
      title: "Use of Customer Images",
      content:
        "Any pictures or videos shared by customers during or after their trip, whether in support groups or emails, may be used on our social media platforms to engage our audience. If you are not comfortable with this, please send an email to hi@traveltailor.in, and we will address your request promptly.",
    },
    {
      title: "Definitions",
      content:
        'Unless otherwise defined in the context, the following terms have the meanings specified:\n "Agreement" refers to these terms and conditions, including any additional terms, policies, or guidelines incorporated by reference.\n "H&K Holidays" refers to H&K Holidays LLP  and its brand Travel Tailor.\n "User" refers to any individual who uses or accesses the website or services provided by H&K Holidays.\n "Services" refers to the travel-related services offered by H&K Holidays through its website or other channels.',
    },
    {
      title: "Dispute Resolution",
      content:
        "Any disputes or differences arising out of or relating to this Agreement shall be resolved amicably. If such resolution is not possible, the disputes shall be referred to arbitration in accordance with the Indian Arbitration and Conciliation Act, 1996. The place of arbitration shall be New Delhi, India, and the language of arbitration shall be English.",
    },
    {
      title: "Privacy Policy",
      content:
        "Your use of the website and services is also governed by our Privacy Policy, which is incorporated by reference into this Agreement. Please review our Privacy Policy to understand our practices.",
    },
    {
      title: "User Behavior",
      content:
        "The User agrees to use the website and services only for lawful purposes. The User shall not post or transmit through the website any material which violates or infringes the rights of others, or which is unlawful, threatening, abusive, defamatory, invasive of privacy or publicity rights, vulgar, obscene, or otherwise objectionable.",
    },
    {
      title: "Forbidden Activities",
      content:
        "The User is prohibited from engaging in the following activities:\nUsing the website or services for any illegal purpose or in violation of any local, state, national, or international law.\nAttempting to gain unauthorized access to any portion of the website or any systems or networks connected to the website.\nUsing any device, software, or routine to interfere or attempt to interfere with the proper working of the website or any transaction conducted on the website.\nCopying, reproducing, or distributing any part of the website in any medium without H&K Holidays's prior written authorization.",
    },
    {
      title: "External Links",
      content:
        "The website may contain links to external websites that are not operated by H&K Holidays. H&K Holidays has no control over the content of such websites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.",
    },
    {
      title: "Termination of Access",
      content:
        "H&K Holidays reserves the right, in its sole discretion, to terminate or restrict your access to all or any part of the website or services at any time, without notice, for any or no reason, and without liability.",
    },
    {
      title: "Entire Agreement",
      content:
        "This Agreement, including any additional terms and policies referenced herein, constitutes the entire agreement between the User and H&K Holidays with respect to the use of the website and services",
    },
    {
      title: "Non-Waiver",
      content:
        "The failure of H&K Holidays to enforce any right or provision of this Agreement shall not constitute a waiver of such right or provision.",
    },
    {
      title: "Assignment",
      content:
        "H&K Holidays may assign its rights and obligations under this Agreement to any party at any time without notice to the User. The User may not assign their rights or obligations under this Agreement without H&K Holidays's prior written consent.",
    },
    {
      title: "Refund & Cancellation Policy",
      content:
        "In case of user's request to cancel a booking, the following cancellation fee's are applicable \n - **Custom Itineraries:** Once the itinerary planning fee is paid, it is non-refundable.\n- **Travel Bookings:** Refunds for hotels, flights, and activities are subject to the cancellation policies of our partner providers which will be informed at the time of travel bookings. We will facilitate the process but cannot guarantee refunds beyond those terms.\n- **Refund Timeline:** Eligible refunds, if any, will be processed within 7–14 business days.\n- **Cancellation Requests:** All requests must be submitted in writing to hi@traveltalor.in",
    },
    {
      title: "Contact Details",
      content:
        "If you have any questions about this Agreement or the services, please contact us at hi@traveltailor.in.\n\nBy using our services, you agree to be bound by the terms and conditions set forth above. If you do not agree with any of these terms, please do not use our services.",
    },
  ];

  return (
    <section>
      <PolicyLayout
        data={data}
        title="Terms and Conditions"
        subtitle="Please read these terms carefully"
      />
    </section>
  );
}

export default Tnc;

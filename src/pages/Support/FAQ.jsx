import React from 'react'

const FAQ = () => {
  return (
    
<div className='w-10/12 mx-auto flex flex-col gap-4 my-12'>
<div className="collapse collapse-arrow ">
  <input type="radio" name="my-accordion-2" defaultChecked />
  <div className="collapse-title text-xl font-medium">
    1. How can I reset my password?
  </div>
  <div className="collapse-content">
    <p>
      To reset your password, go to the login page and click on the "Forgot Password" link. 
      Enter your registered email address, and we will send you a password reset link. 
      Follow the instructions in the email to create a new password. If you don’t receive the email within a few minutes, 
      check your spam folder or contact our support team for assistance.
    </p>
  </div>
</div>

<div className="collapse collapse-arrow ">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title text-xl font-medium">
    2. What should I do if I encounter a technical issue on the platform?
  </div>
  <div className="collapse-content">
    <p>
      If you experience a technical issue, try refreshing the page or clearing your browser cache. 
      If the problem persists, note down any error messages and the steps that led to the issue, 
      then submit a support ticket through the "Submit a Request" option on the support page. 
      Our team will review your case and provide a solution as soon as possible.
    </p>
  </div>
</div>

<div className="collapse collapse-arrow ">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title text-xl font-medium">
    3. How do I volunteer for a post?
  </div>
  <div className="collapse-content">
    <p>
      To volunteer for a post, browse the available opportunities on the platform. 
      Once you find a post that interests you, click on the "Volunteer" button to express your interest. 
      The post creator will be notified and may reach out to you for further details. 
      Ensure your profile is complete so they can review your credentials easily.
    </p>
  </div>
</div>

<div className="collapse collapse-arrow ">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title text-xl font-medium">
    4. Can I edit or delete a post I created?
  </div>
  <div className="collapse-content">
    <p>
      Yes, you can edit or delete posts you have created. To do this, go to the "My Posts" section in your dashboard. 
      Locate the post you wish to modify, then click on the "Edit" or "Delete" button. 
      Note that deleting a post is permanent and cannot be undone, so proceed with caution. 
      If you face any issues, contact support for assistance.
    </p>
  </div>
</div>

<div className="collapse collapse-arrow ">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title text-xl font-medium">
    5. How secure is my personal information on this platform?
  </div>
  <div className="collapse-content">
    <p>
      We take the security of your personal information very seriously. 
      Our platform uses state-of-the-art encryption and follows industry best practices to protect your data. 
      We do not share your information with third parties without your consent. 
      For more details, please review our Privacy Policy. If you have specific concerns, feel free to reach out to our support team.
    </p>
  </div>
</div>
</div>
  )
}

export default FAQ
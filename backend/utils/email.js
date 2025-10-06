import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Email templates
const emailTemplates = {
  // Farmer registration confirmation
  farmerWelcome: (farmerName) => ({
    subject: 'Welcome to ProAuthenticate - Farmer Account Created!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1A6B2F, #2D3748); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">🌱 ProAuthenticate</h1>
          <p style="margin: 10px 0 0; opacity: 0.9;">Blockchain Verified Agricultural Products</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #1A6B2F; margin-bottom: 20px;">Welcome, ${farmerName}! 🎉</h2>
          
          <p style="color: #4a5568; line-height: 1.6; margin-bottom: 20px;">
            Your farmer account has been successfully created on ProAuthenticate. 
            You can now start uploading your agricultural products for blockchain verification.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #1A6B2F; margin: 20px 0;">
            <h3 style="color: #2D3748; margin-top: 0;">Next Steps:</h3>
            <ul style="color: #4a5568; line-height: 1.8;">
              <li>Complete your farmer profile</li>
              <li>Add your cryptocurrency wallet address</li>
              <li>Start uploading products for verification</li>
              <li>Track your product verification status</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/farmer-login" 
               style="background: #1A6B2F; color: white; padding: 12px 30px; 
                      text-decoration: none; border-radius: 6px; display: inline-block;
                      font-weight: bold; font-size: 16px;">
              Go to Farmer Dashboard
            </a>
          </div>
          
          <p style="color: #718096; font-size: 14px; text-align: center;">
            Need help? Contact our support team at 
            <a href="mailto:support@proauthenticate.com" style="color: #1A6B2F;">
              support@proauthenticate.com
            </a>
          </p>
        </div>
        
        <div style="background: #2D3748; padding: 20px; text-align: center; color: #a0aec0; font-size: 12px;">
          <p>&copy; 2024 ProAuthenticate. All rights reserved.</p>
          <p>Building trust in agricultural supply chains through blockchain technology.</p>
        </div>
      </div>
    `
  }),

  // Product verification approved
  productApproved: (farmerName, productName, verificationId) => ({
    subject: '🎉 Your Product Has Been Verified! - ProAuthenticate',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1A6B2F, #2D3748); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">✅ Product Verified</h1>
          <p style="margin: 10px 0 0; opacity: 0.9;">Blockchain authentication completed</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #1A6B2F; margin-bottom: 20px;">Great News, ${farmerName}! 🎊</h2>
          
          <p style="color: #4a5568; line-height: 1.6; margin-bottom: 20px;">
            Your product <strong>"${productName}"</strong> has been successfully verified 
            and recorded on the blockchain. It's now live on our marketplace!
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10B981; margin: 20px 0;">
            <h3 style="color: #2D3748; margin-top: 0;">Verification Details:</h3>
            <table style="width: 100%; color: #4a5568;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Product Name:</td>
                <td style="padding: 8px 0;">${productName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Verification ID:</td>
                <td style="padding: 8px 0;">${verificationId}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Status:</td>
                <td style="padding: 8px 0; color: #10B981; font-weight: bold;">✅ Verified & Live</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Timestamp:</td>
                <td style="padding: 8px 0;">${new Date().toLocaleDateString()}</td>
              </tr>
            </table>
          </div>
          
          <p style="color: #4a5568; line-height: 1.6;">
            Customers can now browse and verify your product's authenticity using the QR code 
            and blockchain verification system.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/farmer/products" 
               style="background: #1A6B2F; color: white; padding: 12px 30px; 
                      text-decoration: none; border-radius: 6px; display: inline-block;
                      font-weight: bold; font-size: 16px;">
              View Your Products
            </a>
          </div>
        </div>
      </div>
    `
  }),

  // Product verification rejected
  productRejected: (farmerName, productName, rejectionReason) => ({
    subject: 'Product Verification Update - ProAuthenticate',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #E53E3E, #2D3748); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">⚠️ Verification Required</h1>
          <p style="margin: 10px 0 0; opacity: 0.9;">Action needed for your product</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #2D3748; margin-bottom: 20px;">Update on Your Product, ${farmerName}</h2>
          
          <p style="color: #4a5568; line-height: 1.6; margin-bottom: 20px;">
            Your product <strong>"${productName}"</strong> requires additional information 
            before it can be verified and listed on our marketplace.
          </p>
          
          <div style="background: #FED7D7; padding: 20px; border-radius: 8px; border-left: 4px solid #E53E3E; margin: 20px 0;">
            <h3 style="color: #742A2A; margin-top: 0;">Reason for Rejection:</h3>
            <p style="color: #742A2A; margin: 10px 0;">${rejectionReason}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2D3748; margin-top: 0;">Next Steps:</h3>
            <ol style="color: #4a5568; line-height: 1.8;">
              <li>Review the rejection reason above</li>
              <li>Update your product information as needed</li>
              <li>Resubmit the product for verification</li>
              <li>Our team will review it again within 24-48 hours</li>
            </ol>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/farmer/products" 
               style="background: #1A6B2F; color: white; padding: 12px 30px; 
                      text-decoration: none; border-radius: 6px; display: inline-block;
                      font-weight: bold; font-size: 16px;">
              Update Product
            </a>
          </div>
          
          <p style="color: #718096; font-size: 14px; text-align: center;">
            If you need assistance, please contact our verification team at 
            <a href="mailto:verification@proauthenticate.com" style="color: #1A6B2F;">
              verification@proauthenticate.com
            </a>
          </p>
        </div>
      </div>
    `
  }),

  // Customer welcome email
  customerWelcome: (customerName) => ({
    subject: 'Welcome to ProAuthenticate! Start Buying Verified Products',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1A6B2F, #2D3748); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">🛒 Welcome to ProAuthenticate</h1>
          <p style="margin: 10px 0 0; opacity: 0.9;">Trust in Every Transaction</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #1A6B2F; margin-bottom: 20px;">Hello, ${customerName}! 👋</h2>
          
          <p style="color: #4a5568; line-height: 1.6; margin-bottom: 20px;">
            Welcome to ProAuthenticate - where every product comes with blockchain-verified 
            authenticity and complete supply chain transparency.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #1A6B2F; margin: 20px 0;">
            <h3 style="color: #2D3748; margin-top: 0;">What You Can Do:</h3>
            <ul style="color: #4a5568; line-height: 1.8;">
              <li>Browse verified agricultural products</li>
              <li>Scan QR codes to verify authenticity</li>
              <li>View complete product journey from farm to you</li>
              <li>Connect directly with verified farmers</li>
              <li>Make informed purchasing decisions</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/products" 
               style="background: #1A6B2F; color: white; padding: 12px 30px; 
                      text-decoration: none; border-radius: 6px; display: inline-block;
                      font-weight: bold; font-size: 16px;">
              Start Shopping
            </a>
          </div>
        </div>
      </div>
    `
  }),

  // Password reset email
  passwordReset: (name, resetToken) => ({
    subject: 'Reset Your Password - ProAuthenticate',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1A6B2F, #2D3748); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">🔒 Password Reset</h1>
          <p style="margin: 10px 0 0; opacity: 0.9;">ProAuthenticate Account Security</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #2D3748; margin-bottom: 20px;">Hello ${name},</h2>
          
          <p style="color: #4a5568; line-height: 1.6; margin-bottom: 20px;">
            You requested to reset your password. Click the button below to create a new password.
            This link will expire in 1 hour for security reasons.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}" 
               style="background: #1A6B2F; color: white; padding: 12px 30px; 
                      text-decoration: none; border-radius: 6px; display: inline-block;
                      font-weight: bold; font-size: 16px; margin: 10px;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #718096; font-size: 14px; text-align: center;">
            If you didn't request this reset, please ignore this email or contact support if you have concerns.
          </p>
          
          <div style="background: #E2E8F0; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="color: #4A5568; margin: 0; font-size: 12px;">
              <strong>Security Tip:</strong> Never share your password with anyone. 
              ProAuthenticate will never ask for your password via email.
            </p>
          </div>
        </div>
      </div>
    `
  })
};

// Main email sending function
export const sendEmail = async (to, templateName, data) => {
  try {
    const transporter = createTransporter();
    
    if (!emailTemplates[templateName]) {
      throw new Error(`Email template '${templateName}' not found`);
    }

    const template = emailTemplates[templateName](...data);
    
    const mailOptions = {
      from: `"ProAuthenticate" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: template.subject,
      html: template.html
    };

    const result = await transporter.sendMail(mailOptions);
    
    console.log(`✅ Email sent to ${to}: ${templateName}`);
    return {
      success: true,
      messageId: result.messageId
    };

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Batch email sending
export const sendBulkEmail = async (recipients, templateName, data) => {
  const results = [];
  
  for (const recipient of recipients) {
    const result = await sendEmail(recipient, templateName, data);
    results.push({
      recipient,
      success: result.success,
      messageId: result.messageId,
      error: result.error
    });
    
    // Small delay to avoid hitting rate limits
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return results;
};

// Test email function
export const testEmail = async () => {
  const testResult = await sendEmail(
    process.env.EMAIL_USER,
    'farmerWelcome',
    ['Test Farmer']
  );
  
  return testResult;
};
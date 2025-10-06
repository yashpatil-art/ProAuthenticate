import nodemailer from 'nodemailer';

// Email service configuration
export const emailConfig = {
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  rateDelta: 1000,
  rateLimit: 5
};

// Email templates configuration
export const emailTemplatesConfig = {
  from: {
    name: 'ProAuthenticate',
    address: process.env.EMAIL_USER
  },
  replyTo: 'support@proauthenticate.com',
  subjects: {
    farmerWelcome: 'Welcome to ProAuthenticate - Farmer Account Created!',
    productApproved: '🎉 Your Product Has Been Verified! - ProAuthenticate',
    productRejected: 'Product Verification Update - ProAuthenticate',
    customerWelcome: 'Welcome to ProAuthenticate! Start Buying Verified Products',
    passwordReset: 'Reset Your Password - ProAuthenticate',
    adminNotification: 'New Product Pending Verification - ProAuthenticate'
  }
};

// Create email transporter
export const createEmailTransporter = () => {
  try {
    const transporter = nodemailer.createTransporter(emailConfig);
    
    // Verify transporter configuration
    transporter.verify((error) => {
      if (error) {
        console.error('❌ Email transporter verification failed:', error);
      } else {
        console.log('✅ Email transporter is ready to send messages');
      }
    });
    
    return transporter;
  } catch (error) {
    console.error('❌ Email transporter creation failed:', error);
    throw error;
  }
};

// Email rate limiting configuration
export const emailRateLimit = {
  maxEmailsPerHour: 50,
  maxEmailsPerDay: 1000
};

// Email validation configuration
export const emailValidation = {
  allowedDomains: ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'],
  blockDisposable: true
};

export default {
  emailConfig,
  emailTemplatesConfig,
  createEmailTransporter,
  emailRateLimit,
  emailValidation
};
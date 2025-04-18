const forgotPasswordTemplate = ({ name, otp }) => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
      <h2 style="text-align: center;">Password Reset Request</h2>
      <p>Hi ${name},</p>
      <p>We received a request to reset your password. Use the OTP below to verify your identity:</p>
      <p style="font-size: 1.2em; font-weight: bold; text-align: center; margin: 20px 0;">${otp}</p>
      <p>This code will expire in 10 minutes.</p>
      <p>If you didn’t request a password reset, just ignore this email.</p>
      <p>Thank you!</p>
    </div>
  `;
};

module.exports = forgotPasswordTemplate;
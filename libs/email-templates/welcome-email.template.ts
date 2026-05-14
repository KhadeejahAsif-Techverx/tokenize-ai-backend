interface IWelcomeEmailTemplateDTO {
  loginPageLink: string;
}

export const welcomeEmailTemplate = (payload: IWelcomeEmailTemplateDTO) => {
  const { loginPageLink } = payload;

  if (!loginPageLink) {
    throw new Error(`Login url is missing`);
  }
  return `
   <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">   
        <p>Hi there,</p> <p> Your account has been successfully created. We're excited to have you on board! </p> <a href="${loginPageLink}" style=" display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 10px; " > Login here</a> <p style="margin-top: 20px;"> If you have any questions, feel free to reach out. </p> <p> Best regards,<br/> <strong>Tokenize AI</strong> </p>
    </div>
    `;
};

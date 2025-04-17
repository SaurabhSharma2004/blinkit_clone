const verifyEmailTemplate = ({name, url}) => {
    return `
        <html>
            <body>
                <h1>Hello ${name}</h1>
                <p>Please verify your email by clicking on the link below</p>
                <a href="${url}">Verify Email</a>
            </body>
        </html>
    `;
}

module.exports = verifyEmailTemplate;
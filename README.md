# BDD TestCafe Trello

A Behavior-Driven Development (BDD) test automation framework for the Trello web application built with **JavaScript**, **TestCafe**, and **Cucumber**.

This project demonstrates industry-standard QA automation practices, including **Page Object Model (POM)**, **BDD with Gherkin**, **cross-browser execution**, **environment-based configuration**, and **Allure reporting**.

---

# 🚀 Features

- ✅ Behavior-Driven Development (BDD)
- ✅ Page Object Model (POM)
- ✅ TestCafe UI Automation
- ✅ Cucumber & Gherkin
- ✅ Cross-Browser Testing
- ✅ Environment Variable Configuration
- ✅ Allure Reporting
- ✅ Modular Framework Architecture
- ✅ Reusable Step Definitions
- ✅ Git Version Control

---

# 🛠 Technologies

| Category | Technologies |
|----------|--------------|
| Language | JavaScript (Node.js) |
| Automation | TestCafe |
| BDD | Cucumber, Gherkin |
| Reporting | Allure Report |
| Version Control | Git, GitHub |
| Operating System | Linux |

---

# 📂 Project Structure

```
bdd-testcafe-trello/
│
├── features/          # Gherkin feature files
├── steps/             # Step definitions
├── pages/             # Page Object Model
├── hooks/             # Test hooks
├── utils/             # Utility functions
├── config/            # Configuration files
├── reports/           # Allure reports
├── package.json
└── README.md
```

### Architecture Highlights

- Separation between test scenarios and implementation.
- Reusable Page Object Model components.
- Modular and maintainable project structure.
- Environment-based configuration.
- Easy to extend with additional test suites.

---

# 🧠 Skills Demonstrated

- UI Test Automation
- Behavior-Driven Development (BDD)
- Test Design
- Page Object Model (POM)
- Cross-Browser Testing
- Test Framework Design
- Environment Configuration
- Test Reporting
- Git Workflow

---

# 🌐 Chrome Local Network Policy (Linux)

When running TestCafe against Trello, Chrome may block requests to local services. To allow access, configure the `LocalNetworkAccessAllowedForUrls` policy.

## Create the policy file

```bash
sudo nano /etc/opt/chrome/policies/managed/local_network.json
```

Add the following content:

```json
{
  "LocalNetworkAccessAllowedForUrls": [
    "[*.]trello.com",
    "http://localhost:3000",
    "[*.]atlassian.com"
  ]
}
```

---

# 📦 Installation

Install project dependencies.

```bash
npm install
```

---

# ⚙️ Environment Configuration

Create your local environment file.

```bash
cp .env.example .env
```

Update the required environment variables before running the test suite.

---

# ▶️ Running Tests

Execute all BDD scenarios.

```bash
npx gherkin-testcafe edge:headless features/ --reporter allure
```

Replace `edge` with your preferred browser if necessary.

---

# 📊 Generate Allure Report

Generate and open the Allure report.

```bash
npm run bdd-report
```

---

# 🔐 Authentication & Browser Compatibility

Trello requires an email verification (2FA) challenge when a browser or execution environment signs in for the first time.

Browser compatibility:

| Browser | Headless | Normal |
|----------|----------|--------|
| Chrome | ❌ Requires manual authentication | ✅ |
| Firefox | ✅ After first login | ✅ |
| Chromium | ✅ After first login | ✅ |
| Edge | ✅ After first login | ✅ |

After the initial successful authentication, Firefox, Chromium, and Edge can execute the automated tests normally in headless mode.

---

# 📁 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `BROWSER` | Browser used to execute the tests (`chrome`, `chromium`, `edge`, `firefox`) | `firefox` |
| `API_URL` | Optional API endpoint | — |
| Other variables | Project-specific configuration | — |

---

# 📌 Project Status

🚧 **Active Development**

### Completed

- BDD framework architecture
- Page Object Model (POM)
- TestCafe integration
- Cucumber & Gherkin support
- Cross-browser execution
- Allure reporting
- Environment configuration

### Planned Improvements

- Additional UI test scenarios
- API test integration
- CI/CD pipeline
- Expanded documentation
- Improved framework utilities

---

# 🔒 Security Notes

- Never commit secrets to the repository.
- Store credentials in the `.env` file.
- Keep `.env` listed in `.gitignore`.
- Use environment variables for sensitive information.

---

# 📄 License

This project was created for learning purposes and to demonstrate QA Automation framework design using TestCafe, Cucumber, and modern testing practices.
